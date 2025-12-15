import { Request, Response } from "express";
import { Lesson } from "../models/Lesson";
import { Course } from "../models/Course";
import { asyncHandler } from "../utils/asyncHandler";
import { success, failure } from "../utils/response";

/**
 * Validate instructor owns the course.
 */
async function checkOwnership(userId: string, courseId: string) {
  const course = await Course.findById(courseId);
  if (!course) throw new Error("Course not found");

  if (course.instructorId.toString() !== userId) {
    throw new Error("Permission denied");
  }
}

/**
 * Create lesson.
 */
export const createLesson = asyncHandler(
  async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const { title, content } = req.body;

    await checkOwnership(req.user!.userId, courseId);

    const position = await Lesson.countDocuments({ courseId });

    const lesson = await Lesson.create({
      courseId,
      title,
      content,
      position,
    });

    return success(res, lesson, 201);
  }
);

/**
 * Get all lessons for a course (public or SSR).
 */
export const getCourseLessons = asyncHandler(
  async (req: Request, res: Response) => {
    const { courseId } = req.params;

    const lessons = await Lesson.find({ courseId }).sort({ position: 1 });
    return success(res, lessons);
  }
);

/**
 * Update a lesson.
 */
export const updateLesson = asyncHandler(
  async (req: Request, res: Response) => {
    const { lessonId } = req.params;

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) return failure(res, "Lesson not found", 404);

    await checkOwnership(req.user!.userId, lesson.courseId.toString());

    Object.assign(lesson, req.body);
    await lesson.save();

    return success(res, lesson);
  }
);

/**
 * Delete lesson.
 */
export const deleteLesson = asyncHandler(
  async (req: Request, res: Response) => {
    const { lessonId } = req.params;

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) return failure(res, "Lesson not found", 404);

    await checkOwnership(req.user!.userId, lesson.courseId.toString());

    await lesson.deleteOne();
    return success(res, "Lesson deleted");
  }
);
