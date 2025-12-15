import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <section className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
        <h2 className="text-xl font-semibold mb-6">Dashboard</h2>

        <nav className="space-y-4">
          <a href="/dashboard" className="block text-gray-700 hover:text-blue-600">
            Overview
          </a>

          <a href="/courses" className="block text-gray-700 hover:text-blue-600">
            My Courses
          </a>

          <a href="/auth/logout" className="block text-red-600 hover:text-red-700">
            Logout
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">{children}</main>
    </section>
  );
}
