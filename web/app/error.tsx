"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
        <p className="text-gray-600 mb-4">{error.message}</p>
        <button
          onClick={reset}
          className="p-2 m-2 bg-blue-600 text-white rounded"
        >
          Try again
        </button>
        <a href="/" className="p-2 m-2 bg-blue-600 text-white rounded">
          {/* <div className="px-4 py-2  text-white rounded"> */}
            Go to Home Page
          {/* </div> */}
        </a>
      </div>
    </div>
  );
}
