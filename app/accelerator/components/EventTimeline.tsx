"use client";
import { useState } from "react";

const days = [
  {
    day: "Day 1",
    date: "Sep 15",
    theme: "Build & Fundraise",
    color: "#4F46E5",
    events: [
      { time: "9:00 AM", title: "Opening Keynote", desc: "The State of Startups in 2026", type: "Keynote", speaker: "Sarah Chen" },
      { time: "10:30 AM", title: "Fundraising Workshop", desc: "How to build your investor pipeline and close faster", type: "Workshop", speaker: "Marcus Williams" },
      { time: "12:00 PM", title: "Founder Lunch", desc: "Curated networking lunch — seated by industry vertical", type: "Networking", speaker: "" },
      { time: "2:00 PM", title: "Investor Panel", desc: "What makes a fundable startup in 2026", type: "Panel", speaker: "a16z · Sequoia" },
      { time: "4:00 PM", title: "1:1 Mentorship Sessions", desc: "30-min matched sessions with your assigned mentor", type: "Mentorship", speaker: "All Mentors" },
      { time: "7:00 PM", title: "Opening Night Reception", desc: "Drinks & networking at the rooftop venue", type: "Networking", speaker: "" },
    ],
  },
  {
    day: "Day 2",
    date: "Sep 16",
    theme: "Grow & Scale",
    color: "#7C3AED",
    events: [
      { time: "9:00 AM", title: "Growth Keynote", desc: "Building compounding growth machines from Day 1", type: "Keynote", speaker: "Priya Patel" },
      { time: "10:30 AM", title: "AI for Founders", desc: "Practical AI integration — product, sales, ops", type: "Workshop", speaker: "Marcus Williams" },
      { time: "12:30 PM", title: "Investor Speed Dating", desc: "60-second pitches to 20 active investors", type: "Investor", speaker: "40 Investors" },
      { time: "2:30 PM", title: "Product-Market Fit", desc: "How to know when you have it — and when you don't", type: "Workshop", speaker: "David Park" },
      { time: "4:30 PM", title: "Startup Pitch Competition", desc: "12 selected startups pitch for $50K in funding", type: "Keynote", speaker: "All Judges" },
      { time: "7:00 PM", title: "Founders Dinner", desc: "Exclusive dinner for 60 curated founders", type: "Networking", speaker: "" },
    ],
  },
  {
    day: "Day 3",
    date: "Sep 17",
    theme: "Launch & Connect",
    color: "#22D3EE",
    events: [
      { time: "9:00 AM", title: "Closing Keynote", desc: "The 10 principles of enduring companies", type: "Keynote", speaker: "James Ko" },
      { time: "10:30 AM", title: "Hiring & Culture Workshop", desc: "Recruiting your first 10 employees without breaking culture", type: "Workshop", speaker: "Aisha Mbeki" },
      { time: "12:00 PM", title: "Community Lunch", desc: "Final lunch — swap contacts, make commitments", type: "Networking", speaker: "" },
      { time: "2:00 PM", title: "Masterclass: Design for Growth", desc: "Why product design is your #1 growth lever", type: "Workshop", speaker: "David Park" },
      { time: "4:00 PM", title: "Awards & Announcements", desc: "Pitch competition winners, cohort announcements", type: "Keynote", speaker: "All Speakers" },
      { time: "5:30 PM", title: "Closing Networking", desc: "Final connections before you ship home", type: "Networking", speaker: "" },
    ],
  },
];

const typeStyles: Record<string, { bg: string; color: string; label: string }> = {
  Keynote: { bg: "#4F46E515", color: "#a5b4fc", label: "Keynote" },
  Workshop: { bg: "#7C3AED15", color: "#c4b5fd", label: "Workshop" },
  Networking: { bg: "#22D3EE15", color: "#67e8f9", label: "Networking" },
  Panel: { bg: "#F472B615", color: "#f9a8d4", label: "Panel" },
  Investor: { bg: "#10b98115", color: "#6ee7b7", label: "Investor" },
  Mentorship: { bg: "#f59e0b15", color: "#fcd34d", label: "Mentorship" },
};

export default function EventTimeline() {
  const [activeDay, setActiveDay] = useState(0);
  const day = days[activeDay];

  return (
    <section
      id="schedule"
      className="py-24 sm:py-32"
      style={{ background: "#050816" }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
            style={{
              background: "rgba(34,211,238,0.1)",
              border: "1px solid rgba(34,211,238,0.3)",
              color: "#67e8f9",
            }}
          >
            Event Schedule
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black text-white mb-4"
            style={{ letterSpacing: "-0.02em" }}
          >
            Three Days.{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#22D3EE,#4F46E5)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Zero Filler.
            </span>
          </h2>
          <p className="text-lg" style={{ color: "rgba(255,255,255,0.5)" }}>
            Every session is purpose-built for founders at different stages.
          </p>
        </div>

        {/* Day selector */}
        <div className="flex gap-3 mb-10 overflow-x-auto pb-2">
          {days.map((d, i) => (
            <button
              key={i}
              onClick={() => setActiveDay(i)}
              className="flex-shrink-0 flex flex-col items-start px-5 py-4 rounded-2xl transition-all duration-300"
              style={{
                background: activeDay === i ? `${d.color}18` : "rgba(255,255,255,0.03)",
                border: activeDay === i ? `1px solid ${d.color}50` : "1px solid rgba(255,255,255,0.07)",
                boxShadow: activeDay === i ? `0 0 20px ${d.color}18` : "none",
                minWidth: "140px",
              }}
            >
              <span
                className="font-black text-sm"
                style={{ color: activeDay === i ? d.color : "rgba(255,255,255,0.4)" }}
              >
                {d.day}
              </span>
              <span
                className="font-bold text-base text-white mt-0.5"
              >
                {d.date}
              </span>
              <span
                className="text-xs mt-1"
                style={{ color: activeDay === i ? d.color : "rgba(255,255,255,0.3)" }}
              >
                {d.theme}
              </span>
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[72px] top-0 bottom-0 w-px"
            style={{ background: `linear-gradient(180deg, transparent, ${day.color}40, transparent)` }}
          />

          <div className="space-y-2">
            {day.events.map((ev, i) => {
              const style = typeStyles[ev.type] || typeStyles.Networking;
              return (
                <div
                  key={i}
                  className="flex gap-4 group"
                >
                  {/* Time */}
                  <div className="flex-shrink-0 w-16 pt-4 text-right">
                    <span
                      className="text-xs font-semibold tabular-nums"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      {ev.time}
                    </span>
                  </div>

                  {/* Dot */}
                  <div className="flex-shrink-0 flex flex-col items-center pt-4">
                    <div
                      className="w-3 h-3 rounded-full border-2 z-10 transition-all duration-300 group-hover:scale-125"
                      style={{
                        borderColor: day.color,
                        background: "#050816",
                        boxShadow: `0 0 8px ${day.color}60`,
                      }}
                    />
                  </div>

                  {/* Card */}
                  <div
                    className="flex-1 rounded-2xl p-4 mb-2 transition-all duration-300 group-hover:translate-x-1"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = `${day.color}35`;
                      (e.currentTarget as HTMLElement).style.background = `${day.color}08`;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h4 className="text-white font-bold text-sm">{ev.title}</h4>
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                            style={{ background: style.bg, color: style.color }}
                          >
                            {style.label}
                          </span>
                        </div>
                        <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                          {ev.desc}
                        </p>
                        {ev.speaker && (
                          <p className="text-xs mt-1.5 font-medium" style={{ color: day.color }}>
                            — {ev.speaker}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
