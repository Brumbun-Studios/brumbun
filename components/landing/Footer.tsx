import { Hexagon } from "lucide-react";

export default function Footer() {
  return (
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
  );
}