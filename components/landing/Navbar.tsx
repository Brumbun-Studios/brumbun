"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar({ scrollTo }: { scrollTo: (id: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { label: 'Current_Project', id: 'game' },
    { label: 'Philosophy', id: 'about' },
    { label: 'Team', id: 'members' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 border-b-2 border-[#4a5d5e] bg-[#f0f4f4]/95 backdrop-blur-sm text-[#2d4a53]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('hero')}>
          <div className="w-6 h-6 bg-[#d1dbdb] border-2 border-[#4a5d5e] flex items-center justify-center">
            <div className="w-2 h-2 bg-[#78a1a0] rounded-sm animate-pulse" />
          </div>
          <span className="font-bold tracking-tighter text-lg uppercase">Brumbun_Studio</span>
        </div>

        <div className="hidden md:flex gap-8 text-xs font-bold uppercase items-center">
          {navLinks.map((link, i) => (
            <button key={link.id} onClick={() => scrollTo(link.id)} 
              className={`transition-colors ${i % 2 === 1 ? "hover:text-[#FFD333]" : "hover:text-[#C81927]"}`}>
              {link.label}
            </button>
          ))}
          <button onClick={() => scrollTo('contact')} className="bg-[#4a5d5e] text-[#f0f4f4] px-4 py-2 hover:bg-[#78a1a0]">
            Contact
          </button>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="md:hidden bg-[#f0f4f4]/95 border-b-2 border-[#4a5d5e] overflow-hidden">
            <div className="flex flex-col gap-4 p-6 text-xs font-bold uppercase">
              {navLinks.map((link) => (
                // Replace the mobile button onClick with this:
                <button 
                key={link.id} 
                onClick={() => { 
                    setIsOpen(false); 
                    // Small delay to let the state update settle
                    setTimeout(() => {
                    scrollTo(link.id);
                    }, 100); 
                }} 
                className="text-left py-2 border-b border-[#d1dbdb]"
                >
                {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}