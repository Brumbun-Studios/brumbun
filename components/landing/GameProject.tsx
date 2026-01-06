import { ArrowUpRight } from "lucide-react";
import KalaSnake from "@/components/kalaSnake";

export default function GameProject() {
  return (
    <section id="game" className="py-32 px-6 bg-[#C81927] border-b-2 border-[#1a1a1a] text-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        
        <div className="border-4 border-[#1a1a1a] bg-[#1a1a1a] p-2 shadow-[12px_12px_0px_0px_#FFD333]">
          <div className="aspect-square bg-[#121212] relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(0deg,#C81927,#C81927_1px,transparent_1px,transparent_10px)] z-10 pointer-events-none" />
            
            <KalaSnake />

            <div className="absolute bottom-4 left-4 bg-[#C81927] px-3 py-1 text-[10px] font-bold z-30 border-2 border-[#1a1a1a]">
              ALPHA_BUILD_V.04
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold uppercase tracking-[0.3em] mb-4 text-[#FFD333]">Direction: South / Brahma</h2>
          <h3 className="text-6xl font-black uppercase mb-8 leading-tight">Project <br />Snake</h3>
          <p className="font-medium text-lg leading-relaxed mb-10 opacity-90">
            A turn-based RPG set in an alternate Java. You don't just fight; you negotiate with spirits, balance your inner elements, and reshape the landscape through ancient rituals.
          </p>
          <button className="bg-[#1a1a1a] text-white px-8 py-4 font-bold uppercase text-xs flex items-center gap-3 hover:bg-[#FFD333] hover:text-black border-2 border-[#1a1a1a] transition-none">
            Explore Mechanics <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}