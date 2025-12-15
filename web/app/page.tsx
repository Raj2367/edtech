export default function Home() {
  return (
    <section className="w-full py-20 flex items-center justify-center">
      <div className="text-center max-w-xl">
        <h1 className="text-5xl font-bold mb-4">EdTech Course Manager</h1>
        <p className="text-lg text-gray-600 mb-6">
          Manage courses, lessons, and student learning paths with ease.
        </p>

        <a
          href="/auth/login"
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Get Started
        </a>
      </div>
    </section>
  );
}
