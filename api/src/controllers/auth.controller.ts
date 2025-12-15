import { Request, Response } from "express";
import { User } from "../models/User";
import { asyncHandler } from "../utils/asyncHandler";
import { success, failure } from "../utils/response";
import { clearAuthCookie, setAuthCookie } from "../utils/cookies";
import { signJWT } from "../utils/jwt";

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

  const token = signJWT({
    userId: user._id.toString(),
    role: user.role,
  });

  setAuthCookie(res, token);

  return success(res, { userId: user._id, role: user.role }, 201);
});

/**
 * Login the user.
 */
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return failure(res, "Invalid credentials", 400);

  const isValid = await user.comparePassword(password);
  if (!isValid) return failure(res, "Invalid credentials", 400);

  const token = signJWT({
    userId: user._id.toString(),
    role: user.role,
  });

  setAuthCookie(res, token);

  return success(res, {
    userId: user._id,
    role: user.role,
  });
});

/**
 * Logout endpoint.
 */
export const logout = asyncHandler(async (_req: Request, res: Response) => {
  clearAuthCookie(res);
  return success(res, "Logged out");
});

/**
 * Retrieve current session user.
 * Works beautifully with SSR in Next.js.
 */
export const me = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) return failure(res, "Not authenticated", 401);
  return success(res, { user: req.user });
});
