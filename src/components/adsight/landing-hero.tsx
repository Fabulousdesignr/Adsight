"use client"

import React from "react"
import { UploadZone } from "./upload-zone"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

interface LandingHeroProps {
  onFileSelect: (file: File) => void
  onAnalyze: () => void
  selectedFile: File | null
  onClear: () => void
  isPulsing?: boolean
  uploadRef?: React.RefObject<HTMLDivElement>
}

export function LandingHero({ 
  onFileSelect, 
  onAnalyze, 
  selectedFile, 
  onClear, 
  isPulsing,
  uploadRef 
}: LandingHeroProps) {
  return (
    <div className="relative pt-40 pb-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[700px] glow-blue opacity-30 pointer-events-none" />

      <div className="container relative z-10 px-6 mx-auto text-center">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-8 backdrop-blur-sm">
          Intelligent Creative Advisory
        </div>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-headline font-bold mb-8 tracking-tight max-w-4xl mx-auto leading-[1.1]">
          Upload an Ad.<br />
          Get Instant AI Feedback.
        </h1>
        
        <p className="text-muted-foreground max-w-2xl mx-auto mb-12 text-sm md:text-base leading-relaxed">
          AdSight analyzes your advertisements and reveals messaging clarity, audience fit, strengths, and improvement opportunities in seconds.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-20">
          <Button 
            variant="outline"
            className="border-white/10 bg-white/5 hover:bg-white/10 h-12 px-10 rounded-md font-bold text-sm uppercase tracking-widest transition-all group"
          >
            <Play className="mr-2 h-4 w-4 fill-white group-hover:fill-[#3b82f6] group-hover:text-[#3b82f6]" /> See Demo
          </Button>
        </div>

        <div className="max-w-4xl mx-auto" ref={uploadRef}>
          <UploadZone 
            onFileSelect={onFileSelect} 
            selectedFile={selectedFile} 
            onClear={onClear} 
            isPulsing={isPulsing}
          />
          
          {selectedFile && (
            <div className="mt-12 animate-in fade-in slide-in-from-top-4 duration-500 flex justify-center">
              <Button 
                onClick={onAnalyze}
                className="bg-[#3b82f6] hover:bg-[#2563eb] h-14 px-12 rounded-md font-bold text-base uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)]"
              >
                Analyze My Ad
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
