export default function FormError({ message }: { message?: string }) {
  if (!message) return null;

  return <div className="text-red-600 text-sm mt-2 font-medium">{message}</div>;
}
