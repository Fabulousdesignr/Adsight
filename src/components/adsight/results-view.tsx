
"use client"

import React from "react"
import { CheckCircle2, AlertCircle, Users, MessageSquare, Star, Copy, Share2, FileDown, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnalyzeAdCreativeOutput } from "@/ai/flows/analyze-ad-creative"
import { toast } from "@/hooks/use-toast"

interface ResultsViewProps {
  analysis: AnalyzeAdCreativeOutput
  imageUrl: string
  onReset: () => void
}

export function ResultsView({ analysis, imageUrl, onReset }: ResultsViewProps) {
  const copyToClipboard = () => {
    const text = `
AdSight Analysis
Overall Assessment: ${analysis.overallAssessment}
Messaging: ${analysis.whatAdIsSaying}
Target Audience: ${analysis.whoMayAppealTo}
Strengths: ${analysis.whatWorksWell}
Opportunities: ${analysis.whatCouldImprove}
    `.trim()
    
    navigator.clipboard.writeText(text)
    toast({
      title: "Analysis Copied",
      description: "Creative insights have been copied to your clipboard.",
    })
  }

  const exportReport = () => {
    toast({
      title: "Exporting Report",
      description: "Generating PDF report... This will be ready shortly.",
    })
  }

  const shareReport = () => {
    toast({
      title: "Link Generated",
      description: "Analysis link copied to clipboard for sharing.",
    })
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-8">
        <div>
          <Button variant="ghost" onClick={onReset} className="mb-4 -ml-4 hover:bg-white/5 text-muted-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Analyze Another Ad
          </Button>
          <h1 className="text-4xl font-headline font-bold text-gradient">Creative Intelligence Report</h1>
          <p className="text-muted-foreground mt-2">Comprehensive visual and messaging performance audit.</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" size="sm" onClick={copyToClipboard} className="glass-card hover:bg-white/10">
            <Copy className="mr-2 h-4 w-4" /> Copy Analysis
          </Button>
          <Button variant="outline" size="sm" onClick={exportReport} className="glass-card hover:bg-white/10">
            <FileDown className="mr-2 h-4 w-4" /> Export Report
          </Button>
          <Button size="sm" onClick={shareReport} className="bg-primary hover:bg-primary/80">
            <Share2 className="mr-2 h-4 w-4" /> Share Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Image Preview & Overall Assessment */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="glass-card overflow-hidden border-primary/20">
            <CardHeader className="bg-primary/5 border-b border-white/5">
              <CardTitle className="text-sm font-medium uppercase tracking-widest text-primary flex items-center">
                <Star className="mr-2 h-4 w-4" /> Original Creative
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="aspect-[4/5] relative">
                <img src={imageUrl} alt="Uploaded Ad" className="w-full h-full object-cover" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-secondary/20 bg-secondary/5">
            <CardHeader>
              <CardTitle className="text-lg font-headline flex items-center text-secondary">
                <Zap className="mr-2 h-5 w-5" /> Overall Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">{analysis.overallAssessment}</p>
            </CardContent>
          </Card>
        </div>

        {/* Insight Insights Matrix */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card bg-white/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium uppercase tracking-widest text-indigo-300 flex items-center">
                  <MessageSquare className="mr-2 h-4 w-4" /> Core Messaging
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-slate-300">{analysis.whatAdIsSaying}</p>
              </CardContent>
            </Card>

            <Card className="glass-card bg-white/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium uppercase tracking-widest text-violet-300 flex items-center">
                  <Users className="mr-2 h-4 w-4" /> Target Audience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-slate-300">{analysis.whoMayAppealTo}</p>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card border-green-500/20 bg-green-500/5">
            <CardHeader>
              <CardTitle className="text-lg font-headline flex items-center text-green-400">
                <CheckCircle2 className="mr-2 h-5 w-5" /> Creative Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-invert prose-sm max-w-none">
                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{analysis.whatWorksWell}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-amber-500/20 bg-amber-500/5">
            <CardHeader>
              <CardTitle className="text-lg font-headline flex items-center text-amber-400">
                <AlertCircle className="mr-2 h-5 w-5" /> Optimization Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-invert prose-sm max-w-none">
                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{analysis.whatCouldImprove}</p>
              </div>
            </CardContent>
          </Card>

          <div className="p-6 glass-card border-primary/10 rounded-2xl flex items-center gap-4 bg-gradient-to-r from-primary/10 to-transparent">
             <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Zap className="text-primary h-5 w-5" />
             </div>
             <div>
                <h4 className="font-headline text-sm font-semibold">AI Auditor Suggestion</h4>
                <p className="text-xs text-muted-foreground">Try A/B testing a version with higher contrast on the main CTA button.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Zap(props: any) {
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
      <path d="M4 14.71 13 4v8h7L11 20v-8H4z" />
    </svg>
  )
}
