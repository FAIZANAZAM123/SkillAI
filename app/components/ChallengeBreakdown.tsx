"use client";

import { useEffect, useRef, useState } from "react";

const days = [
  {
    day: "01",
    title: "Market Structure",
    desc: "Master the foundation. Learn how to read price action through the lens of institutional order flow — highs, lows, internal/external range liquidity, and BOS vs CHoCH.",
    topics: ["Break of Structure (BOS)", "Change of Character (CHoCH)", "Internal vs External Range Liquidity", "Higher Timeframe Bias"],
    color: "#32FF32",
  },
  {
    day: "02",
    title: "Liquidity",
    desc: "Understand how institutions hunt retail stops to fuel the next directional move. Identify buy-side and sell-side pools before the market gets there.",
    topics: ["Buy-side & Sell-side Liquidity", "Equal Highs/Lows", "Liquidity Voids", "Stop Hunt Mechanics"],
    color: "#00D26A",
  },
  {
    day: "03",
    title: "Entry Models",
    desc: "Precision entries using ICT's core concepts. Know exactly where to get in, where to stop out, and how to target the next draw on liquidity.",
    topics: ["Fair Value Gaps (FVG)", "Order Blocks", "Optimal Trade Entry (OTE)", "Breaker Blocks"],
    color: "#32FF32",
  },
  {
    day: "04",
    title: "Trade Management",
    desc: "Learn the professional approach to managing open trades — when to hold, when to take partials, and how to protect profit without suffocating your winners.",
    topics: ["Position Sizing Framework", "Partial Profit Taking", "Trailing Stop Mechanics", "R:R Optimization"],
    color: "#00D26A",
  },
  {
    day: "05",
    title: "Live Market Execution",
    desc: "Put everything together in real time. We trade the live market together — call setups, execute the framework, and debrief every decision as it happens.",
    topics: ["Live Trade Calls", "Real-time Analysis", "Full Framework Application", "Q&A + Debrief"],
    color: "#32FF32",
  },
];

export default function ChallengeBreakdown() {
  const [activeDay, setActiveDay] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const active = days[activeDay];

  return (
    <section id="challenge" className="py-20 sm:py-28 bg-[#050505]">
      <div className="section-divider mb-20" />
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block glass px-4 py-1.5 rounded-full text-[#32FF32] text-sm font-medium mb-4">
            5-Day Framework
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            The Challenge{" "}
            <span className="gradient-text">Day By Day</span>
          </h2>
          <p className="text-[#ffffff] max-w-xl mx-auto">
            Each day is a building block. Skip nothing, rush nothing. This is how professionals are built.
          </p>
        </div>

        <div
          className={`grid lg:grid-cols-[260px_1fr] gap-6 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {days.map((d, i) => (
              <button
                key={i}
                onClick={() => setActiveDay(i)}
                className={`flex-shrink-0 lg:w-full flex items-center gap-3 px-4 py-4 rounded-xl text-left transition-all duration-300 ${
                  activeDay === i
                    ? "bg-[#32FF3215] border border-[#32FF32] text-[#32FF32]"
                    : "glass text-[#ffffff] hover:text-white border border-transparent hover:border-[#32FF3230]"
                }`}
              >
                <span className="font-mono text-xs font-bold opacity-60">DAY</span>
                <span className="font-black text-2xl">{d.day}</span>
                <span className="font-semibold text-sm hidden sm:block">{d.title}</span>
              </button>
            ))}
          </div>

          <div className="glass rounded-2xl p-6 sm:p-8 border border-[#32FF3215]">
            <div className="flex items-start gap-4 mb-6">
              <div
                className="w-16 h-16 rounded-2xl flex flex-col items-center justify-center flex-shrink-0"
                style={{ background: `${active.color}15`, border: `1px solid ${active.color}30` }}
              >
                <span className="text-xs font-mono text-[#ffffff]">DAY</span>
                <span className="font-black text-2xl" style={{ color: active.color }}>
                  {active.day}
                </span>
              </div>
              <div>
                <h3 className="text-white font-black text-2xl sm:text-3xl mb-2">{active.title}</h3>
                <p className="text-[#ffffff] leading-relaxed">{active.desc}</p>
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-[#32FF3220] to-transparent mb-6" />

            <div>
              <p className="text-[#32FF32] text-sm font-semibold mb-4 uppercase tracking-wider">
                What You&apos;ll Cover
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {active.topics.map((topic, i) => (
                  <div key={i} className="flex items-center gap-3 glass rounded-lg px-4 py-3">
                    <span className="w-5 h-5 rounded-full bg-[#32FF3220] flex items-center justify-center text-[#32FF32] text-xs flex-shrink-0">
                      ✓
                    </span>
                    <span className="text-white text-sm font-medium">{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {activeDay === 4 && (
              <div className="mt-6 p-4 rounded-xl bg-[#32FF3210] border border-[#32FF3230]">
                <p className="text-[#32FF32] font-semibold">🔴 LIVE on Day 5</p>
                <p className="text-[#ffffff] text-sm mt-1">
                  We trade the market together in real time. You see the framework applied — not in theory, but with
                  real money on the line.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="section-divider mt-20" />
    </section>
  );
}
