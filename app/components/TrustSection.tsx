"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 9, suffix: "+", label: "Years Experience", sublabel: "Mastering ICT concepts", icon: "⚡" },
  { value: 1000, suffix: "+", label: "Students Trained", sublabel: "Across 40+ countries", icon: "🌍" },
  { value: 5, suffix: " Day", label: "Live Challenge", sublabel: "Hands-on execution", icon: "📅" },
  { value: 87, suffix: "%", label: "Success Rate", sublabel: "Consistent post-challenge", icon: "📈" },
];

function CounterCard({
  value, suffix, label, sublabel, icon, delay,
}: {
  value: number; suffix: string; label: string; sublabel: string; icon: string; delay: number;
}) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      let start = 0;
      const duration = 2000;
      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * value));
        if (progress < 1) requestAnimationFrame(step);
        else setCount(value);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(timer);
  }, [visible, value, delay]);

  return (
    <div
      ref={ref}
      className={`glass glass-hover rounded-2xl p-6 sm:p-8 text-center transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-4xl mb-3">{icon}</div>
      <div className="text-4xl sm:text-5xl font-black gradient-text green-glow mb-2">
        {count}{suffix}
      </div>
      <div className="text-white font-bold text-lg mb-1">{label}</div>
      <div className="text-[#ffffff] text-sm">{sublabel}</div>
    </div>
  );
}

export default function TrustSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#050505]">
      <div className="section-divider mb-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block glass px-4 py-1.5 rounded-full text-[#32FF32] text-sm font-medium mb-4">
            By The Numbers
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            A Track Record That{" "}
            <span className="gradient-text">Speaks For Itself</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <CounterCard key={i} {...stat} delay={i * 150} />
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {["ICT Certified Concepts", "Live Market Sessions", "Private Community Access", "Lifetime Recordings"].map(
            (badge) => (
              <div key={badge} className="flex items-center gap-2 text-[#ffffff] text-sm">
                <span className="w-4 h-4 bg-[#32FF3220] rounded-full flex items-center justify-center text-[#32FF32] text-xs">
                  ✓
                </span>
                {badge}
              </div>
            )
          )}
        </div>
      </div>
      <div className="section-divider mt-20" />
    </section>
  );
}
