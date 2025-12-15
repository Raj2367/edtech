import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { failure } from "../utils/response";

/**
 * Validates incoming requests using Zod schemas.
 * Ensures payloads are sanitized and correct.
 */
export function validate(schema: z.ZodType<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return failure(res, "Invalid input", 400);
    }

    req.body = result.data;
    next();
  };
}
