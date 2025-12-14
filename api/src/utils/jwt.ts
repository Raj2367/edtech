import jwt, { SignOptions } from "jsonwebtoken";
import { ENV } from "../config/env.js";

/**
 * Payload built into JWT tokens.
 * Avoid storing sensitive data.
 */
export interface JWTPayload {
  userId: string;
  role: "ADMIN" | "INSTRUCTOR" | "STUDENT";
}

/**
 * Generate a secure JWT using HS256.
 *
 * NOTE: For higher security in a real enterprise application,
 * consider switching to RS256 asymmetric signatures.
 */
export function signJWT(payload: JWTPayload, expiresIn: string = "7d") {
  return jwt.sign(payload, ENV.JWT_SECRET, {
    expiresIn: expiresIn as SignOptions["expiresIn"],
  });
}
