"use client";

import { useEffect, useRef, useState } from "react";

export default function FinalCTA() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-20 sm:py-32 bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#32FF32] opacity-[0.05] rounded-full blur-[120px]" />
      </div>

      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 bg-[#32FF32] rounded-full animate-pulse" />
            <span className="text-[#32FF32] text-sm font-medium">Next Cohort · Limited to 200 Seats</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1]">
            Stop Losing Trades.{" "}
            <br className="hidden sm:block" />
            <span className="gradient-text">Start Executing A System.</span>
          </h2>

          <p className="text-lg text-[#ffffff] max-w-2xl mx-auto mb-10 leading-relaxed">
            In 5 days you&apos;ll have a complete trading framework. Not theory. Not more YouTube. A process that
            works in real markets — the same one that took nine years to build and refine.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="#reserve"
              className="btn-primary px-10 py-5 rounded-full text-lg font-black glow-pulse min-w-[260px] text-center"
            >
              Reserve Your Spot Now →
            </a>
            <div className="text-[#ffffff] text-sm">
              Only <span className="text-[#32FF32] font-bold">47 seats</span> remaining
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {[
              { icon: "🔒", text: "7-Day Money Back Guarantee" },
              { icon: "🎥", text: "Lifetime Recording Access" },
              { icon: "👥", text: "Private Community" },
              { icon: "📞", text: "Direct Support" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-[#ffffff] text-sm">
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
