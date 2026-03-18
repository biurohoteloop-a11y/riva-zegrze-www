"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, MapPin, Building2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current?.querySelectorAll(".hero-element") ?? [], {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.3
      });

      gsap.to(".hero-bg", {
        y: "20%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-[#303249]"
    >
      {/* Background Image with subtle overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="hero-bg absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/apartments/T3S-RivaZegrze-4183-m.jpg')" }}
        />
        <div className="absolute inset-0 bg-[#303249]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#303249]/60 via-[#303249]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#303249]/40 via-transparent to-[#303249]/30" />
      </div>

      <div className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-center mt-12 md:mt-20">
        <div className="max-w-4xl">
          <div ref={textRef}>
            <div className="hero-element inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              Apartamenty nad Zalewem Zegrzyńskim
            </div>
            
            <h1 className="hero-element text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] tracking-tight mb-8 drop-shadow-lg">
              Odkryj luksus<br />
              <span className="font-light italic">
                w harmonii z naturą.
              </span>
            </h1>
            
            <p className="hero-element text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed mb-12 font-medium drop-shadow-md">
              Riva Zegrze to projekt powstały z pasji. 
              Poczuj wyjątkowy klimat zaledwie 30 km od centrum Warszawy. 
              Idealne na biuro, letni apartament czy inwestycję pod wynajem.
            </p>
          </div>

          {/* Quick Search/Action Bar */}
          <div ref={formRef} className="hero-element bg-white rounded-2xl p-2 flex flex-col md:flex-row gap-2 max-w-3xl shadow-2xl">
            <div className="flex-1 flex items-center px-6 py-4 bg-slate-50 rounded-xl">
              <Building2 className="text-slate-400 mr-3 w-5 h-5" />
              <div className="flex-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Typ Lokalu</label>
                <select className="w-full bg-transparent border-none text-[#303249] font-medium focus:ring-0 cursor-pointer outline-none">
                  <option value="">Wszystkie</option>
                  <option value="apartament">Apartament</option>
                  <option value="biuro">Lokal usługowy / Biuro</option>
                </select>
              </div>
            </div>

            <div className="flex-1 flex items-center px-6 py-4 bg-slate-50 rounded-xl">
              <MapPin className="text-slate-400 mr-3 w-5 h-5" />
              <div className="flex-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Przeznaczenie</label>
                <select className="w-full bg-transparent border-none text-[#303249] font-medium focus:ring-0 cursor-pointer outline-none">
                  <option value="">Wszystkie</option>
                  <option value="zamieszkanie">Do zamieszkania</option>
                  <option value="wynajem">Na wynajem</option>
                  <option value="biuro">Lokal usługowy (Biuro)</option>
                </select>
              </div>
            </div>

            <button 
              onClick={() => router.push("/apartamenty")}
              className="bg-[#303249] text-white px-8 py-4 rounded-xl font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 md:w-auto w-full"
            >
              Znajdź lokal
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Key Stats */}
          <div className="hero-element grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-10 border-t border-white/20">
            <div>
              <div className="text-3xl font-bold text-white mb-1 drop-shadow-md">49</div>
              <div className="text-sm text-white/90 font-medium drop-shadow-md">Ekskluzywnych apartamentów</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1 drop-shadow-md">30<span className="text-xl">km</span></div>
              <div className="text-sm text-white/90 font-medium drop-shadow-md">Od centrum Warszawy</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1 drop-shadow-md">198<span className="text-xl">m²</span></div>
              <div className="text-sm text-white/90 font-medium drop-shadow-md">Maksymalny metraż</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1 drop-shadow-md">23%</div>
              <div className="text-sm text-white/90 font-medium drop-shadow-md">Odliczenie VAT</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
