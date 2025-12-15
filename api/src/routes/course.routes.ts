import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseBySlug,
  getInstructorCourses,
  updateCourse,
} from "../controllers/course.controller";

import { validate } from "../middleware/validate";
import { requireRole } from "../middleware/authorize";
import { authGuard } from "../middleware/auth";

import { z } from "zod";

const router = Router();

/**
 * Zod schema for course creation/updating
 */
const CourseSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  published: z.boolean().optional(),
});

/**
 * GET /api/courses
 * Public route — returns published courses
 */
router.get("/", getAllCourses);

/**
 * POST /api/courses
 * Instructor only
 */
router.post(
  "/",
  authGuard,
  requireRole("INSTRUCTOR"),
  validate(CourseSchema),
  createCourse
);

/**
 * GET /api/courses/instructor
 * Instructor dashboard — requires auth
 */
router.get("/instructor", authGuard, requireRole("INSTRUCTOR"), getInstructorCourses);

/**
 * GET /api/courses/:slug
 * SSR route used for public course page
 */
router.get("/:slug", getCourseBySlug);

/**
 * PATCH /api/courses/:courseId
 * Only the instructor who owns the course may edit
 */
router.patch(
  "/edit/:courseId",
  authGuard,
  requireRole("INSTRUCTOR"),
  validate(CourseSchema),
  updateCourse
);

/**
 * DELETE /api/courses/:courseId
 */
router.delete(
  "/:courseId",
  authGuard,
  requireRole("INSTRUCTOR"),
  deleteCourse
);

export default router;
