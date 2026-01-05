"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';
import { Github, Linkedin, Twitter, Star } from 'lucide-react';
import { Hexagon, Zap, Orbit, Users, ArrowUpRight, Shield, Sun, Moon, Ghost, Send, CheckCircle2 } from "lucide-react";
import KalaSnake from "@/components/kalaSnake";
import { team } from "@/components/team";
import { Menu, X } from 'lucide-react';
import SocialBadge from "@/components/socialBadge";

// --- REFINED COLOR PALETTE (BRIGHTER BUT RETRO) ---
const PHILOSOPHY = {
  north: "#121212", // Deep Charcoal
  south: "#C81927", // Energetic Retro Red
  east: "#E7EBEE",  // Brighter blue
  west: "#FFD333",  // Golden Yellow
  paper: "#f5f5f5",  // Lighter, cleaner aged paper
};


const stepEase = (steps: number) => (v: number) => Math.floor(v * steps) / steps;

const RETRO_TRANSITION = {
  type: "tween",
  ease: stepEase(4), // This creates a "frame-by-frame" movement feel
  duration: 0.3
} as const;

export default function BrumbunMancapat() {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { label: 'Current_Project', id: 'game' },
    { label: 'Philosophy', id: 'about' },
    { label: 'Team', id: 'members' },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("sending");

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("Identity_Name"),
      email: formData.get("Email_Address"),
      message: formData.get("Your_Message"),
    };

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setFormStatus("sent");
      } else {
        throw new Error("Failed to send transmission");
      }
    } catch (error) {
      console.error(error);
      setFormStatus("idle");
      alert("Transmission failed. Check console for details.");
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };


  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#1a1a1a] selection:bg-[#FFD333] selection:text-black overflow-x-hidden">
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

        @keyframes retro-hop {
          0% { transform: translate(0, 0); }
          50% { transform: translate(-2px, -4px); }
          100% { transform: translate(-4px, -8px); }
        }

        @keyframes screen-flash {
          0% { filter: brightness(1); }
          50% { filter: brightness(1.5) contrast(1.2); }
          100% { filter: brightness(1); }
        }

        .gameboy-card-hover:hover {
          animation: retro-hop 0.1s steps(2) forwards;
        }

        .gameboy-card-hover:hover .screen-content {
          animation: screen-flash 0.2s steps(2) italic;
        }

        /* Hard blocky shadow that snaps in */
        .retro-shadow {
          box-shadow: 0 0 0 transparent;
          transition: none;
        }

        .gameboy-card-hover:hover .retro-shadow {
          box-shadow: 8px 8px 0px 0px rgba(0,0,0,0.8);
        }

        .crt-screen {
          position: relative;
          overflow: hidden;
        }

        .crt-screen::before {
          content: " ";
          display: block;
          position: absolute;
          top: 0; left: 0; bottom: 0; right: 0;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), 
                      linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
          z-index: 30;
          background-size: 100% 3px, 3px 100%;
          pointer-events: none;
        }

        /* The Screen Flicker */
        .crt-screen::after {
          content: " ";
          display: block;
          position: absolute;
          top: 0; left: 0; bottom: 0; right: 0;
          background: rgba(18, 16, 16, 0.1);
          opacity: 0;
          z-index: 30;
          pointer-events: none;
          animation: flicker 0.15s infinite;
        }

        .gameboy-screen::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(0,0,0,0.15) 0.5px, transparent 0.5px);
          background-size: 3px 3px; /* Adjust for pixel density */
          z-index: 20;
          pointer-events: none;
        }

        /* Bevel effect for the plastic shell */
        .gameboy-bevel {
          box-shadow: 
            inset 2px 2px 0px rgba(255,255,255,0.3),
            inset -2px -2px 0px rgba(0,0,0,0.2);
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
      <nav className="fixed top-0 w-full z-50 border-b-2 border-[#4a5d5e] bg-[#f0f4f4]/95 backdrop-blur-sm text-[#2d4a53]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* LOGO */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('hero')}>
            <div className="w-6 h-6 bg-[#d1dbdb] border-2 border-[#4a5d5e] flex items-center justify-center">
              <div className="w-2 h-2 bg-[#78a1a0] rounded-sm animate-pulse" />
            </div>
            <span className="font-bold tracking-tighter text-lg uppercase">Brumbun_Studio</span>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex gap-8 text-xs font-bold uppercase items-center">
            {navLinks.map((link, index) => (
              <button 
                key={link.id}
                onClick={() => scrollTo(link.id)} 
                className={`transition-colors ${
                  index % 2 === 1 
                    ? "hover:text-[#FFD333]" 
                    : "hover:text-[#C81927]"
                }`}
              >
                {link.label}
              </button>
            ))}
            <button 
              onClick={() => scrollTo('contact')} 
              className="bg-[#4a5d5e] text-[#f0f4f4] px-4 py-2 hover:bg-[#78a1a0] active:translate-y-1 transition-all"
            >
              Contact
            </button>
          </div>

          {/* MOBILE HAMBURGER BUTTON */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="p-2 text-[#4a5d5e]">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#f0f4f4] border-b-2 border-[#4a5d5e] overflow-hidden"
            >
              <div className="flex flex-col gap-4 p-6 text-xs font-bold uppercase">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => {
                      scrollTo(link.id);
                      setIsOpen(false);
                    }}
                    className="text-left py-2 border-b border-[#d1dbdb] last:border-0"
                  >
                    {link.label}
                  </button>
                ))}
                <button
                  onClick={() => {
                    scrollTo('contact');
                    setIsOpen(false);
                  }}
                  className="bg-[#4a5d5e] text-[#f0f4f4] w-full py-3 mt-2"
                >
                  Contact
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
                <div key={i} className={`border-2 border-[#1a1a1a] ${i === 4 ? 'bg-[#E7EBEE]' : 'bg-white'}`} />
              ))}
            </motion.div>

            <motion.h1 
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={RETRO_TRANSITION}
              className="text-7xl md:text-9xl font-black uppercase leading-[0.85] mb-6"
            >
              Harmony in <br />
              <span className="text-[#E7EBEE] bg-[#C81927] px-4 inline-block transform -skew-x-6">Chaos.</span>
            </motion.h1>

            <p className="text-sm font-bold uppercase tracking-widest mb-10 max-w-lg mx-auto leading-relaxed">
              We forge digital experiences as art, drawing depth from Indonesian heritage to enrich modern play.
            </p>

            <button 
              onClick={() => scrollTo('game')}
              className="border-4 border-[#1a1a1a] bg-[#FFD333] text-black px-12 py-5 font-bold uppercase text-sm shadow-[6px_6px_0px_0px_#1a1a1a] hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-y-1 active:translate-x-1 transition-none"
            >
              Enter the Studio
            </button>
          </div>
        </section>

        {/* 2. SOUTH (RED): CURRENT PROJECT */}
        <section id="game" className="py-32 px-6 bg-[#C81927] border-b-2 border-[#1a1a1a] text-white">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
            
            {/* LEFT COLUMN: THE GAME VIEWPORT */}
            <div className="border-4 border-[#1a1a1a] bg-[#1a1a1a] p-2 shadow-[12px_12px_0px_0px_#FFD333]">
              {/* Changed aspect-video to aspect-square to match the Snake Grid */}
              <div className="aspect-square bg-[#121212] relative overflow-hidden flex items-center justify-center">
                {/* CRT Scanline Overlay */}
                <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(0deg,#C81927,#C81927_1px,transparent_1px,transparent_10px)] z-10 pointer-events-none" />
                
                {/* The Snake Game */}
                <KalaSnake />

                {/* Debug Label - Now positioned relative to the square viewport */}
                <div className="absolute bottom-4 left-4 bg-[#C81927] px-3 py-1 text-[10px] font-bold z-30 border-2 border-[#1a1a1a]">
                  ALPHA_BUILD_V.04
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: NARRATIVE */}
            <div>
              <h2 className="text-xl font-bold uppercase tracking-[0.3em] mb-4 text-[#FFD333]">Direction: South / Brahma</h2>
              <h3 className="text-6xl font-black uppercase mb-8 leading-tight">Project <br />Snake</h3>
              <p className="font-medium text-lg leading-relaxed mb-10 opacity-90">
                A turn-based RPG set in an alternate Java. You don't just fight; you negotiate with spirits, balance your inner elements, and reshape the landscape through ancient rituals.
              </p>
              <button className="bg-[#1a1a1a] text-white px-8 py-4 font-bold uppercase text-xs flex items-center gap-3 hover:bg-[#FFD333] hover:text-black transition-none border-2 border-[#1a1a1a] active:translate-y-1">
                Explore Mechanics <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* 3. WEST (YELLOW): VISION */}
        <section id="about" className="py-32 px-6 bg-[#FFD333] border-b-2 border-[#1a1a1a]">
          <div className="max-w-7xl mx-auto text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4 mb-10">
               <Sun size={40} className="text-[#1a1a1a]" />
               <span className="text-xs font-bold uppercase tracking-[0.4em]">The Brumbun Philosophy</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black uppercase leading-tight mb-12">
              Beyond the <span className="bg-[#1a1a1a] text-[#FFD333] px-3 italic">Mono-culture</span> of modern gaming.
            </h2>
            <div className="grid md:grid-cols-2 gap-12 font-bold text-sm leading-loose uppercase">
              <p>We believe games are the new wayang. They are vessels for stories that have survived for centuries, now updated for a generation that speaks in code and pixels.</p>
              <p>Brumbun means "multi-colored." We refuse to be just one thing. We are technical, we are spiritual, and we are deeply rooted in our soil.</p>
            </div>
          </div>
        </section>

        {/* 4. NORTH (BLACK): THE TEAM */}
        <section id="members" className="py-16 px-6 bg-[#C81927] text-white border-b-2 border-[#1a1a1a]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
              <h3 className="text-6xl font-black uppercase italic tracking-tighter">The_Team</h3>
              <p className="text-[10px] font-mono opacity-50 max-w-xs text-right uppercase">Four corners working in unison to maintain the center.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {team.map((member, i) => (
                <div 
                  key={i} 
                  className="gameboy-card-hover group flex flex-col bg-[#9ca3af] p-3 rounded-tr-[40px] rounded-bl-sm rounded-br-sm rounded-tl-sm border-b-4 border-r-4 border-black/80 relative"
                >
                  {/* THE SCREEN AREA */}
                  <div className="screen-content relative w-full aspect-[5/4] bg-[#9bbc0f] border-4 border-[#1a1a1a] overflow-hidden">
                    
                    {/* Pixel Grid Overlay */}
                    <div className="absolute inset-0 z-20 pointer-events-none opacity-20" 
                        style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '3px 3px' }} />

                    {/* Battery LED - Turns from Dim Red to Bright Red on Hover */}
                    <div className="absolute top-4 left-2 z-30 flex flex-col items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-900 group-hover:bg-red-500 group-hover:shadow-[0_0_5px_red]"></div>
                        <span className="text-[5px] text-[#0f380f] font-bold">PWR</span>
                    </div>

                    <Image
                      src={member.imageurl} 
                      alt={member.name}
                      fill 
                      className="object-cover mix-blend-multiply grayscale contrast-150 brightness-90 group-hover:brightness-110"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </div>

                  {/* PLASTIC CONTROLS AREA */}
                  <div className="pt-5 px-1 flex flex-col flex-grow font-mono">
                    {/* Decorative "Vents" often seen on the bottom right of a Gameboy */}
                    <div className="absolute bottom-4 right-4 flex gap-1 rotate-[45deg] opacity-20">
                        <div className="w-1 h-8 bg-black/50 rounded-full"></div>
                        <div className="w-1 h-8 bg-black/50 rounded-full"></div>
                        <div className="w-1 h-8 bg-black/50 rounded-full"></div>
                    </div>

                    <div className="flex justify-between items-start mb-1">
                        <h4 className="text-xl font-bold text-[#0f380f] leading-none uppercase tracking-tighter">
                          {member.name}
                        </h4>
                    </div>
                    
                    <p className="text-sm font-bold uppercase text-[#306230] mb-3">
                      &gt; {member.role}
                    </p>

                    <p className="text-md text-[#1a1a1a] leading-tight mb-6 line-clamp-3">
                      {member.desc}
                    </p>

                    {/* A/B Styled Buttons */}
                    <div className="mt-auto flex gap-3 pb-2 z-10">
                      {member.socials.github && (
                        <div className="flex flex-col items-center gap-1">
                            <a href={member.socials.github} className="w-9 h-9 rounded-full bg-[#2d2d2d] flex items-center justify-center text-[#9ca3af] border-b-4 border-black active:border-b-0 active:translate-y-1 transition-none">
                                <Github size={16}/>
                            </a>
                            <span className="text-[8px] text-black/60 font-bold">B</span>
                        </div>
                      )}
                      {member.socials.linkedin && (
                        <div className="flex flex-col items-center gap-1">
                            <a href={member.socials.linkedin} className="w-9 h-9 rounded-full bg-[#2d2d2d] flex items-center justify-center text-[#9ca3af] border-b-4 border-black active:border-b-0 active:translate-y-1 transition-none">
                                <Linkedin size={16}/>
                            </a>
                            <span className="text-[8px] text-black/60 font-bold">A</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. EAST (WHITE): CONTACT */}
        <section id="contact" className="py-32 px-6 bg-[#f5f5f5] border-y-8 border-[#1a1a1a] relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 rotate-12"><Star size={120} fill="white" /></div>
          <div className="absolute bottom-10 right-10 -rotate-12"><Star size={160} fill="white" /></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16 -rotate-2">
            <div className="inline-block bg-[#1a1a1a] p-4 mb-6 skew-x-[-10deg]">
              <Ghost className="text-white animate-pulse" size={64} />
            </div>
            
            <h2 className="text-7xl font-black uppercase mb-4 text-[#C81927] drop-shadow-[6px_6px_0px_#1a1a1a] tracking-tighter italic">
              Take Your <span className="bg-[#C81927] text-[#1a1a1a] px-2 not-italic">Heart</span>
            </h2>
            <p className="text-sm font-black uppercase text-white bg-[#1a1a1a] inline-block px-4 py-1 skew-x-[15deg]">
              Transmission Channel: Open
            </p>
          </div>
          
          <AnimatePresence mode="wait">
            {formStatus === 'sent' ? (
              <motion.div 
                initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                className="bg-white text-[#1a1a1a] p-12 text-center border-8 border-[#1a1a1a] shadow-[20px_20px_0px_0px_#1a1a1a] relative"
              >
                <CheckCircle2 size={80} className="mx-auto mb-4 text-[#C81927]" />
                <h3 className="text-5xl font-black uppercase mb-2 italic">Target Captured</h3>
                <p className="text-lg uppercase font-bold">Your message has been logged in the metaverse.</p>
                <button 
                  onClick={() => setFormStatus('idle')} 
                  className="mt-8 bg-[#1a1a1a] text-white px-8 py-3 font-black hover:bg-[#FFD333] hover:text-[#1a1a1a] transition-colors uppercase skew-x-[-10deg]"
                >
                  Send Another?
                </button>
              </motion.div>
            ) : (
              <motion.form 
                onSubmit={handleSubmit}
                exit={{ x: '-100vw', rotate: -20 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="space-y-8"
              >
                {/* Name Field */}
                <div className="relative rotate-[-1deg]">
                  <label className="absolute -top-4 left-4 bg-[#FFD333] text-[#1a1a1a] text-xs font-black uppercase px-2 py-1 z-20 skew-x-[-10deg] border-2 border-[#1a1a1a]">
                    Identity_Name
                  </label>
                  <input 
                    required 
                    type="text" 
                    name="Identity_Name"                    
                    placeholder="WHO ARE YOU?"
                    className="w-full bg-white border-4 border-[#1a1a1a] p-6 outline-none focus:ring-4 focus:ring-[#FFD333] font-black text-xl uppercase placeholder:opacity-30 shadow-[10px_10px_0px_0px_#1a1a1a]" 
                  />
                </div>

                {/* Email Field */}
                <div className="relative rotate-[1.5deg]">
                  <label className="absolute -top-4 left-4 bg-white text-[#1a1a1a] text-xs font-black uppercase px-2 py-1 z-20 skew-x-[5deg] border-2 border-[#1a1a1a]">
                    Contact_Coordinates
                  </label>
                  <input 
                    required 
                    type="email" 
                    name="Email_Address"
                    placeholder="EMAIL@METAVERSE.COM"
                    className="w-full bg-[#1a1a1a] border-4 border-white p-6 outline-none focus:bg-[#C81927] text-white font-black text-xl uppercase placeholder:opacity-30 shadow-[10px_10px_0px_0px_#fff]" 
                  />
                </div>

                {/* Message Field */}
                
                <div className="relative rotate-[-0.5deg]">
                  <label className="absolute -top-4 left-4 bg-[#1a1a1a] text-white text-xs font-black uppercase px-2 py-1 z-20 border-2 border-white">
                    Manifesto_Content
                  </label>
                  <textarea 
                    required 
                    rows={4} 
                    placeholder="STATE YOUR INTENTIONS..."
                    name="Your_Message"                    
                    className="w-full bg-white border-4 border-[#1a1a1a] p-6 outline-none focus:ring-4 focus:ring-[#FFD333] font-black text-xl uppercase placeholder:opacity-30 shadow-[10px_10px_0px_0px_#1a1a1a]" 
                  />
                </div>

                {/* Submit Button */}
                <button 
                  disabled={formStatus === 'sending'}
                  className="group relative w-full bg-[#1a1a1a] text-white py-8 font-black uppercase text-2xl overflow-hidden shadow-[12px_12px_0px_0px_#FFD333] active:translate-y-2 active:shadow-none transition-all"
                >
                  <div className="absolute inset-0 bg-[#C81927] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-200" />
                  <span className="relative z-10 flex items-center justify-center gap-4 group-hover:text-[#1a1a1a]">
                    {formStatus === 'sending' ? (
                      'Executing...'
                    ) : (
                      <>
                        <Send size={28} strokeWidth={3} /> 
                        Initiate Mission
                      </>
                    )}
                  </span>
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>
      </main>

      <footer className="py-20 bg-[#121212] text-center text-white border-t-2 border-[#1a1a1a]">
        <div className="flex justify-center gap-8 mb-10">
           <Hexagon className="text-[#C81927] fill-current" size={20} />
           <Hexagon className="text-[#FFD333] fill-current" size={20} />
           <Hexagon className="text-[#E7EBEE] fill-current" size={20} />
        </div>
        <p className="text-[20px] font-bold uppercase">
          © 2026 Brumbun Studio — Crafted in Depok, Indonesia
        </p>
      </footer>
    </div>
  );
}