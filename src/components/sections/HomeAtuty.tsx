"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, ShieldCheck, Home, Briefcase, PaintBucket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function HomeAtuty() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".bento-header", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });

      gsap.from(".bento-item", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".bento-grid",
          start: "top 75%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="nasze-podejscie" ref={containerRef} className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1400px]">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 bento-header">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#BB9B64]/10 text-[#BB9B64] text-xs font-semibold tracking-widest uppercase mb-6 border border-[#BB9B64]/20">
            <Sparkles className="w-3 h-3" />
            Nasz Standard
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#303249] leading-[1.1] tracking-tight">
            Poznaj nasze <br className="hidden md:block" />
            <span className="font-light italic text-slate-500">podejście do detalu</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="bento-grid grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          
          {/* ================= ROW 1 ================= */}
          {/* Main Large Card (Left) */}
          <div className="bento-item lg:col-span-5 bg-[#303249] rounded-[2rem] p-8 md:p-12 flex flex-col justify-between text-white relative overflow-hidden group h-auto lg:h-[600px]">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="relative z-10">
              <span className="text-[#BB9B64] text-sm font-semibold tracking-wider uppercase mb-4 block">
                O inwestycji
              </span>
              <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                Koncepcja i wizja
              </h3>
            </div>

            <div className="relative z-10 mt-12 lg:mt-0">
              <p className="text-white/80 text-lg leading-relaxed mb-6">
                Riva Zegrze to projekt inspirowany światowymi wzorcami architektonicznymi. Riva po włosku oznacza „brzeg”, co idealnie wpisuje się w naturalne otoczenie inwestycji i koncepcję architektury harmonizującej z przyrodą.
              </p>
              <p className="text-white/80 text-lg leading-relaxed">
                Większą część elewacji wykonano z drewna cedrowego. Duża powierzchnia przeszkleń nawiązuje do tafli wody, otwiera apartamenty na przepiękne widoki i sąsiadującą zieleń. Całość wieńczy wielospadowy dach o nowoczesnej formie.
              </p>
            </div>
          </div>

          {/* Right Cards Container (2x2 Grid) */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 h-auto lg:h-[600px]">
            
            {/* Top Left - Image */}
            <div className="bento-item rounded-[2rem] overflow-hidden h-[280px] lg:h-auto">
              <img 
                src="/images/apartments/T3S-RivaZegrze-3158-m.jpg" 
                alt="Riva Zegrze" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Top Right - Text Card 01 */}
            <div className="bento-item bg-[#FAF8F5] border border-[#E8E2D9] rounded-[2rem] p-8 flex flex-col relative h-[280px] lg:h-auto group hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#303249] text-[#BB9B64] flex items-center justify-center shadow-md">
                  <Home className="w-5 h-5" />
                </div>
                <span className="text-slate-300 font-light text-lg">01</span>
              </div>
              <h4 className="text-xl font-bold text-[#303249] mb-3 mt-auto">
                Riva w liczbach
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                49 apartamentów, 2, 3 i 4 pokoje (36–198m²). Ekspozycja tarasów na cztery strony świata zapewnia nasłonecznienie i wspaniały widok.
              </p>
            </div>

            {/* Bottom Left - Text Card 02 */}
            <div className="bento-item bg-[#FAF8F5] border border-[#E8E2D9] rounded-[2rem] p-8 flex flex-col relative h-[280px] lg:h-auto group hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#303249] text-[#BB9B64] flex items-center justify-center shadow-md">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-slate-300 font-light text-lg">02</span>
              </div>
              <h4 className="text-xl font-bold text-[#303249] mb-3 mt-auto">
                W budynku
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                System inteligentnego zarządzania apartamentem (smart home). Na terenie znajduje się 44 miejsca parkingowe i 22 miejsca do cumowania łodzi.
              </p>
            </div>

            {/* Bottom Right - Image */}
            <div className="bento-item rounded-[2rem] overflow-hidden h-[280px] lg:h-auto">
              <img 
                src="/images/apartments/T3S-RivaZegrze-3689-m.jpg" 
                alt="Riva Zegrze Detal" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

          </div>

          {/* ================= ROW 2 ================= */}
          {/* Left Cards Container (2x2 Grid) */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 h-auto lg:h-[600px] mt-2 lg:mt-0">
            
            {/* Top Left - Text Card 03 */}
            <div className="bento-item bg-[#FAF8F5] border border-[#E8E2D9] rounded-[2rem] p-8 flex flex-col relative h-[280px] lg:h-auto group hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#303249] text-[#BB9B64] flex items-center justify-center shadow-md">
                  <Briefcase className="w-5 h-5" />
                </div>
                <span className="text-slate-300 font-light text-lg">03</span>
              </div>
              <h4 className="text-xl font-bold text-[#303249] mb-3 mt-auto">
                Biznes i wypoczynek
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Nowoczesna przestrzeń biurowa (Home Office) lub inwestycja pod wynajem. Korzystaj z uroków natury bez dojazdów.
              </p>
            </div>

            {/* Top Right - Stat Card */}
            <div className="bento-item bg-[#303249] rounded-[2rem] p-8 flex flex-col items-center justify-center text-center h-[280px] lg:h-auto shadow-lg relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <h3 className="text-6xl font-bold text-white mb-3 relative z-10">49</h3>
              <p className="text-[#BB9B64] font-medium text-sm md:text-base relative z-10">
                Luksusowych<br/>Apartamentów
              </p>
            </div>

            {/* Bottom Left - Stat Card */}
            <div className="bento-item bg-[#FAF8F5] border border-[#E8E2D9] rounded-[2rem] p-8 flex flex-col items-center justify-center text-center h-[280px] lg:h-auto shadow-sm group hover:shadow-md transition-shadow">
              <h3 className="text-6xl font-bold text-[#303249] mb-3">22</h3>
              <p className="text-slate-600 font-medium text-sm md:text-base">
                Miejsca do<br/>cumowania łodzi
              </p>
            </div>

            {/* Bottom Right - Text Card 04 */}
            <div className="bento-item bg-[#FAF8F5] border border-[#E8E2D9] rounded-[2rem] p-8 flex flex-col relative h-[280px] lg:h-auto group hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#303249] text-[#BB9B64] flex items-center justify-center shadow-md">
                  <PaintBucket className="w-5 h-5" />
                </div>
                <span className="text-slate-300 font-light text-lg">04</span>
              </div>
              <h4 className="text-xl font-bold text-[#303249] mb-3 mt-auto">
                Wykończenie pod klucz
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Pakiety RedNet DOM. Silver (od 710 zł/m²) - elegancja i przystępna cena. Gold (od 935 zł/m²) - wyjątkowy design.
              </p>
            </div>

          </div>

          {/* Main Large Image Card (Right) */}
          <div className="bento-item lg:col-span-5 rounded-[2rem] overflow-hidden relative group h-[400px] lg:h-[600px] mt-2 lg:mt-0">
            <img 
              src="/images/apartments/T3S-RivaZegrze-0940-m.jpg" 
              alt="Widok inwestycji" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#303249]/90 via-[#303249]/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white">
              <h3 className="text-3xl font-bold mb-3">Z dala od zgiełku</h3>
              <p className="text-white/80 leading-relaxed max-w-sm">
                Własna marina na terenie inwestycji, prywatna plaża, tereny zielone na wyciągnięcie ręki.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}