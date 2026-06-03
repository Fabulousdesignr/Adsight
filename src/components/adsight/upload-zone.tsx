
"use client"

import React, { useState, useCallback } from "react"
import { Upload, Image as ImageIcon, X } from "lucide-react"
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

  const clear = () => {
    setPreview(null)
    onClear()
  }

  if (selectedFile && preview) {
    return (
      <div className="relative group w-full max-w-xl mx-auto">
        <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 glass-card">
          <img src={preview} alt="Preview" className="w-full h-full object-contain" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button variant="destructive" size="icon" onClick={clear} className="rounded-full">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
        </p>
      </div>
    )
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "relative w-full max-w-xl mx-auto aspect-[16/9] flex flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer",
        isDragging 
          ? "border-primary bg-primary/5 scale-[1.02]" 
          : "border-white/10 hover:border-primary/50 hover:bg-white/5",
        "glass-card"
      )}
      onClick={() => document.getElementById("ad-upload")?.click()}
    >
      <input
        type="file"
        id="ad-upload"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      
      <div className="p-4 rounded-full bg-primary/10 mb-4 group-hover:scale-110 transition-transform">
        <Upload className="h-8 w-8 text-primary" />
      </div>
      
      <h3 className="font-headline text-xl mb-1">Drag & Drop Your Ad</h3>
      <p className="text-muted-foreground text-center px-6">
        Supports JPG, PNG, and marketing screenshots.
      </p>
      
      <div className="mt-8 flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-widest">
        <ImageIcon className="h-3 w-3" />
        High Performance AI Review
      </div>
    </div>
  )
}
