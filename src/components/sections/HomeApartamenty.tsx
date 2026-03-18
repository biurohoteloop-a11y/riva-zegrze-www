"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Calendar, Maximize, MapPin, Home } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const APARTMENTS = [
  {
    id: "A.11",
    price: "Zapytaj o cenę",
    image: "/images/apartments/a11.jpg",
    status: "Wolne",
    statusColor: "bg-emerald-600",
    floor: "1",
    area: "55,96 m²",
    rooms: "3",
    bathrooms: "2",
    terrace: "5,97 m²",
    features: ["3 pokoje", "2 łazienki", "Taras 5,97m²"]
  },
  {
    id: "A.13",
    price: "Zapytaj o cenę",
    image: "/images/apartments/A13.jpg",
    status: "Wolne",
    statusColor: "bg-emerald-600",
    floor: "1",
    area: "77,19 m²",
    rooms: "3",
    bathrooms: "2",
    terrace: "23,29 m²",
    features: ["3 pokoje", "2 łazienki", "Taras 23,29m²"]
  },
  {
    id: "A.16",
    price: "Zapytaj o cenę",
    image: "/images/apartments/A16.jpg",
    status: "Wolne",
    statusColor: "bg-emerald-600",
    floor: "1",
    area: "115,29 m²",
    rooms: "4",
    bathrooms: "2",
    terrace: "51,35 m²",
    features: ["4 pokoje", "2 łazienki", "Taras 51,35m²"]
  }
];

export default function HomeApartamenty() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".apt-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      });

      gsap.from(".apt-header", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="apartamenty"
      ref={containerRef}
      className="py-24 md:py-32 bg-[#F5F2EE]"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-20 apt-header">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 text-[#4A2E2B] text-xs font-semibold tracking-widest uppercase mb-6 border border-[#4A2E2B]/10">
            <span className="text-[#4A2E2B]/60">✦</span>
            Oferta
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.1] tracking-tight mb-6">
            Ekskluzywne Apartamenty<br />
            <span className="font-light italic text-slate-500">z widokiem na wodę</span>
          </h2>
          <p className="text-lg text-slate-600">
            Przeglądaj wybrane lokale z naszej oferty. Wszystkie apartamenty dostępne są w standardzie deweloperskim z opcją wykończenia pod klucz.
          </p>
        </div>

        <div className="flex flex-col gap-10 mb-16">
          {APARTMENTS.map((apt, index) => (
            <div
              key={apt.id}
              className="apt-card flex flex-col lg:flex-row bg-[#FAF8F5] rounded-[2rem] overflow-hidden border border-[#E8E2D9] shadow-sm"
            >
              {/* Image Section */}
              <div className="lg:w-1/2 relative h-[300px] lg:h-[400px] rounded-[2rem] overflow-hidden">
                <img
                  src={apt.image}
                  alt={`Apartament ${apt.id}`}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-6 left-6">
                  <span className={`px-4 py-2 rounded-full text-white text-xs font-bold uppercase tracking-wider ${apt.statusColor}`}>
                    {apt.status}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-2">Apartament {apt.id}</h3>
                    <div className="flex items-center text-slate-500 text-sm font-medium">
                      <MapPin className="w-4 h-4 mr-1" />
                      Riva Zegrze, Budynek A
                    </div>
                  </div>
                  <div className="text-3xl font-semibold text-[#1A1A1A]">
                    {apt.price}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                  <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200/80 flex flex-col items-center justify-center text-center">
                    <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2 flex items-center gap-1">
                      <Maximize className="w-3.5 h-3.5 text-slate-400" />
                      Metraż
                    </span>
                    <span className="text-xl font-bold text-slate-900">{apt.area}</span>
                  </div>
                  <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200/80 flex flex-col items-center justify-center text-center">
                    <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2 flex items-center gap-1">
                      <Home className="w-3.5 h-3.5 text-slate-400" />
                      Pokoje
                    </span>
                    <span className="text-xl font-bold text-slate-900">{apt.rooms}</span>
                  </div>
                  <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200/80 flex flex-col items-center justify-center text-center">
                    <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2 flex items-center gap-1">
                      <span className="font-bold text-slate-400 text-sm">🚿</span>
                      Łazienki
                    </span>
                    <span className="text-xl font-bold text-slate-900">{apt.bathrooms}</span>
                  </div>
                  <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200/80 flex flex-col items-center justify-center text-center">
                    <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2 flex items-center gap-1">
                      <span className="font-bold text-slate-400 text-sm">☀️</span>
                      Taras
                    </span>
                    <span className="text-xl font-bold text-slate-900">{apt.terrace}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-auto w-full">
                  <Link href={`/apartamenty/${apt.id}`} className="flex-1 bg-[#2A1615] text-white px-8 py-4 rounded-full text-[15px] font-medium hover:bg-[#1A0D0C] transition-colors flex items-center justify-center tracking-wide w-full">
                    Szczegóły lokalu
                  </Link>
                  <Link href="/kontakt" className="flex-1 bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-full text-[15px] font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 tracking-wide w-full">
                    <Calendar className="w-4 h-4" />
                    Umów spotkanie
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="apt-header flex justify-center mt-12">
          <Link
            href="/apartamenty"
            className="inline-flex items-center gap-2 bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-full font-medium hover:bg-slate-50 transition-all hover:shadow-md group"
          >
            Zobacz wszystkie lokale
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
