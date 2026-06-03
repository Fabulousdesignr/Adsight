
"use client"

import React from "react"
import { Upload, Eye, Cpu, BarChart3 } from "lucide-react"

const STEPS = [
  {
    icon: Upload,
    title: "Upload Creative",
    description: "Drop your image, PNG, or screenshot into the auditor port."
  },
  {
    icon: Cpu,
    title: "AI Analysis",
    description: "Our vision models process visual hierarchy and messaging clarity."
  },
  {
    icon: Eye,
    title: "Detect Signals",
    description: "We identify target audience resonance and emotional triggers."
  },
  {
    icon: BarChart3,
    title: "Get Insights",
    description: "Receive a comprehensive report with actionable improvements."
  }
]

export function HowItWorks() {
  return (
    <section className="py-24 border-t border-white/5 relative">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-headline font-bold mb-4">How AdSight Works</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            High-performance AI auditing for the modern marketing landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, idx) => (
            <div key={idx} className="relative group p-8 glass-card rounded-2xl border-white/5 hover:border-primary/30 transition-all duration-300">
              <div className="mb-6 h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                <step.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-headline font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              
              {idx < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 translate-x-1/2 text-white/5">
                  <ArrowRight className="h-8 w-8" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ArrowRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}
