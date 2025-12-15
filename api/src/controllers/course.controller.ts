import { Request, Response } from "express";
import { Course } from "../models/Course";
import { asyncHandler } from "../utils/asyncHandler";
import { success, failure } from "../utils/response";

/**
 * Get all published courses (Public).
 */
export const getAllCourses = asyncHandler(
  async (_req: Request, res: Response) => {
    const courses = await Course.find({ published: true }).sort({
      createdAt: -1,
    });
    return success(res, courses);
  }
);

/**
 * Create a new course (Instructor only).
 */
export const createCourse = asyncHandler(
  async (req: Request, res: Response) => {
    const { title, description, published } = req.body;

    const course = await Course.create({
      title,
      description,
      published,
      instructorId: req.user!.userId,
    });

    return success(res, course, 201);
  }
);

/**
 * Get all courses created by instructor (Dashboard).
 */
export const getInstructorCourses = asyncHandler(
  async (req: Request, res: Response) => {
    const courses = await Course.find({ instructorId: req.user!.userId }).sort({
      createdAt: -1,
    });
    return success(res, courses);
  }
);

/**
 * Get a single course by slug.
 */
export const getCourseBySlug = asyncHandler(
  async (req: Request, res: Response) => {
    const { slug } = req.params;

    const course = await Course.findOne({ slug });
    if (!course) return failure(res, "Course not found", 404);

    return success(res, course);
  }
);

/**
 * Update course details.
 * Only the creator can update.
 */
export const updateCourse = asyncHandler(
  async (req: Request, res: Response) => {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) return failure(res, "Course not found", 404);

    if (course.instructorId.toString() !== req.user!.userId) {
      return failure(res, "Permission denied", 403);
    }

    Object.assign(course, req.body);
    await course.save();

    return success(res, course);
  }
);

/**
 * Delete course.
 */
export const deleteCourse = asyncHandler(
  async (req: Request, res: Response) => {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) return failure(res, "Course not found", 404);

    if (course.instructorId.toString() !== req.user!.userId) {
      return failure(res, "Permission denied", 403);
    }

    await course.deleteOne();
    return success(res, "Course deleted");
  }
);
