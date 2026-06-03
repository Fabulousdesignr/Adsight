"use client"

import React, { useState, useCallback } from "react"
import { Upload, X } from "lucide-react"
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
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => !selectedFile && document.getElementById("ad-upload")?.click()}
      className={cn(
        "relative w-full aspect-[2/1] min-h-[400px] flex flex-col items-center justify-center rounded-2xl border transition-all duration-500",
        isDragging 
          ? "border-[#3b82f6] bg-[#3b82f6]/5 scale-[1.01]" 
          : "border-[#3b82f6]/30 bg-[#080810]/60",
        "shadow-[0_0_80px_rgba(59,130,246,0.1)]",
        !selectedFile && "cursor-pointer hover:border-[#3b82f6]/60"
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
        <div className="relative w-full h-full p-4 group">
          <img src={preview} alt="Preview" className="w-full h-full object-contain rounded-lg" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
            <Button variant="destructive" size="icon" onClick={clear} className="rounded-full">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center p-12">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-8 shadow-inner">
             <div className="w-6 h-6 border-2 border-[#3b82f6]/60 rounded-sm relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#3b82f6]" />
             </div>
          </div>
          
          <h3 className="font-headline text-2xl font-bold mb-3 tracking-tight">Upload Advertisement</h3>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-10 leading-relaxed">
            Upload a social media ad, flyer, poster, or marketing creative for AI analysis.
          </p>
          
          <Button 
            className="bg-white text-black hover:bg-gray-100 px-8 h-11 rounded-md font-bold text-xs uppercase tracking-widest shadow-lg mb-6"
            onClick={() => document.getElementById("ad-upload")?.click()}
          >
            Choose File
          </Button>
          
          <p className="text-[10px] text-muted-foreground/60 uppercase tracking-widest">
            Supported formats: JPG, PNG, Screenshots
          </p>
        </div>
      )}
    </div>
  )
}
