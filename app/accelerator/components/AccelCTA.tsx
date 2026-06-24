"use client";
import { useEffect, useRef, useState } from "react";

export default function AccelCTA() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden" style={{ background: "#050816" }}>
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(79,70,229,0.12), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `linear-gradient(rgba(79,70,229,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(79,70,229,0.3) 1px,transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className="transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)" }}
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-sm font-semibold"
            style={{
              background: "rgba(79,70,229,0.12)",
              border: "1px solid rgba(79,70,229,0.35)",
              color: "#a5b4fc",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] animate-pulse" />
            Applications Close September 1, 2026
          </span>

          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Your Next Chapter
            <br />
            <span
              style={{
                background: "linear-gradient(135deg,#4F46E5 0%,#7C3AED 40%,#22D3EE 80%,#F472B6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Starts Here.
            </span>
          </h2>

          <p className="text-lg max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
            Join 500 of the world&apos;s most ambitious founders for 3 days of mentorship, funding access, and community that will define your trajectory.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <a
              href="#register"
              className="px-10 py-5 rounded-full text-lg font-black text-white min-w-[260px] text-center transition-all duration-300"
              style={{
                background: "linear-gradient(135deg,#4F46E5,#7C3AED)",
                boxShadow: "0 0 50px #4F46E560, 0 12px 40px #4F46E540",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; }}
            >
              Apply For Free →
            </a>
            <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
              Only <span className="text-white font-bold">47 spots</span> remaining
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {[
              { icon: "🔒", text: "No Cost to Apply" },
              { icon: "🏛", text: "NYC · Sep 15–17" },
              { icon: "💼", text: "Investor Access" },
              { icon: "🎓", text: "All Workshops Included" },
            ].map(item => (
              <div key={item.text} className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                <span>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
