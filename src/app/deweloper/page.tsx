"use client";
import { useState } from "react";
import { ArrowRight, Building, Building2, Target, ShieldCheck, Construction, Sparkles, Clock, Heart } from "lucide-react";

import Link from "next/link";
import { ReactCompareSlider } from 'react-compare-slider';

export default function Deweloper() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    privacy: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Dziękujemy za wiadomość! Odezwiemy się najszybciej jak to możliwe.");
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] font-sans pt-0">
            
      {/* Hero Section */}
      <section className="relative pt-[180px] pb-48 lg:pb-64 bg-[#303249]">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/apartments/T3S-RivaZegrze-0760-m.jpg" 
            alt="O Deweloperze" 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#303249]/80 via-[#303249]/50 to-[#303249]"></div>
        </div>
        <div className="container relative z-10 mx-auto px-6 max-w-[1400px]">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#BB9B64] text-xs font-semibold tracking-widest uppercase mb-8 shadow-sm">
              <Building className="w-3 h-3" /> O Deweloperze
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 text-white tracking-tight leading-[1.1]">
              Od ponad 8 lat, <br/>
              <span className="font-light italic text-white/90">z sukcesem realizujemy</span> <br/>
              <span className="text-[#BB9B64]">własne projekty.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light">
              Zarządzamy całym procesem inwestycyjnym, począwszy od pozyskania gruntów, poprzez projektowanie (we współpracy z biurami architektonicznymi), uzyskanie niezbędnych uzgodnień i zezwoleń, wymaganych przepisami prawa. Pełnimy całkowity nadzór nad wykonawstwem budowlanym, aż do odbiorów i zarządzania nowopowstałym obiektem.
            </p>
          </div>
        </div>
      </section>

      {/* Cele i Wartości Section - Overlapping Hero */}
      <section className="relative z-20 -mt-32 lg:-mt-40 mb-12">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Karta 1 */}
            <div className="bg-white rounded-[2rem] p-10 lg:p-12 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 hover:-translate-y-2 transition-transform duration-500">
              <div className="w-14 h-14 bg-[#FAF8F5] text-[#303249] rounded-2xl flex items-center justify-center mb-8 border border-slate-100">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-[#303249] mb-4">Nasze Cele</h3>
              <p className="text-slate-500 leading-relaxed font-light">
                Ambitne projekty i wysoka jakość wykonania. Naszym celem jest dostarczanie najwyższej jakości projektów w atrakcyjnych lokalizacjach.
              </p>
            </div>

            {/* Karta 2 */}
            <div className="bg-white rounded-[2rem] p-10 lg:p-12 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 hover:-translate-y-2 transition-transform duration-500">
              <div className="w-14 h-14 bg-[#FAF8F5] text-[#303249] rounded-2xl flex items-center justify-center mb-8 border border-slate-100">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-[#303249] mb-4">Dbałość o detale</h3>
              <p className="text-slate-500 leading-relaxed font-light">
                Uważamy, że dbałość o szczegóły na każdym etapie realizacji jest kluczem do sukcesu. Pełnimy całkowity nadzór nad wykonawstwem.
              </p>
            </div>

            {/* Karta 3 */}
            <div className="bg-white rounded-[2rem] p-10 lg:p-12 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 hover:-translate-y-2 transition-transform duration-500">
              <div className="w-14 h-14 bg-[#FAF8F5] text-[#303249] rounded-2xl flex items-center justify-center mb-8 border border-slate-100">
                <Construction className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-[#303249] mb-4">Aspiracje</h3>
              <p className="text-slate-500 leading-relaxed font-light">
                Riva Zegrze to nasza najnowsza koncepcja, która z dumą aspiruje do bycia prawdziwą wizytówką całego regionu.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Nasza Rzetelność - Porównanie Projekt vs Realizacja */}
      <section className="py-24 md:py-32 bg-[#FAF8F5]">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#BB9B64]/10 text-[#BB9B64] text-xs font-semibold tracking-widest uppercase mb-6 border border-[#BB9B64]/20">
              <Sparkles className="w-3 h-3" />
              Nasza Rzetelność
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#303249] leading-[1.1] tracking-tight mb-6">
              To co na wizualizacji, <br className="hidden md:block" />
              <span className="font-light italic text-slate-500">oddajemy w rzeczywistości</span>
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto font-light">
              Jesteśmy dumni z tego, że nasze projekty deweloperskie realizujemy z najwyższą dbałością o każdy detal. Poniżej prezentujemy porównanie wizualizacji z rzeczywistymi zdjęciami z naszych ukończonych inwestycji. Przesuń suwak, aby zobaczyć jakość, którą dostarczamy.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Porównanie 1: Basen */}
            <div className="bg-white rounded-[2.5rem] p-4 lg:p-6 border border-slate-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-500 flex flex-col">
              <div className="rounded-[2rem] overflow-hidden relative ring-1 ring-black/5 bg-slate-100 h-[300px] lg:h-[400px] w-full block">
                <ReactCompareSlider
                  className="w-full h-full"
                  style={{ width: "100%", height: "100%" }}
                  itemOne={
                    <div className="relative w-full h-full">
                      <img src="/images/apartments/Basen_V2.jpg" alt="Wizualizacja" className="absolute inset-0 w-full h-full object-cover" style={{ objectFit: "cover", display: "block" }} />
                      <div className="absolute top-3 left-3 lg:top-5 lg:left-5 pointer-events-none">
                        <span className="bg-white/95 backdrop-blur-md text-[#303249] text-[9px] lg:text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 lg:px-4 lg:py-2 rounded-full shadow-sm border border-slate-100 inline-block">WIZUALIZACJA</span>
                      </div>
                    </div>
                  }
                  itemTwo={
                    <div className="relative w-full h-full">
                      <img src="/images/apartments/T3S-RivaZegrze-3689-m.jpg" alt="Realizacja" className="absolute inset-0 w-full h-full object-cover" style={{ objectFit: "cover", display: "block" }} />
                      <div className="absolute bottom-3 right-3 lg:top-5 lg:bottom-auto lg:right-5 pointer-events-none">
                        <span className="bg-[#303249] text-white text-[9px] lg:text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 lg:px-4 lg:py-2 rounded-full shadow-sm border border-[#404259] inline-block">REALIZACJA</span>
                      </div>
                    </div>
                  }
                />
              </div>
              <div className="mt-6 px-4 text-center">
                <h3 className="text-2xl font-bold text-[#303249] mb-2">Strefa Basenowa</h3>
                <p className="text-slate-500 font-light text-sm">Zgodność detali w przestrzeniach rekreacyjnych</p>
              </div>
            </div>

            {/* Porównanie 2: Zewnątrz 1 */}
            <div className="bg-white rounded-[2.5rem] p-4 lg:p-6 border border-slate-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-500 flex flex-col">
              <div className="rounded-[2rem] overflow-hidden relative ring-1 ring-black/5 bg-slate-100 h-[300px] lg:h-[400px] w-full block">
                <ReactCompareSlider
                  className="w-full h-full"
                  style={{ width: "100%", height: "100%" }}
                  itemOne={
                    <div className="relative w-full h-full">
                      <img src="/images/apartments/02.jpg" alt="Wizualizacja" className="absolute inset-0 w-full h-full object-cover" style={{ objectFit: "cover", display: "block" }} />
                      <div className="absolute top-3 left-3 lg:top-5 lg:left-5 pointer-events-none">
                        <span className="bg-white/95 backdrop-blur-md text-[#303249] text-[9px] lg:text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 lg:px-4 lg:py-2 rounded-full shadow-sm border border-slate-100 inline-block">WIZUALIZACJA</span>
                      </div>
                    </div>
                  }
                  itemTwo={
                    <div className="relative w-full h-full">
                      <img src="/images/apartments/T3S-RivaZegrze-2957-m.jpg" alt="Realizacja" className="absolute inset-0 w-full h-full object-cover" style={{ objectFit: "cover", display: "block" }} />
                      <div className="absolute bottom-3 right-3 lg:top-5 lg:bottom-auto lg:right-5 pointer-events-none">
                        <span className="bg-[#303249] text-white text-[9px] lg:text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 lg:px-4 lg:py-2 rounded-full shadow-sm border border-[#404259] inline-block">REALIZACJA</span>
                      </div>
                    </div>
                  }
                />
              </div>
              <div className="mt-6 px-4 text-center">
                <h3 className="text-2xl font-bold text-[#303249] mb-2">Elewacja</h3>
                <p className="text-slate-500 font-light text-sm">Wierne odwzorowanie materiałów fasadowych</p>
              </div>
            </div>

            {/* Porównanie 3: Zewnątrz 2 */}
            <div className="bg-white rounded-[2.5rem] p-4 lg:p-6 border border-slate-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-500 flex flex-col">
              <div className="rounded-[2rem] overflow-hidden relative ring-1 ring-black/5 bg-slate-100 h-[300px] lg:h-[400px] w-full block">
                <ReactCompareSlider
                  className="w-full h-full"
                  style={{ width: "100%", height: "100%" }}
                  itemOne={
                    <div className="relative w-full h-full">
                      <img src="/images/apartments/01.jpg" alt="Wizualizacja" className="absolute inset-0 w-full h-full object-cover" style={{ objectFit: "cover", display: "block" }} />
                      <div className="absolute top-3 left-3 lg:top-5 lg:left-5 pointer-events-none">
                        <span className="bg-white/95 backdrop-blur-md text-[#303249] text-[9px] lg:text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 lg:px-4 lg:py-2 rounded-full shadow-sm border border-slate-100 inline-block">WIZUALIZACJA</span>
                      </div>
                    </div>
                  }
                  itemTwo={
                    <div className="relative w-full h-full">
                      <img src="/images/apartments/T3S-RivaZegrze-4168-m.jpg" alt="Realizacja" className="absolute inset-0 w-full h-full object-cover" style={{ objectFit: "cover", display: "block" }} />
                      <div className="absolute bottom-3 right-3 lg:top-5 lg:bottom-auto lg:right-5 pointer-events-none">
                        <span className="bg-[#303249] text-white text-[9px] lg:text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 lg:px-4 lg:py-2 rounded-full shadow-sm border border-[#404259] inline-block">REALIZACJA</span>
                      </div>
                    </div>
                  }
                />
              </div>
              <div className="mt-6 px-4 text-center">
                <h3 className="text-2xl font-bold text-[#303249] mb-2">Otoczenie</h3>
                <p className="text-slate-500 font-light text-sm">Dokładne zagospodarowanie terenów zielonych</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ostatnie Realizacje Section */}
<section className="py-24 md:py-32 bg-white">
  <div className="container mx-auto px-6 max-w-[1400px]">
    <div className="flex flex-col lg:flex-row items-center gap-16">
      <div className="lg:w-1/2">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#BB9B64]/10 text-[#BB9B64] text-xs font-semibold tracking-widest uppercase mb-6 border border-[#BB9B64]/20">
          <Building className="w-3 h-3" />
          Portfolio
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#303249] mb-8 leading-[1.1] tracking-tight">
          Nasze poprzednie <br />
          <span className="font-light italic text-slate-500">realizacje</span>
        </h2>
        <p className="text-lg text-slate-500 leading-relaxed mb-8 font-light">
          Niedawno zrealizowaną z sukcesem inwestycją jest projekt mieszkaniowy <strong>Odkryta 6</strong> na warszawskiej Białołęce. Każdy nasz projekt to dowód na nasze zaangażowanie, staranność i profesjonalizm.
        </p>
        <ul className="space-y-5 text-[#303249] font-medium mb-10">
          <li className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center shadow-sm">
              <Clock className="w-5 h-5 text-[#BB9B64]" />
            </div>
            Terminowa realizacja
          </li>
          <li className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center shadow-sm">
              <Building2 className="w-5 h-5 text-[#BB9B64]" />
            </div>
            Nowoczesna architektura
          </li>
          <li className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center shadow-sm">
              <Heart className="w-5 h-5 text-[#BB9B64]" />
            </div>
            Zadowoleni mieszkańcy
          </li>
        </ul>
        <Link href="/apartamenty" className="inline-flex items-center gap-3 bg-[#303249] text-white px-8 py-4 rounded-full font-bold hover:bg-[#1a1b2e] transition-colors duration-300">
          Zobacz ofertę Riva Zegrze <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
      
      <div className="lg:w-1/2 w-full">
        <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] group border border-slate-100">
          <img 
            src="/images/apartments/dev-bg.png" 
            alt="Realizacja inwestycji" 
            className="w-full h-[500px] lg:h-[650px] object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#303249]/90 via-transparent to-transparent pointer-events-none"></div>
          <div className="absolute bottom-8 left-8 right-8">
            <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl flex items-center justify-between border border-white/20">
              <div>
                <h4 className="text-xl font-bold text-[#303249] mb-1">Odkryta 6</h4>
                <p className="text-sm text-slate-500 font-medium">Warszawa, Białołęka</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] flex items-center justify-center text-[#BB9B64] border border-slate-100">
                <ArrowRight className="w-5 h-5 -rotate-45" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Formularz Kontaktowy */}
      <section className="py-24 md:py-32 bg-[#FAF8F5]">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#BB9B64]/10 text-[#BB9B64] text-xs font-semibold tracking-widest uppercase mb-6 border border-[#BB9B64]/20">
                Kontakt
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#303249] mb-6 tracking-tight leading-[1.1]">
                Skontaktuj się <br className="hidden md:block" />
                <span className="font-light italic text-slate-500">z nami</span>
              </h2>
              <p className="text-lg text-slate-500 font-light">Masz pytania dotyczące naszej działalności lub nowych inwestycji? Jesteśmy do Twojej dyspozycji.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] border border-slate-100 p-8 md:p-12 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#303249] uppercase tracking-widest ml-2">Imię i nazwisko *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Wpisz imię i nazwisko"
                    className="w-full bg-[#FAF8F5] border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#BB9B64] focus:border-transparent transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#303249] uppercase tracking-widest ml-2">Adres e-mail *</label>
                  <input 
                    type="email" 
                    required
                    placeholder="twoj@email.com"
                    className="w-full bg-[#FAF8F5] border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#BB9B64] focus:border-transparent transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2 mb-8">
                <label className="text-xs font-bold text-[#303249] uppercase tracking-widest ml-2">Twoja wiadomość *</label>
                <textarea 
                  required
                  rows={5}
                  placeholder="Jak możemy Ci pomóc?"
                  className="w-full bg-[#FAF8F5] border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#BB9B64] focus:border-transparent transition-all resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              <div className="flex items-start gap-4 mb-10 bg-[#FAF8F5] p-6 rounded-2xl border border-slate-100">
                <input 
                  type="checkbox" 
                  id="privacy-dev" 
                  required
                  className="mt-1 w-5 h-5 rounded border-slate-300 text-[#303249] focus:ring-[#303249]"
                  checked={formData.privacy}
                  onChange={(e) => setFormData({...formData, privacy: e.target.checked})}
                />
                <label htmlFor="privacy-dev" className="text-sm text-slate-500 cursor-pointer leading-relaxed font-light">
                  Zgadzam się na przetwarzanie moich danych osobowych zgodnie z Polityką Prywatności w celu odpowiedzi na zapytanie kontaktowe przez dewelopera.
                </label>
              </div>

              <button 
                type="submit"
                className="w-full bg-[#303249] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#1a1b2e] transition-colors flex items-center justify-center gap-2"
              >
                Wyślij zapytanie <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}
