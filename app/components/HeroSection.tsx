"use client";

import { useEffect, useRef, useState } from "react";

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) { setTimeLeft({ d: 0, h: 0, m: 0, s: 0 }); return; }
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

const pad = (n: number) => String(n).padStart(2, "0");

const CHALLENGE_DATE = new Date("2026-07-07T14:00:00-05:00");

// Realistic candle data: [open%, high%, low%, close%] relative to 100
const candles = [
  [30, 38, 25, 35], [35, 42, 32, 40], [40, 48, 36, 38], [38, 45, 30, 44],
  [44, 52, 41, 50], [50, 58, 45, 47], [47, 55, 43, 53], [53, 62, 50, 60],
  [60, 68, 55, 58], [58, 65, 52, 63], [63, 72, 60, 70], [70, 78, 65, 68],
  [68, 76, 63, 74], [74, 83, 70, 80], [80, 90, 76, 78], [78, 86, 72, 84],
  [84, 93, 80, 90], [90, 98, 85, 88], [88, 96, 83, 93], [93, 100, 88, 97],
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const countdown = useCountdown(CHALLENGE_DATE);

  useEffect(() => {
    setMounted(true);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(50,255,50,${p.opacity})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(50,255,50,${0.04 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", handleResize); };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[140px]" style={{ background: "rgba(50,255,50,0.04)" }} />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px]" style={{ background: "rgba(0,210,106,0.04)" }} />
      </div>

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: `linear-gradient(rgba(50,255,50,1) 1px,transparent 1px),linear-gradient(90deg,rgba(50,255,50,1) 1px,transparent 1px)`, backgroundSize: "80px 80px" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16 w-full">

        {/* Top badge */}
        <div className={`inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-3 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <span className="w-2 h-2 bg-[#32FF32] rounded-full animate-pulse" />
          <span className="text-[#32FF32] text-sm font-medium tracking-wide uppercase">5-Day Live Challenge · July 7 · Save Your Seat</span>
          <span className="w-2 h-2 bg-[#32FF32] rounded-full animate-pulse" />
        </div>

        {/* Sub-badge */}
        <p className={`text-white text-sm font-medium mb-6 transition-all duration-700 delay-50 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          Free Live Training &nbsp;·&nbsp; No Cost
        </p>

        {/* Headline */}
        <h1 className={`text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.08] mb-5 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          Turn Everything You Know
          <br className="hidden sm:block" /> About ICT Into{" "}
          <span className="gradient-text green-glow">A Process You Trust</span>
        </h1>

        {/* Subheadline */}
        <p className={`text-lg sm:text-xl text-white max-w-2xl mx-auto mb-8 leading-relaxed transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          Built by a trader who spent <span className="text-white font-semibold">nine years mastering ICT</span>, left his 9-5, and now teaches the exact framework he uses every single day.
        </p>

        {/* Before / After */}
        <div className={`flex items-center justify-center gap-3 sm:gap-6 mb-8 transition-all duration-700 delay-250 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="glass px-4 sm:px-6 py-3 rounded-xl text-center border border-[#ffffff10]">
            <p className="text-white text-xs uppercase tracking-wider mb-1">Before</p>
            <p className="text-white font-black text-base sm:text-lg">9-5 Prison</p>
            <p className="text-white text-xs mt-0.5">Random entries. No system.</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="text-[#32FF32] text-xl font-black">→</div>
            <span className="text-[#32FF32] text-xs font-semibold">5 Days</span>
          </div>
          <div className="glass px-4 sm:px-6 py-3 rounded-xl text-center border border-[#32FF3230]" style={{ background: "rgba(50,255,50,0.05)" }}>
            <p className="text-[#32FF32] text-xs uppercase tracking-wider mb-1">After</p>
            <p className="text-white font-black text-base sm:text-lg">Full Framework</p>
            <p className="text-[#32FF32] text-xs mt-0.5">Process. Confidence. Consistency.</p>
          </div>
        </div>

        {/* Registered count */}
        <div className={`flex items-center justify-center gap-2 mb-6 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="flex -space-x-2">
            {["#32FF32","#00D26A","#00B856","#009944","#007733"].map((c, i) => (
              <div key={i} className="w-7 h-7 rounded-full border-2 border-[#050505] flex items-center justify-center text-black text-xs font-black" style={{ background: c }}>
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <p className="text-white text-sm">
            <span className="text-white font-bold">1,000+</span> traders already registered
          </p>
        </div>

        {/* CTAs */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-3 transition-all duration-700 delay-350 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <a href="#reserve" className="btn-primary px-8 py-4 rounded-full text-base font-black glow-pulse min-w-[230px] text-center">
            Yes, Save My Free Spot →
          </a>
          <button className="btn-ghost px-8 py-4 rounded-full text-base font-semibold min-w-[180px] flex items-center justify-center gap-2">
            <span className="w-8 h-8 bg-[#32FF3220] rounded-full flex items-center justify-center text-sm">▶</span>
            Watch Preview
          </button>
        </div>

        {/* Date line */}
        <p className={`text-white text-sm mb-8 transition-all duration-700 delay-400 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          Challenge starts <span className="text-white font-semibold">July 7, 2026</span> · 9AM EST / 2PM BST · 5 live sessions
        </p>

        {/* Countdown */}
        <div className={`flex items-center justify-center gap-2 sm:gap-4 mb-10 transition-all duration-700 delay-450 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {[{ label: "Days", val: countdown.d }, { label: "Hours", val: countdown.h }, { label: "Mins", val: countdown.m }, { label: "Secs", val: countdown.s }].map(({ label, val }, i) => (
            <div key={i} className="text-center">
              <div className="glass rounded-xl px-3 sm:px-5 py-2 sm:py-3 border border-[#32FF3220] min-w-[56px] sm:min-w-[72px]">
                <span className="font-black text-2xl sm:text-4xl gradient-text tabular-nums">{pad(val)}</span>
              </div>
              <p className="text-white text-xs mt-1 uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </div>

        {/* Trust strip */}
        <div className={`flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-12 transition-all duration-700 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {[
            { icon: "★", text: "100% Free" },
            { icon: "💻", text: "Live On Zoom" },
            { icon: "⏱", text: "3h Sessions" },
            { icon: "🎥", text: "Recordings Included" },
          ].map((item) => (
            <span key={item.text} className="flex items-center gap-1.5 text-[#ffffff] text-sm">
              <span className="text-[#32FF32]">{item.icon}</span> {item.text}
            </span>
          ))}
        </div>

        {/* Stats row — mirrors reference site */}
        <div className={`flex flex-wrap items-center justify-center gap-6 sm:gap-12 mb-12 transition-all duration-700 delay-550 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {[
            { value: "1,000+", label: "Students Helped", sub: "Across 40+ countries" },
            { value: "87%", label: "Success Rate", sub: "Profitable post-challenge" },
            { value: "9+", label: "Years Mastering ICT", sub: "9-5 left. Framework proven." },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl sm:text-4xl font-black gradient-text green-glow">{s.value}</p>
              <p className="text-white font-bold text-sm mt-1">{s.label}</p>
              <p className="text-white text-xs">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Chart mockup */}
        <div className={`max-w-4xl mx-auto rounded-2xl p-5 border border-[#32FF3225] transition-all duration-1000 delay-600 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ background: "rgba(10,10,10,0.9)", backdropFilter: "blur(20px)" }}
        >
          {/* Chart header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-[#ff5f57] rounded-full" />
              <span className="w-3 h-3 bg-[#febc2e] rounded-full" />
              <span className="w-3 h-3 bg-[#28c840] rounded-full" />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#32FF32] text-xs font-mono font-semibold">NQ1! · 15M</span>
              <span className="text-white text-xs font-mono">ICT Framework Applied</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
              <span className="text-red-400 text-xs font-mono font-semibold">LIVE</span>
            </div>
          </div>

          {/* Price labels */}
          <div className="flex items-stretch gap-2">
            {/* Y-axis */}
            <div className="flex flex-col justify-between text-white text-xs font-mono pb-1 w-12 text-right pr-1">
              <span>21450</span>
              <span>21300</span>
              <span>21150</span>
              <span>21000</span>
            </div>

            {/* Candles */}
            <div className="flex-1 relative">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                {[0,1,2,3].map(i => <div key={i} className="w-full border-t border-[#32FF3208]" />)}
              </div>

              <div className="h-44 flex items-end justify-around gap-[3px] px-1 relative">
                {candles.map(([open, high, low, close], i) => {
                  const isBull = close >= open;
                  const bodyBottom = Math.min(open, close);
                  const bodyHeight = Math.abs(close - open) || 1;
                  const wickBottom = low;
                  const wickHeight = high - low;
                  return (
                    <div key={i} className="flex-1 relative flex justify-center" style={{ height: "100%" }}>
                      {/* Wick */}
                      <div
                        className="absolute w-px"
                        style={{
                          bottom: `${wickBottom}%`,
                          height: `${wickHeight}%`,
                          background: isBull ? "#32FF32" : "#ff4d4d",
                          opacity: 0.7,
                          left: "50%",
                          transform: "translateX(-50%)",
                        }}
                      />
                      {/* Body */}
                      <div
                        className="absolute rounded-[1px]"
                        style={{
                          bottom: `${bodyBottom}%`,
                          height: `${Math.max(bodyHeight, 1.5)}%`,
                          left: "10%",
                          right: "10%",
                          background: isBull
                            ? "linear-gradient(to top, #00D26A, #32FF32)"
                            : "linear-gradient(to top, #cc2200, #ff4d4d)",
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Annotations */}
              <div className="absolute top-2 left-3 flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <div className="w-8 h-px bg-[#32FF32] opacity-60" style={{ borderTop: "1px dashed #32FF32" }} />
                  <span className="text-[#32FF32] text-[10px] font-mono">OB · 21,318</span>
                </div>
              </div>
              <div className="absolute top-12 right-3">
                <span className="text-[#32FF3280] text-[10px] font-mono">FVG filled ✓</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#32FF3215]">
            <div className="flex items-center gap-3">
              <span className="text-[#32FF32] text-xs font-mono font-bold">+2.4R ✓</span>
              <span className="text-white text-xs font-mono">Risk: 0.5% · Target: 1.2%</span>
            </div>
            <span className="text-[#32FF32] text-xs font-mono">Framework Applied ✓</span>
          </div>
        </div>

      </div>
    </section>
  );
}
