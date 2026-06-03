"use client"

import React from "react"

const STEPS = [
  {
    number: "01",
    title: "Upload Your Ad",
    description: "Upload a marketing creative, social post, flyer, or digital advertisement."
  },
  {
    number: "02",
    title: "AI Reviews Your Creative",
    description: "AdSight evaluates messaging, visual hierarchy, audience signals, and marketing effectiveness."
  },
  {
    number: "03",
    title: "Get Actionable Insights",
    description: "Receive concise feedback on strengths, audience appeal, and opportunities to improve performance."
  }
]

export function HowItWorks() {
  return (
    <section className="py-32 relative">
      <div className="container px-6 mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl font-headline font-bold mb-3">How AdSight Works</h2>
          <div className="w-12 h-0.5 bg-[#3b82f6] mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((step, idx) => (
            <div key={idx} className="relative p-10 bg-[#080810]/40 border border-white/5 rounded-xl hover:border-[#3b82f6]/30 transition-all group h-full">
              <div className="mb-8 h-10 w-10 rounded bg-[#3b82f6] flex items-center justify-center text-white font-bold text-xs">
                {step.number}
              </div>
              <h3 className="text-xl font-headline font-bold mb-4 tracking-tight">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
