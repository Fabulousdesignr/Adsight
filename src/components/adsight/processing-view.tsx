
"use client"

import React, { useState, useEffect } from "react"
import { Loader2, Zap, Target, Layers, MousePointer2 } from "lucide-react"

const MESSAGES = [
  { text: "Reviewing messaging clarity", icon: Zap },
  { text: "Detecting audience signals", icon: Target },
  { text: "Evaluating visual hierarchy", icon: Layers },
  { text: "Analyzing call-to-action effectiveness", icon: MousePointer2 }
]

export function ProcessingView() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const ActiveIcon = MESSAGES[index].icon

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="relative mb-12">
        {/* Pulse Glows */}
        <div className="absolute inset-0 glow-indigo animate-pulse-glow" />
        <div className="absolute inset-0 glow-purple animate-pulse-glow delay-700" />
        
        <div className="relative z-10 p-12 glass-card rounded-full border-primary/20 bg-primary/5 flex items-center justify-center">
          <div className="relative h-24 w-24">
            <Loader2 className="h-24 w-24 text-primary animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <ActiveIcon className="h-10 w-10 text-secondary transition-all duration-500 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 max-w-md mx-auto">
        <h2 className="text-3xl font-headline font-bold text-gradient h-12">
          {MESSAGES[index].text}
        </h2>
        <div className="flex gap-2 justify-center">
          {MESSAGES.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index ? "w-8 bg-primary" : "w-1.5 bg-white/10"
              }`}
            />
          ))}
        </div>
        <p className="text-muted-foreground text-sm uppercase tracking-widest pt-4">
          GenAI Creative Auditor Active
        </p>
      </div>
    </div>
  )
}
