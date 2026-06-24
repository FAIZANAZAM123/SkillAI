"use client";

import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    name: "Marcus T.",
    handle: "@marcust_trader",
    country: "🇺🇸 USA",
    text: "Before this challenge I was randomly entering trades based on YouTube videos. After Day 3, everything clicked. I finally understand WHY price moves. Went from -15R to +8R in my first month applying the framework.",
    result: "+8R in Month 1",
    rating: 5,
  },
  {
    name: "Aisha K.",
    handle: "@aisha_fx",
    country: "🇬🇧 UK",
    text: "I've done 4 other trading courses and none of them gave me a process. This challenge did. The structure is logical, the live sessions are invaluable, and for the first time I'm trading with actual confidence.",
    result: "Profitable Consistently",
    rating: 5,
  },
  {
    name: "Daniel O.",
    handle: "@dokonkwo_",
    country: "🇳🇬 Nigeria",
    text: "The liquidity module alone was worth 10x the investment. I can now read charts like I'm reading a story. The educator breaks down complex ICT concepts in a way that just makes sense.",
    result: "Left 9-5 Within 6mo",
    rating: 5,
  },
  {
    name: "Sofia M.",
    handle: "@sofia_trades",
    country: "🇩🇪 Germany",
    text: "Coming from a futures background, I thought I knew a lot. This framework restructured everything. My win rate went from 42% to 67% within 2 months of consistent application.",
    result: "67% Win Rate Now",
    rating: 5,
  },
  {
    name: "Rahul S.",
    handle: "@rahul_ict",
    country: "🇮🇳 India",
    text: "I was skeptical about another trading challenge. But the live execution on Day 5 changed my perspective entirely. He called every single setup before it happened. Pure process.",
    result: "3x Account in 90 Days",
    rating: 5,
  },
  {
    name: "James F.",
    handle: "@jamesfxpro",
    country: "🇦🇺 Australia",
    text: "The psychology module hit different. I realized I wasn't losing because of my analysis — I was losing because of my execution. The mental framework is as valuable as the technical one.",
    result: "Consistent 2-3R/Week",
    rating: 5,
  },
];

export default function TestimonialsSection() {
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
    <section className="py-20 sm:py-28 bg-[#050505]">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block glass px-4 py-1.5 rounded-full text-[#32FF32] text-sm font-medium mb-4">
            Student Results
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            What Happens When Traders{" "}
            <span className="gradient-text">Get A Process</span>
          </h2>
          <p className="text-[#ffffff] max-w-xl mx-auto">
            These aren&apos;t cherry-picked. These are the natural outcomes when you trade with a framework, not feelings.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`glass glass-hover rounded-2xl p-6 flex flex-col gap-4 transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <span key={s} className="text-[#32FF32] text-sm">★</span>
                ))}
              </div>

              <p className="text-[#ffffff] text-sm leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>

              <div className="inline-flex items-center gap-2 bg-[#32FF3215] border border-[#32FF3230] rounded-full px-3 py-1.5 w-fit">
                <span className="w-1.5 h-1.5 bg-[#32FF32] rounded-full" />
                <span className="text-[#32FF32] text-xs font-semibold">{t.result}</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#32FF3210]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#32FF32] to-[#00D26A] flex items-center justify-center text-black font-black text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-[#ffffff] text-xs">{t.handle}</p>
                  </div>
                </div>
                <span className="text-sm">{t.country}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="section-divider mt-20" />
    </section>
  );
}
