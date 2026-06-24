"use client";

import { useState, useEffect, useRef } from "react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";
import Link from "next/link";

// ── REAL DATA (sheet.xlsx → event2_leads_enriched, 5,257 rows) ──────────────

const leadsByDate = [
  { date: "May 10", leads: 230, cum: 230 },
  { date: "May 11", leads: 557, cum: 787 },
  { date: "May 12", leads: 395, cum: 1182 },
  { date: "May 13", leads: 417, cum: 1599 },
  { date: "May 14", leads: 492, cum: 2091 },
  { date: "May 15", leads: 1030, cum: 3121 },
  { date: "May 16", leads: 979, cum: 4100 },
  { date: "May 17", leads: 409, cum: 4509 },
  { date: "May 19", leads: 92, cum: 4601 },
  { date: "May 20", leads: 216, cum: 4817 },
  { date: "May 21", leads: 182, cum: 4999 },
  { date: "May 22", leads: 233, cum: 5232 },
  { date: "May 24", leads: 25, cum: 5257 },
];

const utmSources = [
  { source: "Instagram", leads: 3156, pct: 60 },
  { source: "Facebook", leads: 1229, pct: 23 },
  { source: "Organic", leads: 454, pct: 9 },
  { source: "Email", leads: 411, pct: 8 },
];

const topCampaigns = [
  { name: "Dumbest Thing", leads: 474 },
  { name: "Webinar", leads: 472 },
  { name: "General Broadcast", leads: 395 },
  { name: "Bio", leads: 260 },
  { name: "Bird Ad v1", leads: 177 },
  { name: "Twitter Format", leads: 175 },
  { name: "Email Abu Lahya IT", leads: 154 },
  { name: "Strizzys & Kettles", leads: 138 },
];

const funnelSteps = [
  { name: "Total Leads", value: 5257, pct: 100, color: "#32FF32" },
  { name: "Lead Scored", value: 3680, pct: 70, color: "#00D26A" },
  { name: "Entered CRM", value: 868, pct: 16.5, color: "#00B856" },
  { name: "Booked Call", value: 392, pct: 7.5, color: "#009944" },
  { name: "Closed Won", value: 66, pct: 1.26, color: "#007733" },
];

const gradeData = [
  { name: "A", value: 5, color: "#32FF32" },
  { name: "B", value: 1708, color: "#00D26A" },
  { name: "C", value: 1872, color: "#00A855" },
  { name: "D", value: 1672, color: "#004422" },
];

const ageData = [
  { age: "<25", count: 1524 },
  { age: "25-29", count: 906 },
  { age: "30-34", count: 240 },
  { age: "35-39", count: 55 },
  { age: "40+", count: 75 },
];

const profData = [
  { name: "Student", value: 935 },
  { name: "Tech/IT", value: 526 },
  { name: "Retail/Hosp", value: 506 },
  { name: "Not Working", value: 410 },
  { name: "Delivery", value: 313 },
  { name: "Corporate", value: 313 },
  { name: "Trades", value: 260 },
  { name: "Self-Empl.", value: 228 },
];

const incomeData = [
  { income: "Under $2K", count: 1707 },
  { income: "$2K–$3.5K", count: 644 },
  { income: "$3.5K–$5K", count: 251 },
  { income: "$5K–$7K", count: 116 },
  { income: "$7K–$10K", count: 38 },
  { income: "Over $10K", count: 25 },
];

const placementData = [
  { name: "IG Reels", value: 1556, color: "#32FF32" },
  { name: "IG Feed", value: 728, color: "#00D26A" },
  { name: "IG Stories", value: 479, color: "#00B856" },
  { name: "FB Reels", value: 603, color: "#009944" },
  { name: "FB Feed", value: 539, color: "#007733" },
  { name: "Direct", value: 1011, color: "#004422" },
  { name: "Social", value: 231, color: "#003311" },
];

const crmStages = [
  { stage: "Booked Appt", count: 368 },
  { stage: "Lost / DQ", count: 211 },
  { stage: "Follow Up", count: 112 },
  { stage: "No-Shows", count: 48 },
  { stage: "Closed", count: 61 },
  { stage: "Nurture", count: 37 },
  { stage: "Call Backs", count: 11 },
  { stage: "Registered", count: 8 },
  { stage: "Reached Out", count: 2 },
  { stage: "Upsell", count: 1 },
];

const leadStatusTop = [
  { s: "Triaged - Financial", n: 212 },
  { s: "Potential", n: 117 },
  { s: "Unconfirmed", n: 116 },
  { s: "DQ'd by Closer", n: 91 },
  { s: "Triaged - Other", n: 57 },
  { s: "Logistical Object.", n: 42 },
  { s: "No Show", n: 33 },
  { s: "Webinar Registrant", n: 29 },
  { s: "Think About It", n: 29 },
  { s: "Cancelled", n: 27 },
];

const followingData = [
  { d: "Never heard", n: 763 },
  { d: "< 1 month", n: 727 },
  { d: "1–3 months", n: 519 },
  { d: "3–6 months", n: 347 },
  { d: "6–12 months", n: 216 },
  { d: "Over 1 year", n: 170 },
];

// ── HELPERS ──────────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 1800, trigger = true) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
      else setVal(target);
    };
    requestAnimationFrame(step);
  }, [target, duration, trigger]);
  return val;
}

const TT = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color?: string }>; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl px-3 py-2 text-xs border border-[#32FF3220] shadow-xl" style={{ background: "#0d0d0d" }}>
      {label && <p className="text-[#ffffff] mb-1.5 font-semibold">{label}</p>}
      {payload.map((p, i) => (
        <p key={i} className="font-bold" style={{ color: p.color || "#32FF32" }}>
          {p.name}: <span className="text-white">{Number(p.value).toLocaleString()}</span>
        </p>
      ))}
    </div>
  );
};

// ── KPI CARD ─────────────────────────────────────────────────────────────────

interface KpiProps {
  label: string; value: number; fmt?: string; prefix?: string;
  suffix?: string; change: string; up: boolean; icon: string;
  spark?: number[]; color?: string;
}

function KpiCard({ label, value, fmt, prefix = "", suffix = "", change, up, icon, spark, color = "#32FF32" }: KpiProps) {
  const [vis, setVis] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const count = useCountUp(value, 1600, vis);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const display = fmt === "currency"
    ? `${prefix}${count >= 1000 ? (count / 1000).toFixed(1) + "K" : count}${suffix}`
    : `${prefix}${count.toLocaleString()}${suffix}`;

  return (
    <div ref={ref} className="group relative rounded-2xl p-5 border border-[#1a1a1a] hover:border-[#32FF3230] transition-all duration-300 overflow-hidden cursor-default"
      style={{ background: "linear-gradient(145deg,#0d0d0d,#0a0a0a)" }}>
      {/* Glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(circle at 30% 30%, ${color}08, transparent 70%)` }} />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
            style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
            {icon}
          </div>
          <span className={`text-xs font-semibold flex items-center gap-1 px-2 py-1 rounded-full ${up ? "text-[#32FF32] bg-[#32FF3212]" : "text-red-400 bg-red-400/10"}`}>
            {up ? "↑" : "↓"} {change}
          </span>
        </div>

        <p className="text-white text-xs font-medium uppercase tracking-wider mb-1">{label}</p>
        <p className="text-3xl font-black text-white mb-3 tabular-nums">{display}</p>

        {/* Sparkline */}
        {spark && (
          <div className="h-10 -mx-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={spark.map((v, i) => ({ i, v }))}>
                <defs>
                  <linearGradient id={`sg-${label.replace(/\s/g,"")}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} fill={`url(#sg-${label.replace(/\s/g,"")})`} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

// ── CHART CARD ────────────────────────────────────────────────────────────────

function ChartCard({ title, subtitle, badge, children, className = "" }: {
  title: string; subtitle?: string; badge?: string; children: React.ReactNode; className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-[#1a1a1a] p-5 ${className}`}
      style={{ background: "linear-gradient(145deg,#0d0d0d,#0a0a0a)" }}>
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-white font-bold text-sm">{title}</h3>
          {subtitle && <p className="text-white text-xs mt-0.5">{subtitle}</p>}
        </div>
        {badge && (
          <span className="text-[10px] font-bold px-2 py-1 rounded-full border text-[#32FF32] border-[#32FF3230] bg-[#32FF3210] flex-shrink-0">
            {badge}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

// ── NAV ITEMS ──────────────────────────────────────────────────────────────────

const navItems = [
  { icon: "◈", label: "Overview", id: "section-overview" },
  { icon: "⟁", label: "Leads", id: "section-leads" },
  { icon: "◎", label: "Funnel", id: "section-funnel" },
  { icon: "⬡", label: "Audience", id: "section-audience" },
  { icon: "◉", label: "Revenue", id: "section-revenue" },
];

// ── PAGE ───────────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("section-overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const leadSparkline = [230, 557, 395, 417, 492, 1030, 979, 409, 92, 216, 182, 233, 25];
  const crmSparkline = [12, 28, 45, 78, 110, 198, 310, 420, 580, 680, 750, 820, 868];

  return (
    <div className="flex min-h-screen items-start" style={{ background: "#060606", color: "#fff", fontFamily: "var(--font-geist-sans)" }}>

      {/* ── SIDEBAR ─────────────────────────────────────────────────────────── */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col border-r border-[#141414] transition-all duration-300
          ${sidebarOpen ? "w-56" : "w-16"} lg:w-56 lg:sticky lg:top-0 lg:h-screen lg:z-auto`}
        style={{ background: "#080808" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-[#141414]">
          <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center font-black text-black text-sm"
            style={{ background: "linear-gradient(135deg,#32FF32,#00D26A)" }}>
            ICT
          </div>
          <div className={`overflow-hidden transition-all duration-300 ${sidebarOpen ? "opacity-100 w-auto" : "opacity-0 w-0 lg:opacity-100 lg:w-auto"}`}>
            <p className="text-white font-black text-sm leading-none">ProTrader</p>
            <p className="text-[#32FF32] text-[10px] font-semibold mt-0.5">Analytics</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-1 px-2 overflow-hidden">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveNav(item.id);
                setSidebarOpen(false);
                const el = document.getElementById(item.id);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                ${activeNav === item.id
                  ? "bg-[#32FF3215] text-[#32FF32] border border-[#32FF3225]"
                  : "text-white hover:text-white hover:bg-[#ffffff08]"
                }`}
            >
              <span className="text-base flex-shrink-0 w-5 text-center">{item.icon}</span>
              <span className={`overflow-hidden transition-all duration-300 ${sidebarOpen ? "opacity-100 w-auto" : "opacity-0 w-0 lg:opacity-100 lg:w-auto"} whitespace-nowrap`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-[#141414]">
          <Link href="/"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-white hover:text-white hover:bg-[#ffffff08] text-sm font-medium transition-all`}>
            <span className="flex-shrink-0 w-5 text-center text-base">←</span>
            <span className={`overflow-hidden transition-all duration-300 ${sidebarOpen ? "opacity-100 w-auto" : "opacity-0 w-0 lg:opacity-100 lg:w-auto"} whitespace-nowrap`}>
              Landing Page
            </span>
          </Link>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* ── MAIN ────────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0 min-h-screen">

        {/* Top bar */}
        <header className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[#141414] sticky top-0 z-20" style={{ background: "#060606" }}>
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2 rounded-lg hover:bg-[#141414] text-[#ffffff]" onClick={() => setSidebarOpen(!sidebarOpen)}>
              ☰
            </button>
            <div>
              <h1 className="text-white font-bold text-base leading-none">Campaign Analytics</h1>
              <p className="text-white text-xs mt-0.5">event2_leads_enriched · May 10–24, 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#32FF3225] bg-[#32FF3210]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#32FF32] animate-pulse" />
              <span className="text-[#32FF32] text-xs font-bold hidden sm:block">5,257 leads</span>
            </div>

            {/* Date chip */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111] border border-[#1e1e1e] text-white text-xs">
              📅 May 2026
            </div>

            {/* Avatar */}
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-black text-xs font-black flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#32FF32,#00D26A)" }}>
              AL
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto px-4 sm:px-6 py-6 space-y-6">

          {/* ── KPI GRID ──────────────────────────────────────────────────── */}
          <div id="section-overview" className="scroll-mt-20 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
            <KpiCard label="Total Leads" value={5257} change="Campaign total" up={true} icon="👥"
              spark={leadSparkline} color="#32FF32" />
            <KpiCard label="Lead Scored" value={3680} suffix="" change="70% of leads" up={true} icon="⭐"
              spark={[200,450,800,1200,1800,2400,2900,3200,3400,3550,3620,3660,3680]} color="#00D26A" />
            <KpiCard label="Entered CRM" value={868} change="16.5% entry rate" up={true} icon="📋"
              spark={crmSparkline} color="#00B856" />
            <KpiCard label="Booked Calls" value={392} change="45.2% of CRM" up={true} icon="📞"
              spark={[20,45,80,120,180,240,290,330,355,370,380,388,392]} color="#00A855" />
            <KpiCard label="Closed Won" value={66} change="16.8% close rate" up={true} icon="🏆"
              spark={[2,5,9,15,22,32,40,48,54,58,62,64,66]} color="#009944" />
            <KpiCard label="Revenue" value={225} prefix="$" suffix="K" fmt="currency" change="$225,016 total" up={true} icon="💰"
              spark={[5,12,25,42,65,95,120,148,168,185,200,212,225]} color="#007733" />
          </div>

          {/* ── CONVERSION RATES ──────────────────────────────────────────── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Lead → CRM", value: "16.5%", sub: "868 of 5,257", color: "#32FF32" },
              { label: "CRM → Call", value: "45.2%", sub: "392 of 868", color: "#00D26A" },
              { label: "Call → Close", value: "16.8%", sub: "66 of 392", color: "#00B856" },
              { label: "Overall CVR", value: "1.26%", sub: "$3,409 avg deal", color: "#009944" },
            ].map((m) => (
              <div key={m.label} className="rounded-2xl border border-[#1a1a1a] p-4 flex items-center gap-4 group hover:border-[#32FF3225] transition-colors"
                style={{ background: "linear-gradient(145deg,#0d0d0d,#0a0a0a)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${m.color}18`, border: `1px solid ${m.color}30` }}>
                  <span className="font-black text-xs" style={{ color: m.color }}>%</span>
                </div>
                <div>
                  <p className="text-white text-xs uppercase tracking-wider">{m.label}</p>
                  <p className="text-white font-black text-xl">{m.value}</p>
                  <p className="text-white text-xs">{m.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── ROW 1: Lead Trend + Funnel ─────────────────────────────────── */}
          <div id="section-leads" className="scroll-mt-20 grid xl:grid-cols-[1.4fr_1fr] gap-4">

            {/* Daily leads area chart */}
            <ChartCard title="Daily Lead Capture" subtitle="Leads per day across campaign window" badge="Peak: 1,030 · May 15">
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={leadsByDate} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#32FF32" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#32FF32" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#161616" vertical={false} />
                  <XAxis dataKey="date" tick={{ fill: "#ffffff", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#ffffff", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<TT />} />
                  <Area type="monotone" dataKey="leads" stroke="#32FF32" strokeWidth={2} fill="url(#areaGrad)" name="Leads" dot={false} activeDot={{ r: 4, fill: "#32FF32", stroke: "#050505", strokeWidth: 2 }} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Conversion Funnel */}
            <ChartCard title="Sales Funnel" subtitle="Lead → Revenue pipeline" badge="1.26% overall CVR">
              <div className="space-y-2.5">
                {funnelSteps.map((s, i) => (
                  <div key={i} className="group">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
                        <span className="text-white text-xs font-medium">{s.name}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-white font-black text-sm tabular-nums">{s.value.toLocaleString()}</span>
                        <span className="text-xs font-bold w-11 text-right tabular-nums" style={{ color: s.color }}>{s.pct}%</span>
                      </div>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: "#141414" }}>
                      <div className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${s.pct}%`, background: `linear-gradient(90deg,${s.color},${s.color}88)` }} />
                    </div>
                    {i < funnelSteps.length - 1 && (
                      <p className="text-white text-[10px] mt-0.5 text-right">
                        ↓ {((funnelSteps[i + 1].value / s.value) * 100).toFixed(1)}% proceed
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </ChartCard>
          </div>

          {/* ── ROW 2: UTM Sources + Lead Grades + Placements ─────────────── */}
          <div id="section-funnel" className="scroll-mt-20 grid md:grid-cols-3 gap-4">

            {/* UTM Sources */}
            <ChartCard title="Traffic Sources" subtitle="By UTM source" badge="Instagram #1">
              <div className="space-y-3">
                {utmSources.map((s, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span className="text-[#ffffff] text-xs font-medium">{s.source}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white text-xs font-bold">{s.leads.toLocaleString()}</span>
                        <span className="text-[#32FF32] text-xs font-semibold">{s.pct}%</span>
                      </div>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: "#141414" }}>
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${s.pct}%`, background: `linear-gradient(90deg,rgba(50,255,50,${1 - i * 0.2}),rgba(0,210,106,${1 - i * 0.2}))` }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Mini donut placeholder */}
              <div className="mt-4">
                <ResponsiveContainer width="100%" height={120}>
                  <PieChart>
                    <Pie data={utmSources} cx="50%" cy="50%" innerRadius={38} outerRadius={56} paddingAngle={3} dataKey="leads" startAngle={90} endAngle={-270}>
                      {utmSources.map((_, i) => (
                        <Cell key={i} fill={`rgba(50,255,50,${1 - i * 0.22})`} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => [Number(v).toLocaleString(), "Leads"]}
                      contentStyle={{ background: "#0d0d0d", border: "1px solid #32FF3220", borderRadius: 8, color: "#fff", fontSize: 11 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>

            {/* Lead Grades */}
            <ChartCard title="Lead Grades" subtitle="AI-scored quality distribution">
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={gradeData} cx="50%" cy="50%" innerRadius={48} outerRadius={70} paddingAngle={4} dataKey="value">
                    {gradeData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip formatter={(v) => [Number(v).toLocaleString(), "Leads"]}
                    contentStyle={{ background: "#0d0d0d", border: "1px solid #32FF3220", borderRadius: 8, color: "#fff", fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {gradeData.map((d) => (
                  <div key={d.name} className="flex items-center gap-2 rounded-lg px-2.5 py-2 border border-[#161616]" style={{ background: "#0d0d0d" }}>
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                    <span className="text-white text-xs">Grade {d.name}</span>
                    <span className="text-white font-bold text-xs ml-auto">{d.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </ChartCard>

            {/* Ad Placements */}
            <ChartCard title="Ad Placements" subtitle="Where leads came from" badge="IG Reels = 30%">
              <div className="space-y-2">
                {placementData.map((p, i) => {
                  const total = placementData.reduce((a, b) => a + b.value, 0);
                  const pct = ((p.value / total) * 100).toFixed(1);
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-white text-[10px] w-16 truncate flex-shrink-0">{p.name}</span>
                      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "#141414" }}>
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: p.color }} />
                      </div>
                      <span className="text-white text-[10px] font-bold w-8 text-right flex-shrink-0">{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </ChartCard>
          </div>

          {/* ── ROW 3: Top Campaigns + Age + Income ───────────────────────── */}
          <div id="section-audience" className="scroll-mt-20 grid xl:grid-cols-[1.2fr_0.9fr_0.9fr] gap-4">

            {/* Top Campaigns */}
            <ChartCard title="Top Campaigns" subtitle="By lead volume" badge="474 from top ad">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={topCampaigns} layout="vertical" margin={{ left: 0, right: 10, top: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#161616" horizontal={false} />
                  <XAxis type="number" tick={{ fill: "#ffffff", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" tick={{ fill: "#ffffff", fontSize: 10 }} width={110} axisLine={false} tickLine={false} />
                  <Tooltip content={<TT />} />
                  <Bar dataKey="leads" radius={[0, 4, 4, 0]} name="Leads" maxBarSize={18}>
                    {topCampaigns.map((_, i) => (
                      <Cell key={i} fill={`rgba(50,255,50,${1 - i * 0.1})`} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Age Distribution */}
            <ChartCard title="Age Groups" subtitle="Q1 survey (2,800 answered)" badge="54% under 25">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={ageData} margin={{ left: -20, right: 5, top: 5, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#161616" vertical={false} />
                  <XAxis dataKey="age" tick={{ fill: "#ffffff", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#ffffff", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<TT />} />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]} name="Leads" maxBarSize={32}>
                    {ageData.map((_, i) => (
                      <Cell key={i} fill={`rgba(50,255,50,${1 - i * 0.18})`} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Income */}
            <ChartCard title="Income Brackets" subtitle="Q4 survey responses" badge="81% under $3.5K">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={incomeData} margin={{ left: -20, right: 5, top: 5, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#161616" vertical={false} />
                  <XAxis dataKey="income" tick={{ fill: "#ffffff", fontSize: 9 }} axisLine={false} tickLine={false} angle={-20} textAnchor="end" height={40} />
                  <YAxis tick={{ fill: "#ffffff", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<TT />} />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]} name="Leads" maxBarSize={28}>
                    {incomeData.map((_, i) => (
                      <Cell key={i} fill={`rgba(0,210,106,${1 - i * 0.15})`} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* ── ROW 4: Professions + CRM Stages ──────────────────────────── */}
          <div className="grid xl:grid-cols-2 gap-4">

            {/* Professions */}
            <ChartCard title="Audience Professions" subtitle="Q3 survey — 3,662 responses" badge="Students dominate">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={profData} layout="vertical" margin={{ left: 0, right: 10, top: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#161616" horizontal={false} />
                  <XAxis type="number" tick={{ fill: "#ffffff", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" tick={{ fill: "#ffffff", fontSize: 10 }} width={88} axisLine={false} tickLine={false} />
                  <Tooltip content={<TT />} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} name="Leads" maxBarSize={16}>
                    {profData.map((_, i) => (
                      <Cell key={i} fill={`rgba(50,255,50,${1 - i * 0.1})`} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* CRM Stages */}
            <ChartCard title="CRM Opportunity Stages" subtitle="Close CRM pipeline — 868 leads" badge="368 booked">
              <div className="grid grid-cols-2 gap-2">
                {crmStages.map((s, i) => {
                  const pct = ((s.count / 868) * 100).toFixed(0);
                  const colors = ["#32FF32","#00D26A","#ff4d4d","#00B856","#32FF32","#009944","#00D26A","#32FF32","#ffffff","#32FF32"];
                  return (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-[#161616] group hover:border-[#32FF3220] transition-colors"
                      style={{ background: "#0d0d0d" }}>
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: colors[i] }} />
                        <span className="text-white text-xs truncate">{s.stage}</span>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                        <span className="text-white font-black text-sm">{s.count}</span>
                        <span className="text-white text-[10px]">({pct}%)</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ChartCard>
          </div>

          {/* ── ROW 5: Following Duration + Lead Status + Revenue ─────────── */}
          <div id="section-revenue" className="scroll-mt-20 grid md:grid-cols-3 gap-4">

            {/* Following Duration */}
            <ChartCard title="Audience Awareness" subtitle="How long following Abu Lahya">
              <div className="space-y-2.5 mt-1">
                {followingData.map((f, i) => {
                  const max = 763;
                  const pct = ((f.n / max) * 100).toFixed(0);
                  return (
                    <div key={i}>
                      <div className="flex justify-between mb-1">
                        <span className="text-white text-xs">{f.d}</span>
                        <span className="text-white text-xs font-bold">{f.n}</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#141414" }}>
                        <div className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${pct}%`, background: `linear-gradient(90deg,rgba(50,255,50,${0.4 + i * 0.1}),rgba(0,210,106,${0.4 + i * 0.1}))` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </ChartCard>

            {/* Lead Status */}
            <ChartCard title="Lead Status Tags" subtitle="CRM classification of 868 leads">
              <div className="space-y-1.5">
                {leadStatusTop.map((ls, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5 border-b border-[#111] last:border-0">
                    <span className="text-white text-xs flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#32FF32] flex-shrink-0" />
                      {ls.s}
                    </span>
                    <span className="text-white font-bold text-xs">{ls.n}</span>
                  </div>
                ))}
              </div>
            </ChartCard>

            {/* Revenue breakdown */}
            <ChartCard title="Revenue Breakdown" subtitle="$225,016 from 66 closed deals">
              <div className="space-y-3">
                {[
                  { label: "Course Only ($4K)", count: 46, rev: "$184,000", color: "#32FF32" },
                  { label: "Full Program ($7K)", count: 35, rev: "$245,000", color: "#00D26A" },
                ].map((p) => (
                  <div key={p.label} className="p-3 rounded-xl border border-[#1a1a1a]" style={{ background: "#0d0d0d" }}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white text-sm font-semibold">{p.label}</p>
                        <p className="text-white text-xs mt-0.5">{p.count} buyers</p>
                      </div>
                      <p className="font-black text-sm" style={{ color: p.color }}>{p.rev}</p>
                    </div>
                  </div>
                ))}

                <div className="h-px bg-[#1a1a1a] my-1" />

                {/* Payment types */}
                <p className="text-white text-xs font-semibold uppercase tracking-wider">Payment Types</p>
                {[
                  { type: "Payment Plan", count: 45, pct: 73 },
                  { type: "PIF (Full)", count: 21, pct: 27 },
                  { type: "Deposit", count: 13, pct: 17 },
                ].map((pt) => (
                  <div key={pt.type} className="flex items-center gap-2">
                    <span className="text-white text-xs flex-1">{pt.type}</span>
                    <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ background: "#141414" }}>
                      <div className="h-full rounded-full bg-[#32FF32]" style={{ width: `${pt.pct}%` }} />
                    </div>
                    <span className="text-white font-bold text-xs w-5 text-right">{pt.count}</span>
                  </div>
                ))}

                <div className="h-px bg-[#1a1a1a] my-1" />

                <div className="flex justify-between items-center py-1 rounded-xl px-3" style={{ background: "rgba(50,255,50,0.06)", border: "1px solid rgba(50,255,50,0.12)" }}>
                  <span className="text-[#32FF32] text-xs font-semibold">Avg Deal Value</span>
                  <span className="text-white font-black">$3,409</span>
                </div>
              </div>
            </ChartCard>
          </div>

          {/* Footer */}
          <div className="text-center py-4 text-white text-xs border-t border-[#111]">
            ProTrader Analytics · source: event2_leads_enriched · {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </div>
        </main>
      </div>
    </div>
  );
}
