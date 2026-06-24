"use client";

import { useState } from "react";

const surveyQuestions = [
  {
    id: "q1",
    question: "What best describes your day-to-day?",
    options: [
      "Full-time job, supporting family",
      "Part-time or gig work",
      "Student or between jobs",
      "Self-employed or running a business",
      "Not currently working",
    ],
  },
  {
    id: "q2",
    question: "How long have you been trying to learn trading?",
    options: [
      "Just getting started",
      "Less than 6 months",
      "6 months – 1 year",
      "1–2 years",
      "Over 2 years",
    ],
  },
  {
    id: "q3",
    question: "Where are you right now with trading?",
    options: [
      "Complete beginner — never placed a trade",
      "Know ICT concepts but can't apply them consistently",
      "Placed trades but not profitable yet",
      "Breakeven — not losing, but not winning",
      "Profitable but inconsistent",
    ],
  },
  {
    id: "q4",
    question: "What do you want most from this challenge?",
    options: [
      "A process I can follow consistently",
      "Understand market structure & liquidity",
      "Build confidence in my entries",
      "Manage risk properly",
      "Go from inconsistent to consistent",
    ],
  },
  {
    id: "q5",
    question: "What frustrates you most about trading right now?",
    options: [
      "I know ICT but can't execute it",
      "My emotions ruin my trades",
      "I don't have a clear entry model",
      "I don't know how to manage risk",
      "I get stopped out and then it moves my way",
    ],
  },
];

type Step = "contact" | "survey" | "done";

export default function RegistrationForm() {
  const [step, setStep] = useState<Step>("contact");
  const [surveyStep, setSurveyStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    answers: {} as Record<string, string>,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateContact = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Valid email required";
    if (!formData.phone.trim()) errs.phone = "Phone number is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateContact()) setStep("survey");
  };

  const handleAnswer = (answer: string) => {
    const q = surveyQuestions[surveyStep];
    setFormData((prev) => ({ ...prev, answers: { ...prev.answers, [q.id]: answer } }));

    if (surveyStep < surveyQuestions.length - 1) {
      setSurveyStep((prev) => prev + 1);
    } else {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setStep("done");
      }, 1200);
    }
  };

  const currentQ = surveyQuestions[surveyStep];
  const surveyProgress = ((surveyStep) / surveyQuestions.length) * 100;

  return (
    <section id="reserve" className="py-20 sm:py-28 bg-[#050505] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#32FF32] opacity-[0.04] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-[#32FF32] rounded-full animate-pulse" />
            <span className="text-[#32FF32] text-sm font-medium">Limited Seats · Next Cohort</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3 leading-tight">
            Reserve Your Spot In The{" "}
            <span className="gradient-text">5-Day Challenge</span>
          </h2>
          <p className="text-[#ffffff60] text-base">
            Free to join. Live sessions. Real framework. Takes 60 seconds to register.
          </p>
        </div>

        {/* Form Card */}
        <div className="glass rounded-2xl border border-[#32FF3220] overflow-hidden">
          {/* Progress bar — only on survey */}
          {step === "survey" && (
            <div className="h-1 bg-[#32FF3215]">
              <div
                className="h-full bg-gradient-to-r from-[#32FF32] to-[#00D26A] transition-all duration-500"
                style={{ width: `${surveyProgress}%` }}
              />
            </div>
          )}

          <div className="p-6 sm:p-8">
            {/* ── STEP 1: Contact ── */}
            {step === "contact" && (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-white text-sm font-semibold mb-1.5">
                    Full Name <span className="text-[#32FF32]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    className={`w-full bg-[#0a0a0a] border rounded-xl px-4 py-3 text-white text-sm placeholder:text-[#ffffff30] outline-none focus:border-[#32FF32] transition-colors ${
                      errors.name ? "border-red-500" : "border-[#32FF3220]"
                    }`}
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-white text-sm font-semibold mb-1.5">
                    Email Address <span className="text-[#32FF32]">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    className={`w-full bg-[#0a0a0a] border rounded-xl px-4 py-3 text-white text-sm placeholder:text-[#ffffff30] outline-none focus:border-[#32FF32] transition-colors ${
                      errors.email ? "border-red-500" : "border-[#32FF3220]"
                    }`}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-white text-sm font-semibold mb-1.5">
                    Phone Number <span className="text-[#32FF32]">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 234 567 8900"
                    value={formData.phone}
                    onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                    className={`w-full bg-[#0a0a0a] border rounded-xl px-4 py-3 text-white text-sm placeholder:text-[#ffffff30] outline-none focus:border-[#32FF32] transition-colors ${
                      errors.phone ? "border-red-500" : "border-[#32FF3220]"
                    }`}
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary py-4 rounded-xl text-base font-black glow-pulse mt-2"
                >
                  Save My Free Seat →
                </button>

                <p className="text-center text-[#ffffff30] text-xs pt-1">
                  🔒 No spam. No credit card. Unsubscribe anytime.
                </p>
              </form>
            )}

            {/* ── STEP 2: Survey ── */}
            {step === "survey" && !isSubmitting && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[#32FF32] text-xs font-semibold uppercase tracking-wider">
                    Quick survey · {surveyStep + 1} of {surveyQuestions.length}
                  </span>
                  <button
                    onClick={() => setStep("done")}
                    className="text-[#ffffff30] text-xs hover:text-[#ffffff60] transition-colors"
                  >
                    Skip →
                  </button>
                </div>

                <h3 className="text-white font-bold text-lg sm:text-xl mb-6 leading-snug">
                  {currentQ.question}
                </h3>

                <div className="space-y-2">
                  {currentQ.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      className="w-full text-left px-4 py-3.5 rounded-xl border border-[#32FF3220] text-[#ffffff80] text-sm font-medium hover:border-[#32FF32] hover:text-white hover:bg-[#32FF3210] transition-all duration-200 flex items-center gap-3 group"
                    >
                      <span className="w-4 h-4 rounded-full border border-[#32FF3240] group-hover:border-[#32FF32] group-hover:bg-[#32FF3220] flex-shrink-0 transition-all" />
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── Submitting ── */}
            {step === "survey" && isSubmitting && (
              <div className="text-center py-8">
                <div className="w-12 h-12 border-2 border-[#32FF32] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-white font-semibold">Securing your spot...</p>
              </div>
            )}

            {/* ── STEP 3: Done ── */}
            {step === "done" && (
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#32FF32] to-[#00D26A] flex items-center justify-center mx-auto mb-5">
                  <span className="text-black text-2xl font-black">✓</span>
                </div>
                <h3 className="text-white font-black text-2xl mb-2">You&apos;re Registered!</h3>
                <p className="text-[#ffffff60] text-sm mb-6 leading-relaxed">
                  Check your email — we&apos;ll send the session details and a calendar invite.
                  <br />
                  See you in the live sessions, <span className="text-[#32FF32] font-semibold">{formData.name.split(" ")[0]}</span>.
                </p>

                <div className="glass rounded-xl p-4 border border-[#32FF3220] mb-5">
                  <p className="text-[#32FF32] font-semibold text-sm mb-3">What happens next</p>
                  <div className="space-y-2 text-left">
                    {[
                      "📧 Confirmation email sent to " + formData.email,
                      "📅 Calendar invite with Zoom link",
                      "💬 Access to private pre-challenge community",
                      "🔔 Reminder 1 hour before each session",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2 text-[#ffffff60] text-xs">
                        <span className="mt-0.5 flex-shrink-0">{item.split(" ")[0]}</span>
                        <span>{item.split(" ").slice(1).join(" ")}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => { setStep("contact"); setSurveyStep(0); setFormData({ name: "", email: "", phone: "", answers: {} }); }}
                  className="text-[#ffffff40] text-xs hover:text-[#ffffff60] transition-colors"
                >
                  Register another person
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Trust strip */}
        {step === "contact" && (
          <div className="flex flex-wrap items-center justify-center gap-5 mt-6">
            {[
              { icon: "🔒", text: "Private & Secure" },
              { icon: "🎥", text: "Live on Zoom" },
              { icon: "⏱", text: "90 Min Sessions" },
              { icon: "✅", text: "100% Free" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-1.5 text-[#ffffff40] text-xs">
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
