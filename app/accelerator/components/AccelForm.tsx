"use client";
import { useState } from "react";

const questions = [
  {
    id: "stage",
    q: "What stage is your startup?",
    opts: ["Idea / Pre-product", "MVP built", "Revenue · Pre-seed", "Seed stage", "Series A"],
  },
  {
    id: "goal",
    q: "What's your #1 goal for attending?",
    opts: ["Raise funding", "Find co-founder / team", "Get mentorship", "Build network", "Learn growth systems"],
  },
  {
    id: "industry",
    q: "What industry are you building in?",
    opts: ["SaaS / Software", "Fintech", "AI / ML", "Health & Bio", "Climate / Deep tech", "Consumer / E-com", "Other"],
  },
];

type Step = "contact" | "survey" | "done";

export default function AccelForm() {
  const [step, setStep] = useState<Step>("contact");
  const [qIdx, setQIdx] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [data, setData] = useState({
    name: "", email: "", phone: "", company: "",
    answers: {} as Record<string, string>,
  });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!data.name.trim()) e.name = "Required";
    if (!data.email.trim() || !/\S+@\S+\.\S+/.test(data.email)) e.email = "Valid email required";
    if (!data.phone.trim()) e.phone = "Required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const onContact = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (validate()) setStep("survey");
  };

  const onAnswer = (ans: string) => {
    const q = questions[qIdx];
    setData(d => ({ ...d, answers: { ...d.answers, [q.id]: ans } }));
    if (qIdx < questions.length - 1) {
      setQIdx(i => i + 1);
    } else {
      setSubmitting(true);
      setTimeout(() => { setSubmitting(false); setStep("done"); }, 1200);
    }
  };

  const fieldStyle = (field: string): React.CSSProperties => ({
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: `1px solid ${errors[field] ? "#f87171" : "rgba(79,70,229,0.25)"}`,
    borderRadius: "12px",
    padding: "12px 16px",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s",
  });

  return (
    <section id="register" className="py-24 sm:py-32 relative" style={{ background: "linear-gradient(180deg,#050816,#080b20)" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(79,70,229,0.08), transparent)" }}
      />

      <div className="relative max-w-lg mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-semibold"
            style={{ background: "rgba(79,70,229,0.12)", border: "1px solid rgba(79,70,229,0.3)", color: "#a5b4fc" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#4F46E5" }} />
            Limited to 500 Founders · Sep 15–17, NYC
          </span>
          <h2
            className="text-3xl sm:text-4xl font-black text-white mb-3"
            style={{ letterSpacing: "-0.02em" }}
          >
            Apply For Your Spot
          </h2>
          <p className="text-base" style={{ color: "rgba(255,255,255,0.5)" }}>
            Takes 60 seconds. Free to apply. Decisions in 5 business days.
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(79,70,229,0.2)" }}
        >
          {/* Trust strip */}
          <div
            className="flex items-center justify-center gap-5 sm:gap-8 px-5 py-3"
            style={{ background: "rgba(79,70,229,0.06)", borderBottom: "1px solid rgba(79,70,229,0.15)" }}
          >
            {[
              { i: "★", t: "100% Free" },
              { i: "🏛", t: "NYC Venue" },
              { i: "💼", t: "Investor Access" },
            ].map(x => (
              <span key={x.t} className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>
                <span style={{ color: "#4F46E5" }}>{x.i}</span> {x.t}
              </span>
            ))}
          </div>

          {/* Survey progress bar */}
          {step === "survey" && (
            <div className="h-0.5" style={{ background: "rgba(255,255,255,0.05)" }}>
              <div
                className="h-full transition-all duration-500"
                style={{ width: `${(qIdx / questions.length) * 100}%`, background: "linear-gradient(90deg,#4F46E5,#7C3AED)" }}
              />
            </div>
          )}

          <div className="p-6 sm:p-8">
            {/* STEP 1: Contact */}
            {step === "contact" && (
              <form onSubmit={onContact} className="space-y-4">
                {[
                  { field: "name", label: "Full Name", placeholder: "Your full name", type: "text" },
                  { field: "email", label: "Email Address", placeholder: "you@company.com", type: "email" },
                  { field: "phone", label: "Phone Number", placeholder: "+1 234 567 8900", type: "tel" },
                  { field: "company", label: "Company / Project", placeholder: "What are you building?", type: "text" },
                ].map(({ field, label, placeholder, type }) => (
                  <div key={field}>
                    <label className="block text-white text-sm font-semibold mb-1.5">
                      {label}{field !== "company" && <span style={{ color: "#4F46E5" }}> *</span>}
                    </label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      value={data[field as keyof typeof data] as string}
                      onChange={e => setData(d => ({ ...d, [field]: e.target.value }))}
                      style={fieldStyle(field)}
                      onFocus={e => { (e.target as HTMLInputElement).style.borderColor = "rgba(79,70,229,0.7)"; }}
                      onBlur={e => { (e.target as HTMLInputElement).style.borderColor = errors[field] ? "#f87171" : "rgba(79,70,229,0.25)"; }}
                    />
                    {errors[field] && <p className="text-red-400 text-xs mt-1">{errors[field]}</p>}
                  </div>
                ))}
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl text-base font-black text-white mt-2 transition-all duration-300"
                  style={{ background: "linear-gradient(135deg,#4F46E5,#7C3AED)", boxShadow: "0 0 30px #4F46E540" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 50px #4F46E570"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px #4F46E540"; (e.currentTarget as HTMLElement).style.transform = ""; }}
                >
                  Continue →
                </button>
                <p className="text-center text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                  🔒 Private &amp; secure. We never share your info.
                </p>
              </form>
            )}

            {/* STEP 2: Survey */}
            {step === "survey" && !submitting && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#a5b4fc" }}>
                    Question {qIdx + 1} of {questions.length}
                  </span>
                  <button className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }} onClick={() => setStep("done")}>
                    Skip →
                  </button>
                </div>
                <h3 className="text-white font-black text-xl mb-6">{questions[qIdx].q}</h3>
                <div className="space-y-2">
                  {questions[qIdx].opts.map(opt => (
                    <button
                      key={opt}
                      onClick={() => onAnswer(opt)}
                      className="w-full text-left px-4 py-3.5 rounded-xl text-sm font-medium text-white transition-all duration-200 flex items-center gap-3"
                      style={{ border: "1px solid rgba(79,70,229,0.2)", background: "rgba(79,70,229,0.05)" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(79,70,229,0.5)"; (e.currentTarget as HTMLElement).style.background = "rgba(79,70,229,0.12)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(79,70,229,0.2)"; (e.currentTarget as HTMLElement).style.background = "rgba(79,70,229,0.05)"; }}
                    >
                      <span className="w-4 h-4 rounded-full flex-shrink-0 border" style={{ borderColor: "rgba(79,70,229,0.4)" }} />
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Submitting */}
            {step === "survey" && submitting && (
              <div className="text-center py-8">
                <div className="w-12 h-12 border-2 rounded-full animate-spin mx-auto mb-4" style={{ borderColor: "#4F46E5", borderTopColor: "transparent" }} />
                <p className="text-white font-semibold">Submitting application...</p>
              </div>
            )}

            {/* DONE */}
            {step === "done" && (
              <div className="text-center py-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 text-2xl font-black text-white"
                  style={{ background: "linear-gradient(135deg,#4F46E5,#7C3AED)", boxShadow: "0 0 40px #4F46E550" }}
                >
                  ✓
                </div>
                <h3 className="text-white font-black text-2xl mb-2">Application Received!</h3>
                <p className="text-sm mb-6 leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Expect a decision within <span className="text-white font-semibold">5 business days</span>.
                  <br />
                  Welcome, <span className="font-semibold" style={{ color: "#a5b4fc" }}>{data.name.split(" ")[0]}</span>.
                </p>
                <div className="rounded-xl p-4 mb-5 text-left" style={{ background: "rgba(79,70,229,0.08)", border: "1px solid rgba(79,70,229,0.2)" }}>
                  <p className="font-semibold text-sm mb-2" style={{ color: "#a5b4fc" }}>What happens next</p>
                  {[
                    "📧 Confirmation email sent to " + data.email,
                    "📋 Application reviewed within 5 business days",
                    "📞 If accepted: 15-min onboarding call",
                    "🎟 Full event access details sent to you",
                  ].map(item => (
                    <div key={item} className="flex items-start gap-2 text-xs mt-1.5" style={{ color: "rgba(255,255,255,0.55)" }}>
                      <span className="flex-shrink-0">{item.split(" ")[0]}</span>
                      <span>{item.split(" ").slice(1).join(" ")}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
