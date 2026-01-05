"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';
import { Github, Linkedin, Twitter, Globe } from 'lucide-react';
import { Hexagon, Zap, Orbit, Users, ArrowUpRight, Shield, Sun, Moon, Ghost, Send, CheckCircle2 } from "lucide-react";
import KalaSnake from "@/components/kalaSnake";
import { team } from "@/components/team";

// --- REFINED COLOR PALETTE (BRIGHTER BUT RETRO) ---
const PHILOSOPHY = {
  north: "#121212", // Deep Charcoal
  south: "#e63946", // Energetic Retro Red
  east: "#F8F9FA",  // Brighter blue
  west: "#ffef00",  // Golden Yellow
  paper: "#f5f5f5",  // Lighter, cleaner aged paper
};

const stepEase = (steps: number) => (v: number) => Math.floor(v * steps) / steps;

const RETRO_TRANSITION = {
  type: "tween",
  ease: stepEase(4), // This creates a "frame-by-frame" movement feel
  duration: 0.3
} as const;

const INSTANT_TRANSITION = {
  type: "tween",
  duration: 0 // For immediate "clicky" feedback
};

export default function BrumbunMancapat() {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    setTimeout(() => setFormStatus("sent"), 1500);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const SocialBadge = ({ icon }: { icon: React.ReactNode }) => (
    <button className="p-2 bg-slate-800 ...">
      {icon}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#1a1a1a] selection:bg-[#ffef00] selection:text-black overflow-x-hidden">
      {/* --- FONT & CRT OVERLAYS --- */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=VT323&display=swap');
        
        h1, h2, h3, .retro-header { font-family: 'VT323', monospace; }
        body, p, button, input, textarea { font-family: 'Space Mono', monospace; }
        
        @keyframes flicker {
          0% { opacity: 0.18; }
          5% { opacity: 0.22; }
          10% { opacity: 0.19; }
          15% { opacity: 0.25; }
          25% { opacity: 0.18; }
          30% { opacity: 0.22; }
          100% { opacity: 0.19; }
        }
          
        .crt-line {
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), 
                      linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03));
          background-size: 100% 4px, 3px 100%;
          animation: flicker 0.15s infinite;
        }
      `}</style>

      <div className="fixed inset-0 pointer-events-none z-[100] opacity-20 crt-line" />

      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 w-full z-50 border-b-2 border-[#1a1a1a] bg-[#f5f5f5]/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('hero')}>
            <div className="w-6 h-6 bg-[#F8F9FA] border-2 border-[#1a1a1a] flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-sm animate-pulse" />
            </div>
            <span className="font-bold tracking-tighter text-lg uppercase">Brumbun_Studio</span>
          </div>
          
          <div className="hidden md:flex gap-8 text-xs font-bold uppercase">
            <button onClick={() => scrollTo('game')} className="hover:text-[#e63946] transition-colors">Current_Project</button>
            <button onClick={() => scrollTo('about')} className="hover:text-[#ffef00] transition-colors">Philosophy</button>
            <button onClick={() => scrollTo('members')} className="hover:text-[#e63946] transition-colors">Team</button>
            <button onClick={() => scrollTo('contact')} className="bg-[#1a1a1a] text-white px-3 py-1 hover:bg-[#ffef00] active:translate-y-1 active:translate-x-1 transition-none">Contact</button>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        
        {/* 1. HERO: THE CENTER */}
        <section id="hero" className="relative min-h-[90vh] flex items-center justify-center border-b-2 border-[#1a1a1a] bg-[#f5f5f5]">
          <div className="absolute inset-0 flex items-center justify-center opacity-5">
            <div className="w-[800px] h-[800px] border-2 border-[#1a1a1a] rounded-full flex items-center justify-center">
              <div className="w-full h-px bg-[#1a1a1a] rotate-45 absolute" />
              <div className="w-full h-px bg-[#1a1a1a] -rotate-45 absolute" />
            </div>
          </div>

          <div className="relative z-10 text-center px-6">
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={RETRO_TRANSITION}
              className="grid grid-cols-3 grid-rows-3 gap-1 w-20 h-20 mx-auto mb-10"
            >
              {[0,1,2,3,4,5,6,7,8].map(i => (
                <div key={i} className={`border-2 border-[#1a1a1a] ${i === 4 ? 'bg-[#F8F9FA]' : 'bg-white'}`} />
              ))}
            </motion.div>

            <motion.h1 
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={RETRO_TRANSITION}
              className="text-7xl md:text-9xl font-black uppercase leading-[0.85] mb-6"
            >
              Harmony in <br />
              <span className="text-[#F8F9FA] bg-[#e63946] px-4 inline-block transform -skew-x-6">Chaos.</span>
            </motion.h1>

            <p className="text-sm font-bold uppercase tracking-widest mb-10 max-w-lg mx-auto leading-relaxed">
              We build artifacts of play where Indonesian heritage meets modern mechanics.
            </p>

            <button 
              onClick={() => scrollTo('game')}
              className="border-4 border-[#1a1a1a] bg-[#ffef00] text-black px-12 py-5 font-bold uppercase text-sm shadow-[6px_6px_0px_0px_#1a1a1a] hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-y-1 active:translate-x-1 transition-none"
            >
              Enter the Studio
            </button>
          </div>
        </section>

        {/* 2. SOUTH (RED): CURRENT PROJECT */}
        <section id="game" className="py-32 px-6 bg-[#e63946] border-b-2 border-[#1a1a1a] text-white">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
            
            {/* LEFT COLUMN: THE GAME VIEWPORT */}
            <div className="border-4 border-[#1a1a1a] bg-[#1a1a1a] p-2 shadow-[12px_12px_0px_0px_#ffef00]">
              {/* Changed aspect-video to aspect-square to match the Snake Grid */}
              <div className="aspect-square bg-[#121212] relative overflow-hidden flex items-center justify-center">
                {/* CRT Scanline Overlay */}
                <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(0deg,#e63946,#e63946_1px,transparent_1px,transparent_10px)] z-10 pointer-events-none" />
                
                {/* The Snake Game */}
                <KalaSnake />

                {/* Debug Label - Now positioned relative to the square viewport */}
                <div className="absolute bottom-4 left-4 bg-[#e63946] px-3 py-1 text-[10px] font-bold z-30 border-2 border-[#1a1a1a]">
                  ALPHA_BUILD_V.04
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: NARRATIVE */}
            <div>
              <h2 className="text-xl font-bold uppercase tracking-[0.3em] mb-4 text-[#ffef00]">Direction: South / Brahma</h2>
              <h3 className="text-6xl font-black uppercase mb-8 leading-tight">Project <br />Kala_Tactics</h3>
              <p className="font-medium text-lg leading-relaxed mb-10 opacity-90">
                A turn-based RPG set in an alternate Java. You don't just fight; you negotiate with spirits, balance your inner elements, and reshape the landscape through ancient rituals.
              </p>
              <button className="bg-[#1a1a1a] text-white px-8 py-4 font-bold uppercase text-xs flex items-center gap-3 hover:bg-[#ffef00] hover:text-black transition-none border-2 border-[#1a1a1a] active:translate-y-1">
                Explore Mechanics <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* 3. WEST (YELLOW): VISION */}
        <section id="about" className="py-32 px-6 bg-[#ffef00] border-b-2 border-[#1a1a1a]">
          <div className="max-w-4xl mx-auto text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4 mb-10">
               <Sun size={40} className="text-[#1a1a1a]" />
               <span className="text-xs font-bold uppercase tracking-[0.4em]">The Brumbun Philosophy</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black uppercase leading-tight mb-12">
              Beyond the <span className="bg-[#1a1a1a] text-[#ffef00] px-3 italic">Mono-culture</span> of modern gaming.
            </h2>
            <div className="grid md:grid-cols-2 gap-12 font-bold text-sm leading-loose uppercase">
              <p>We believe games are the new wayang. They are vessels for stories that have survived for centuries, now updated for a generation that speaks in code and pixels.</p>
              <p>Brumbun means "multi-colored." We refuse to be just one thing. We are technical, we are spiritual, and we are deeply rooted in our soil.</p>
            </div>
          </div>
        </section>

        {/* 4. NORTH (BLACK): THE TEAM */}
        <section id="members" className="py-32 px-6 bg-[#121212] text-white border-b-2 border-[#1a1a1a]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
               <h3 className="text-6xl font-black uppercase italic tracking-tighter">The_Team</h3>
               <p className="text-[10px] font-mono opacity-50 max-w-xs text-right uppercase">Four corners working in unison to maintain the center.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, i) => (
                <div 
                  key={i} 
                  className="flex flex-col bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-500 active:translate-y-1 active:translate-x-1 transition-none duration-300 shadow-xl"
                >
                  <div className="w-full aspect-[4/5] relative group overflow-hidden bg-slate-800">
                    {/* The Actual Image */}
                    <Image
                      src={member.imageurl} 
                      alt={member.name}
                      fill 
                      className="object-cover transition-transform duration-200 ease-[steps(2,end)] group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />

                    {/* 2. Cool Tone Gradient Overlay */}
                    {/* This makes the bottom of the image darker so the name is easier to read */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent z-10" />
                    
                    {/* 3. Subtle Cool Tone Border (inner) */}
                    <div className="absolute inset-0 border border-white/5 z-20 pointer-events-none" />
                  </div>

                  {/* 2. Content Area */}
                  <div className="p-6 flex flex-col flex-grow text-left">
                    {/* Name - Big & Bold */}
                    <h4 className="text-3xl font-bold text-slate-100 tracking-tight mb-1">
                      {member.name}
                    </h4>
                    
                    {/* Position */}
                    <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400 mb-4">
                      {member.role}
                    </p>

                    {/* Description */}
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                      {member.desc}
                    </p>

                    {/* 3. Social Media Badges */}
                    <div className="mt-auto flex gap-3">
                      {member.socials.includes('github') && <SocialBadge icon={<Github size={14}/>} />}
                      {member.socials.includes('linkedin') && <SocialBadge icon={<Linkedin size={14}/>} />}
                      {member.socials.includes('twitter') && <SocialBadge icon={<Twitter size={14}/>} />}
                      {member.socials.includes('globe') && <SocialBadge icon={<Globe size={14}/>} />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. EAST (WHITE): CONTACT */}
        <section id="contact" className="py-32 px-6 bg-[#F8F9FA] border-b-2 border-[#1a1a1a]">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-16">
              <Ghost className="mx-auto mb-6 text-[#F8F9FA]" size={48} />
              <h2 className="text-5xl font-black uppercase mb-4">Let's Connect</h2>
              <p className="text-xs font-bold uppercase opacity-60">Send a transmission to the studio</p>
            </div>
            
            <AnimatePresence mode="wait">
              {formStatus === 'sent' ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0, 1, 1] }} // Simple flicker effect
                  transition={{ duration: 0.3, times: [0, 0.2, 0.4, 0.6, 1] }}
                  className="bg-[#1a1a1a] text-white p-12 text-center border-4 border-[#1a1a1a]"
                >
                  <CheckCircle2 size={48} className="mx-auto mb-4 text-[#ffef00]" />
                  <h3 className="text-3xl font-black uppercase mb-2">Message Logged</h3>
                  <p className="text-sm uppercase font-bold">We will reach out shortly.</p>
                  <button onClick={() => setFormStatus('idle')} className="mt-8 underline text-xs uppercase font-black">Send another?</button>
                </motion.div>
              ) : (
                <motion.form 
                  onSubmit={handleSubmit}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.1 }} // Fast exit
                  className="space-y-6"
                >
                  <div className="group">
                    <label className="block text-[10px] font-black uppercase mb-2 ml-1">Identity_Name</label>
                    <input required type="text" className="w-full bg-white border-2 border-[#1a1a1a] p-4 outline-none focus:bg-[#ffef00] active:translate-y-1 active:translate-x-1 transition-none font-bold" />
                  </div>
                  <div className="group">
                    <label className="block text-[10px] font-black uppercase mb-2 ml-1">Email_Address</label>
                    <input required type="email" className="w-full bg-white border-2 border-[#1a1a1a] p-4 outline-none focus:bg-[#ffef00] active:translate-y-1 active:translate-x-1 transition-none font-bold" />
                  </div>
                  <div className="group">
                    <label className="block text-[10px] font-black uppercase mb-2 ml-1">Your_Message</label>
                    <textarea required rows={4} className="w-full bg-white border-2 border-[#1a1a1a] p-4 outline-none focus:bg-[#ffef00] active:translate-y-1 active:translate-x-1 transition-none font-bold" />
                  </div>
                  <button 
                    disabled={formStatus === 'sending'}
                    className="w-full bg-[#1a1a1a] text-white py-5 font-black uppercase text-sm flex items-center justify-center gap-4 hover:bg-[#e63946] disabled:opacity-50 active:translate-y-1 active:translate-x-1 transition-none shadow-[6px_6px_0px_0px_#F8F9FA]"
                  >
                    {formStatus === 'sending' ? 'Sending...' : <><Send size={18} /> Push Transmission</>}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <footer className="py-20 bg-[#e63946] text-center border-t-2 border-[#1a1a1a]">
        <div className="flex justify-center gap-8 mb-10">
           <Hexagon className="text-[#e63946] fill-current" size={20} />
           <Hexagon className="text-[#ffef00] fill-current" size={20} />
           <Hexagon className="text-[#121212] fill-current" size={20} />
           <Hexagon className="text-[#F8F9FA] fill-current" size={20} />
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-60">
          © 2026 Brumbun Studio — Crafted in Depok, Indonesia
        </p>
      </footer>
    </div>
  );
}