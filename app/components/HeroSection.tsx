"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setMounted(true);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number; y: number; vx: number; vy: number; size: number; opacity: number;
    }[] = [];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(50, 255, 50, ${p.opacity})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(50, 255, 50, ${0.05 * (1 - dist / 120)})`;
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

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#32FF32] opacity-[0.03] rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[#00D26A] opacity-[0.04] rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#32FF32] opacity-[0.03] rounded-full blur-[80px]" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(50,255,50,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(50,255,50,0.5) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">
        <div
          className={`inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="w-2 h-2 bg-[#32FF32] rounded-full animate-pulse" />
          <span className="text-[#32FF32] text-sm font-medium">5-Day Live Challenge · Limited Seats Available</span>
          <span className="w-2 h-2 bg-[#32FF32] rounded-full animate-pulse" />
        </div>

        <h1
          className={`text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.1] mb-6 transition-all duration-700 delay-100 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Turn Everything You Know{" "}
          <br className="hidden sm:block" />
          About ICT Into{" "}
          <span className="gradient-text green-glow">A Process You Trust</span>
        </h1>

        <p
          className={`text-lg sm:text-xl text-[#ffffff] max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-200 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Built by a trader who spent{" "}
          <span className="text-white font-semibold">nine years mastering ICT</span>, left his 9-5, and now
          teaches the exact framework he uses every day in the markets.
        </p>

        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-700 delay-300 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <a
            href="#reserve"
            id="reserve"
            className="btn-primary px-8 py-4 rounded-full text-base font-bold glow-pulse min-w-[220px] text-center"
          >
            Reserve Your Spot →
          </a>
          <button className="btn-ghost px-8 py-4 rounded-full text-base font-semibold min-w-[180px] flex items-center justify-center gap-2">
            <span className="w-8 h-8 bg-[#32FF3220] rounded-full flex items-center justify-center text-sm">▶</span>
            Watch Preview
          </button>
        </div>

        <div
          className={`flex flex-wrap items-center justify-center gap-6 text-sm text-[#ffffff] transition-all duration-700 delay-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {[
            "No fluff, no theory — pure execution",
            "Live market sessions included",
            "1000+ traders transformed",
          ].map((text, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="text-[#32FF32]">✓</span> {text}
            </span>
          ))}
        </div>

        {/* Fake chart mockup */}
        <div
          className={`mt-16 max-w-4xl mx-auto glass rounded-2xl p-6 border border-[#32FF3215] transition-all duration-1000 delay-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="w-3 h-3 bg-yellow-500 rounded-full" />
              <span className="w-3 h-3 bg-[#32FF32] rounded-full" />
            </div>
            <span className="text-[#32FF32] text-xs font-mono">ES1! · 15M · LIVE SESSION</span>
            <span className="text-[#ffffff] text-xs">🔴 LIVE</span>
          </div>

          <div className="h-48 flex items-end justify-around gap-1 px-4">
            {[40, 55, 35, 65, 45, 75, 50, 80, 60, 90, 70, 85, 95, 80, 100, 88, 92, 75, 95, 88].map((h, i) => (
              <div key={i} className="flex flex-col items-center gap-0.5 flex-1">
                <div
                  className="w-full rounded-sm"
                  style={{
                    height: `${h}%`,
                    background:
                      i % 3 === 0
                        ? "linear-gradient(to bottom, #32FF32, #00D26A)"
                        : i % 3 === 1
                        ? "rgba(50,255,50,0.3)"
                        : "rgba(255,60,60,0.5)",
                  }}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#32FF3210]">
            <span className="text-[#32FF32] text-xs font-mono font-bold">+2.4R ✓ Execution: Perfect</span>
            <span className="text-[#ffffff] text-xs">Framework Applied Successfully ✓</span>
          </div>
        </div>
      </div>
    </section>
  );
}
