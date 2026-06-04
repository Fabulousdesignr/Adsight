"use client"

import React from "react"
import { 
  MessageSquare, 
  Users, 
  Eye, 
  Lightbulb, 
  Copy, 
  Share2, 
  FileDown, 
  ArrowRight,
  Maximize2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnalyzeAdCreativeOutput } from "@/ai/flows/analyze-ad-creative"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface ResultsViewProps {
  analysis: AnalyzeAdCreativeOutput
  imageUrl: string
  onReset: () => void
}

export function ResultsView({ analysis, imageUrl, onReset }: ResultsViewProps) {
  const copyToClipboard = () => {
    const text = `
AdSight Analysis
Ad Type: ${analysis.adType}
Industry: ${analysis.industry}
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

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="mb-10 text-center md:text-left">
        <div className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[9px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-6">
          AI Analysis Complete
        </div>
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-3 tracking-tight">Your Ad Analysis</h1>
        <p className="text-muted-foreground text-sm opacity-80">Here's what AdSight discovered about your creative.</p>
      </div>

      {/* Overall Assessment Panel */}
      <div className="mb-8 p-8 rounded-xl border border-[#3b82f6]/20 bg-[#0c0c14] relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 h-full bg-[#3b82f6]" />
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#3b82f6] mb-4">Overall Assessment</h3>
        <p className="text-lg text-white/90 leading-relaxed max-w-4xl italic font-medium">
          "{analysis.overallAssessment}"
        </p>
      </div>

      {/* Metadata Chips */}
      <div className="flex flex-wrap gap-3 mb-12">
        <MetadataChip label="Ad Type" value={analysis.adType} />
        <MetadataChip label="Industry" value={analysis.industry} />
        <MetadataChip label="Analysis Time" value="3.2 Seconds" />
        <MetadataChip label="Review Status" value="Complete" />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
        {/* Left Column: Creative Preview */}
        <div className="lg:col-span-5">
          <div className="bg-[#0c0c14] border border-white/5 rounded-xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Creative Asset Preview</span>
              <Maximize2 className="h-3 w-3 text-white/20" />
            </div>
            <div className="aspect-[4/5] relative bg-black">
              <img src={imageUrl} alt="Uploaded Ad" className="w-full h-full object-cover" />
            </div>
            <div className="p-4 flex items-center justify-between bg-[#08080c]">
              <div className="flex items-center gap-2 text-[10px] text-white/20">
                <Copy className="h-3 w-3" />
                <span>creative_audit_asset.jpg</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Insights Grid */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InsightCard 
              icon={<MessageSquare className="text-white/40" />} 
              title="What This Ad Is Saying" 
              content={analysis.whatAdIsSaying} 
            />
            <InsightCard 
              icon={<Users className="text-white/40" />} 
              title="Who It May Appeal To" 
              content={analysis.whoMayAppealTo} 
            />
            <InsightCard 
              icon={<Eye className="text-white/40" />} 
              title="What Works Well" 
              content={analysis.whatWorksWell} 
            />
            <InsightCard 
              icon={<Lightbulb className="text-white/40" />} 
              title="What Could Improve" 
              content={analysis.whatCouldImprove} 
            />
          </div>

          {/* Strategic Actions Panel */}
          <div className="mt-2 p-8 bg-[#0c0c14] border border-white/5 rounded-xl">
            <div className="mb-6">
              <h4 className="font-headline font-bold text-base mb-1">Strategic Actions</h4>
              <p className="text-xs text-muted-foreground">Process these insights into your workflow</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ActionButton icon={<Copy className="h-3 w-3" />} label="Copy Analysis" onClick={copyToClipboard} />
              <ActionButton icon={<FileDown className="h-3 w-3" />} label="Export Report" />
              <ActionButton icon={<Share2 className="h-3 w-3" />} label="Share" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="py-20 text-center border-t border-white/5">
        <h2 className="text-3xl font-headline font-bold mb-8">Ready for the next creative?</h2>
        <Button 
          onClick={onReset}
          className="bg-[#3b82f6] hover:bg-[#2563eb] text-white h-12 px-8 rounded-md font-bold text-sm tracking-wide group"
        >
          Analyze Another Ad <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  )
}

function MetadataChip({ label, value }: { label: string, value: string }) {
  return (
    <div className="px-4 py-2 rounded-full border border-white/5 bg-white/5 flex items-center gap-2">
      <span className="text-[10px] text-white/40 font-medium uppercase tracking-wider">{label}:</span>
      <span className="text-[10px] text-white/80 font-bold uppercase tracking-wider">{value}</span>
    </div>
  )
}

function InsightCard({ icon, title, content }: { icon: React.ReactNode, title: string, content: string }) {
  return (
    <div className="p-6 bg-[#0c0c14] border border-white/5 rounded-xl border-l-2 border-l-[#3b82f6]/30 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded bg-white/5 border border-white/5">
          {React.cloneElement(icon as React.ReactElement, { size: 14 })}
        </div>
        <h4 className="text-[11px] font-bold uppercase tracking-widest text-white/80">{title}</h4>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{content}</p>
    </div>
  )
}

function ActionButton({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick?: () => void }) {
  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={onClick}
      className="bg-white/5 border-white/10 hover:bg-white/10 text-[10px] font-bold uppercase tracking-widest h-9 px-5"
    >
      {icon} <span className="ml-2">{label}</span>
    </Button>
  )
}
