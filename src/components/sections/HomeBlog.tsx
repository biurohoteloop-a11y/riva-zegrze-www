"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen } from "lucide-react";
import Link from "next/link";

const ARTICLES = [
  {
    id: 1,
    category: "Inwestycje",
    title: "Dlaczego apartament nad Zalewem Zegrzyńskim to idealna lokata kapitału?",
    author: "Ekspert Riva",
    date: "14 Mar 2026",
    image: "/images/apartments/T3S-RivaZegrze-0430-m.jpg",
    link: "#"
  },
  {
    id: 2,
    category: "Lifestyle",
    title: "Second home zaledwie 30 minut od Warszawy. Odkryj swój nowy azyl",
    author: "Zespół Riva",
    date: "02 Mar 2026",
    image: "/images/apartments/T3S-RivaZegrze-3500-m.jpg",
    link: "#"
  },
  {
    id: 3,
    category: "Architektura",
    title: "Z widokiem na wodę. Jak projektujemy przestrzenie w Riva Zegrze",
    author: "Architekt Główny",
    date: "18 Lut 2026",
    image: "/images/apartments/IMG_2749.jpg",
    link: "#"
  }
];

export default function HomeBlog() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Rejestrujemy plugin wewnątrz useEffect, aby upewnić się, że działa tylko po stronie klienta
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%", // Włączy się wcześniej, gdy tylko sekcja wejdzie na ekran
        }
      });

      tl.fromTo(".blog-header", 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
      .fromTo(".blog-card", 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }, 
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-[#FAF8F5]">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 blog-header">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#BB9B64]/10 text-[#BB9B64] text-xs font-semibold tracking-widest uppercase mb-6 border border-[#BB9B64]/20">
            <BookOpen className="w-3 h-3" />
            Wiedza i Inspiracje
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#303249] leading-[1.1] tracking-tight mb-6">
            Nasz Blog & Artykuły
          </h2>
          <p className="text-lg text-slate-600">
            Poznaj ekspercką wiedzę na temat rynku nieruchomości premium, inspiracje architektoniczne i odkryj uroki życia nad Zalewem Zegrzyńskim.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARTICLES.map((article) => (
            <Link href={article.link} key={article.id} className="blog-card group block bg-white rounded-[2rem] overflow-hidden shadow-sm border border-[#E8E2D9] hover:shadow-xl transition-all duration-500">
              
              {/* Image */}
              <div className="h-64 overflow-hidden relative bg-[#FAF8F5]">
                {/* Fallback color/placeholder if image fails to load */}
                <div className="absolute inset-0 bg-[#E8E2D9] animate-pulse -z-10"></div>
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/apartments/T3S-RivaZegrze-0430-m.jpg"; 
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-1 h-full">
                <span className="text-[#BB9B64] text-xs font-bold uppercase tracking-wider mb-4 block">
                  {article.category}
                </span>
                
                <h3 className="text-xl font-bold text-[#303249] leading-snug mb-6 group-hover:text-[#303249] transition-colors line-clamp-3">
                  {article.title}
                </h3>
                
                <div className="flex items-center text-slate-500 text-sm mt-auto pt-4">
                  <span className="font-medium text-slate-700">{article.author}</span>
                  <span className="mx-2 text-slate-300">•</span>
                  <span>{article.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}