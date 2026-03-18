"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BedDouble, Bath, Maximize, Check } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function HomePlan() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".plan-header", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });

      gsap.from(".plan-content", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".plan-grid",
          start: "top 75%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-[#FAF8F5]">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 plan-header">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#BB9B64]/10 text-[#BB9B64] text-xs font-semibold tracking-widest uppercase mb-6 border border-[#BB9B64]/20">
            Rozkład pomieszczeń
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#303249] leading-[1.1] tracking-tight">
            Przykładowy Układ
          </h2>
        </div>

        {/* Content Grid */}
        <div className="plan-grid grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Image */}
          <div className="plan-content rounded-[2rem] overflow-hidden shadow-lg h-[400px] lg:h-[600px] relative">
            <img 
              src="/images/apartments/floor-plan-architect.png" 
              alt="Projektowanie układu apartamentu" 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Right: Info */}
          <div className="plan-content flex flex-col justify-center">
            <h3 className="text-3xl md:text-4xl font-bold text-[#303249] mb-6">
              Apartament Typu A
            </h3>
            <p className="text-slate-600 text-lg leading-relaxed mb-10">
              Przestronne wnętrza z panoramicznymi oknami sięgającymi od podłogi do sufitu, starannie zaprojektowane strefy dzienne i relaksacyjne z bezpośrednim widokiem na jezioro.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-10 pb-10 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2 text-slate-500 mb-2">
                  <BedDouble className="w-5 h-5 text-[#BB9B64]" />
                  <span className="text-sm font-semibold uppercase tracking-wider">Sypialnie</span>
                </div>
                <span className="text-3xl font-bold text-[#303249]">3</span>
              </div>
              <div>
                <div className="flex items-center gap-2 text-slate-500 mb-2">
                  <Bath className="w-5 h-5 text-[#BB9B64]" />
                  <span className="text-sm font-semibold uppercase tracking-wider">Łazienki</span>
                </div>
                <span className="text-3xl font-bold text-[#303249]">2</span>
              </div>
              <div>
                <div className="flex items-center gap-2 text-slate-500 mb-2">
                  <Maximize className="w-5 h-5 text-[#BB9B64]" />
                  <span className="text-sm font-semibold uppercase tracking-wider">Metraż</span>
                </div>
                <span className="text-3xl font-bold text-[#303249]">84<span className="text-xl font-medium text-slate-500 ml-1">m²</span></span>
              </div>
            </div>

            {/* Features */}
            <div className="mb-12">
              <h4 className="text-xl font-bold text-[#303249] mb-6">Główne atuty</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#BB9B64]"></div>
                  <span className="text-slate-700 font-medium">Otwarta kuchnia</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#BB9B64]"></div>
                  <span className="text-slate-700 font-medium">Sypialnia Master</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#BB9B64]"></div>
                  <span className="text-slate-700 font-medium">Prywatny taras</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#BB9B64]"></div>
                  <span className="text-slate-700 font-medium">Widok na wodę</span>
                </div>
              </div>
            </div>

            {/* Button */}
            <Link 
              href="/kontakt" 
              className="bg-[#303249] text-white px-8 py-5 rounded-full text-center text-[15px] font-medium hover:bg-[#0c2830] transition-colors shadow-lg shadow-[#303249]/20 w-full"
            >
              Skontaktuj się z nami
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}