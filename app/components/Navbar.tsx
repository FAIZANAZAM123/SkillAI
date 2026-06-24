"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-[#32FF3220]" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#32FF32] to-[#00D26A] flex items-center justify-center">
              <span className="text-black font-black text-sm">ICT</span>
            </div>
            <span className="font-bold text-white text-lg tracking-tight">
              Pro<span className="gradient-text">Trader</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {["Challenge", "Curriculum", "Results", "FAQ"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[#ffffff] hover:text-[#32FF32] text-sm font-medium transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-[#32FF32] text-sm font-medium hover:text-[#00D26A] transition-colors"
            >
              Dashboard →
            </Link>
            <a
              href="#reserve"
              className="btn-primary px-5 py-2.5 rounded-full text-sm font-semibold"
            >
              Reserve Spot
            </a>
          </div>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`w-6 h-0.5 bg-white transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-6 h-0.5 bg-white transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`w-6 h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden glass border-t border-[#32FF3220] pb-4">
            {["Challenge", "Curriculum", "Results", "FAQ"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block px-4 py-3 text-[#ffffff] hover:text-[#32FF32] text-sm font-medium transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <div className="px-4 pt-2 flex flex-col gap-2">
              <Link href="/dashboard" className="text-[#32FF32] text-sm font-medium">
                Dashboard →
              </Link>
              <a
                href="#reserve"
                className="btn-primary px-5 py-2.5 rounded-full text-sm font-semibold text-center"
              >
                Reserve Your Spot
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
