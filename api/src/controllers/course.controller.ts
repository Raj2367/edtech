import { Request, Response } from "express";
import { Course } from "../models/Course.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { success, failure } from "../utils/response.js";

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