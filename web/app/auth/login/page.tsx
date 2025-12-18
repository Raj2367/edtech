"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import FormError from "@/components/ui/FormError";
import { loginAction } from "../actions";
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState<string | undefined>();
  async function onSubmit(data: FormData) {
    const result = await loginAction(data);
    if (result?.error) setError(result.error);
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <form
        action={onSubmit}
        className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <label className="block mb-4">
          <span className="font-medium">Email</span>
          <Input name="email" type="email" placeholder="Email" required />
        </label>

        <label className="block mb-4">
          <span className="font-medium">Password</span>
          <Input name="password" type="password" required />
        </label>

        <FormError message={error} />

        <Button label="login"/>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <a href="/auth/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
