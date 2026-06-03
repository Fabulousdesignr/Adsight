
"use client"

import React from "react"
import { UploadZone } from "./upload-zone"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight } from "lucide-react"

interface LandingHeroProps {
  onFileSelect: (file: File) => void
  onAnalyze: () => void
  selectedFile: File | null
  onClear: () => void
}

export function LandingHero({ onFileSelect, onAnalyze, selectedFile, onClear }: LandingHeroProps) {
  return (
    <div className="relative pt-24 pb-32 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none">
        <div className="absolute top-20 left-1/4 w-[400px] h-[400px] glow-indigo animate-pulse-glow" />
        <div className="absolute top-40 right-1/4 w-[350px] h-[350px] glow-purple animate-pulse-glow delay-1000" />
      </div>

      <div className="container relative z-10 px-4 mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-primary uppercase tracking-[0.2em] mb-6 backdrop-blur-sm">
          <Sparkles className="h-3 w-3" />
          AI-Powered Ad Auditor
        </div>
        
        <h1 className="text-5xl md:text-7xl font-headline font-extrabold mb-6 tracking-tight">
          Upload an Ad. <br />
          <span className="text-gradient">Get Instant AI Feedback.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-body leading-relaxed">
          AdSight analyzes advertisements and reveals messaging clarity, 
          audience fit, strengths, and opportunities for improvement.
        </p>

        <div className="mb-12">
          <UploadZone 
            onFileSelect={onFileSelect} 
            selectedFile={selectedFile} 
            onClear={onClear} 
          />
        </div>

        {selectedFile && (
          <div className="animate-in fade-in zoom-in-95 duration-300">
            <Button 
              size="lg" 
              onClick={onAnalyze}
              className="px-8 h-14 text-lg font-headline font-bold bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all hover:scale-105"
            >
              Analyze My Ad <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}

        <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-2 font-headline font-bold text-xl">
             MARTECH
          </div>
          <div className="flex items-center gap-2 font-headline font-bold text-xl">
             VISIONARY
          </div>
          <div className="flex items-center gap-2 font-headline font-bold text-xl">
             QUANTUM
          </div>
          <div className="flex items-center gap-2 font-headline font-bold text-xl">
             SYNTHETIC
          </div>
        </div>
      </div>
    </div>
  )
}
