import { ThemeProvider } from "@/components/theme/ThemeProvider";
import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "EdTech Manager",
  description: "Course & Lesson Management Platform",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
