import { Sun } from "lucide-react";

export default function Philosophy() {
  return (
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
  );
}