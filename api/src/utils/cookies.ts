import { Response } from "express";
import { cookieOptions } from "../config/cookies.js";

/**
 * Set JWT as HttpOnly cookie.
 * Secure against XSS and works in cross-site setups.
 */
export function setAuthCookie(res: Response, token: string) {
  res.cookie("token", token, cookieOptions);
}