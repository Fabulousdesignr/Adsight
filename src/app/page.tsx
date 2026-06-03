"use client"

import React, { useState, useCallback } from "react"
import { LandingHero } from "@/components/adsight/landing-hero"
import { HowItWorks } from "@/components/adsight/how-it-works"
import { ProcessingView } from "@/components/adsight/processing-view"
import { ResultsView } from "@/components/adsight/results-view"
import { Footer } from "@/components/adsight/footer"
import { analyzeAdCreative, AnalyzeAdCreativeOutput } from "@/ai/flows/analyze-ad-creative"
import { Toaster } from "@/components/ui/toaster"
import { Button } from "@/components/ui/button"

type AppState = "landing" | "processing" | "results"

export default function AdSightApp() {
  const [state, setState] = useState<AppState>("landing")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [analysis, setAnalysis] = useState<AnalyzeAdCreativeOutput | null>(null)

  const handleFileSelect = useCallback((file: File) => {
    setSelectedFile(file)
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
  }, [])

  const handleClear = useCallback(() => {
    setSelectedFile(null)
    setPreviewUrl("")
  }, [])

  const startAnalysis = async () => {
    if (!selectedFile) return

    setState("processing")
    
    try {
      const reader = new FileReader()
      reader.onloadend = async () => {
        const base64String = reader.result as string
        
        try {
          const result = await analyzeAdCreative({ photoDataUri: base64String })
          setAnalysis(result)
          setState("results")
        } catch (error) {
          console.error("Analysis failed:", error)
          setState("landing")
        }
      }
      reader.readAsDataURL(selectedFile)
    } catch (error) {
      console.error("File processing failed:", error)
      setState("landing")
    }
  }

  const handleReset = () => {
    setState("landing")
    setSelectedFile(null)
    setPreviewUrl("")
    setAnalysis(null)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-[#040408] text-foreground font-body">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 bg-[#040408]/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={handleReset}>
            <div className="h-6 w-6 bg-[#3b82f6] rounded flex items-center justify-center">
              <div className="w-3 h-3 border-2 border-white rotate-45" />
            </div>
            <span className="font-headline font-bold text-xl tracking-tight">AdSight</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-10">
            <a href="#" className="nav-link">Platform</a>
            <a href="#" className="nav-link">Solutions</a>
            <a href="#" className="nav-link">Enterprise</a>
            <a href="#" className="nav-link">Pricing</a>
          </nav>
          
          <Button size="sm" className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-6 rounded-md font-medium text-xs uppercase tracking-wider h-9">
            Get Started
          </Button>
        </div>
      </header>

      <main>
        {state === "landing" && (
          <>
            <LandingHero 
              onFileSelect={handleFileSelect} 
              onAnalyze={startAnalysis}
              selectedFile={selectedFile}
              onClear={handleClear}
            />
            <HowItWorks />
            
            {/* AI-Powered Creative Analysis Teaser */}
            <section className="py-32 container mx-auto px-6">
              <div className="mb-12">
                <h2 className="text-3xl font-headline font-bold mb-4">AI-Powered Creative Analysis</h2>
                <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
                  AdSight breaks down how your advertisement communicates and what may influence engagement.
                </p>
              </div>
              
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#3b82f6]/20 to-transparent blur-2xl opacity-50" />
                <div className="relative border border-white/5 rounded-xl overflow-hidden glass-card">
                   <div className="bg-[#12121a] h-8 flex items-center px-4 gap-1.5 border-b border-white/5">
                      <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                      <div className="ml-auto text-[10px] text-white/20 uppercase tracking-widest font-mono">CREATIVE_ANALYSIS_V2.ADS</div>
                   </div>
                   <img 
                    src="https://picsum.photos/seed/adsight-preview/1200/600" 
                    alt="AI Analysis Preview" 
                    className="w-full opacity-80"
                    data-ai-hint="analysis dashboard"
                   />
                </div>
              </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 text-center relative overflow-hidden">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] glow-blue opacity-40 pointer-events-none" />
               <div className="container relative z-10 mx-auto px-6">
                 <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold mb-8 max-w-4xl mx-auto leading-[1.15]">
                   Your next high-performing ad starts with better feedback.
                 </h2>
                 <p className="text-muted-foreground max-w-xl mx-auto mb-10 text-sm leading-relaxed">
                   Upload your creative and let AdSight reveal what works and what could perform better.
                 </p>
                 <Button 
                   onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                   className="bg-[#3b82f6] hover:bg-[#2563eb] h-12 px-10 rounded-md font-bold text-sm uppercase tracking-widest"
                 >
                   Analyze My Ad
                 </Button>
               </div>
            </section>
          </>
        )}

        {state === "processing" && (
          <div className="pt-32">
            <ProcessingView />
          </div>
        )}

        {state === "results" && analysis && (
          <div className="pt-32 pb-24 px-6 container mx-auto">
            <ResultsView 
              analysis={analysis} 
              imageUrl={previewUrl} 
              onReset={handleReset} 
            />
          </div>
        )}
      </main>

      <Footer />
      <Toaster />
    </div>
  )
}
