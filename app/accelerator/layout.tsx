import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AccelIO 2026 — Startup Accelerator Summit | New York City",
  description: "Join 500+ founders for 3 days of mentorship, investor access, and growth frameworks. September 15–17, 2026 · NYC. Free to apply.",
  keywords: "startup accelerator, founder summit, venture capital, startup event, New York, entrepreneur, funding",
};

export default function AccelLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
