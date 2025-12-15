import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <section className="min-h-screen flex">
      <main className="flex-1 p-6">{children}</main>
    </section>
  );
}
