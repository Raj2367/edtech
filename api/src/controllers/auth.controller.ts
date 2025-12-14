import { Request, Response } from "express";
import { User } from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { success, failure } from "../utils/response.js";

/**
 * Register a new user.
 */
export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    return failure(res, "Email already registered", 400);
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role || "STUDENT",
  });

  return success(res, { userId: user._id, role: user.role }, 201);
});
