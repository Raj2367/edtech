import { ThemeProvider } from "@/components/theme/ThemeProvider";
import "./globals.css";
import { ReactNode } from "react";
import { ThemeScript } from "./theme-script";
import DarkModeToggle from "@/components/theme/DarkmodeToggle";

export const metadata = {
  title: "EdTech Manager",
  description: "Course & Lesson Management Platform",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
        <ThemeProvider>
          <div className="fixed right-6 top-4">
            <DarkModeToggle />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
