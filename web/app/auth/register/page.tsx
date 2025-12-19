"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import FormError from "@/components/ui/FormError";
import { registerAction } from "../actions";
import { useState } from "react";

export default function RegisterPage() {
  const [error, setError] = useState<string | undefined>();
  async function onSubmit(data: FormData) {
    const result = await registerAction(data);
    if (result?.error) setError(result.error);
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
          <Input name="name" required />
        </label>

        <label className="block mb-4">
          <span className="font-medium">Email</span>
          <Input name="email" type="email" required />
        </label>

        <label className="block mb-4">
          <span className="font-medium">Password</span>
          <Input name="password" type="password" required />
        </label>

        <FormError message={error} />

        <Button label="Register"/>

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
