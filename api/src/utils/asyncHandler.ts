import { Request, Response, NextFunction } from "express";

/**
 * Wraps async controller functions to automatically catch errors
 * and forward them to Express error handling middleware.
 */
export const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
