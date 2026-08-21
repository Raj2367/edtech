import { Request, Response } from "express";
import sgMail from "@sendgrid/mail";
import { User } from "../models/User";
import { asyncHandler } from "../utils/asyncHandler";
import { success, failure } from "../utils/response";
import { clearAuthCookie, setAuthCookie } from "../utils/cookies";
import { signJWT } from "../utils/jwt";
import { ENV } from "../config/env";

sgMail.setApiKey(ENV.SENDGRID_API_KEY);
const tempOtpStorage = new Map<string, { otp: string; expiresAt: number }>();

export const sendOTP = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    return failure(res, "Email already registered", 400);
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  tempOtpStorage.set(email, {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
  });
  const msg = {
    to: email,
    from: {
      name: "EdTech-Manager Support",
      email: ENV.FROM_EMAIL,
    },
    subject: "🔐 Secure Verification Code: Your Registration OTP",
    text: `Welcome to Edtech-Manager!\n\nYour One-Time Password (OTP) for registration is: ${otp}\n\nThis verification code expires in 5 minutes. If you did not request this, please safely ignore this email.`,
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; rounded: 8px;">
      <h2 style="color: #2563eb; text-align: center;">Welcome to Edtech-Manager!</h2>
      <p style="font-size: 16px; color: #333333;">Thank you for registering. Please use the following One-Time Password (OTP) to complete your account setup:</p>
      
      <div style="background-color: #f3f4f6; padding: 15px; text-align: center; border-radius: 6px; margin: 25px 0;">
        <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #1e3a8a;">${otp}</span>
      </div>
      
      <p style="font-size: 14px; color: #666666; text-align: center;">This code is valid for <strong>5 minutes</strong>. For security reasons, do not share this code with anyone.</p>
      <hr style="border: 0; border-top: 1px solid #e0e0e0; margin: 30px 0;" />
      
      <!-- Anti-Spam Compliance Footer Section -->
      <footer style="font-size: 12px; color: #9ca3af; text-align: center; line-height: 1.5;">
        <p>This is an automated security transaction message sent by Edtech-Manager.</p>
        <p>You received this because an account registration request was made using this email address.</p>
        <p>&copy; ${new Date().getFullYear()} Edtech-Manager. All rights reserved.</p>
        <p style="margin-top: 10px; font-style: italic;">
          Our physical office: Somewhere under the sky.
        </p>
      </footer>
    </div>
  `,
  };

  await sgMail.send(msg);

  return success(res, { message: "OTP sent successfully" }, 200);
});

/**
 * Register a new user.
 */
export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, role, otp } = req.body;

  const record = tempOtpStorage.get(email);

  if (!record) {
    return failure(
      res,
      "OTP not found or expired. Please request a new code.",
      400,
    );
  }

  if (Date.now() > record.expiresAt) {
    tempOtpStorage.delete(email); // Clean up expired record
    return failure(res, "OTP has expired. Please try again.", 400);
  }

  if (record.otp !== otp) {
    return failure(res, "The OTP entered is incorrect.", 400);
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role || "STUDENT",
  });

  tempOtpStorage.delete(email);

  const token = signJWT({
    userId: user._id.toString(),
    role: user.role,
  });

  setAuthCookie(res, token);

  return success(res, { userId: user._id, role: user.role }, 201);
});

/**
 * Login the user.
 */
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return failure(res, "Invalid credentials", 400);

  const isValid = await user.comparePassword(password);
  if (!isValid) return failure(res, "Invalid credentials", 400);

  const token = signJWT({
    userId: user._id.toString(),
    role: user.role,
  });

  setAuthCookie(res, token);

  return success(res, {
    userId: user._id,
    role: user.role,
  });
});

/**
 * Logout endpoint.
 */
export const logout = asyncHandler(async (_req: Request, res: Response) => {
  clearAuthCookie(res);
  return success(res, "Logged out");
});

/**
 * Retrieve current session user.
 * Works beautifully with SSR in Next.js.
 */
export const me = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) return failure(res, "Not authenticated", 401);
  return success(res, { user: req.user });
});
