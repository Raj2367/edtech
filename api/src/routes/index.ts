import { Router } from "express";

import authRoutes from "./auth.routes.js";

/**
 * Master API router for clean express organization.
 * All endpoints are nested under /api/*
 */

const router = Router();

router.use("/auth", authRoutes);

export default router;
