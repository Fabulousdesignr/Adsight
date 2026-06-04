"use client"

import React from "react"

export function Footer() {
  return (
    <footer className="py-12 border-t border-white/5 bg-[#040408]">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-[#3b82f6] rounded flex items-center justify-center">
                <div className="w-2.5 h-2.5 border-2 border-white rotate-45" />
              </div>
              <span className="font-headline font-bold text-sm tracking-tight">AdSight</span>
            </div>
            <span className="text-[10px] text-white/20 uppercase tracking-[0.2em]">
              © 2024 AdSight Intelligence
            </span>
          </div>
          
          <nav className="flex items-center gap-10">
            <a href="#" className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-medium hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-medium hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-medium hover:text-white transition-colors">Contact Support</a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
