"use client";
import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Ruler, Building, Calendar, Wind, Thermometer, ArrowRight, Bath, BedDouble, Car, Trees, Maximize2, FileText, Download, X } from "lucide-react";
import apartmentsData from "@/data/apartments.json";

export default function ApartmentDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [apartment, setApartment] = useState<any>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [allApartments, setAllApartments] = useState<any[]>(apartmentsData);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImage(0);
    if (id) {
      const decodedId = decodeURIComponent(id);
      const found = apartmentsData.find((apt: any) => apt.id === decodedId);
      setApartment(found);

      fetch("/api/apartments")
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            setAllApartments(data);
            const fromApi = data.find((apt: any) => apt.id === decodedId);
            if (fromApi) setApartment(fromApi);
          }
        })
        .catch(() => {});
    }
  }, [id]);

  if (!apartment) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] pt-32 pb-20 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-[#303249] mb-4">Apartament nie został znaleziony</h1>
        <Link href="/apartamenty" className="text-[#BB9B64] hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Powrót do listy
        </Link>
      </div>
    );
  }

  const getFloorPlanImage = (id: string) => {
    const planMap: Record<string, string> = {
      "A.3":  "/images/pdfs/A.3-pdf-1024x724.jpg",
      "A.6":  "/images/pdfs/A.6-pdf-1024x724.jpg",
      "A.7":  "/images/pdfs/A.7-pdf-1024x724.jpg",
      "A.8":  "/images/pdfs/A.8-pdf-1024x724.jpg",
      "A.11": "/images/pdfs/A.11-pdf-1024x724.jpg",
      "A.12": "/images/pdfs/A.12-pdf-1024x724.jpg",
      "A.13": "/images/pdfs/A.13-pdf-1024x724.jpg",
      "A.16": "/images/pdfs/A.16-2-pdf-1024x724.jpg",
      "B.1":  "/images/pdfs/B.1-pdf-1024x724.jpg",
      "B.5":  "/images/pdfs/B.5-pdf-1024x724.jpg",
      "B.11": "/images/pdfs/B.11-pdf-1024x724.jpg",
    };
    return planMap[id] || null;
  };

  const planImage = getFloorPlanImage(apartment.id);

  const similarApartments = apartmentsData
    .filter((apt: any) => apt.status === "Dostępny" && apt.id !== apartment.id)
    .slice(0, 3);

  const images = apartment.id === "A.11"
    ? [
        { src: "/images/apartments/T3S-RivaZegrze-4168-m.jpg", alt: "Widok 1" },
        { src: "/images/apartments/A11.jpg", alt: "Wizualizacja A.11" },
      ]
    : apartment.id === "A.13"
    ? [
        { src: "/images/apartments/T3S-RivaZegrze-4168-m.jpg", alt: "Widok 1" },
        { src: "/images/apartments/A13.jpg", alt: "Wizualizacja A.13" },
      ]
    : apartment.id === "A.16"
    ? [
        { src: "/images/apartments/T3S-RivaZegrze-4168-m.jpg", alt: "Widok 1" },
        { src: "/images/apartments/A16.jpg", alt: "Wizualizacja A.16" },
      ]
    : apartment.id === "B.1"
    ? [
        { src: "/images/apartments/T3S-RivaZegrze-4168-m.jpg", alt: "Widok 1" },
        { src: "/images/apartments/B1.jpg", alt: "Wizualizacja B.1" },
      ]
    : apartment.id === "B.5"
    ? [
        { src: "/images/apartments/T3S-RivaZegrze-4168-m.jpg", alt: "Widok 1" },
        { src: "/images/apartments/B5.jpg", alt: "Wizualizacja B.5" },
      ]
    : apartment.id === "B.11"
    ? [
        { src: "/images/apartments/T3S-RivaZegrze-4168-m.jpg", alt: "Widok 1" },
        { src: "/images/apartments/B11.jpg", alt: "Wizualizacja B.11" },
      ]
    : [
        { src: "/images/apartments/T3S-RivaZegrze-4168-m.jpg", alt: "Widok 1" },
        { src: "/images/apartments/T3S-RivaZegrze-4183-m.jpg", alt: "Widok 2" },
      ];

  return (
    <div className="min-h-screen bg-white pt-[120px] pb-20 font-sans text-slate-800">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Navigation & Header */}
        <div className="mb-10 border-b border-slate-200 pb-8">
          <Link href="/apartamenty" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#111] transition-colors mb-8 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Wróć do wyszukiwarki
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#111] tracking-tight">
                Apartament {apartment.id}
              </h1>
            </div>
            <div className="text-left md:text-right">
              <div className="text-3xl md:text-4xl font-medium text-[#111]">
                {apartment.price !== "-" && apartment.price !== "Zapytaj o cenę" ? `${apartment.price} PLN` : "Zapytaj o cenę"}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-12">

            {/* Main Image */}
            <div className="rounded-3xl overflow-hidden bg-slate-100 aspect-[16/10] relative">
              <img
                src={images[activeImage]?.src}
                alt={images[activeImage]?.alt}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
            </div>

            {/* Gallery Thumbnails */}
            <div className="grid grid-cols-4 md:grid-cols-5 gap-4">
              {images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`aspect-[4/3] rounded-xl overflow-hidden border-2 cursor-pointer transition-all duration-200 ${
                    activeImage === i
                      ? "border-[#BB9B64] opacity-100"
                      : "border-slate-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                </div>
              ))}
              {Array.from({ length: 5 - images.length }).map((_, i) => (
                <div
                  key={`soon-${i}`}
                  className={`aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 opacity-70 bg-slate-100 flex items-center justify-center ${
                    images.length + i === 4 ? "hidden md:flex" : ""
                  }`}
                >
                  <span className="text-slate-400 text-xs">Wkrótce</span>
                </div>
              ))}
            </div>

            {/* Key Stats Icons Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-slate-200">
              <div className="flex flex-col items-center justify-center text-center gap-3">
                <BedDouble className="w-8 h-8 text-slate-400 stroke-[1.5]" />
                <div>
                  <div className="text-xl font-medium text-[#111]">{apartment.rooms}</div>
                  <div className="text-sm text-slate-500">Pokoje</div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center text-center gap-3">
                <Bath className="w-8 h-8 text-slate-400 stroke-[1.5]" />
                <div>
                  <div className="text-xl font-medium text-[#111]">1</div>
                  <div className="text-sm text-slate-500">Łazienka</div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center text-center gap-3">
                <Ruler className="w-8 h-8 text-slate-400 stroke-[1.5]" />
                <div>
                  <div className="text-xl font-medium text-[#111]">{apartment.area}</div>
                  <div className="text-sm text-slate-500">Powierzchnia</div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center text-center gap-3">
                <Car className="w-8 h-8 text-slate-400 stroke-[1.5]" />
                <div>
                  <div className="text-xl font-medium text-[#111]">Opcja</div>
                  <div className="text-sm text-slate-500">Garaż/Parking</div>
                </div>
              </div>
            </div>

            {/* Overview */}
            <div>
              <h2 className="text-2xl font-medium text-[#111] mb-6">Opis nieruchomości</h2>
              <p className="text-slate-600 leading-relaxed text-lg font-light">
                Odkryj wyjątkowy apartament w inwestycji Riva Zegrze, położony zaledwie 30 km od centrum Warszawy. Ten nowoczesny apartament oferuje przemyślany układ pomieszczeń, wysokie sufity oraz panoramiczne okna, które zapewniają doskonałe doświetlenie wnętrz naturalnym światłem. Idealny wybór dla osób ceniących bliskość natury bez rezygnacji z komfortu i nowoczesnego designu.
              </p>

              <div className="mt-6 flex items-start gap-3 bg-[#FAF8F5] border border-[#E8E2D9] rounded-2xl px-5 py-4">
                <span className="text-xl mt-0.5">🎨</span>
                <p className="text-sm text-slate-500 font-light leading-relaxed">
                  <span className="font-medium text-slate-700">Zdjęcia wnętrz mają charakter poglądowy.</span> Prezentują przykładową aranżację i wystrój wnętrza w zbliżonym metrażu — stanowią inspirację do własnej wizji urządzenia apartamentu. Standard wykończenia oraz układ mogą się różnić od przedstawionych wizualizacji.
                </p>
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-2xl font-medium text-[#111] mb-6">Udogodnienia</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                {[
                  "Widok na zieleń/wodę",
                  "Ogrzewanie podłogowe",
                  "Wysokie sufity",
                  "Inteligentny dom (opcja)",
                  "Taras lub ogródek",
                  "Miejsce parkingowe",
                  "Monitoring 24/7",
                  "Stan deweloperski"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#111]"></div>
                    <span className="text-slate-600 text-lg font-light">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Property Details Specs */}
            <div>
              <h2 className="text-2xl font-medium text-[#111] mb-6">Szczegóły apartamentu</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <span className="text-slate-500">Typ nieruchomości</span>
                  <span className="font-medium text-[#111]">Apartament</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <span className="text-slate-500">Rok budowy</span>
                  <span className="font-medium text-[#111]">2025/2026</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <span className="text-slate-500">Budynek</span>
                  <span className="font-medium text-[#111]">{apartment.building}</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <span className="text-slate-500">Ogrzewanie</span>
                  <span className="font-medium text-[#111]">Pompa ciepła</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <span className="text-slate-500">Piętro</span>
                  <span className="font-medium text-[#111]">{apartment.floor}</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <span className="text-slate-500">Status</span>
                  <span className="font-medium text-[#111]">{apartment.status}</span>
                </div>
              </div>
            </div>

            {/* Floor Plan - ZMIENIONE: JPG zamiast PDF */}
            <div className="pt-12 border-t border-slate-200 mt-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-medium text-[#111] tracking-tight">Rzut apartamentu</h2>
                {planImage && (
                  <a
                    href={planImage}
                    download={`RivaZegrze_Rzut_${apartment.id}.jpg`}
                    className="hidden md:flex items-center gap-2 text-sm font-medium text-[#303249] bg-[#FAF8F5] hover:bg-[#E8E2D9] px-6 py-3 rounded-full transition-colors border border-slate-200 shadow-sm"
                  >
                    <Download className="w-4 h-4" /> Pobierz rzut
                  </a>
                )}
              </div>

              {planImage ? (
                <>
                  <div className="bg-white border border-slate-200 rounded-[2.5rem] p-6 md:p-10 flex items-center justify-center min-h-[400px] md:min-h-[600px] relative overflow-hidden shadow-sm">
                    <img
                      src={planImage}
                      alt={`Rzut apartamentu ${apartment.id}`}
                      className="max-w-full max-h-[550px] object-contain"
                    />
                  </div>

                  <a
                    href={planImage}
                    download={`RivaZegrze_Rzut_${apartment.id}.jpg`}
                    className="w-full mt-6 md:hidden flex items-center justify-center gap-3 font-bold text-white bg-[#303249] active:bg-[#1a1b2e] px-6 py-4 rounded-2xl transition-colors shadow-lg"
                  >
                    <Download className="w-5 h-5" /> Pobierz rzut
                  </a>
                </>
              ) : (
                <div className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-[2.5rem] p-12 flex flex-col items-center justify-center min-h-[300px] text-center">
                  <FileText className="w-12 h-12 text-slate-300 mb-4" />
                  <p className="text-lg font-medium text-slate-400 mb-2">Rzut w przygotowaniu</p>
                  <p className="text-sm text-slate-400">
                    Skontaktuj się z nami, aby otrzymać szczegółowy rzut tego apartamentu.
                  </p>
                  <Link
                    href="/kontakt"
                    className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-[#303249] text-white rounded-full text-sm font-medium hover:bg-[#1a1b2e] transition-colors"
                  >
                    Zapytaj o rzut <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>

          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">

              {/* Agent / Contact Card */}
              <div className="bg-[#FAF8F5] rounded-3xl p-8 border border-slate-200/50">
                <h3 className="text-xl font-medium text-[#111] mb-6">Kontakt w sprawie oferty</h3>
                <div className="flex flex-col gap-4 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-[#303249] text-white flex items-center justify-center text-xl font-bold">
                      RZ
                    </div>
                    <div>
                      <div className="font-medium text-lg text-[#111]">Biuro Sprzedaży</div>
                      <div className="text-sm text-slate-500">Riva Zegrze</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-slate-600">
                    <span className="font-medium">+48 510 038 038</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <span>kontakt@rivazegrze.pl</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <Link href="/kontakt" className="flex items-center justify-center w-full py-4 bg-[#303249] text-white rounded-full font-medium hover:bg-[#202235] transition-colors">
                    Zapytaj o ofertę
                  </Link>
                  <a href="tel:+48510038038" className="flex items-center justify-center w-full py-4 bg-white border border-slate-200 text-[#111] rounded-full font-medium hover:bg-slate-50 transition-colors">
                    Zadzwoń teraz
                  </a>
                </div>
              </div>

              {/* Property Specs Mini Card */}
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                <h3 className="font-medium text-[#111] mb-6">Detale finansowe</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Cena</span>
                    <span className="font-medium text-[#111]">{apartment.price !== "-" ? apartment.price : "Na zapytanie"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Stan</span>
                    <span className="font-medium text-[#111]">{apartment.status}</span>
                  </div>
                  {apartment.additional_area && (
                    <div className="pt-4 border-t border-slate-200">
                      <span className="text-slate-500 block mb-1">Powierzchnia dodatkowa</span>
                      <span className="font-medium text-[#111] text-sm leading-snug">{apartment.additional_area}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Location Info */}
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                <h3 className="font-medium text-[#111] mb-6">Lokalizacja</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Zalew Zegrzyński</span>
                    <span className="font-medium text-[#111]">0.1 km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Centrum Warszawy</span>
                    <span className="font-medium text-[#111]">30 km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Marina</span>
                    <span className="font-medium text-[#111]">0.5 km</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Similar Properties Section */}
        <div className="mt-24 pt-12 border-t border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="text-sm font-medium text-slate-500 flex items-center gap-2 mb-2">
                <Building className="w-4 h-4" /> Dostępne apartamenty
              </div>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-[#111]">Podobne nieruchomości</h2>
            </div>
            <Link href="/apartamenty" className="hidden md:flex items-center gap-2 text-[#303249] font-medium hover:text-[#BB9B64] transition-colors">
              Zobacz wszystkie <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {similarApartments.map((apt: any) => (
              <div key={apt.id} className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300">
                <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                  <img src="/images/apartments/T3S-RivaZegrze-4168-m.jpg" alt={`Apartament ${apt.id}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-medium text-[#111]">Apartament {apt.id}</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-6 text-sm text-slate-600">
                    <div className="flex flex-col items-center p-2 bg-slate-50 rounded-xl">
                      <BedDouble className="w-5 h-5 mb-1 text-slate-400" />
                      <span>{apt.rooms} Pok.</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-slate-50 rounded-xl">
                      <div className="font-medium text-lg leading-none mb-1 text-slate-400">{apt.floor}</div>
                      <span>Piętro</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-slate-50 rounded-xl">
                      <Ruler className="w-5 h-5 mb-1 text-slate-400" />
                      <span>{apt.area}</span>
                    </div>
                  </div>
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="font-medium text-lg text-[#BB9B64]">
                      {apt.price}
                    </div>
                    <Link href={`/apartamenty/${apt.id}`} className="text-sm font-medium text-[#303249] hover:text-[#BB9B64] flex items-center gap-1 transition-colors">
                      Szczegóły <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center md:hidden">
            <Link href="/apartamenty" className="flex items-center justify-center gap-2 w-full py-4 bg-slate-50 rounded-full text-[#303249] font-medium border border-slate-200">
              Zobacz wszystkie apartamenty
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
