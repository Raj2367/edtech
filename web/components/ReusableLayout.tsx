// components/ReusableLayout.tsx
"use client";

import clsx from "clsx";
import { ReactNode, useState } from "react";

export default function ReusableLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <section className="min-h-screen flex">
      {/* Toggle Button (Mobile only) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 px-3 py-2 bg-blue-600 text-white rounded"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle sidebar"
      >
        ☰
      </button>

      {/* Overlay (Mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <aside
        className={clsx(
          "fixed md:static top-0 left-0 h-full w-64 bg-white dark:bg-gray-700 shadow-md p-6 z-50 transition-transform",
          open ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0"
        )}
      >
        <h2 className="text-xl font-semibold mb-6">Dashboard</h2>

        <nav className="min-h-screen space-y-4">
          <a href="/dashboard" className="block hover:text-blue-600">
            Overview
          </a>
          <a href="/courses" className="block hover:text-blue-600">
            My Courses
          </a>
          <a href="/auth/logout" className="block text-red-600">
            Logout
          </a>
        </nav>
      </aside>
      <main className="flex-1 p-6 my-10 md:my-0">{children}</main>
    </section>
  );
}
