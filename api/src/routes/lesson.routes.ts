import { Router } from "express";
import {
  createLesson,
  deleteLesson,
  getCourseLessons,
  getLessonById,
  updateLesson,
} from "../controllers/lesson.controller";

import { authGuard } from "../middleware/auth";
import { requireRole } from "../middleware/authorize";
import { validate } from "../middleware/validate";

import { z } from "zod";

const router = Router();

/**
 * Zod validation schema for lessons
 */
const LessonSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

/**
 * POST /api/lessons/:courseId
 * Instructor only
 */
router.post(
  "/:courseId",
  authGuard,
  requireRole("INSTRUCTOR"),
  validate(LessonSchema),
  createLesson
);

/**
 * GET /api/lessons/:courseId
 * Public lessons for a course (used by SSR)
 */
router.get("/:courseId", getCourseLessons);

/**
 * GET /api/lessons/single/:lessonId
 */
router.get("/single/:lessonId", authGuard, getLessonById);

/**
 * PATCH /api/lessons/update/:lessonId
 */
router.patch(
  "/update/:lessonId",
  authGuard,
  requireRole("INSTRUCTOR"),
  validate(LessonSchema),
  updateLesson
);

/**
 * DELETE /api/lessons/:lessonId
 */
router.delete("/:lessonId", authGuard, requireRole("INSTRUCTOR"), deleteLesson);

export default router;
