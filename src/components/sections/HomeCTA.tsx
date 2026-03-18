"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomeCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Efekt paralaksy dla tła 
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 30, // Przesuwa obraz o 30% w dół w miarę scrollowania
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }

      gsap.fromTo(".cta-content", 
        { y: 40, opacity: 0 },
        {
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: { 
            trigger: containerRef.current, 
            start: "top 80%" 
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-32 md:py-48 overflow-hidden bg-[#303249]">
      {/* Obraz tła z efektem paralaksy */}
      <div className="absolute top-[-30%] left-0 w-full h-[160%] pointer-events-none z-0">
        <img 
          ref={bgRef}
          src="/images/apartments/T3S-RivaZegrze-0620-m.jpg" 
          alt="Luksusowa architektura w otoczeniu natury" 
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      
      {/* Ciemne overlaye dla czytelności tekstu */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#303249] via-transparent to-[#303249] z-10 pointer-events-none opacity-90"></div>
      <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none"></div>

      {/* Treść */}
      <div className="relative z-20 container mx-auto px-6 max-w-4xl text-center cta-content">
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
          Znalazłeś swój wymarzony <br className="hidden md:block" />
          <span className="text-[#BB9B64] italic font-light">apartament?</span>
        </h2>
        
        <p className="text-lg md:text-xl text-white/80 font-light mb-12 max-w-2xl mx-auto">
          Skontaktuj się z naszym biurem sprzedaży. Opowiemy o szczegółach inwestycji i pomożemy dobrać przestrzeń idealnie dopasowaną do Twoich potrzeb.
        </p>

        <Link 
          href="/kontakt" 
          className="inline-flex items-center gap-3 bg-white text-[#303249] px-10 py-5 rounded-full font-bold text-lg hover:bg-[#F5F2EE] hover:scale-105 transition-all duration-300 shadow-xl"
        >
          Umów spotkanie
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}