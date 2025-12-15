import { Router } from "express";
import {
  createCourse,
  getAllCourses,
  getCourseBySlug,
  getInstructorCourses,
} from "../controllers/course.controller.js";

import { validate } from "../middleware/validate.js";
import { requireRole } from "../middleware/authorize.js";
import { authGuard } from "../middleware/auth.js";

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

export default router;
