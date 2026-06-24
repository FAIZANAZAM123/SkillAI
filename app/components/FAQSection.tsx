"use client";

import { useState, useRef, useEffect } from "react";

const faqs = [
  {
    q: "Who is this challenge for?",
    a: "This challenge is designed for beginner to intermediate traders who have some exposure to ICT concepts but struggle to apply them consistently. It's ideal for forex traders, futures traders, and retail traders looking to build a reliable process.",
  },
  {
    q: "Do I need prior trading experience?",
    a: "Basic familiarity with trading terminology helps, but it's not required. We start from foundational market structure and build systematically. Many students with zero experience have completed this and traded profitably.",
  },
  {
    q: "How long are the daily sessions?",
    a: "Each live session runs 2-3 hours. They're recorded so if you miss a session, you can catch up before the next day. We recommend attending live to ask questions during the Q&A.",
  },
  {
    q: "What markets does the framework apply to?",
    a: "The framework is market-agnostic. It works on Forex pairs, Equity Futures (ES, NQ), Crypto, and any liquid market. The concepts taught are rooted in how institutions operate, which applies across all markets.",
  },
  {
    q: "What happens after the 5 days?",
    a: "You get lifetime access to all recordings, a private community of challenge graduates, and monthly live review sessions. The challenge graduates regularly share trade ideas and setups with each other.",
  },
  {
    q: "Is there a money-back guarantee?",
    a: "Yes. If you attend all 5 days and genuinely don't feel the framework has given you a repeatable process, we offer a full refund within 7 days of challenge completion. We stand behind the results.",
  },
  {
    q: "How is this different from free ICT content?",
    a: "ICT's free library is enormous and unstructured. This challenge extracts the highest-probability concepts, sequences them logically, and shows you exactly how to apply them with a step-by-step execution model. Structure is the missing piece for most ICT traders.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`glass rounded-xl border transition-all duration-300 ${
        open ? "border-[#32FF3240]" : "border-[#32FF3210]"
      }`}
    >
      <button
        className="w-full flex items-center justify-between p-5 sm:p-6 text-left gap-4"
        onClick={() => setOpen(!open)}
      >
        <span className="text-white font-semibold text-sm sm:text-base flex items-start gap-3">
          <span className="text-[#32FF32] font-mono text-xs mt-1 flex-shrink-0">0{index + 1}</span>
          {q}
        </span>
        <span
          className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 font-bold text-lg ${
            open ? "bg-[#32FF32] text-black rotate-45" : "bg-[#32FF3215] text-[#32FF32]"
          }`}
        >
          +
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <p className="px-5 sm:px-6 pb-5 text-[#ffffff] text-sm leading-relaxed pl-10">{a}</p>
      </div>
    </div>
  );
}

export default function FAQSection() {
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
    <section id="faq" className="py-20 sm:py-28 bg-[#050505]">
      <div ref={ref} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block glass px-4 py-1.5 rounded-full text-[#32FF32] text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Everything You Need{" "}
            <span className="gradient-text">To Know</span>
          </h2>
        </div>

        <div
          className={`flex flex-col gap-3 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {faqs.map((faq, i) => (
            <FAQItem key={i} {...faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
