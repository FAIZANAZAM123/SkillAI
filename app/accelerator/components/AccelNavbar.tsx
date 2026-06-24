"use client";
import { useState, useEffect } from "react";

const links = [
  { label: "Why Attend", href: "#why-attend" },
  { label: "Speakers", href: "#speakers" },
  { label: "Schedule", href: "#schedule" },
  { label: "Stories", href: "#stories" },
  { label: "FAQ", href: "#faq" },
];

export default function AccelNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(5,8,22,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">

        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#4F46E5,#7C3AED)", boxShadow: "0 0 20px #4F46E540" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L14 5.5V10.5L8 14L2 10.5V5.5L8 2Z" fill="white" fillOpacity="0.9" />
              <path d="M8 5L11 6.75V10.25L8 12L5 10.25V6.75L8 5Z" fill="#4F46E5" />
            </svg>
          </div>
          <span className="font-black text-white text-lg tracking-tight">
            Accel<span style={{ color: "#a5b4fc" }}>IO</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-white transition-all duration-200 hover:opacity-70"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/dashboard"
            className="text-sm font-medium text-white opacity-40 hover:opacity-70 transition-opacity"
          >
            Dashboard
          </a>
          <a
            href="#register"
            className="px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all duration-300"
            style={{ background: "linear-gradient(135deg,#4F46E5,#7C3AED)", boxShadow: "0 0 20px #4F46E540" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 35px #4F46E580"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px #4F46E540"; (e.currentTarget as HTMLElement).style.transform = ""; }}
          >
            Apply Now →
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-white"
          onClick={() => setOpen(!open)}
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span className={`h-0.5 bg-white block transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`h-0.5 bg-white block transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 bg-white block transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden px-4 pb-5"
          style={{ background: "rgba(5,8,22,0.97)", borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              className="block py-3 text-sm font-medium text-white border-b"
              style={{ borderColor: "rgba(255,255,255,0.05)" }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/dashboard"
            className="block py-3 text-sm font-medium text-white opacity-40"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </a>
          <a
            href="#register"
            className="mt-4 block text-center py-3.5 rounded-xl text-sm font-bold text-white"
            style={{ background: "linear-gradient(135deg,#4F46E5,#7C3AED)" }}
            onClick={() => setOpen(false)}
          >
            Apply Now →
          </a>
        </div>
      )}
    </nav>
  );
}
