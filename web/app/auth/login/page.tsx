import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import FormError from "@/components/ui/FormError";
import { loginAction } from "../actions";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form
        action={loginAction}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <label className="block mb-4">
          <span className="text-gray-700 font-medium">Email</span>
          <Input name="email" type="email" required />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700 font-medium">Password</span>
          <Input name="password" type="password" required />
        </label>

        <FormError message={undefined} />

        <Button type="submit" className="w-full mt-4">
          Login
        </Button>

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
