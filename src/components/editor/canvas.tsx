"use client";

import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Sparkles, Save, Share2, Download, Settings } from "lucide-react";
import { useState } from "react";

export function Canvas() {
  const [showAi, setShowAi] = useState(false);

  return (
    <div className="relative w-full h-full z-0">
      <Tldraw 
        inferDarkMode
        persistenceKey="systempad-board"
      />
      
      {/* Premium Overlay UI */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-3">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAi(!showAi)}
          className="w-12 h-12 bg-black border border-[#27272A] rounded-2xl flex items-center justify-center text-[#D4A853] shadow-2xl hover:bg-[#D4A853] hover:text-black transition-all group relative"
        >
          <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
          <div className="absolute left-14 px-3 py-1 bg-black border border-[#27272A] rounded-lg text-[10px] font-bold text-[#F5F5F5] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none uppercase tracking-widest">
            AI Assistant
          </div>
        </motion.button>
        
        <Link href="/dashboard" className="w-12 h-12 bg-black border border-[#27272A] rounded-2xl flex items-center justify-center text-[#A1A1AA] shadow-2xl hover:text-[#F5F5F5] transition-all group relative">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <div className="absolute left-14 px-3 py-1 bg-black border border-[#27272A] rounded-lg text-[10px] font-bold text-[#F5F5F5] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none uppercase tracking-widest">
            Back to Dashboard
          </div>
        </Link>
      </div>

      {/* Dynamic Top Bar (Board Title & Actions) */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <div className="flex items-center bg-black/80 backdrop-blur-md border border-[#27272A] rounded-2xl p-1 shadow-2xl">
           <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-[#A1A1AA] hover:text-[#F5F5F5] hover:bg-[#1A1A1B] transition-all">
             <Save className="w-3.5 h-3.5" />
             Save
           </button>
           <div className="w-px h-6 bg-[#27272A] mx-1" />
           <button className="p-2.5 rounded-xl text-[#A1A1AA] hover:text-[#F5F5F5] hover:bg-[#1A1A1B] transition-all">
             <Share2 className="w-4 h-4" />
           </button>
           <button className="p-2.5 rounded-xl text-[#A1A1AA] hover:text-[#F5F5F5] hover:bg-[#1A1A1B] transition-all">
             <Download className="w-4 h-4" />
           </button>
           <button className="p-2.5 rounded-xl text-[#A1A1AA] hover:text-[#F5F5F5] hover:bg-[#1A1A1B] transition-all">
             <Settings className="w-4 h-4" />
           </button>
        </div>
        
        <button className="btn-primary py-2 px-6 shadow-2xl">
          Publish
        </button>
      </div>

      {/* AI Assistant Sidebar/Modal */}
      <AnimatePresence>
        {showAi && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute bottom-6 right-6 w-96 h-[500px] z-30 flex flex-col"
          >
            <div className="flex-grow glass-card border border-[#D4A853]/20 bg-black shadow-[0_0_50px_rgba(212,168,83,0.1)] rounded-3xl overflow-hidden flex flex-col">
               <div className="p-6 border-b border-[#27272A] flex items-center justify-between bg-gradient-to-r from-[#D4A853]/5 to-transparent">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#D4A853] flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-black" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-fg mb-2">AI Assistant</h3>
                      <p className="text-[#A1A1AA] text-sm max-w-sm mb-8">
                        Describe your system or ask for patterns.
                      </p>
                      <span className="text-[10px] text-green-500 font-bold uppercase tracking-wider">Ready to spark</span>
                    </div>
                    </div>
                  <button onClick={() => setShowAi(false)} className="text-[#A1A1AA] hover:text-[#F5F5F5] transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
               </div>
               
                <div className="flex-grow p-6 overflow-y-auto space-y-6">
                  <div className="p-4 bg-[#141415] border border-[#27272A] rounded-2xl text-xs text-[#A1A1AA] leading-relaxed">
                    Describe your architecture and I&apos;ll generate the components for you.
                    <br/><br/>
                    <span className="text-[#D4A853]">Example:</span> &quot;Generate a multi-region Kafka cluster&quot;
                  </div>
                </div>

               <div className="p-4 bg-[#0A0A0B] border-t border-[#27272A]">
                 <div className="relative">
                   <textarea 
                     placeholder="How can I help you design?" 
                     className="w-full bg-[#141415] border border-[#27272A] rounded-2xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-[#D4A853]/50 transition-all placeholder:text-[#52525B] resize-none h-24"
                   />
                   <button className="absolute bottom-3 right-3 w-8 h-8 bg-[#D4A853] rounded-xl flex items-center justify-center text-black hover:scale-110 active:scale-95 transition-all">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                     </svg>
                   </button>
                 </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
