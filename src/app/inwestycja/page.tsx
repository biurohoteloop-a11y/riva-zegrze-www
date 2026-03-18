"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Anchor, Briefcase, MapPin, Key, Leaf, Building2, Sparkles, PlayCircle, Waves, Dumbbell, Trees, Car, Smartphone, Train, Compass } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function OInwestycji() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.from(".hero-text", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2
      });

      // Stat/Grid Animation
      gsap.from(".stat-col", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top 75%",
        }
      });

      // Alternating sections animation
      gsap.utils.toArray(".content-row").forEach((row: any) => {
        gsap.from(row.children, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: row,
            start: "top 80%",
          }
        });
      });

      // Features Grid Animation
      gsap.from(".feature-card", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".features-section",
          start: "top 80%",
        }
      });

      // Gallery Section Animation (Horizontal scroll for sticky image)
      let mm = gsap.matchMedia();

      // Desktop
      mm.add("(min-width: 1024px)", () => {
        const section = document.querySelector(".gallery-section");
        const stickyImg = document.querySelector(".gallery-sticky-img");

        if (section && stickyImg) {
          gsap.to(stickyImg, {
            xPercent: -80,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 80px", // Pin całą sekcję nieco niżej od topu
              end: "+=1500", // Przewijanie przez 1500px
              pin: true, // Zatrzymuje całą sekcję (lewą i prawą kolumnę)
              scrub: 1,
            }
          });
        }
      });

      // Mobile / Tablet
      mm.add("(max-width: 1023px)", () => {
        const section = document.querySelector(".gallery-section");
        const stickyImg = document.querySelector(".gallery-sticky-img");

        if (section && stickyImg) {
          gsap.to(stickyImg, {
            xPercent: -80,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 24px", 
              end: "+=1200",
              pin: true,
              scrub: 1,
            }
          });
        }
      });
      
      // Gallery grid animation
      gsap.from(".gallery-grid > div", {
        y: 60,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".gallery-grid",
          start: "top 75%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* 1. Hero Banner */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/apartments/T3S-RivaZegrze-4228-m.jpg')" }}
        />
        <div className="absolute inset-0 bg-[#303249]/70" />
        
        <div className="container mx-auto px-6 relative z-10 text-center mt-20">
          <span className="hero-text inline-block text-[#BB9B64] font-bold tracking-widest uppercase mb-4 text-sm">
            O Inwestycji & Lokalizacja
          </span>
          <h1 className="hero-text text-5xl md:text-7xl font-bold text-white leading-tight mb-8 max-w-5xl mx-auto drop-shadow-lg">
            Harmonia natury <br />
            <span className="font-light italic text-white/90">i nowoczesnego luksusu</span>
          </h1>
          <p className="hero-text text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md font-medium mb-6">
            Riva Zegrze to projekt, który powstał z pasji i przyjemności obcowania z wyjątkowymi okolicznościami przyrody. Atrakcyjna lokalizacja inwestycji w sąsiedztwie Warszawy, nadaje jej szczególnego charakteru i funkcjonalności.
          </p>
          <p className="hero-text text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Niezależnie od tego, czy planujesz zamieszkać, wynajmować, czy prowadzić swoje biuro – w Riva Zegrze spełniamy najwyższe oczekiwania naszych Klientów.
          </p>
        </div>
      </section>

      <main className="flex-1">
        
        {/* 2. Stats Grid */}
        <section className="py-24 md:py-32 stats-section bg-[#FAF8F5]">
          <div className="container mx-auto px-6 max-w-[1400px]">
            
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
              <h2 className="text-4xl md:text-5xl font-bold text-[#303249] leading-[1.1] mb-6">
                Riva w liczbach
              </h2>
              <p className="text-lg text-slate-600">
                Wyjątkowe miejsce dla najbardziej wymagających. Niezależnie od tego, czy planujesz zamieszkać, wynajmować, czy prowadzić biuro.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Kolumna 1 */}
              <div className="stat-col flex flex-col gap-6">
                <div className="bg-white border border-[#E8E2D9] rounded-[2rem] p-10 flex flex-col justify-center h-[280px] shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-5xl lg:text-6xl font-bold text-[#303249] mb-4">49</h3>
                  <p className="text-[#303249] font-bold text-xl mb-2">Ekskluzywnych Apartamentów</p>
                  <p className="text-slate-500 text-sm leading-relaxed">2, 3 i 4 pokoje o powierzchniach od 36 do 198 m². Ekspozycja tarasów na cztery strony świata.</p>
                </div>
                <div className="rounded-[2rem] overflow-hidden h-[400px] lg:h-[480px] group shadow-sm">
                  <img src="/images/apartments/T3S-RivaZegrze-0610-m.jpg" alt="Riva Zegrze Apartamenty" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
              </div>

              {/* Kolumna 2 */}
              <div className="stat-col flex flex-col gap-6">
                <div className="rounded-[2rem] overflow-hidden h-[400px] lg:h-[480px] group shadow-sm">
                  <img src="/images/apartments/T3S-RivaZegrze-3052-m.jpg" alt="Widok z góry" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="bg-[#303249] rounded-[2rem] p-10 flex flex-col justify-center h-[280px] shadow-lg">
                  <h3 className="text-5xl lg:text-6xl font-bold text-white mb-4">22</h3>
                  <p className="text-[#BB9B64] font-bold text-xl mb-2">Miejsca do cumowania</p>
                  <p className="text-white/70 text-sm leading-relaxed">Własna marina na terenie inwestycji oraz 44 bezpieczne miejsca parkingowe dla mieszkańców.</p>
                </div>
              </div>

              {/* Kolumna 3 */}
              <div className="stat-col flex flex-col gap-6">
                <div className="bg-white border border-[#E8E2D9] rounded-[2rem] p-10 flex flex-col justify-center h-[280px] shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-5xl lg:text-6xl font-bold text-[#303249] mb-4">30km</h3>
                  <p className="text-[#303249] font-bold text-xl mb-2">Od centrum Warszawy</p>
                  <p className="text-slate-500 text-sm leading-relaxed">Dogodna komunikacja. Dojazd samochodem w 45 minut, z dala od zgiełku i korporacyjnego szumu.</p>
                </div>
                <div className="rounded-[2rem] overflow-hidden h-[400px] lg:h-[480px] group shadow-sm">
                  <img src="/images/apartments/T3S-RivaZegrze-4168-m.jpg" alt="Riva Zegrze Zewnątrz" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. Content Sections */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 max-w-6xl space-y-32">
            
            {/* Architektura */}
            <div className="content-row grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="w-14 h-14 bg-[#FAF8F5] rounded-2xl flex items-center justify-center mb-6">
                  <Building2 className="w-6 h-6 text-[#BB9B64]" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-[#303249] mb-6 leading-tight">
                  Projekt inspirowany światowymi wzorcami
                </h3>
                <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                  <p>
                    Riva po włosku oznacza „brzeg”, co idealnie wpisuje się w naturalne otoczenie inwestycji i koncepcję architektury harmonizującej z przyrodą.
                  </p>
                  <p>
                    Większą część elewacji wykonano z drewna cedrowego. Duża powierzchnia przeszkleń nawiązuje do tafli wody, otwiera apartamenty na przepiękne widoki i sąsiadującą zieleń. Całość wieńczy wielospadowy dach o nowoczesnej formie.
                  </p>
                </div>
              </div>
              <div className="order-1 lg:order-2 rounded-[2rem] overflow-hidden shadow-xl h-[450px]">
                <img src="/images/apartments/T3S-RivaZegrze-0446-m.jpg" alt="Architektura" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Marina & Natura */}
            <div className="content-row grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="rounded-[2rem] overflow-hidden shadow-xl h-[450px]">
                <img src="/images/apartments/T3S-RivaZegrze-RG-3669-m.jpg" alt="Marina" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="w-14 h-14 bg-[#FAF8F5] rounded-2xl flex items-center justify-center mb-6">
                  <Anchor className="w-6 h-6 text-[#BB9B64]" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-[#303249] mb-6 leading-tight">
                  Malowniczo położone apartamenty z własną mariną
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Poczuj harmonię z naturą, bez wychodzenia z własnego mieszkania. Dla miłośników sportów wodnych przewidziano niewielki, prywatny port, gdzie zacumować można łódź, motorówkę, a nawet jacht.
                </p>
              </div>
            </div>

            {/* Biznes */}
            <div className="content-row grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="w-14 h-14 bg-[#FAF8F5] rounded-2xl flex items-center justify-center mb-6">
                  <Briefcase className="w-6 h-6 text-[#BB9B64]" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-[#303249] mb-6 leading-tight">
                  Twój biznes
                </h3>
                <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                  <p>
                    Riva Zegrze to idealne miejsce, do odpoczynku od miejskiego zgiełku Warszawy, jednocześnie cieszące się doskonałą komunikacją z metropolią. Można tu prowadzić biznes w luksusowych warunkach, wynosząc styl pracy na wyższy poziom.
                  </p>
                  <p>
                    Wszystkie apartamenty sprzedawane są jako <strong>lokale usługowe</strong>, co pozwala na pełne odliczenie VAT, nawet dla osób fizycznych.
                  </p>
                </div>
              </div>
              <div className="order-1 lg:order-2 rounded-[2rem] overflow-hidden shadow-xl h-[450px]">
                <img src="/images/apartments/T3S-RivaZegrze-RG-3831-m.jpg" alt="Biznes" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Biznes i wypoczynek c.d. */}
            <div className="content-row grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-[#FAF8F5] p-12 md:p-16 rounded-[3rem] mt-16">
              <div className="rounded-[2rem] overflow-hidden shadow-xl h-[450px]">
                <img src="/images/apartments/T3S-RivaZegrze-4404-m.jpg" alt="Wnętrze" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-[#303249] mb-6 leading-tight">
                  Biznes i wypoczynek w inwestycji Riva Zegrze
                </h3>
                <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                  <p>
                    Marzysz o stworzeniu nowoczesnej, mniej formalnej przestrzeni biurowej i wolisz pracować w trybie Home Office? Zastanawiasz się nad inwestycją w lokal usługowy, bądź mieszkanie na wynajem? Riva Zegrze spełni Twoje oczekiwania.
                  </p>
                  <p>
                    Korzystaj z dobrodziejstw natury przez cały rok, niezależnie od sezonu. Oszczędzaj czas, odpoczywaj i pracuj na miejscu, bez dojazdów. Umów się na spotkanie w Biurze Sprzedaży, gdzie nasz Specjalista przedstawi Ci szczegóły oferty.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 4. Atuty Inwestycji (Features Grid) */}
        <section className="py-24 bg-[#303249] features-section relative overflow-hidden">
          
          <div className="container mx-auto px-6 max-w-6xl relative z-10">
            
            <div className="mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">Z dala od zgiełku miasta<br/>i korporacyjnego szumu</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="feature-card bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
                <Waves className="w-8 h-8 text-[#BB9B64] mb-4" />
                <h4 className="text-xl font-bold mb-2 text-white">Z widokiem na Zalew</h4>
                <p className="text-white/70 text-sm">Bezpośredni widok na Zalew Zegrzyński.</p>
              </div>

              <div className="feature-card bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
                <Train className="w-8 h-8 text-[#BB9B64] mb-4" />
                <h4 className="text-xl font-bold mb-2 text-white">Dogodna komunikacja</h4>
                <p className="text-white/70 text-sm">Sprawny dojazd do Warszawy oraz najważniejszych punktów w okolicach.</p>
              </div>

              <div className="feature-card bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
                <Dumbbell className="w-8 h-8 text-[#BB9B64] mb-4" />
                <h4 className="text-xl font-bold mb-2 text-white">Siłownia i basen</h4>
                <p className="text-white/70 text-sm">Strefa dostępna na terenie głównego budynku A.</p>
              </div>

              <div className="feature-card bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
                <Trees className="w-8 h-8 text-[#BB9B64] mb-4" />
                <h4 className="text-xl font-bold mb-2 text-white">Teren rekreacyjny</h4>
                <p className="text-white/70 text-sm">Prywatna plaża, boisko do siatkówki, pomosty i tereny zielone na wyciągnięcie ręki.</p>
              </div>

              <div className="feature-card bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
                <Building2 className="w-8 h-8 text-[#BB9B64] mb-4" />
                <h4 className="text-xl font-bold mb-2 text-white">Niska zabudowa</h4>
                <p className="text-white/70 text-sm">Niewielka, przyjazna dla oka i harmonizująca niska zabudowa w okolicy.</p>
              </div>

              <div className="feature-card bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
                <Anchor className="w-8 h-8 text-[#BB9B64] mb-4" />
                <h4 className="text-xl font-bold mb-2 text-white">Własna marina</h4>
                <p className="text-white/70 text-sm">Marina na terenie inwestycji do dyspozycji miłośników sportów wodnych.</p>
              </div>
              
              <div className="feature-card bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
                <Key className="w-8 h-8 text-[#BB9B64] mb-4" />
                <h4 className="text-xl font-bold mb-2 text-white">Zarządzanie apartamentem</h4>
                <p className="text-white/70 text-sm">System Smart Home do sterowania temperaturą, domofonem i zdalnym dostępem w każdym lokalu.</p>
              </div>

              <div className="feature-card bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
                <MapPin className="w-8 h-8 text-[#BB9B64] mb-4" />
                <h4 className="text-xl font-bold mb-2 text-white">Bliskość Warszawy</h4>
                <p className="text-white/70 text-sm">Zaledwie 30 km od centrum stolicy - idealny kompromis między miastem a naturą.</p>
              </div>

            </div>

          </div>
        </section>

        {/* 5. Wykończenie */}
        <section className="py-24 bg-[#FAF8F5]">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              
              <div className="lg:w-1/2 space-y-8">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-[#303249] mb-6 leading-tight">Wybierz program<br/>wykończenia</h2>
                  <p className="text-lg text-slate-600 leading-relaxed mb-6">
                    W odpowiedzi na rosnące zapotrzebowanie na kompleksowe usługi w zakresie aranżacji wnętrz, podjęliśmy współpracę z firmą <strong>RedNet DOM</strong>.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Przygotowaliśmy pakiety z szeroką gamą wyposażenia i materiałów wykończeniowych, bogatym wyborem wzorów i kolorów. Dzięki fachowej wiedzy projektantów firmy RedNet DOM oferta zostanie dopasowana do indywidualnych potrzeb Klienta.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Pakiet Silver */}
                  <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                    <h4 className="text-2xl font-bold text-[#303249] mb-1">Silver</h4>
                    <p className="text-[#BB9B64] font-medium mb-4">od 710 zł/m² netto</p>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      Charakteryzuje się największą popularnością, ze względu na szeroką gamę materiałów wykończeniowych wysokiej jakości o różnorodnych wzorach. Jest to połączenie funkcjonalnych rozwiązań, elegancji oraz przystępnych cen.
                    </p>
                  </div>
                  
                  {/* Pakiet Gold */}
                  <div className="bg-[#303249] p-8 rounded-3xl shadow-md text-white border border-[#303249]">
                    <h4 className="text-2xl font-bold mb-1">Gold</h4>
                    <p className="text-[#BB9B64] font-medium mb-4">od 935 zł/m² netto</p>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Jest propozycją dla osób, które poszukują nowatorskich rozwiązań i indywidualnej aranżacji. Dedykowane materiały wykończeniowe charakteryzują się wyszukanym wzornictwem dającym pewność uzyskania wyjątkowego designu.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2 h-[600px] rounded-[2rem] overflow-hidden shadow-xl">
                <img src="/images/apartments/YAS5802-HDR.webp" alt="Przykładowe wnętrze" className="w-full h-full object-cover" />
              </div>

            </div>
          </div>
        </section>

        {/* 6. Gallery & Details Section */}
        <section className="py-24 bg-white relative gallery-section">
          <div className="container mx-auto px-6 max-w-[1400px]">
            
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF8F5] border border-[#E8E2D9] text-[#303249] text-sm font-semibold mb-6 shadow-sm">
                <Sparkles className="w-4 h-4 text-[#BB9B64]" />
                Galeria & Detale
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#303249] leading-[1.1]">
                Poznaj każdy <span className="font-light italic text-slate-500">detal inwestycji</span>
              </h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start relative gallery-content-wrapper">
              
              {/* Lewa kolumna */}
              <div className="lg:w-5/12 bg-[#303249] rounded-[2.5rem] p-8 md:p-10 flex flex-col shadow-2xl z-10 w-full gallery-left-col overflow-hidden mb-8 lg:mb-0 lg:sticky lg:top-24">
                <div className="rounded-[1.5rem] overflow-hidden aspect-[4/3] mb-10 shadow-lg relative h-[250px] sm:h-[300px] lg:h-[350px] w-full gallery-img-container">
                  <div className="flex h-full w-[500%] gallery-sticky-img">
                    {[
                      "/images/Apartament_A15_V3.jpg",
                      "/images/Apartament_С6.jpg",
                      "/images/Korytarz_V2.jpg",
                      "/images/Recepcia_V3.jpg",
                    ].map((src, i) => (
                      <div key={i} className="w-1/5 h-full relative group shrink-0">
                        <img 
                          src={src} 
                          alt={`Slider ${i+1}`} 
                          className="h-full w-full object-cover border-r-4 border-[#303249]" 
                        />
                        <div className="absolute inset-0 bg-[#303249]/10 transition-colors group-hover:bg-transparent pointer-events-none" />
                      </div>
                    ))}
                  </div>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                  Nowa definicja luksusu
                </h3>
                
                <p className="text-white/80 leading-relaxed text-base md:text-lg mb-10">
                  Przekonaj się, jak wyglądają najwyższej klasy apartamenty w inwestycji Riva Zegrze. Przestronne tarasy, najwyższa jakość wykończenia i bliskość natury tworzą idealne miejsce do życia i pracy.
                </p>
                
                <button className="bg-white text-[#303249] px-6 py-3 md:px-8 md:py-4 rounded-full font-bold hover:bg-[#BB9B64] hover:text-white transition-colors w-fit shadow-md flex items-center gap-3 text-sm md:text-base">
                  <PlayCircle className="w-5 h-5" />
                  Obejrzyj Wideo
                </button>
              </div>

              {/* Prawa kolumna (Scrollowany grid zdjęć) */}
              <div className="lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 gallery-grid w-full">
                {[
                  "/images/apartments/T3S-RivaZegrze-0620-m.jpg",
                  "/images/apartments/T3S-RivaZegrze-3941-m.jpg",
                  "/images/apartments/T3S-RivaZegrze-3992-m.jpg",
                  "/images/apartments/T3S-RivaZegrze-4158-m.jpg",
                  "/images/apartments/T3S-RivaZegrze-3411-m.jpg",
                  "/images/apartments/4.jpg",
                  "/images/apartments/T3S-RivaZegrze-2957-m.jpg",
                  "/images/apartments/T3S-RivaZegrze-0430-m.jpg"
                ].map((src, idx) => (
                  <div key={idx} className="rounded-[1.5rem] overflow-hidden aspect-[4/3] shadow-sm group bg-[#FAF8F5]">
                    <img 
                      src={src} 
                      alt={`Galeria ${idx+1}`} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0" 
                    />
                  </div>
                ))}
              </div>

            </div>

          </div>
        </section>

      </main>

      
    </div>
  );
}