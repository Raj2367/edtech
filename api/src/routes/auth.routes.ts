import { Router } from "express";
import { z } from "zod";
import { login, logout, register } from "../controllers/auth.controller";
import { validate } from "../middleware/validate";
import { authRateLimiter } from "../middleware/rateLimit";
import { authGuard } from "../middleware/auth";

const router = Router();

/**
 * Validation schemas using Zod
 */
const RegisterSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(6),
  role: z.enum(["ADMIN", "INSTRUCTOR", "STUDENT"]).optional(),
});

const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

/**
 * POST /api/auth/register
 */
router.post("/register", validate(RegisterSchema), register);

/**
 * POST /api/auth/login
 */
router.post("/login", authRateLimiter, validate(LoginSchema), login);

/**
 * POST /api/auth/logout
 */
router.post("/logout", authGuard, logout);

export default router;
