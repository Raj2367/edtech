import { Router } from "express";

import authRoutes from "./auth.routes";
import courseRoutes from "./course.routes";
import lessonRoutes from "./lesson.routes";

/**
 * Master API router for clean express organization.
 * All endpoints are nested under /api/*
 */

const router = Router();

router.use("/auth", authRoutes);
router.use("/courses", courseRoutes);
router.use("/lessons", lessonRoutes);

export default router;
