
"use client"

import React from "react"
import { Zap, Github, Twitter, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-20 border-t border-white/5 bg-background">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 font-headline font-bold text-2xl mb-6">
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
                <Zap className="text-white h-6 w-6 fill-white" />
              </div>
              <span>AdSight</span>
            </div>
            <p className="text-muted-foreground max-w-sm mb-8">
              Revolutionizing advertisement creative analysis with state-of-the-art vision models. 
              Built for performance marketing teams.
            </p>
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 cursor-pointer">
                <Twitter className="h-5 w-5" />
              </div>
              <div className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 cursor-pointer">
                <Github className="h-5 w-5" />
              </div>
              <div className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 cursor-pointer">
                <Linkedin className="h-5 w-5" />
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-headline font-bold mb-6 uppercase tracking-widest text-xs text-primary">Platform</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="hover:text-primary cursor-pointer transition-colors">Creative Auditor</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Pricing</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Integrations</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Enterprise</li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold mb-6 uppercase tracking-widest text-xs text-primary">Resources</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="hover:text-primary cursor-pointer transition-colors">Documentation</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Marketing Blog</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Terms of Service</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 AdSight AI. All creative rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            System Status: Fully Operational
          </div>
        </div>
      </div>
    </footer>
  )
}
