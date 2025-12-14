import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../utils/jwt.js";
import { failure } from "../utils/response.js";

/**
 * Extracts JWT from HttpOnly cookie and identifies user session.
 * Adds user info onto req.user if valid.
 */
export function authGuard(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return failure(res, "Authentication required", 401);
    }

    const payload = verifyJWT(token); // throws on invalid token
    req.user = payload; // attach user to request

    return next();
  } catch (error) {
    return failure(res, "Invalid or expired session", 401);
  }
}
