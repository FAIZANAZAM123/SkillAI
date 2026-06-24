"use client";

export default function EventDetails() {
  return (
    <section
      id="event-details"
      className="py-20 sm:py-28"
      style={{ background: "#050816" }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
            style={{ background: "rgba(79,70,229,0.1)", border: "1px solid rgba(79,70,229,0.3)", color: "#a5b4fc" }}
          >
            Event Details
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black text-white"
            style={{ letterSpacing: "-0.02em" }}
          >
            Plan Your Visit
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: "📍",
              title: "Venue",
              lines: ["The Lux Conference Center", "230 Park Ave, Midtown", "New York City, NY 10169"],
              color: "#4F46E5",
            },
            {
              icon: "📅",
              title: "Dates & Time",
              lines: ["September 15–17, 2026", "Doors open at 8:30 AM", "Sessions 9 AM – 8 PM EDT"],
              color: "#7C3AED",
            },
            {
              icon: "🚇",
              title: "Getting There",
              lines: ["4/5/6 train to 42nd St", "Parking: Icon Parking", "230 E 42nd St (0.2 mi)"],
              color: "#22D3EE",
            },
            {
              icon: "🏨",
              title: "Accommodation",
              lines: ["Partner rate at The Grand Hyatt", "Code: ACCELIO2026", "Limited rooms available"],
              color: "#F472B6",
            },
          ].map((d, i) => (
            <div
              key={i}
              className="rounded-2xl p-5 transition-all duration-300 group"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = `${d.color}40`;
                (e.currentTarget as HTMLElement).style.background = `${d.color}08`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4"
                style={{ background: `${d.color}15`, border: `1px solid ${d.color}25` }}
              >
                {d.icon}
              </div>
              <h3 className="text-white font-bold mb-2">{d.title}</h3>
              {d.lines.map((l, j) => (
                <p key={j} className="text-sm" style={{ color: j === 0 ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.4)" }}>
                  {l}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
