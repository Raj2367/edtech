"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import FormError from "@/components/ui/FormError";
import { registerAction, sendOtpAction } from "../actions";
import { useState } from "react";

export default function RegisterPage() {
  const [error, setError] = useState<string | undefined>();
  const [successMessage, setSuccessMessage] = useState<string | undefined>();
  const [isOtpSent, setIsOtpSent] = useState(false);

  async function onSubmit(data: FormData) {
    setError(undefined);
    setSuccessMessage(undefined);

    if (!isOtpSent) {
      const result = await sendOtpAction(data);

      if (result?.error) {
        setError(result.error);
      } else {
        setIsOtpSent(true);
        setSuccessMessage("OTP sent to your email! Please enter it below.");
      }
    } else {
      const result = await registerAction(data);

      if (result?.error) {
        setError(result.error);
      }
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <form
        action={onSubmit}
        className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>

        <label className="block mb-4">
          <span className="font-medium">Name</span>
          <Input name="name" required readOnly={isOtpSent} />
        </label>

        <label className="block mb-4">
          <span className="font-medium">Email</span>
          <Input name="email" type="email" required readOnly={isOtpSent} />
        </label>

        <label className="block mb-4">
          <span className="font-medium">Password</span>
          <Input
            name="password"
            type="password"
            required
            readOnly={isOtpSent}
          />
        </label>

        {isOtpSent && (
          <label className="block mb-4">
            <span className="font-medium text-blue-600 dark:text-blue-400">
              Enter 6-Digit OTP
            </span>
            <Input
              name="otp"
              type="text"
              maxLength={6}
              placeholder="123456"
              required
              autoFocus
            />
          </label>
        )}

        {successMessage && (
          <div>
            <p className="text-green-600 dark:text-green-400 text-sm mb-4 text-center">
              {successMessage}
            </p>
            <p className="text-red-400 dark:text-red-300 text-sm mb-4 text-center">
              Please Check your spam folder
            </p>
          </div>
        )}

        <FormError message={error} />

        <Button
          label={isOtpSent ? "Verify & Register" : "Send Verification OTP"}
        />

        {isOtpSent && (
          <button
            type="button"
            onClick={() => setIsOtpSent(false)}
            className="w-full text-center text-xs text-gray-500 hover:text-gray-700 mt-2 underline"
          >
            Edit Registration Info
          </button>
        )}

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a href="/auth/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
