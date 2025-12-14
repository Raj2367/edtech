import { Router } from "express";
import { register } from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.js";
import { z } from "zod";

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

/**
 * POST /api/auth/register
 */
router.post("/register", validate(RegisterSchema), register);

export default router;
