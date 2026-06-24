"use client";

import { useEffect, useRef, useState } from "react";

const metrics = [
  { value: 1000, suffix: "+", label: "Winning Students", sublabel: "Traders who completed & profited", icon: "🏆" },
  { value: 847, suffix: "", label: "Challenge Graduates", sublabel: "Completed all 5 days", icon: "🎓" },
  { value: 78, suffix: "%", label: "Consistent Traders", sublabel: "Profitable 3+ months after", icon: "📈" },
  { value: 2.8, suffix: "R", label: "Avg Risk/Reward", sublabel: "Across all student trades", icon: "⚖️" },
  { value: 65, suffix: "%", label: "Average Win Rate", sublabel: "After framework adoption", icon: "🎯" },
  { value: 6, suffix: " Wks", label: "Avg Breakeven", sublabel: "Time to consistent profit", icon: "⚡" },
];

function MetricCard({
  value, suffix, label, sublabel, icon, delay, visible,
}: {
  value: number; suffix: string; label: string; sublabel: string; icon: string; delay: number; visible: boolean;
}) {
  const [count, setCount] = useState(0);
  const isDecimal = value % 1 !== 0;

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      const duration = 2000;
      let start = 0;
      const step = (ts: number) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(isDecimal ? Math.round(eased * value * 10) / 10 : Math.floor(eased * value));
        if (progress < 1) requestAnimationFrame(step);
        else setCount(value);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(timer);
  }, [visible, value, delay, isDecimal]);

  return (
    <div
      className={`glass glass-hover rounded-2xl p-6 text-center transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-3xl mb-3">{icon}</div>
      <div className="text-4xl font-black gradient-text green-glow mb-1">
        {isDecimal ? count.toFixed(1) : count}{suffix}
      </div>
      <div className="text-white font-bold mb-1">{label}</div>
      <div className="text-[#ffffff] text-xs">{sublabel}</div>
    </div>
  );
}

export default function ResultsSection() {
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

  return (
    <section id="results" className="py-20 sm:py-28 bg-[#050505]">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block glass px-4 py-1.5 rounded-full text-[#32FF32] text-sm font-medium mb-4">
            Aggregate Data
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            The Results Don&apos;t Lie.{" "}
            <span className="gradient-text">Frameworks Work.</span>
          </h2>
          <p className="text-[#ffffff] max-w-xl mx-auto">
            Aggregated metrics from 1,000+ students tracked over 12+ months post-challenge.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {metrics.map((m, i) => (
            <MetricCard key={i} {...m} delay={i * 120} visible={visible} />
          ))}
        </div>

        <div className="mt-12 glass rounded-2xl p-6 sm:p-8 border border-[#32FF3215]">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="text-center sm:text-left">
              <p className="text-[#32FF32] font-bold text-xl mb-1">The Framework Difference</p>
              <p className="text-[#ffffff] text-sm max-w-md">
                Most traders fail because they have knowledge but no system. This challenge gives you both — and the
                live sessions prove it works in real markets.
              </p>
            </div>
            <div className="sm:ml-auto flex-shrink-0">
              <a href="#reserve" className="btn-primary px-6 py-3 rounded-full font-bold text-sm">
                Join The Challenge →
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="section-divider mt-20" />
    </section>
  );
}
