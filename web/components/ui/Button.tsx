import clsx from "clsx";

export default function Button({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={clsx(
        "px-6 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition",
        className
      )}
    >
      {children}
    </button>
  );
}
