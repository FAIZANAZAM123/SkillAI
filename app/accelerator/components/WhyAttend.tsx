"use client";
import { useEffect, useRef, useState } from "react";

const cards = [
  {
    icon: "🤝",
    title: "Elite Networking",
    desc: "Meet 500+ founders, operators, and investors in curated 1-on-1 sessions and roundtables designed for high-signal connections.",
    tag: "Community",
    gradient: "from-[#4F46E5] to-[#7C3AED]",
    glow: "#4F46E5",
    stat: "500+ Founders",
  },
  {
    icon: "💰",
    title: "Funding Access",
    desc: "Pitch directly to 40+ active investors. Get warm introductions, cap table advice, and access our exclusive investor matching platform.",
    tag: "Funding",
    gradient: "from-[#7C3AED] to-[#F472B6]",
    glow: "#7C3AED",
    stat: "$2M+ Facilitated",
  },
  {
    icon: "🚀",
    title: "Growth Systems",
    desc: "Learn the exact growth frameworks used by companies that scaled from 0 to $10M ARR. Hands-on workshops, no theory.",
    tag: "Growth",
    gradient: "from-[#22D3EE] to-[#4F46E5]",
    glow: "#22D3EE",
    stat: "10x Average Growth",
  },
  {
    icon: "🤖",
    title: "AI Strategies",
    desc: "Integrate AI into your product, operations, and marketing stack. Workshops led by founders who shipped real AI products.",
    tag: "Technology",
    gradient: "from-[#F472B6] to-[#7C3AED]",
    glow: "#F472B6",
    stat: "20+ AI Workshops",
  },
  {
    icon: "🎯",
    title: "Expert Mentorship",
    desc: "Get matched with mentors who've built what you're building. Structured 1:1 sessions with operators from Stripe, Notion, Linear.",
    tag: "Mentorship",
    gradient: "from-[#4F46E5] to-[#22D3EE]",
    glow: "#4F46E5",
    stat: "50+ Mentors",
  },
  {
    icon: "⚡",
    title: "Intensive Workshops",
    desc: "Deep-dive sessions on fundraising, product-market fit, hiring, pricing, and scaling. Curated for execution, not inspiration.",
    tag: "Education",
    gradient: "from-[#22D3EE] to-[#F472B6]",
    glow: "#22D3EE",
    stat: "30+ Workshops",
  },
];

export default function WhyAttend() {
  const [visible, setVisible] = useState<number[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = refs.current.map((r, i) => {
      if (!r) return null;
      const o = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { setVisible(v => [...v, i]); o.disconnect(); }
      }, { threshold: 0.15 });
      o.observe(r);
      return o;
    });
    return () => obs.forEach(o => o?.disconnect());
  }, []);

  return (
    <section
      id="why-attend"
      className="py-24 sm:py-32"
      style={{ background: "#050816" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
            style={{
              background: "rgba(79,70,229,0.12)",
              border: "1px solid rgba(79,70,229,0.3)",
              color: "#a5b4fc",
            }}
          >
            Why AccelIO
          </span>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black mb-5 leading-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            <span className="text-white">Everything You Need</span>
            <br />
            <span
              style={{
                background: "linear-gradient(135deg,#4F46E5,#7C3AED,#22D3EE)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              To Build Fast.
            </span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
            Three days designed from the ground up for founders who are serious about building, raising, and scaling.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <div
              key={i}
              ref={el => { refs.current[i] = el; }}
              className="relative rounded-2xl p-6 sm:p-7 cursor-default overflow-hidden transition-all duration-500"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: hovered === i ? `1px solid ${card.glow}50` : "1px solid rgba(255,255,255,0.07)",
                transform: visible.includes(i) ? "translateY(0)" : "translateY(32px)",
                opacity: visible.includes(i) ? 1 : 0,
                transitionDelay: `${i * 80}ms`,
                boxShadow: hovered === i ? `0 0 40px ${card.glow}18` : "none",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Glow top-right */}
              {hovered === i && (
                <div
                  className="absolute -top-12 -right-12 w-32 h-32 rounded-full pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${card.glow}25, transparent 70%)`,
                  }}
                />
              )}

              <div className="flex items-start justify-between mb-5">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${card.glow}20, ${card.glow}08)`,
                    border: `1px solid ${card.glow}25`,
                  }}
                >
                  {card.icon}
                </div>
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{
                    background: `${card.glow}18`,
                    color: card.glow,
                    border: `1px solid ${card.glow}30`,
                  }}
                >
                  {card.tag}
                </span>
              </div>

              <h3 className="text-white font-black text-xl mb-3 transition-all duration-200"
                style={{ color: hovered === i ? "#fff" : "rgba(255,255,255,0.9)" }}>
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
                {card.desc}
              </p>

              <div className="flex items-center gap-2">
                <div
                  className="h-px flex-1 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${card.glow}60, transparent)`,
                    width: hovered === i ? "100%" : "32px",
                    transition: "width 0.4s ease",
                  }}
                />
                <span className="text-xs font-semibold" style={{ color: card.glow }}>
                  {card.stat}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
