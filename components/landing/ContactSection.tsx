"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Ghost, Send, CheckCircle2, Star } from "lucide-react";

export default function ContactSection() {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">("idle");

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

  return (
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
  );
}

function FormField({ label, name, placeholder, rotate, isDark = false }: any) {
  const colorClass = isDark ? "bg-[#1a1a1a] text-white border-white" : "bg-white text-[#1a1a1a] border-[#1a1a1a]";
  return (
    <div className="relative" style={{ transform: `rotate(${rotate})` }}>
      <label className="absolute -top-4 left-4 bg-[#FFD333] text-[#1a1a1a] text-xs font-black uppercase px-2 py-1 z-20 border-2 border-[#1a1a1a]">
        {label}
      </label>
      <input required name={name} placeholder={placeholder} className={`w-full ${colorClass} border-4 p-6 outline-none font-black text-xl uppercase shadow-[10px_10px_0px_0px_#1a1a1a]`} />
    </div>
  );
}