"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function HomeInwestycja() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Lewa kolumna - teksty
      gsap.from(leftColumnRef.current?.children || [], {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });

      // Prawa kolumna - grid ze zdjęciami
      gsap.from(".bento-item", {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: rightColumnRef.current,
          start: "top 75%",
        }
      });
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1400px]">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Lewa kolumna: Teksty */}
          <div ref={leftColumnRef} className="max-w-xl lg:sticky lg:top-32 pt-4">
            {/* Mały nagłówek z ikoną */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF8F5] text-[#303249] text-sm font-semibold mb-8">
              <Sparkles className="w-4 h-4 text-[#BB9B64]" />
              O Inwestycji
            </div>

            {/* Główny nagłówek */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#303249] leading-[1.1] mb-8">
              Architektura<br />
              <span className="font-light italic text-slate-500">w harmonii z naturą</span>
            </h2>

            {/* Opis */}
            <div className="text-lg text-slate-600 leading-relaxed mb-10">
              <p className="mb-4">
                Riva Zegrze to projekt inspirowany światowymi wzorcami architektonicznymi. 
                Riva po włosku oznacza „brzeg”, co idealnie wpisuje się w naturalne otoczenie inwestycji.
              </p>
              <p>
                Większą część elewacji wykonano z drewna cedrowego. Duża powierzchnia przeszkleń nawiązuje do tafli wody, otwiera apartamenty na przepiękne widoki i sąsiadującą zieleń.
              </p>
            </div>

            <Link 
              href="/apartamenty"
              className="inline-flex items-center justify-center bg-[#303249] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#1A1B28] transition-all duration-300 shadow-md mb-16"
            >
              Zobacz apartamenty
            </Link>

            {/* Statystyki pod przyciskiem (wzorowane na zrzucie) */}
            <div className="grid grid-cols-2 gap-8 max-w-sm">
              <div>
                <h4 className="text-3xl font-bold text-[#303249] mb-2">44</h4>
                <p className="text-sm text-slate-600 font-medium">Miejsc parkingowych</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-[#303249] mb-2">22</h4>
                <p className="text-sm text-slate-600 font-medium">Miejsca do cumowania</p>
              </div>
            </div>
          </div>

          {/* Prawa kolumna: Bento Grid (Zdjęcia i karta statystyk wzorowana na zrzucie) */}
          <div ref={rightColumnRef} className="grid grid-cols-2 gap-4 md:gap-6">
            
            {/* Górne duże zdjęcie - zajmuje całą szerokość prawej kolumny */}
            <div className="col-span-2 bento-item group relative overflow-hidden rounded-[2rem] aspect-[16/10] bg-[#FAF8F5]">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: "url('/images/apartments/T3S-RivaZegrze-0412-m.jpg')" }}
              />
            </div>

            {/* Dolne lewe zdjęcie */}
            <div className="col-span-1 bento-item group relative overflow-hidden rounded-[2rem] aspect-[4/3] bg-[#FAF8F5]">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: "url('/images/apartments/T3S-RivaZegrze-4228-m.jpg')" }}
              />
            </div>

            {/* Dolna prawa karta ze statystyką (ciemny kwadrat tak jak na referencji) */}
            <div className="col-span-1 bento-item bg-[#303249] rounded-[2rem] aspect-[4/3] flex flex-col items-center justify-center text-center p-6">
              <h3 className="text-5xl lg:text-6xl font-bold text-white mb-3">49</h3>
              <p className="text-white/80 font-medium text-sm md:text-base leading-snug">
                Luksusowych<br />Apartamentów
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}