"use client";

import React from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import GameProject from "@/components/landing/GameProject";
import Philosophy from "@/components/landing/Philosophy";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/landing/Footer";
import CRTOverlay from "@/components/landing/CRTOverlay";
import TeamSection from "@/components/landing/TeamSection";

export default function BrumbunMancapat() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#1a1a1a] selection:bg-[#FFD333] selection:text-black overflow-x-hidden">
      <CRTOverlay />
      <Navbar scrollTo={scrollTo} />
      
      <main className="pt-16">
        <Hero scrollTo={scrollTo} />
        <GameProject />
        <Philosophy />
        <TeamSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}