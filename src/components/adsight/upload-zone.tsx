"use client"

import React, { useState, useCallback } from "react"
import { Upload, X, ImagePlus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface UploadZoneProps {
  onFileSelect: (file: File) => void
  onClear: () => void
  selectedFile: File | null
}

export function UploadZone({ onFileSelect, onClear, selectedFile }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files && files[0] && files[0].type.startsWith("image/")) {
      processFile(files[0])
    }
  }, [])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      processFile(files[0])
    }
  }, [])

  const processFile = (file: File) => {
    onFileSelect(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const clear = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPreview(null)
    onClear()
  }

  return (
    <div className="relative group max-w-4xl mx-auto">
      {/* Intense Blue Outer Glow */}
      <div className="absolute -inset-1.5 bg-[#3b82f6]/30 blur-2xl rounded-[2rem] opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !selectedFile && document.getElementById("ad-upload")?.click()}
        className={cn(
          "relative w-full min-h-[440px] flex flex-col items-center justify-center rounded-2xl border transition-all duration-500",
          isDragging 
            ? "border-[#3b82f6] bg-[#3b82f6]/5 scale-[1.005]" 
            : "border-white/10 bg-[#0c0c14]",
          !selectedFile && "cursor-pointer hover:border-white/20"
        )}
      >
        <input
          type="file"
          id="ad-upload"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        
        {selectedFile && preview ? (
          <div className="relative w-full h-full p-6 group/preview">
            <img src={preview} alt="Preview" className="w-full max-h-[400px] object-contain rounded-lg" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
              <Button variant="destructive" size="icon" onClick={clear} className="rounded-full h-12 w-12">
                <X className="h-6 w-6" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center p-12">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-10">
               <ImagePlus className="w-8 h-8 text-white/40" />
            </div>
            
            <h3 className="font-headline text-2xl font-bold mb-4 tracking-tight">Upload Advertisement</h3>
            <p className="text-muted-foreground text-base max-w-sm mx-auto mb-12 leading-relaxed opacity-80">
              Upload a social media ad, flyer, poster, or marketing creative for AI analysis.
            </p>
            
            <Button 
              className="bg-white text-black hover:bg-white/90 px-10 h-12 rounded-md font-bold text-xs uppercase tracking-[0.15em] shadow-xl mb-8"
              onClick={(e) => {
                e.stopPropagation();
                document.getElementById("ad-upload")?.click();
              }}
            >
              Choose File
            </Button>
            
            <p className="text-[11px] text-muted-foreground/40 uppercase tracking-[0.2em] font-medium">
              Supported formats: JPG, PNG, Screenshots
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
