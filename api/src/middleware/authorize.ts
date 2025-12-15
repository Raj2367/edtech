import { Request, Response, NextFunction } from "express";
import { failure } from "../utils/response";

/**
 * Enforces role-based access control.
 * Example: only instructors can create courses.
 */
export function requireRole(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return failure(res, "Not authenticated", 401);
    }

    if (!allowedRoles.includes(req.user.role)) {
      return failure(res, "Permission denied", 403);
    }

    next();
  };
}
