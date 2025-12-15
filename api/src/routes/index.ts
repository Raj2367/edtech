import { Router } from "express";

import authRoutes from "./auth.routes.js";
import courseRoutes from "./course.routes.js";
import lessonRoutes from "./lesson.routes.js";

/**
 * Master API router for clean express organization.
 * All endpoints are nested under /api/*
 */

const router = Router();

router.use("/auth", authRoutes);
router.use("/courses", courseRoutes);
router.use("/lessons", lessonRoutes);

export default router;
