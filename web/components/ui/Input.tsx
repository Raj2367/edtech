import { InputHTMLAttributes } from "react";
import clsx from "clsx";

export default function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  return (
    <input
      {...props}
      className={clsx(
        "w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none",
        className
      )}
    />
  );
}
