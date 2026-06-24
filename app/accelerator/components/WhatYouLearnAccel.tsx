"use client";
import { useState } from "react";

const features = [
  { icon: "💡", title: "Validate Faster", desc: "Customer discovery frameworks that cut validation time from months to weeks.", color: "#4F46E5" },
  { icon: "📈", title: "PMF Signals", desc: "Know exactly when you've hit product-market fit — and when you haven't.", color: "#7C3AED" },
  { icon: "🎯", title: "Fundraising Playbook", desc: "Build your deck, pipeline, and data room the way top-funded founders do.", color: "#22D3EE" },
  { icon: "🤖", title: "AI Integration", desc: "Ship AI features, build AI-native workflows, and automate operations.", color: "#F472B6" },
  { icon: "👥", title: "Team Building", desc: "Recruit your first 10 hires and build culture that survives hypergrowth.", color: "#4F46E5" },
  { icon: "📊", title: "Unit Economics", desc: "CAC, LTV, payback periods — master the metrics investors actually care about.", color: "#7C3AED" },
  { icon: "🌍", title: "Global Scaling", desc: "How to go international before Series B without blowing your runway.", color: "#22D3EE" },
  { icon: "🔒", title: "Legal & Equity", desc: "Cap tables, vesting, SAFE notes, and term sheets — demystified.", color: "#F472B6" },
];

export default function WhatYouLearnAccel() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="what-you-will-learn"
      className="py-24 sm:py-32"
      style={{ background: "linear-gradient(180deg,#080b20,#050816)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
            style={{ background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.3)", color: "#67e8f9" }}
          >
            Curriculum
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black text-white mb-4"
            style={{ letterSpacing: "-0.02em" }}
          >
            What You&apos;ll Walk Away With
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
            30+ workshops across 3 days. Every session is practical, actionable, and led by someone who actually did it.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <div
              key={i}
              className="rounded-2xl p-5 cursor-default transition-all duration-300"
              style={{
                background: hovered === i ? `${f.color}10` : "rgba(255,255,255,0.03)",
                border: hovered === i ? `1px solid ${f.color}40` : "1px solid rgba(255,255,255,0.07)",
                transform: hovered === i ? "translateY(-3px)" : "translateY(0)",
                boxShadow: hovered === i ? `0 8px 32px ${f.color}15` : "none",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4"
                style={{ background: `${f.color}18`, border: `1px solid ${f.color}25` }}
              >
                {f.icon}
              </div>
              <h3 className="text-white font-bold text-base mb-2">{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
