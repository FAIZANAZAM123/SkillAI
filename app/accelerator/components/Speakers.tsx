"use client";
import { useState } from "react";

const speakers = [
  {
    name: "Sarah Chen",
    role: "Partner @ Sequoia Capital",
    bio: "Led 40+ Series A investments. Backed 3 unicorns. Expert in B2B SaaS and marketplace scaling.",
    tags: ["Fundraising", "B2B SaaS"],
    avatar: "SC",
    color: "#4F46E5",
    session: "How to Close Your Series A in 60 Days",
  },
  {
    name: "Marcus Williams",
    role: "Founder & CEO @ ScaleAI",
    bio: "Built from $0 to $50M ARR. Led team of 200+. Expert in AI product development and enterprise sales.",
    tags: ["AI", "Enterprise"],
    avatar: "MW",
    color: "#7C3AED",
    session: "AI-First Product Strategy",
  },
  {
    name: "Priya Patel",
    role: "VP Growth @ Stripe",
    bio: "Scaled Stripe's SMB growth from 10K to 500K merchants. Growth loops, pricing, and PLG expert.",
    tags: ["PLG", "Growth"],
    avatar: "PP",
    color: "#22D3EE",
    session: "Building Growth Loops That Compound",
  },
  {
    name: "James Ko",
    role: "Managing Director @ a16z",
    bio: "Led investments in 15+ category-defining startups. Former founder. Deep in Web3 and climate tech.",
    tags: ["VC", "Web3"],
    avatar: "JK",
    color: "#F472B6",
    session: "What VCs Actually Look For",
  },
  {
    name: "Aisha Mbeki",
    role: "Co-Founder @ Ramp",
    bio: "Built Ramp's finance automation platform. Raised $950M. Expert in fintech and rapid scaling.",
    tags: ["Fintech", "Scale"],
    avatar: "AM",
    color: "#4F46E5",
    session: "Building in a Crowded Market",
  },
  {
    name: "David Park",
    role: "Head of Product @ Linear",
    bio: "Designed Linear's beloved product experience. Expert in B2B UX, design systems, and product-led growth.",
    tags: ["Product", "Design"],
    avatar: "DP",
    color: "#7C3AED",
    session: "Designing Products Developers Love",
  },
];

export default function Speakers() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section
      id="speakers"
      className="py-24 sm:py-32 relative"
      style={{
        background: "linear-gradient(180deg, #050816 0%, #080b20 50%, #050816 100%)",
      }}
    >
      {/* Subtle glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #4F46E510, transparent 70%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
            style={{
              background: "rgba(124,58,237,0.12)",
              border: "1px solid rgba(124,58,237,0.3)",
              color: "#c4b5fd",
            }}
          >
            World-Class Speakers
          </span>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4"
            style={{ letterSpacing: "-0.02em" }}
          >
            Learn From Those{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#7C3AED,#F472B6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Who Built It.
            </span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
            50+ speakers across 3 days. No keynote fluff — only founders, investors, and operators sharing real playbooks.
          </p>
        </div>

        {/* Speaker Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {speakers.map((s, i) => (
            <div
              key={i}
              className="relative rounded-2xl p-5 cursor-pointer transition-all duration-300 group"
              style={{
                background: selected === i
                  ? `linear-gradient(145deg, ${s.color}15, rgba(255,255,255,0.03))`
                  : hovered === i
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(255,255,255,0.03)",
                border: selected === i
                  ? `1px solid ${s.color}50`
                  : hovered === i
                  ? `1px solid rgba(255,255,255,0.12)`
                  : "1px solid rgba(255,255,255,0.06)",
                boxShadow: selected === i ? `0 0 30px ${s.color}18` : "none",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setSelected(selected === i ? null : i)}
            >
              <div className="flex items-start gap-4 mb-4">
                {/* Avatar */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-lg flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}99)` }}
                >
                  {s.avatar}
                </div>
                <div className="min-w-0">
                  <p className="text-white font-black text-base leading-tight">{s.name}</p>
                  <p className="text-xs mt-0.5 font-medium" style={{ color: s.color }}>{s.role}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex gap-1.5 mb-3">
                {s.tags.map(t => (
                  <span
                    key={t}
                    className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                    style={{
                      background: `${s.color}15`,
                      color: s.color,
                      border: `1px solid ${s.color}25`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Bio — shown on select */}
              <div
                style={{
                  maxHeight: selected === i ? "200px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <p className="text-sm mb-3 leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                  {s.bio}
                </p>
                <div
                  className="flex items-center gap-2 p-3 rounded-xl"
                  style={{ background: `${s.color}12`, border: `1px solid ${s.color}25` }}
                >
                  <span style={{ color: s.color }}>🎤</span>
                  <span className="text-xs font-semibold" style={{ color: s.color }}>
                    &ldquo;{s.session}&rdquo;
                  </span>
                </div>
              </div>

              {/* Click hint */}
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {selected === i ? "Click to collapse" : "Click to see session"}
                </span>
                <span
                  className="text-sm transition-transform duration-300"
                  style={{
                    color: s.color,
                    transform: selected === i ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  ↓
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* More speakers CTA */}
        <div className="text-center mt-10">
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            + 44 more speakers announced soon
          </p>
        </div>
      </div>
    </section>
  );
}
