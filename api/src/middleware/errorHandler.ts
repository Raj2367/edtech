import { Request, Response, NextFunction } from "express";

/**
 * Centralized error handling.
 * In production, detailed stack traces should not be exposed.
 */
export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error("❌ Error:", err);

  const status = err.status || 500;
  const message =
    process.env.NODE_ENV === "production"
      ? "Server error"
      : err.message || "An unexpected error occurred";

  return res.status(status).json({
    success: false,
    message,
  });
}
