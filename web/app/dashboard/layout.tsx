import ReusableLayout from "@/components/ReusableLayout";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <ReusableLayout showSidebar={true}>{children}</ReusableLayout>;
}
