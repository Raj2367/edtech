"use client";

import { useFormStatus } from "react-dom";
import Spinner from "@/components/ui/Spinner";

export default function Button({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white py-2 rounded"
    >
      {pending ? <Spinner /> : label}
    </button>
  );
}
