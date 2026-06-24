"use client";
import { useState } from "react";

const faqs = [
  { q: "Who should apply to AccelIO?", a: "AccelIO is designed for early-stage startup founders (pre-seed to Series A), entrepreneurs validating ideas, small business owners looking to scale, and growth marketers joining startup teams. If you're building something ambitious, this is for you." },
  { q: "Is it really free to attend?", a: "Yes. AccelIO is free to apply. We charge nothing for accepted founders. We're supported by our sponsor ecosystem and a small investor access fee for VCs who attend. Your seat, workshops, meals, and networking events are all included." },
  { q: "How selective is the application?", a: "We accept roughly 500 founders from 2,000+ applications. We look for ambition, coachability, and early traction signals — not revenue. First-time founders are very welcome. We value diversity of industry, geography, and background." },
  { q: "What stage do I need to be at?", a: "We accept founders from idea stage to Series A. The programming is designed to serve multiple stages simultaneously. Pre-product founders get ideation and validation workshops. Post-revenue founders get scale and fundraising sessions." },
  { q: "Will I actually meet investors?", a: "Yes — not just in passing. Day 2 features structured investor speed dating with 40+ active investors. You'll also get warm introductions from our team if we think there's a fit. Past attendees have closed rounds from investor meetings at the event." },
  { q: "What if I can't attend all 3 days?", a: "We recommend attending all 3 days to get full value. However, all keynotes and workshops are recorded and available to accepted founders within 1 week. Day 2 (investor day) requires live attendance for the 1:1 sessions." },
  { q: "Where is the event held?", a: "The 2026 event is at The Lux Conference Center, Midtown Manhattan, New York City. We recommend arriving September 14 for the pre-event networking dinner (optional, invite-only)." },
];

export default function AccelFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="py-24 sm:py-32"
      style={{ background: "#050816" }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
            style={{
              background: "rgba(79,70,229,0.1)",
              border: "1px solid rgba(79,70,229,0.3)",
              color: "#a5b4fc",
            }}
          >
            FAQ
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black text-white"
            style={{ letterSpacing: "-0.02em" }}
          >
            Common Questions
          </h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden transition-all duration-300"
              style={{
                background: open === i ? "rgba(79,70,229,0.06)" : "rgba(255,255,255,0.03)",
                border: open === i ? "1px solid rgba(79,70,229,0.3)" : "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <button
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left gap-4"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-white font-semibold text-sm sm:text-base flex items-start gap-3">
                  <span
                    className="font-mono text-xs mt-0.5 flex-shrink-0 font-bold"
                    style={{ color: "#4F46E5" }}
                  >
                    0{i + 1}
                  </span>
                  {faq.q}
                </span>
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg transition-all duration-300"
                  style={{
                    background: open === i ? "#4F46E5" : "rgba(79,70,229,0.15)",
                    color: open === i ? "#fff" : "#4F46E5",
                    transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  +
                </span>
              </button>
              <div
                style={{
                  maxHeight: open === i ? "200px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.35s ease",
                }}
              >
                <p
                  className="px-5 sm:px-6 pb-5 text-sm leading-relaxed pl-10"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
