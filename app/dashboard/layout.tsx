import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trading Analytics Dashboard | ProTrader",
  description: "Track trading challenge performance and student metrics",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
