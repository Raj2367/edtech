import ReusableLayout from "@/components/ReusableLayout";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <ReusableLayout>{children}</ReusableLayout>;
}
