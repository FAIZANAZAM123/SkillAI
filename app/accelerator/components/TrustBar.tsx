"use client";
const partners = [
  { name: "Y Combinator", abbr: "YC" },
  { name: "Sequoia", abbr: "SEQ" },
  { name: "a16z", abbr: "A16Z" },
  { name: "TechCrunch", abbr: "TC" },
  { name: "Forbes", abbr: "FRBS" },
  { name: "AngelList", abbr: "AL" },
  { name: "Product Hunt", abbr: "PH" },
  { name: "Stripe", abbr: "STRP" },
  { name: "Notion", abbr: "NTN" },
  { name: "Linear", abbr: "LNR" },
];

export default function TrustBar() {
  return (
    <section
      className="py-14 overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.015)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p
          className="text-center text-xs font-semibold uppercase tracking-[0.18em] mb-10"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          Trusted & Featured By
        </p>

        {/* Scrolling logos */}
        <div className="relative">
          <div
            className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(90deg, #050816, transparent)",
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(-90deg, #050816, transparent)",
            }}
          />

          <div className="flex gap-8 overflow-hidden">
            <div
              className="flex gap-8 flex-shrink-0"
              style={{ animation: "scroll-x 22s linear infinite" }}
            >
              {[...partners, ...partners].map((p, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl cursor-default group transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(79,70,229,0.4)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(79,70,229,0.08)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                  }}
                >
                  <span
                    className="font-black text-xs px-2 py-1 rounded"
                    style={{ background: "linear-gradient(135deg,#4F46E5,#7C3AED)", color: "#fff" }}
                  >
                    {p.abbr}
                  </span>
                  <span className="font-semibold text-sm whitespace-nowrap" style={{ color: "rgba(255,255,255,0.6)" }}>
                    {p.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll-x {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </section>
  );
}
