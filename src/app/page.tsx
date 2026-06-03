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
import { MessageSquare, CheckCircle2, Users, Lightbulb } from "lucide-react"

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
            <a href="#" className="nav-link">Resources</a>
          </nav>
          
          <div className="flex items-center gap-4">
            <Button size="sm" className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-6 rounded-md font-medium text-xs uppercase tracking-wider h-9">
              Get Started
            </Button>
          </div>
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
            
            <section className="py-32 container mx-auto px-6">
              <div className="mb-16">
                <h2 className="text-3xl font-headline font-bold mb-4">AI-Powered Creative Analysis</h2>
                <p className="text-muted-foreground max-w-2xl text-base leading-relaxed opacity-80">
                  AdSight breaks down how your advertisement communicates and what may influence engagement.
                </p>
              </div>

              <div className="relative mb-12 group">
                <div className="absolute -inset-4 bg-[#3b82f6]/10 blur-3xl opacity-30 rounded-full" />
                <div className="relative border border-white/10 rounded-2xl overflow-hidden bg-[#0c0c14] shadow-2xl">
                  <div className="bg-[#12121a] h-12 flex items-center px-6 gap-2 border-b border-white/5">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    </div>
                    <div className="ml-auto text-[10px] text-white/20 uppercase tracking-[0.2em] font-mono">CREATIVE_AUDIT_LOG_V2.ADS</div>
                  </div>
                  
                  <div className="relative aspect-[16/7] w-full overflow-hidden">
                    <img 
                      src="https://picsum.photos/seed/skincare-ad/1200/525" 
                      alt="Skincare Ad Preview" 
                      className="w-full h-full object-cover"
                      data-ai-hint="skincare advertisement"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    
                    <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row gap-6">
                      <div className="flex-1 glass-card bg-black/60 backdrop-blur-md p-6 rounded-xl border-l-4 border-l-[#3b82f6] border-white/5">
                        <p className="text-[10px] text-[#3b82f6] font-bold uppercase tracking-widest mb-1">Key Messaging</p>
                        <h4 className="text-white font-bold text-base mb-1">High Clarity Detected</h4>
                        <p className="text-white/60 text-xs leading-relaxed">Core value proposition is visible in less than 0.5 seconds.</p>
                      </div>
                      
                      <div className="flex-1 glass-card bg-black/60 backdrop-blur-md p-6 rounded-xl border-l-4 border-l-white/20 border-white/5">
                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1">Visual Flow</p>
                        <h4 className="text-white font-bold text-base mb-1">Optimal Hierarchy</h4>
                        <p className="text-white/60 text-xs leading-relaxed">The advertisement follows a clear visual reading path and directs attention effectively.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 rounded-xl border border-white/5 bg-[#0c0c14] border-l-4 border-l-[#3b82f6]">
                  <div className="flex items-start gap-4">
                    <MessageSquare className="h-5 w-5 text-[#3b82f6] shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-headline font-bold mb-3">What This Ad Is Saying</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        This ad promotes a luxury skincare product focused on confidence and premium quality.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-8 rounded-xl border border-white/5 bg-[#0c0c14] border-l-4 border-l-[#22c55e]">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="h-5 w-5 text-[#22c55e] shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-headline font-bold mb-3">What Works Well</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Strong headline and clean imagery make the product feel premium and trustworthy.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-8 rounded-xl border border-white/5 bg-[#0c0c14] border-l-4 border-l-[#3b82f6]">
                  <div className="flex items-start gap-4">
                    <Users className="h-5 w-5 text-[#3b82f6] shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-headline font-bold mb-3">Who It May Appeal To</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Likely appeals to women interested in beauty, skincare, and premium self-care products.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-8 rounded-xl border border-white/5 bg-[#0c0c14] border-l-4 border-l-white/10">
                  <div className="flex items-start gap-4">
                    <Lightbulb className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-headline font-bold mb-3">What Could Improve</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        The call-to-action could be clearer and the text may feel slightly crowded on mobile.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

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
          <ProcessingView imageUrl={previewUrl} />
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
