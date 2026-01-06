"use client";
import { motion } from "framer-motion";

const stepEase = (steps: number) => (v: number) => Math.floor(v * steps) / steps;
const RETRO_TRANSITION = {
  type: "tween",
  ease: stepEase(4),
  duration: 0.3
} as const;

export default function Hero({ scrollTo }: { scrollTo: (id: string) => void }) {
  return (
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
          {[...Array(9)].map((_, i) => (
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
          className="border-4 border-[#1a1a1a] bg-[#FFD333] text-black px-12 py-5 font-bold uppercase text-sm shadow-[6px_6px_0px_0px_#1a1a1a] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-none"
        >
          Enter the Studio
        </button>
      </div>
    </section>
  );
}