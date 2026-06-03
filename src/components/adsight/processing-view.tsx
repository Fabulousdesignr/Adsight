"use client"

import React, { useState, useEffect } from "react"
import { Brain } from "lucide-react"

interface ProcessingViewProps {
  imageUrl: string
}

const MESSAGES = [
  "Reviewing messaging clarity",
  "Detecting audience signals",
  "Evaluating visual hierarchy",
  "Analyzing call-to-action effectiveness"
]

export function ProcessingView({ imageUrl }: ProcessingViewProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-32 pb-20">
      {/* Atmospheric Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[700px] glow-blue opacity-20 pointer-events-none" />

      <div className="container relative z-10 px-6 mx-auto text-center flex flex-col items-center">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-8">
          AI Creative Review
        </div>
        
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold mb-6 tracking-tight max-w-4xl mx-auto">
          Analyzing Your Advertisement
        </h1>
        
        {/* Subtitle */}
        <p className="text-muted-foreground max-w-xl mx-auto mb-16 text-sm md:text-base leading-relaxed opacity-70">
          AdSight is reviewing your creative and identifying marketing insights using our proprietary intelligence engine.
        </p>

        {/* Analysis Frame */}
        <div className="relative mb-12 w-full max-w-2xl">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#3b82f6]/20 to-transparent blur-xl rounded-2xl opacity-50" />
          <div className="relative rounded-2xl border border-white/10 bg-[#0c0c14] p-3 shadow-2xl overflow-hidden aspect-video flex items-center justify-center">
            {/* Ad Preview with darkened overlay */}
            <img 
              src={imageUrl} 
              alt="Ad Analysis Preview" 
              className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale-[50%]" 
            />
            <div className="absolute inset-0 bg-[#040408]/60" />
            
            {/* Scanning Line Animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="w-full h-0.5 bg-primary/40 shadow-[0_0_15px_rgba(59,130,246,0.5)] animate-[scan_3s_ease-in-out_infinite] absolute top-0" />
            </div>

            {/* AI Brain Icon */}
            <div className="relative z-10 w-20 h-20 rounded-2xl bg-[#12121a] border border-white/10 shadow-2xl flex items-center justify-center">
              <Brain className="w-10 h-10 text-primary animate-pulse" />
            </div>
          </div>
        </div>

        {/* Rotating Message */}
        <div className="mb-12 h-8 flex items-center justify-center">
          <h2 className="text-xl font-headline font-medium text-white tracking-tight animate-in fade-in slide-in-from-bottom-2 duration-500" key={index}>
            {MESSAGES[index]}
          </h2>
        </div>

        {/* Progress Footer */}
        <div className="space-y-6 w-full max-w-xs">
          <p className="text-[11px] text-muted-foreground/60 uppercase tracking-widest font-medium">
            This usually takes a few seconds.
          </p>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-primary w-1/3 rounded-full animate-[loading-progress_2s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes loading-progress {
          0% { transform: translateX(-100%); width: 30%; }
          50% { width: 60%; }
          100% { transform: translateX(333%); width: 30%; }
        }
      `}</style>
    </div>
  )
}
