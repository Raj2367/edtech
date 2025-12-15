import { Response } from "express";
import { cookieOptions } from "../config/cookies";

/**
 * Set JWT as HttpOnly cookie.
 * Secure against XSS and works in cross-site setups.
 */
export function setAuthCookie(res: Response, token: string) {
  res.cookie("token", token, cookieOptions);
}

/**
 * Clear cookie during logout.
 */
export function clearAuthCookie(res: Response) {
  res.clearCookie("token", {
    ...cookieOptions,
    maxAge: 0,
  });
}
