"use client";
import { useState, useEffect, useRef } from "react";

const stories = [
  {
    name: "Arjun Mehta",
    company: "DataFlow AI",
    role: "Founder & CEO",
    country: "🇺🇸",
    quote: "AccelIO was the inflection point for DataFlow. We walked in at $80K ARR and left with a $1.2M seed round term sheet signed within 6 weeks. The investor connections were real and the workshops were genuinely useful.",
    metric: "$1.2M Raised",
    metricSub: "6 weeks after attending",
    color: "#4F46E5",
    avatar: "AM",
    prev: "Pre-seed, no traction",
    after: "$1.2M Seed",
  },
  {
    name: "Sofia Laurent",
    company: "GreenStack",
    role: "Co-Founder",
    country: "🇫🇷",
    quote: "The mentorship was unlike anything I'd experienced. My mentor had built and sold two climate-tech companies. Three sessions with her saved me 18 months of mistakes. We closed our Series A 4 months later.",
    metric: "Series A Closed",
    metricSub: "4 months post-event",
    color: "#7C3AED",
    avatar: "SL",
    prev: "Seed stage, struggling",
    after: "Series A · $4.8M",
  },
  {
    name: "Kwame Asante",
    company: "PayBridge",
    role: "CEO",
    country: "🇬🇭",
    quote: "As an African founder, getting in the room with Tier-1 VCs felt impossible. AccelIO changed that. I pitched 8 investors in 2 days, got 3 follow-up meetings, and ultimately closed $2.5M from 2 of them.",
    metric: "$2.5M Raised",
    metricSub: "From 2 investor meetings",
    color: "#22D3EE",
    avatar: "KA",
    prev: "Bootstrapped · $0",
    after: "$2.5M Pre-seed",
  },
  {
    name: "Mei Lin",
    company: "Synthly",
    role: "CTO & Co-Founder",
    country: "🇨🇳",
    quote: "The AI workshop on Day 2 completely changed how we think about product. We rebuilt our core feature in 3 weeks using the framework from the session. Our activation rate went from 22% to 61%.",
    metric: "+39% Activation",
    metricSub: "After AI framework session",
    color: "#F472B6",
    avatar: "ML",
    prev: "22% activation rate",
    after: "61% activation rate",
  },
  {
    name: "James O'Brien",
    company: "FleetOps",
    role: "Founder",
    country: "🇮🇪",
    quote: "The network I built at AccelIO is now my most valuable business asset. Two co-founder introductions, one critical hire, and my lead investor all came from that 3-day event.",
    metric: "3 Key Hires",
    metricSub: "From event connections",
    color: "#4F46E5",
    avatar: "JO",
    prev: "Solo founder",
    after: "Team of 8",
  },
  {
    name: "Nadia Hassan",
    company: "EduStack",
    role: "Founder",
    country: "🇸🇦",
    quote: "I came to AccelIO without a clear business model. The workshop on pricing and monetization was a revelation. 90 days later we had paying customers and $180K ARR. The event literally saved my company.",
    metric: "$180K ARR",
    metricSub: "90 days post-event",
    color: "#7C3AED",
    avatar: "NH",
    prev: "No revenue model",
    after: "$180K ARR · 90 days",
  },
];

export default function SuccessStories() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="stories"
      className="py-24 sm:py-32"
      style={{ background: "linear-gradient(180deg,#050816,#080b20,#050816)" }}
    >
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
            style={{
              background: "rgba(244,114,182,0.1)",
              border: "1px solid rgba(244,114,182,0.3)",
              color: "#f9a8d4",
            }}
          >
            Founder Stories
          </span>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 text-white"
            style={{ letterSpacing: "-0.02em" }}
          >
            What Happens After{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#F472B6,#7C3AED)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              3 Days.
            </span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
            Real founders. Real results. No cherry-picking — these are outcomes from our last cohort.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {stories.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 flex flex-col gap-4 transition-all duration-700"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: `${i * 80}ms`,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = `${s.color}40`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${s.color}10`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, j) => (
                  <span key={j} style={{ color: s.color }} className="text-sm">★</span>
                ))}
              </div>

              <p className="text-sm leading-relaxed flex-1" style={{ color: "rgba(255,255,255,0.7)" }}>
                &ldquo;{s.quote}&rdquo;
              </p>

              {/* Before → After */}
              <div
                className="flex items-center gap-2 p-3 rounded-xl text-xs"
                style={{ background: `${s.color}10`, border: `1px solid ${s.color}20` }}
              >
                <span style={{ color: "rgba(255,255,255,0.4)" }}>{s.prev}</span>
                <span style={{ color: s.color }} className="font-bold flex-shrink-0">→</span>
                <span style={{ color: s.color }} className="font-bold">{s.after}</span>
              </div>

              {/* Metric badge */}
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 w-fit"
                style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: s.color }}
                />
                <span className="text-xs font-bold" style={{ color: s.color }}>
                  {s.metric}
                </span>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                  · {s.metricSub}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center justify-between pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-xs flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}88)` }}
                  >
                    {s.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm leading-tight">{s.name}</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{s.role} · {s.company}</p>
                  </div>
                </div>
                <span className="text-base">{s.country}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Aggregate stats */}
        <div
          className="mt-14 rounded-2xl p-6 sm:p-8 grid grid-cols-2 sm:grid-cols-4 gap-6"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {[
            { n: "$28M+", l: "Total Funding Raised", c: "#4F46E5" },
            { n: "94%", l: "Would Attend Again", c: "#7C3AED" },
            { n: "3.2x", l: "Avg ARR Growth", c: "#22D3EE" },
            { n: "380+", l: "Investor Introductions", c: "#F472B6" },
          ].map((m, i) => (
            <div key={i} className="text-center">
              <p
                className="text-3xl sm:text-4xl font-black mb-1"
                style={{
                  background: `linear-gradient(135deg,${m.c},${m.c}88)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {m.n}
              </p>
              <p className="text-xs sm:text-sm font-medium" style={{ color: "rgba(255,255,255,0.45)" }}>{m.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
