"use client";

import { useState } from "react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, FunnelChart, Funnel, LabelList,
} from "recharts";
import Link from "next/link";

// ── REAL DATA FROM sheet.xlsx (event2_leads_enriched, 5,257 rows) ──────────

const leadsByDate = [
  { date: "May 10", leads: 230 },
  { date: "May 11", leads: 557 },
  { date: "May 12", leads: 395 },
  { date: "May 13", leads: 417 },
  { date: "May 14", leads: 492 },
  { date: "May 15", leads: 1030 },
  { date: "May 16", leads: 979 },
  { date: "May 17", leads: 409 },
  { date: "May 18", leads: 6 },
  { date: "May 19", leads: 92 },
  { date: "May 20", leads: 216 },
  { date: "May 21", leads: 182 },
  { date: "May 22", leads: 233 },
  { date: "May 23", leads: 16 },
  { date: "May 24", leads: 2 },
];

const leadGrades = [
  { name: "Grade A", value: 5, color: "#32FF32" },
  { name: "Grade B", value: 1708, color: "#00D26A" },
  { name: "Grade C", value: 1872, color: "#00A855" },
  { name: "Grade D", value: 1672, color: "#005C33" },
];

const utmSources = [
  { source: "Instagram", leads: 3009 + 147 },
  { source: "Facebook", leads: 1229 },
  { source: "Organic", leads: 454 },
  { source: "Email", leads: 411 },
  { source: "Newsletter", leads: 4 },
  { source: "Other", leads: 3 },
];

const utmMediums = [
  { medium: "IG Reels", value: 1556, color: "#32FF32" },
  { medium: "IG Feed", value: 728, color: "#00D26A" },
  { medium: "IG Stories", value: 479, color: "#00B856" },
  { medium: "FB Reels", value: 603, color: "#009944" },
  { medium: "FB Feed", value: 539, color: "#007733" },
  { medium: "Direct", value: 1011, color: "#005522" },
  { medium: "Social", value: 231, color: "#003311" },
  { medium: "Other", value: 110, color: "#002200" },
];

const topCampaigns = [
  { campaign: "Dumbest Thing", leads: 474 },
  { campaign: "Webinar", leads: 472 },
  { campaign: "General Broadcast", leads: 395 },
  { campaign: "Bio", leads: 260 },
  { campaign: "Bird Ad v1", leads: 177 },
  { campaign: "Twitter Format", leads: 175 },
  { campaign: "Email Abu Lahya IT", leads: 154 },
  { campaign: "Strizzys & Kettles", leads: 138 },
  { campaign: "Delivery GPT 5k", leads: 129 },
  { campaign: "Open Door Hook", leads: 129 },
];

const funnelData = [
  { name: "Total Leads", value: 5257, fill: "#32FF32" },
  { name: "Lead Scored", value: 3680, fill: "#00D26A" },
  { name: "Entered CRM", value: 868, fill: "#00B856" },
  { name: "Booked Call", value: 392, fill: "#009944" },
  { name: "Closed Won", value: 66, fill: "#007733" },
];

const professions = [
  { name: "Student", value: 935, color: "#32FF32" },
  { name: "Tech / IT", value: 526, color: "#00D26A" },
  { name: "Retail / Hospitality", value: 506, color: "#00B856" },
  { name: "Not Working", value: 410, color: "#009944" },
  { name: "Delivery / Transport", value: 313, color: "#007733" },
  { name: "Corporate / Finance", value: 313, color: "#005C2B" },
  { name: "Trades / Construction", value: 260, color: "#004A22" },
  { name: "Self-Employed", value: 228, color: "#003319" },
  { name: "Medical / Healthcare", value: 171, color: "#002210" },
];

const ageGroups = [
  { age: "Under 25", count: 1524 },
  { age: "25–29", count: 906 },
  { age: "30–34", count: 240 },
  { age: "35–39", count: 55 },
  { age: "40+", count: 75 },
];

const incomeBrackets = [
  { income: "Under $2K", count: 1707 },
  { income: "$2K–$3.5K", count: 644 },
  { income: "$3.5K–$5K", count: 251 },
  { income: "$5K–$7K", count: 116 },
  { income: "$7K–$10K", count: 38 },
  { income: "Over $10K", count: 25 },
];

const capitalAvailable = [
  { name: "Under $1K", value: 1329, color: "#32FF32" },
  { name: "£0 / No savings", value: 1210, color: "#00D26A" },
  { name: "Need to figure out", value: 377, color: "#00B856" },
  { name: "$1K–$3K", value: 465, color: "#009944" },
  { name: "$3K–$5K", value: 125, color: "#007733" },
  { name: "$5K–$10K", value: 78, color: "#005C2B" },
  { name: "Over $10K", value: 45, color: "#004A22" },
];

const programTypes = [
  { name: "Course Only ($4K)", value: 46, color: "#32FF32" },
  { name: "Full Program ($7K)", value: 35, color: "#00D26A" },
];

const paymentTypes = [
  { type: "Payment Plan", count: 45 },
  { type: "PIF (Full)", count: 21 },
  { type: "Deposit", count: 13 },
  { type: "Contract+Plan", count: 3 },
  { type: "Contract+PIF", count: 1 },
];

const followingDuration = [
  { duration: "Never heard", count: 763 },
  { duration: "< 1 month", count: 727 },
  { duration: "1–3 months", count: 519 },
  { duration: "3–6 months", count: 347 },
  { duration: "6–12 months", count: 216 },
  { duration: "Over 1 year", count: 170 },
];

const leadStatus = [
  { status: "Triaged - Financial", count: 212 },
  { status: "Potential", count: 117 },
  { status: "DQ'd by Closer", count: 91 },
  { status: "Unconfirmed", count: 116 },
  { status: "Logistical Objection", count: 42 },
  { status: "No Show", count: 33 },
  { status: "Webinar Registrant", count: 29 },
  { status: "Think About It", count: 29 },
  { status: "Triaged - Other", count: 57 },
  { status: "Cancelled", count: 27 },
];

const opportunityStages = [
  { stage: "Not in CRM", count: 4389 },
  { stage: "Booked Appt", count: 368 },
  { stage: "Lost/DQ", count: 211 },
  { stage: "Follow Up", count: 112 },
  { stage: "No-Shows", count: 48 },
  { stage: "Closed", count: 61 },
  { stage: "Nurture", count: 37 },
  { stage: "Call Backs", count: 11 },
  { stage: "Day 1", count: 6 },
  { stage: "Registered", count: 8 },
];

// ── COMPONENTS ────────────────────────────────────────────────────────────────

interface KpiCardProps {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: string;
  sub?: string;
}

function KpiCard({ title, value, change, positive, icon, sub }: KpiCardProps) {
  return (
    <div
      className="rounded-xl p-4 sm:p-5 border border-[#32FF3215] hover:border-[#32FF3240] transition-all duration-300 hover:-translate-y-0.5"
      style={{ background: "#0c0c0c" }}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-[#ffffff] text-xs font-medium uppercase tracking-wider leading-tight">{title}</span>
        <span className="text-xl sm:text-2xl flex-shrink-0">{icon}</span>
      </div>
      <div className="text-2xl sm:text-3xl font-black text-white mb-1">{value}</div>
      {sub && <div className="text-[#ffffff] text-xs mb-2">{sub}</div>}
      <div className={`text-xs font-semibold flex items-center gap-1 ${positive ? "text-[#32FF32]" : "text-red-400"}`}>
        <span>{positive ? "↑" : "↓"}</span>
        <span>{change}</span>
      </div>
    </div>
  );
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl p-3 border border-[#32FF3230] text-xs" style={{ background: "#0f0f0f", backdropFilter: "blur(20px)" }}>
      <p className="text-[#ffffff] mb-2 font-semibold">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color || "#32FF32" }} className="font-bold">
          {p.name}: {typeof p.value === "number" ? p.value.toLocaleString() : p.value}
        </p>
      ))}
    </div>
  );
};

function SectionHeader({ title, subtitle, badge }: { title: string; subtitle?: string; badge?: string }) {
  return (
    <div className="mb-4">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-white font-bold text-sm sm:text-base">{title}</h3>
        {badge && (
          <span className="text-[#32FF32] text-xs bg-[#32FF3215] px-2 py-0.5 rounded-full flex-shrink-0 border border-[#32FF3220]">
            {badge}
          </span>
        )}
      </div>
      {subtitle && <p className="text-[#ffffff] text-xs mt-0.5">{subtitle}</p>}
    </div>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState("all");

  const conversionRate = ((66 / 392) * 100).toFixed(1);
  const bookingRate = ((392 / 868) * 100).toFixed(1);
  const crmEntryRate = ((868 / 5257) * 100).toFixed(1);
  const avgDealValue = (225016 / 66).toFixed(0);

  return (
    <div className="min-h-screen" style={{ background: "#050505", color: "#fff" }}>
      {/* Navbar */}
      <nav className="border-b border-[#32FF3215] px-4 sm:px-6 py-3 sm:py-4 sticky top-0 z-50" style={{ background: "#050505" }}>
        <div className="max-w-[1600px] mx-auto flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#32FF32] to-[#00D26A] flex items-center justify-center flex-shrink-0">
                <span className="text-black font-black text-sm">ICT</span>
              </div>
              <span className="font-bold text-white text-base sm:text-lg">
                Pro<span style={{ background: "linear-gradient(135deg,#32FF32,#00D26A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Trader</span>
              </span>
            </Link>
            <span className="text-[#ffffff] hidden sm:block">|</span>
            <span className="text-[#ffffff] text-xs sm:text-sm font-medium hidden sm:block">Lead Analytics — event2_leads_enriched</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 text-xs bg-[#0c0c0c] rounded-lg p-1 border border-[#32FF3215]">
              {["all", "week1", "week2"].map((r) => (
                <button
                  key={r}
                  onClick={() => setDateRange(r)}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-all text-xs ${dateRange === r ? "bg-[#32FF32] text-black" : "text-[#ffffff] hover:text-white"}`}
                >
                  {r === "all" ? "All Time" : r === "week1" ? "May 10–17" : "May 18–24"}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#32FF32] bg-[#32FF3210] border border-[#32FF3230] px-3 py-1.5 rounded-lg font-semibold">
              <span className="w-1.5 h-1.5 bg-[#32FF32] rounded-full animate-pulse" />
              5,257 Leads · Live Sheet
            </div>
            <Link href="/" className="text-[#32FF32] text-xs font-semibold border border-[#32FF3230] px-3 py-1.5 rounded-lg hover:bg-[#32FF3210] transition-colors">
              ← Landing
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-[1600px] mx-auto px-3 sm:px-6 py-5 space-y-4">

        {/* KPI Row 1 — Lead Pipeline */}
        <div>
          <p className="text-[#ffffff] text-xs font-semibold uppercase tracking-widest mb-3">Lead Pipeline</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <KpiCard title="Total Leads" value="5,257" change="May 10–24 campaign" positive={true} icon="👥" sub="event2_leads_enriched" />
            <KpiCard title="Lead Scored" value="3,680" change={`${((3680/5257)*100).toFixed(1)}% scored`} positive={true} icon="⭐" sub="Avg score: 6.80" />
            <KpiCard title="Entered CRM" value="868" change={`${crmEntryRate}% entry rate`} positive={true} icon="📋" sub="Close CRM" />
            <KpiCard title="Booked Calls" value="392" change={`${bookingRate}% of CRM leads`} positive={true} icon="📞" sub="Sales calls" />
            <KpiCard title="Closed Won" value="66" change={`${conversionRate}% close rate`} positive={true} icon="🏆" sub="From booked calls" />
            <KpiCard title="Revenue" value="$225K" change={`Avg $${avgDealValue}/deal`} positive={true} icon="💰" sub="$225,016.29 total" />
          </div>
        </div>

        {/* KPI Row 2 — Rates */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <KpiCard title="Grade A Leads" value="5" change="0.1% of total" positive={true} icon="🌟" sub="Highest quality" />
          <KpiCard title="Grade B Leads" value="1,708" change="32.5% of total" positive={true} icon="🟢" sub="High quality" />
          <KpiCard title="Grade C Leads" value="1,872" change="35.6% of total" positive={false} icon="🟡" sub="Medium quality" />
          <KpiCard title="Grade D Leads" value="1,672" change="31.8% of total" positive={false} icon="🔴" sub="Lower quality" />
        </div>

        {/* Row 1: Leads by Date + UTM Sources */}
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="rounded-xl p-5 border border-[#32FF3215]" style={{ background: "#0c0c0c" }}>
            <SectionHeader title="Daily Lead Capture" subtitle="Campaign period: May 10–24, 2026" badge="Peak: 1,030 on May 15" />
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={leadsByDate}>
                <defs>
                  <linearGradient id="leadsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#32FF32" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#32FF32" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#32FF3210" />
                <XAxis dataKey="date" stroke="#ffffff" tick={{ fill: "#ffffff", fontSize: 10 }} />
                <YAxis stroke="#ffffff" tick={{ fill: "#ffffff", fontSize: 10 }} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="leads" stroke="#32FF32" strokeWidth={2.5} fill="url(#leadsGrad)" name="Leads" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-xl p-5 border border-[#32FF3215]" style={{ background: "#0c0c0c" }}>
            <SectionHeader title="Leads by UTM Source" subtitle="Traffic acquisition breakdown" badge="Instagram #1" />
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={utmSources} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#32FF3210" horizontal={false} />
                <XAxis type="number" stroke="#ffffff" tick={{ fill: "#ffffff", fontSize: 10 }} />
                <YAxis type="category" dataKey="source" stroke="#ffffff" tick={{ fill: "#ffffff", fontSize: 11 }} width={65} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="leads" fill="#32FF32" radius={[0, 4, 4, 0]} name="Leads">
                  {utmSources.map((_, i) => (
                    <Cell key={i} fill={`rgba(50,255,50,${1 - i * 0.14})`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Row 2: Conversion Funnel + Lead Grades */}
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-4">
          <div className="rounded-xl p-5 border border-[#32FF3215]" style={{ background: "#0c0c0c" }}>
            <SectionHeader title="Sales Conversion Funnel" subtitle="Real pipeline data from sheet.xlsx" badge="1.3% overall CVR" />
            <div className="space-y-3 mt-1">
              {funnelData.map((step, i) => {
                const pct = ((step.value / 5257) * 100).toFixed(1);
                const fromPrev = i > 0 ? ((step.value / funnelData[i - 1].value) * 100).toFixed(1) : "100";
                return (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ background: step.fill }}
                        />
                        <span className="text-white text-sm font-semibold">{step.name}</span>
                        {i > 0 && (
                          <span className="text-[#ffffff] text-xs">({fromPrev}% of prev)</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-white font-black text-sm">{step.value.toLocaleString()}</span>
                        <span className="text-xs font-semibold w-12 text-right" style={{ color: step.fill }}>
                          {pct}%
                        </span>
                      </div>
                    </div>
                    <div className="h-2.5 rounded-full bg-[#32FF3210]">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${step.fill}, ${step.fill}88)` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Revenue summary */}
            <div className="mt-5 grid grid-cols-3 gap-2">
              {[
                { label: "Avg Deal Value", value: `$${Number(avgDealValue).toLocaleString()}` },
                { label: "Course ($4K)", value: "46 buyers" },
                { label: "Full Program ($7K)", value: "35 buyers" },
              ].map((m) => (
                <div key={m.label} className="text-center p-2 rounded-lg bg-[#32FF3208] border border-[#32FF3215]">
                  <p className="text-[#32FF32] font-black text-sm">{m.value}</p>
                  <p className="text-[#ffffff] text-xs mt-0.5">{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl p-5 border border-[#32FF3215]" style={{ background: "#0c0c0c" }}>
            <SectionHeader title="Lead Grade Distribution" subtitle="AI-scored lead quality" badge="3,585 B/C grades" />
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={leadGrades} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                  {leadGrades.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip
                  formatter={(value) => [Number(value).toLocaleString(), "Leads"]}
                  contentStyle={{ background: "#0f0f0f", border: "1px solid #32FF3230", borderRadius: 8, color: "#fff" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {leadGrades.map((d) => (
                <div key={d.name} className="flex items-center gap-2 text-xs p-2 rounded-lg bg-[#0f0f0f]">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                  <span className="text-[#ffffff]">{d.name}</span>
                  <span className="text-white font-bold ml-auto">{d.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 3: Top Campaigns + UTM Mediums */}
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="rounded-xl p-5 border border-[#32FF3215]" style={{ background: "#0c0c0c" }}>
            <SectionHeader title="Top 10 Campaigns by Leads" subtitle="Best performing ad creatives" badge="474 from Dumbest Thing" />
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={topCampaigns} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#32FF3210" horizontal={false} />
                <XAxis type="number" stroke="#ffffff" tick={{ fill: "#ffffff", fontSize: 10 }} />
                <YAxis type="category" dataKey="campaign" stroke="#ffffff" tick={{ fill: "#ffffff", fontSize: 10 }} width={120} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="leads" radius={[0, 4, 4, 0]} name="Leads">
                  {topCampaigns.map((_, i) => (
                    <Cell key={i} fill={`rgba(50,255,50,${1 - i * 0.08})`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-xl p-5 border border-[#32FF3215]" style={{ background: "#0c0c0c" }}>
            <SectionHeader title="Leads by Placement / Medium" subtitle="Which ad placements drove most leads" badge="IG Reels #1" />
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={utmMediums}>
                <CartesianGrid strokeDasharray="3 3" stroke="#32FF3210" />
                <XAxis dataKey="medium" stroke="#ffffff" tick={{ fill: "#ffffff", fontSize: 9 }} angle={-30} textAnchor="end" height={50} />
                <YAxis stroke="#ffffff" tick={{ fill: "#ffffff", fontSize: 10 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} name="Leads">
                  {utmMediums.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Row 4: Professions + Age Groups */}
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-4">
          <div className="rounded-xl p-5 border border-[#32FF3215]" style={{ background: "#0c0c0c" }}>
            <SectionHeader title="Lead Professions" subtitle="Q3 survey responses (3,662 answered)" badge="Students dominate" />
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={professions} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#32FF3210" horizontal={false} />
                <XAxis type="number" stroke="#ffffff" tick={{ fill: "#ffffff", fontSize: 10 }} />
                <YAxis type="category" dataKey="name" stroke="#ffffff" tick={{ fill: "#ffffff", fontSize: 10 }} width={130} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} name="Leads">
                  {professions.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-xl p-5 border border-[#32FF3215]" style={{ background: "#0c0c0c" }}>
            <SectionHeader title="Age Distribution" subtitle="Q1 survey responses (2,800 answered)" badge="Under 25 = 54%" />
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={ageGroups}>
                <CartesianGrid strokeDasharray="3 3" stroke="#32FF3210" />
                <XAxis dataKey="age" stroke="#ffffff" tick={{ fill: "#ffffff", fontSize: 11 }} />
                <YAxis stroke="#ffffff" tick={{ fill: "#ffffff", fontSize: 10 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} name="Leads">
                  {ageGroups.map((_, i) => (
                    <Cell key={i} fill={`rgba(50,255,50,${1 - i * 0.18})`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Row 5: Income + Capital Available */}
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="rounded-xl p-5 border border-[#32FF3215]" style={{ background: "#0c0c0c" }}>
            <SectionHeader title="Monthly Income Brackets" subtitle="Q4 survey — before tax income" badge="81% under $3.5K" />
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={incomeBrackets}>
                <CartesianGrid strokeDasharray="3 3" stroke="#32FF3210" />
                <XAxis dataKey="income" stroke="#ffffff" tick={{ fill: "#ffffff", fontSize: 10 }} />
                <YAxis stroke="#ffffff" tick={{ fill: "#ffffff", fontSize: 10 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} name="Leads">
                  {incomeBrackets.map((_, i) => (
                    <Cell key={i} fill={`rgba(50,255,50,${1 - i * 0.15})`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-xl p-5 border border-[#32FF3215]" style={{ background: "#0c0c0c" }}>
            <SectionHeader title="Capital Available (30 days)" subtitle="Self-reported investable capital" badge="62% under $1K" />
            <div className="flex items-center gap-2">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={capitalAvailable} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value">
                    {capitalAvailable.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip
                  formatter={(value) => [Number(value).toLocaleString(), "Leads"]}
                  contentStyle={{ background: "#0f0f0f", border: "1px solid #32FF3230", borderRadius: 8, color: "#fff" }}
                />
              </PieChart>
            </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-1.5 mt-1">
              {capitalAvailable.map((d) => (
                <div key={d.name} className="flex items-center gap-1.5 text-xs">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                  <span className="text-[#ffffff] truncate">{d.name}</span>
                  <span className="text-white font-bold ml-auto">{d.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 6: Following Duration + Opportunity Stages */}
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="rounded-xl p-5 border border-[#32FF3215]" style={{ background: "#0c0c0c" }}>
            <SectionHeader title="How Long Following Abu Lahya" subtitle="Audience awareness & loyalty" badge="New audience majority" />
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={followingDuration}>
                <CartesianGrid strokeDasharray="3 3" stroke="#32FF3210" />
                <XAxis dataKey="duration" stroke="#ffffff" tick={{ fill: "#ffffff", fontSize: 10 }} angle={-20} textAnchor="end" height={45} />
                <YAxis stroke="#ffffff" tick={{ fill: "#ffffff", fontSize: 10 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} name="Leads">
                  {followingDuration.map((_, i) => (
                    <Cell key={i} fill={`rgba(50,255,50,${0.4 + i * 0.1})`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-xl p-5 border border-[#32FF3215]" style={{ background: "#0c0c0c" }}>
            <SectionHeader title="CRM Opportunity Stages" subtitle="Close CRM pipeline breakdown" badge="868 in CRM" />
            <div className="space-y-2 mt-1">
              {opportunityStages.filter(s => s.stage !== "Not in CRM").map((s, i) => {
                const pct = ((s.count / 868) * 100).toFixed(1);
                return (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-[#ffffff] text-xs w-28 truncate flex-shrink-0">{s.stage}</span>
                    <div className="flex-1 h-2 rounded-full bg-[#32FF3210]">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${pct}%`, background: `linear-gradient(90deg, rgba(50,255,50,${1 - i * 0.1}), rgba(0,210,106,${1 - i * 0.1}))` }}
                      />
                    </div>
                    <span className="text-white text-xs font-bold w-8 text-right flex-shrink-0">{s.count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Row 7: Payment/Program Types + Lead Status */}
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-4">
          <div className="rounded-xl p-5 border border-[#32FF3215]" style={{ background: "#0c0c0c" }}>
            <SectionHeader title="Closed Deals Breakdown" subtitle="Payment & program type (66 closed)" />
            <div className="space-y-4 mt-2">
              <div>
                <p className="text-[#32FF32] text-xs font-semibold uppercase tracking-wider mb-2">Program Type</p>
                {programTypes.map((p) => (
                  <div key={p.name} className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: p.color }} />
                    <span className="text-[#ffffff] text-sm flex-1">{p.name}</span>
                    <span className="text-white font-black">{p.value}</span>
                    <span className="text-[#ffffff] text-xs">({((p.value / 81) * 100).toFixed(0)}%)</span>
                  </div>
                ))}
              </div>
              <div className="h-px bg-[#32FF3210]" />
              <div>
                <p className="text-[#32FF32] text-xs font-semibold uppercase tracking-wider mb-2">Payment Type</p>
                {paymentTypes.map((p) => (
                  <div key={p.type} className="flex items-center justify-between mb-1.5">
                    <span className="text-[#ffffff] text-sm">{p.type}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-[#32FF3210]">
                        <div className="h-full rounded-full bg-[#32FF32]" style={{ width: `${(p.count / 45) * 100}%` }} />
                      </div>
                      <span className="text-white font-bold text-sm w-5 text-right">{p.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-xl p-5 border border-[#32FF3215]" style={{ background: "#0c0c0c" }}>
            <SectionHeader title="Lead Status Distribution" subtitle="CRM lead status tags (868 in Close CRM)" badge="212 Financial Triage" />
            <div className="grid grid-cols-2 gap-2 mt-2">
              {leadStatus.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-[#32FF3210] hover:border-[#32FF3230] transition-colors"
                  style={{ background: "#0f0f0f" }}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#32FF32] flex-shrink-0" />
                    <span className="text-[#ffffff] text-xs truncate">{s.status}</span>
                  </div>
                  <span className="text-white font-black text-sm flex-shrink-0 ml-2">{s.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Lead → CRM Rate", value: `${crmEntryRate}%`, icon: "📋", desc: "868 of 5,257 leads" },
            { label: "CRM → Call Rate", value: `${bookingRate}%`, icon: "📞", desc: "392 calls booked" },
            { label: "Call → Close Rate", value: `${conversionRate}%`, icon: "🏆", desc: "66 deals closed" },
            { label: "Total CVR", value: "1.26%", icon: "📈", desc: "$225K revenue" },
          ].map((m) => (
            <div key={m.label} className="rounded-xl p-4 border border-[#32FF3215] text-center" style={{ background: "#0c0c0c" }}>
              <div className="text-2xl mb-1">{m.icon}</div>
              <div className="text-2xl font-black" style={{ background: "linear-gradient(135deg,#32FF32,#00D26A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {m.value}
              </div>
              <div className="text-white font-semibold text-xs mt-1">{m.label}</div>
              <div className="text-[#ffffff] text-xs mt-0.5">{m.desc}</div>
            </div>
          ))}
        </div>

      </div>

      <div className="border-t border-[#32FF3210] mt-6 py-4 text-center text-[#ffffff] text-xs px-4">
        ProTrader Analytics · Data source: sheet.xlsx → event2_leads_enriched · {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
      </div>
    </div>
  );
}
