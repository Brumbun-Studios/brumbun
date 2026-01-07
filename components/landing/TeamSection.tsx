import Image from 'next/image';
import { Github, Linkedin, Twitter, Instagram, Dribbble } from 'lucide-react';
import { team } from "@/components/team";

export default function TeamSection() {
  return (
    <section id="members" className="py-16 px-6 bg-[#C81927] text-white border-b-2 border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <h3 className="text-6xl font-black uppercase italic tracking-tighter">The_Team</h3>
          <p className="text-[10px] font-mono opacity-50 uppercase">Four corners working in unison to maintain the center.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {team.map((member, i) => (
            <div key={i} className="gameboy-card-hover group flex flex-col bg-[#9ca3af] p-3 rounded-tr-[40px] border-b-4 border-r-4 border-black/80 relative">
              <div className="screen-content relative w-full aspect-[5/4] bg-[#9bbc0f] border-4 border-[#1a1a1a] overflow-hidden">
                 <div className="absolute top-4 left-2 z-30 flex flex-col items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-900 group-hover:bg-red-500"></div>
                 </div>
                 <Image src={member.imageurl} alt={member.name} fill className="object-cover mix-blend-multiply grayscale contrast-150" />
              </div>
              <div className="pt-5 px-1 font-mono">
                <h4 className="text-xl font-bold text-[#0f380f] uppercase">{member.name}</h4>
                <p className="text-sm font-bold uppercase text-[#306230] mb-3">&gt; {member.role}</p>
                <p className="text-md text-[#1a1a1a] line-clamp-3 mb-6">{member.desc}</p>
                <div className="flex gap-3">
                  {member.socials.github && (
                    <SocialButton icon={<Github size={16}/>} label="GitHub" href={member.socials.github} />
                  )}
                  {member.socials.linkedin && (
                    <SocialButton icon={<Linkedin size={16}/>} label="LinkedIn" href={member.socials.linkedin} />
                  )}
                  {member.socials.twitter && (
                    <SocialButton icon={<Twitter size={16}/>} label="Twitter" href={member.socials.twitter} />
                  )}
                  {member.socials.instagram && (
                    <SocialButton icon={<Instagram size={16}/>} label="Instagram" href={member.socials.instagram} />
                  )}
                  {member.socials.dribbble && (
                    <SocialButton icon={<Dribbble size={16}/>} label="Dribbble" href={member.socials.dribbble} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialButton({ icon, label, href }: { icon: React.ReactNode, label: string, href: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <a href={href} className="w-9 h-9 rounded-full bg-[#2d2d2d] flex items-center justify-center text-[#9ca3af] border-b-4 border-black active:translate-y-1">
        {icon}
      </a>
      <span className="text-[8px] text-black/60 font-bold">{label}</span>
    </div>
  );
}