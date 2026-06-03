
"use client"

import React, { useState, useCallback } from "react"
import { LandingHero } from "@/components/adsight/landing-hero"
import { HowItWorks } from "@/components/adsight/how-it-works"
import { ProcessingView } from "@/components/adsight/processing-view"
import { ResultsView } from "@/components/adsight/results-view"
import { Footer } from "@/components/adsight/footer"
import { analyzeAdCreative, AnalyzeAdCreativeOutput } from "@/ai/flows/analyze-ad-creative"
import { Toaster } from "@/components/ui/toaster"
import { Zap } from "lucide-react"

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
      // Convert file to base64 data URI
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
          // In a real app we'd show a toast error
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
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      {/* Header / Nav */}
      <header className="fixed top-0 w-full z-50 bg-background/50 backdrop-blur-lg border-b border-white/5">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 font-headline font-bold text-xl cursor-pointer" onClick={handleReset}>
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="text-white h-5 w-5 fill-white" />
            </div>
            <span>AdSight</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground uppercase tracking-widest">
            <a href="#" className="hover:text-primary transition-colors">Pricing</a>
            <a href="#" className="hover:text-primary transition-colors">API</a>
            <a href="#" className="hover:text-primary transition-colors">Success Stories</a>
          </nav>
          <div className="flex items-center gap-4">
             <button className="h-10 px-5 rounded-full bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all">Get Started</button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4">
        {state === "landing" && (
          <>
            <LandingHero 
              onFileSelect={handleFileSelect} 
              onAnalyze={startAnalysis}
              selectedFile={selectedFile}
              onClear={handleClear}
            />
            <HowItWorks />
            
            {/* Feature Tease */}
            <section className="py-24 relative overflow-hidden">
               <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 glow-indigo opacity-30" />
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6">AI-Powered Creative Analysis</h2>
                    <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                      Stop guessing. Our vision models are trained on millions of high-performing assets 
                      to provide objective feedback on contrast, messaging density, and audience resonance.
                    </p>
                    <ul className="space-y-4">
                      {["Visual Hierarchy Detection", "Messaging Clarity Audit", "Call-to-Action Efficiency", "Target Audience Alignment"].map((item, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                            <Zap className="h-3 w-3 text-primary" />
                          </div>
                          <span className="font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative">
                     <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl blur-2xl opacity-50" />
                     <img 
                       src="https://picsum.photos/seed/adsight-ui/800/600" 
                       alt="AI Analysis Interface" 
                       className="relative z-10 rounded-3xl border border-white/10 shadow-2xl glass-card"
                       data-ai-hint="dashboard interface"
                     />
                  </div>
               </div>
            </section>

            {/* Premium CTA */}
            <section className="py-32">
               <div className="glass-card rounded-[3rem] p-12 md:p-24 text-center border-primary/20 overflow-hidden relative">
                 <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" />
                 <h2 className="text-4xl md:text-6xl font-headline font-bold mb-8 relative z-10">Ready to transform <br/>your creative strategy?</h2>
                 <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 relative z-10">
                   Join top performance teams using AdSight to audit their marketing assets in seconds.
                 </p>
                 <button className="relative z-10 h-16 px-12 rounded-full bg-white text-black font-headline font-bold text-xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                   Start Auditing Now
                 </button>
               </div>
            </section>
          </>
        )}

        {state === "processing" && (
          <div className="pt-32 pb-24">
            <ProcessingView />
          </div>
        )}

        {state === "results" && analysis && (
          <div className="pt-32 pb-24">
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
