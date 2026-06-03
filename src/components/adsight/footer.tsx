"use client"

import React from "react"

export function Footer() {
  return (
    <footer className="py-12 border-t border-white/5 bg-[#040408]">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-[#3b82f6] rounded-sm" />
              <span className="font-headline font-bold text-sm tracking-tight">AdSight</span>
            </div>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
              © 2024 AdSight Intelligence
            </span>
          </div>
          
          <nav className="flex items-center gap-8">
            <a href="#" className="text-[10px] text-muted-foreground uppercase tracking-widest hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-[10px] text-muted-foreground uppercase tracking-widest hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-[10px] text-muted-foreground uppercase tracking-widest hover:text-white transition-colors">Contact Support</a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
