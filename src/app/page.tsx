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
import { Zap, Target, MessageSquare, CheckCircle2 } from "lucide-react"

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
            
            {/* AI-Powered Creative Analysis Section with Mock Results */}
            <section className="py-32 container mx-auto px-6">
              <div className="mb-16">
                <h2 className="text-3xl font-headline font-bold mb-4">AI-Powered Creative Analysis</h2>
                <p className="text-muted-foreground max-w-2xl text-base leading-relaxed opacity-80">
                  AdSight breaks down how your advertisement communicates and what may influence engagement.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="p-8 rounded-2xl border border-white/10 bg-[#0c0c14] relative group hover:border-[#3b82f6]/30 transition-all">
                    <div className="absolute top-8 left-8 h-10 w-10 rounded-lg bg-[#3b82f6]/10 flex items-center justify-center mb-6">
                      <MessageSquare className="h-5 w-5 text-[#3b82f6]" />
                    </div>
                    <div className="pl-16">
                      <h3 className="text-lg font-headline font-bold mb-2">Messaging Integrity</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">AI analyzes copy for clarity, tone consistency, and persuasive impact relative to industry benchmarks.</p>
                    </div>
                  </div>

                  <div className="p-8 rounded-2xl border border-white/10 bg-[#0c0c14] relative group hover:border-[#3b82f6]/30 transition-all">
                    <div className="absolute top-8 left-8 h-10 w-10 rounded-lg bg-[#3b82f6]/10 flex items-center justify-center mb-6">
                      <Target className="h-5 w-5 text-[#3b82f6]" />
                    </div>
                    <div className="pl-16">
                      <h3 className="text-lg font-headline font-bold mb-2">Audience Signal Detection</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">Identifies visual cues and keywords that resonate with specific demographic segments and interests.</p>
                    </div>
                  </div>

                  <div className="p-8 rounded-2xl border border-white/10 bg-[#0c0c14] relative group hover:border-[#3b82f6]/30 transition-all">
                    <div className="absolute top-8 left-8 h-10 w-10 rounded-lg bg-[#3b82f6]/10 flex items-center justify-center mb-6">
                      <CheckCircle2 className="h-5 w-5 text-[#3b82f6]" />
                    </div>
                    <div className="pl-16">
                      <h3 className="text-lg font-headline font-bold mb-2">Visual Hierarchy Audit</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">Evaluates the flow of visual information to ensure primary call-to-actions are noticed first.</p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -inset-4 bg-[#3b82f6]/20 blur-3xl opacity-30 rounded-full" />
                  <div className="relative border border-white/10 rounded-2xl overflow-hidden glass-card shadow-2xl">
                    <div className="bg-[#12121a] h-10 flex items-center px-5 gap-2 border-b border-white/5">
                      <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                      <div className="ml-auto text-[9px] text-white/20 uppercase tracking-[0.2em] font-mono">INTELLIGENCE_REPORT_V4</div>
                    </div>
                    <div className="p-8 space-y-8">
                       <div className="flex items-center justify-between border-b border-white/5 pb-6">
                          <div>
                             <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Analysis Score</p>
                             <h4 className="text-3xl font-headline font-bold text-white">88<span className="text-sm text-muted-foreground">/100</span></h4>
                          </div>
                          <div className="h-14 w-14 rounded-full border-4 border-[#3b82f6] border-t-white/10 flex items-center justify-center font-bold text-sm">
                             A-
                          </div>
                       </div>
                       
                       <div className="space-y-4">
                          <div className="flex justify-between text-xs">
                             <span className="text-muted-foreground">Clarity</span>
                             <span className="text-white">92%</span>
                          </div>
                          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                             <div className="h-full bg-[#3b82f6] w-[92%]" />
                          </div>
                          
                          <div className="flex justify-between text-xs">
                             <span className="text-muted-foreground">Engagement Factor</span>
                             <span className="text-white">74%</span>
                          </div>
                          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                             <div className="h-full bg-[#3b82f6] w-[74%]" />
                          </div>
                       </div>

                       <div className="pt-4">
                          <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                             <h5 className="text-[10px] text-primary uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
                                <Zap className="h-3 w-3" /> Key Recommendation
                             </h5>
                             <p className="text-xs text-white/70 leading-relaxed italic">
                                "Increase visual contrast on the CTA button to improve click-through propensity for mobile users."
                             </p>
                          </div>
                       </div>
                    </div>
                  </div>
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
