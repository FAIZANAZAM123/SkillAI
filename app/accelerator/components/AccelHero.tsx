"use client";
import { useEffect, useRef, useState } from "react";

function useCountdown(target: Date) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return;
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}

const pad = (n: number) => String(n).padStart(2, "0");
const TARGET = new Date("2026-06-21T14:00:00-05:00");

export default function AccelHero() {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const countdown = useCountdown(TARGET);

  useEffect(() => {
    setMounted(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const orbs = [
      { x: 0.25, y: 0.3, r: 450, color: "#4F46E5", t: 0 },
      { x: 0.75, y: 0.5, r: 380, color: "#7C3AED", t: Math.PI / 2 },
      { x: 0.5, y: 0.75, r: 320, color: "#22D3EE", t: Math.PI },
    ];

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      orbs.forEach(orb => {
        orb.t += 0.004;
        const x = (orb.x + Math.sin(orb.t) * 0.14) * canvas.width;
        const y = (orb.y + Math.cos(orb.t * 0.7) * 0.09) * canvas.height;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, orb.r);
        grad.addColorStop(0, orb.color + "1a");
        grad.addColorStop(0.5, orb.color + "08");
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#050816" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(79,70,229,1) 1px,transparent 1px),linear-gradient(90deg,rgba(79,70,229,1) 1px,transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-20 w-full">

        {/* Top badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-3 text-sm font-bold uppercase tracking-widest transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ background: "rgba(79,70,229,0.12)", border: "1px solid rgba(79,70,229,0.35)", color: "#a5b4fc" }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#4F46E5" }} />
          Free Live Masterclass · Sunday June 21 · Save Your Seat
        </div>

        {/* Sub badge */}
        <p
          className={`text-sm font-medium mb-8 transition-all duration-700 delay-75 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          Free Live Training &nbsp;·&nbsp; No Cost
        </p>

        {/* Headline */}
        <h1
          className={`text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.05] mb-6 transition-all duration-700 delay-100 text-white ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          style={{ letterSpacing: "-0.03em" }}
        >
          How To Make Money{" "}
          <br className="hidden sm:block" />
          <span
            style={{
              background: "linear-gradient(135deg,#4F46E5 0%,#7C3AED 40%,#22D3EE 80%,#F472B6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            So Fast It Feels Haram
          </span>
        </h1>

        {/* Description */}
        <p
          className={`text-lg sm:text-xl max-w-2xl mx-auto mb-3 leading-relaxed text-white transition-all duration-700 delay-150 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          <span style={{ color: "#a5b4fc" }} className="font-semibold">100% halal.</span>{" "}
          No face, no audience, no products. Just email. The remote skill that took me from a{" "}
          <span className="font-bold">€11/hour waiter</span> to{" "}
          <span className="font-bold text-white">$10K/month</span>, and{" "}
          <span className="font-bold">2,000+ brothers</span> are now doing the same.
        </p>
        <p
          className="text-sm font-medium mb-10"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          Free to join &nbsp;·&nbsp; Live on Zoom &nbsp;·&nbsp; 90 min live
        </p>

        {/* Before / After */}
        <div
          className={`flex items-stretch justify-center gap-3 sm:gap-6 mb-10 transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          <div
            className="flex-1 max-w-[180px] px-5 py-5 rounded-2xl text-center"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>
              Before
            </p>
            <p className="text-3xl font-black text-white">€11<span className="text-lg">/hr</span></p>
            <p className="text-sm mt-1 text-white">Waiter, stuck</p>
          </div>

          <div className="flex flex-col items-center justify-center gap-1 px-2">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-black text-lg"
              style={{ background: "linear-gradient(135deg,#4F46E5,#7C3AED)", color: "#fff" }}
            >
              →
            </div>
            <span className="text-xs font-bold" style={{ color: "#a5b4fc" }}>3 Months</span>
          </div>

          <div
            className="flex-1 max-w-[180px] px-5 py-5 rounded-2xl text-center"
            style={{
              background: "rgba(79,70,229,0.12)",
              border: "1px solid rgba(79,70,229,0.4)",
              boxShadow: "0 0 30px rgba(79,70,229,0.15)",
            }}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#a5b4fc" }}>
              After
            </p>
            <p
              className="text-3xl font-black"
              style={{
                background: "linear-gradient(135deg,#4F46E5,#22D3EE)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              $10K<span className="text-lg">/mo</span>
            </p>
            <p className="text-sm mt-1 text-white">Free &amp; halal</p>
          </div>
        </div>

        {/* Countdown */}
        <p className="text-sm font-semibold mb-4 text-white">Starts in</p>
        <div
          className={`flex items-center justify-center gap-2 sm:gap-4 mb-8 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          {[
            { v: countdown.d, l: "days" },
            { v: countdown.h, l: "hrs" },
            { v: countdown.m, l: "min" },
            { v: countdown.s, l: "sec" },
          ].map(({ v, l }, i) => (
            <div key={i} className="text-center">
              <div
                className="rounded-2xl px-4 sm:px-6 py-3 sm:py-4 min-w-[60px] sm:min-w-[76px]"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(79,70,229,0.3)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <span
                  className="font-black text-2xl sm:text-4xl tabular-nums text-white"
                  style={{
                    background: "linear-gradient(135deg,#4F46E5,#22D3EE)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {pad(v)}
                </span>
              </div>
              <p className="text-xs mt-1 font-medium text-white">{l}</p>
            </div>
          ))}
        </div>

        {/* Registered count */}
        <div
          className={`flex items-center justify-center gap-2 mb-6 transition-all duration-700 delay-350 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          <div className="flex -space-x-2">
            {["#4F46E5", "#7C3AED", "#22D3EE", "#F472B6", "#4F46E5"].map((c, i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-white font-black text-xs"
                style={{ background: c, borderColor: "#050816" }}
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <p className="text-sm text-white">
            <span className="font-bold text-white">1,847 brothers</span> already registered
          </p>
        </div>

        {/* CTA */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-4 transition-all duration-700 delay-400 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          <a
            href="#register"
            className="px-8 py-4 rounded-full text-base font-black text-white min-w-[240px] text-center transition-all duration-300"
            style={{
              background: "linear-gradient(135deg,#4F46E5,#7C3AED)",
              boxShadow: "0 0 40px #4F46E550, 0 8px 32px #4F46E530",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 60px #4F46E580, 0 12px 40px #4F46E540"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px #4F46E550, 0 8px 32px #4F46E530"; }}
          >
            Yes, save my free seat →
          </a>
        </div>

        {/* Date line */}
        <p
          className={`text-sm mb-12 transition-all duration-700 delay-450 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Sunday June 21 &nbsp;·&nbsp; 2PM EST / 7PM BST &nbsp;·&nbsp; 90 min live
        </p>

        {/* Stats row */}
        <div
          className={`grid grid-cols-3 gap-px rounded-2xl overflow-hidden transition-all duration-700 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          style={{ border: "1px solid rgba(255,255,255,0.07)" }}
        >
          {[
            { value: "2,000+", label: "Helped", color1: "#4F46E5", color2: "#7C3AED" },
            { value: "92%", label: "Success", color1: "#7C3AED", color2: "#F472B6" },
            { value: "$10K+", label: "/mo Students", color1: "#22D3EE", color2: "#4F46E5" },
          ].map((s, i) => (
            <div
              key={i}
              className="py-7 px-4 text-center"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <p
                className="text-3xl sm:text-4xl font-black mb-1"
                style={{
                  background: `linear-gradient(135deg,${s.color1},${s.color2})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {s.value}
              </p>
              <p className="text-sm font-medium text-white">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Trust strip */}
        <div
          className={`flex flex-wrap items-center justify-center gap-5 sm:gap-10 mt-12 transition-all duration-700 delay-600 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          {[
            { icon: "★", text: "100% Free" },
            { icon: "💻", text: "Live On Zoom" },
            { icon: "⏱", text: "90 Min Live" },
            { icon: "🔒", text: "100% Halal" },
          ].map(item => (
            <span key={item.text} className="flex items-center gap-2 text-sm font-medium text-white">
              <span style={{ color: "#4F46E5" }}>{item.icon}</span>
              {item.text}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}
