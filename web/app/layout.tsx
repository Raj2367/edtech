import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "EdTech Manager",
  description: "Course & Lesson Management Platform",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
