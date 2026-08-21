import { Router } from "express";
import { z } from "zod";
import { login, logout, me, register, sendOTP } from "../controllers/auth.controller";
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
  otp: z.string().length(6),
});

const SendOTPSchema = z.object({
  email: z.email(),
});

const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

/**
 * POST /api/auth/send-otp
 */
router.post("/send-otp", validate(SendOTPSchema), sendOTP);

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

/**
 * GET /api/auth/me
 * SSR-friendly endpoint for Next.js
 */
router.get("/me", authGuard, me);

export default router;
