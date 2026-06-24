"use client";

import { useEffect, useRef, useState } from "react";

const modules = [
  {
    title: "Market Structure",
    description:
      "Master the language of the market — highs, lows, breaks of structure, and how institutions leave their footprints in price.",
    icon: "📊",
    tag: "Foundation",
    color: "#32FF32",
  },
  {
    title: "Liquidity Concepts",
    description:
      "Learn where buy-side and sell-side liquidity pools sit and how smart money hunts them before the real directional move.",
    icon: "💧",
    tag: "Advanced",
    color: "#00D26A",
  },
  {
    title: "Entry Models",
    description:
      "Precise entry models using Fair Value Gaps, Order Blocks, and Optimal Trade Entries with crystal-clear invalidation levels.",
    icon: "🎯",
    tag: "Execution",
    color: "#32FF32",
  },
  {
    title: "Risk Management",
    description:
      "Professional position sizing, risk-per-trade rules, and R:R frameworks that protect capital through inevitable drawdowns.",
    icon: "🛡️",
    tag: "Protection",
    color: "#00D26A",
  },
  {
    title: "Psychology",
    description:
      "Build a process-based mindset. Control emotions, detach from outcomes, and trade with the consistency of a professional athlete.",
    icon: "🧠",
    tag: "Mindset",
    color: "#32FF32",
  },
  {
    title: "Trade Execution",
    description:
      "Combine all concepts into one repeatable execution checklist. Real trades, real markets, real-time confidence on Day 5.",
    icon: "⚡",
    tag: "Mastery",
    color: "#00D26A",
  },
];

export default function WhatYouLearnSection() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = cardRefs.current.map((ref, i) => {
      if (!ref) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => [...prev, i]);
            obs.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      obs.observe(ref);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <section id="curriculum" className="py-20 sm:py-28 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block glass px-4 py-1.5 rounded-full text-[#32FF32] text-sm font-medium mb-4">
            Full Curriculum
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            What You&apos;ll Learn{" "}
            <span className="gradient-text">In 5 Days</span>
          </h2>
          <p className="text-[#ffffff] max-w-2xl mx-auto text-lg">
            Every concept builds on the last. By Day 5, you&apos;ll have a complete trading system — not just knowledge.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {modules.map((mod, i) => (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              className={`glass glass-hover rounded-2xl p-6 sm:p-7 cursor-default transition-all duration-700 group ${
                visibleCards.includes(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background: `${mod.color}15` }}
                >
                  {mod.icon}
                </div>
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ background: `${mod.color}20`, color: mod.color }}
                >
                  {mod.tag}
                </span>
              </div>

              <h3 className="text-white font-bold text-xl mb-3 group-hover:text-[#32FF32] transition-colors">
                {mod.title}
              </h3>
              <p className="text-[#ffffff] text-sm leading-relaxed">{mod.description}</p>

              <div className="mt-5 flex items-center gap-2">
                <div
                  className="h-0.5 w-8 rounded-full transition-all duration-300 group-hover:w-16"
                  style={{ background: `linear-gradient(90deg, ${mod.color}, transparent)` }}
                />
                <span className="text-[#ffffff] text-xs">Day {i + 1} focus</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <a href="#reserve" className="btn-primary px-8 py-4 rounded-full text-base font-bold inline-block">
            Start Learning Now →
          </a>
        </div>
      </div>
    </section>
  );
}
