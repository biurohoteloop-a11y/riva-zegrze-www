"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Maximize, Grid3X3, ArrowRight, Search, Layers, X, FileText } from "lucide-react";
import Link from "next/link";
import apartmentsData from "@/data/apartments.json";

gsap.registerPlugin(ScrollTrigger);

const BUILDING_ZONES = {
  D: "M0.52948 212.556C5.19615 183.89 16.7295 123.756 25.5295 112.556L196.529 106.556L228.529 167.556L204.529 281.556L60.5295 286.556L0.52948 212.556Z",
  C: "M471.529 108.556L298.529 103.556L284.529 204.556L291.529 268.556H471.529L477.529 192.556L471.529 108.556Z",
  B: "M571.529 203.556V70.5562L710.529 45.5562L762.529 203.556L743.529 270.556H565.529L571.529 203.556Z",
  A: "M795.529 96.5562L817.529 30.5562L995.529 0.556183L1040.53 96.5562L1052.53 195.556L1004.53 275.556H835.529L823.529 195.556L795.529 96.5562Z",
};

export default function Apartamenty() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [activeBuilding, setActiveBuilding] = useState<"Wszystkie" | "A" | "B" | "C" | "D">("Wszystkie");
  const [activeStatus, setActiveStatus] = useState<"Wszystkie" | "Dostępny" | "Sprzedane">("Wszystkie");
  const [activeFloor, setActiveFloor] = useState<"Wszystkie" | "1" | "2" | "3" | "4">("Wszystkie");
  const [areaMin, setAreaMin] = useState<string>("");
  const [areaMax, setAreaMax] = useState<string>("");
  const [roomsMin, setRoomsMin] = useState<string>("");
  const [roomsMax, setRoomsMax] = useState<string>("");
  const [pdfModalOpen, setPdfModalOpen] = useState<string | null>(null);
  const [hoveredBuilding, setHoveredBuilding] = useState<"A" | "B" | "C" | "D" | null>(null);
  const [apartments, setApartments] = useState(apartmentsData);

  useEffect(() => {
    fetch("/api/apartments")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setApartments(data);
      })
      .catch(() => {});
  }, []);

  const filteredApartments = apartments.filter((apt: any) => {
    const matchBuilding = activeBuilding === "Wszystkie" ? true : apt.building === activeBuilding;
    const matchStatus = activeStatus === "Wszystkie" ? true : apt.status === activeStatus;
    const matchFloor = activeFloor === "Wszystkie" ? true : apt.floor === activeFloor;
    const aptArea = parseFloat(apt.area.replace(',', '.').replace(/[^\d.]/g, ''));
    const matchAreaMin = areaMin === "" || isNaN(parseFloat(areaMin)) ? true : aptArea >= parseFloat(areaMin);
    const matchAreaMax = areaMax === "" || isNaN(parseFloat(areaMax)) ? true : aptArea <= parseFloat(areaMax);
    const aptRooms = parseInt(apt.rooms);
    const matchRoomsMin = roomsMin === "" || isNaN(parseInt(roomsMin)) ? true : aptRooms >= parseInt(roomsMin);
    const matchRoomsMax = roomsMax === "" || isNaN(parseInt(roomsMax)) ? true : aptRooms <= parseInt(roomsMax);
    return matchBuilding && matchStatus && matchFloor && matchAreaMin && matchAreaMax && matchRoomsMin && matchRoomsMax;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.from(".hero-content", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.2,
      });
      gsap.fromTo(
        ".apt-row",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [activeBuilding, activeStatus, activeFloor]);

  return (
    <>
      <div ref={containerRef} className="min-h-screen bg-[#FAF8F5] flex flex-col relative" style={{ zIndex: 1 }}>
        <main className="flex-1 pt-[80px]">
          <section className="relative w-full max-w-[1920px] mx-auto bg-white">
            <div
              ref={imageContainerRef}
              className="relative w-full rounded-b-[2rem] md:rounded-b-[3rem] shadow-sm overflow-hidden"
              style={{ aspectRatio: "16/9" }}
            >
              <img
                src="/images/apartments/T3S-RivaZegrze-0940-m.jpg"
                alt="Wizualizacja inwestycji z lotu ptaka"
                className="w-full h-full object-cover"
                style={{ objectPosition: "center 20%" }}
              />

              <svg
  className="absolute inset-0 w-full h-full"
  viewBox="0 0 1803 1201"
  preserveAspectRatio="xMidYMid slice"
  style={{ pointerEvents: "none" }}
>
  {/* D - lewy */}
  <path
    d={BUILDING_ZONES.D}
    transform="translate(370, 90)"
    fill={hoveredBuilding === "D" || activeBuilding === "D" ? "rgba(187, 155, 100, 0.35)" : "transparent"}
    stroke="none"
    style={{ pointerEvents: "all", cursor: "pointer", transition: "fill 0.3s ease", filter: hoveredBuilding === "D" || activeBuilding === "D" ? "drop-shadow(0 0 8px rgba(187, 155, 100, 0.7))" : "none" }}
    onMouseEnter={() => setHoveredBuilding("D")}
    onMouseLeave={() => setHoveredBuilding(null)}
    onClick={() => setActiveBuilding("D")}
  />
  {/* C */}
  <path
    d={BUILDING_ZONES.C}
    transform="translate(380, 90)"
    fill={hoveredBuilding === "C" || activeBuilding === "C" ? "rgba(187, 155, 100, 0.35)" : "transparent"}
    stroke="none"
    style={{ pointerEvents: "all", cursor: "pointer", transition: "fill 0.3s ease", filter: hoveredBuilding === "C" || activeBuilding === "C" ? "drop-shadow(0 0 8px rgba(187, 155, 100, 0.7))" : "none" }}
    onMouseEnter={() => setHoveredBuilding("C")}
    onMouseLeave={() => setHoveredBuilding(null)}
    onClick={() => setActiveBuilding("C")}
  />
  {/* B */}
  <path
    d={BUILDING_ZONES.B}
    transform="translate(400, 90)"
    fill={hoveredBuilding === "B" || activeBuilding === "B" ? "rgba(187, 155, 100, 0.35)" : "transparent"}
    stroke="none"
    style={{ pointerEvents: "all", cursor: "pointer", transition: "fill 0.3s ease", filter: hoveredBuilding === "B" || activeBuilding === "B" ? "drop-shadow(0 0 8px rgba(187, 155, 100, 0.7))" : "none" }}
    onMouseEnter={() => setHoveredBuilding("B")}
    onMouseLeave={() => setHoveredBuilding(null)}
    onClick={() => setActiveBuilding("B")}
  />
  {/* A - prawy */}
  <path
    d={BUILDING_ZONES.A}
    transform="translate(420, 85)"
    fill={hoveredBuilding === "A" || activeBuilding === "A" ? "rgba(187, 155, 100, 0.35)" : "transparent"}
    stroke="none"
    style={{ pointerEvents: "all", cursor: "pointer", transition: "fill 0.3s ease", filter: hoveredBuilding === "A" || activeBuilding === "A" ? "drop-shadow(0 0 8px rgba(187, 155, 100, 0.7))" : "none" }}
    onMouseEnter={() => setHoveredBuilding("A")}
    onMouseLeave={() => setHoveredBuilding(null)}
    onClick={() => setActiveBuilding("A")}
  />
</svg>

              {/* Tooltip */}
              {hoveredBuilding && (
                <div
                  className="absolute pointer-events-none z-20 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-[#BB9B64]/30"
                  style={{ top: "10px", left: "50%", transform: "translateX(-50%)" }}
                >
                  <span className="text-[#303249] font-bold text-sm">
                    Budynek {hoveredBuilding}
                  </span>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
            </div>
          </section>

          {/* Filtry */}
          <div className="container mx-auto px-4 max-w-6xl relative z-30 -mt-8 md:-mt-10 mb-12">
            <div className="bg-white rounded-[2rem] shadow-lg border border-[#E8E2D9] p-6 md:p-8 flex flex-col gap-6 hero-content">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 justify-between border-b border-slate-100 pb-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#303249] mb-1">
                    Znajdź swój apartament w 3 krokach.
                  </h2>
                  <p className="text-slate-500 font-light text-sm">
                    Wybierz kondygnację lub wpisz parametry poniżej.
                  </p>
                </div>
                <div className="bg-[#303249] text-white px-8 py-3 rounded-full font-semibold tracking-widest text-sm uppercase shadow-md">
                  APARTAMENTY
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex flex-col gap-3">
                  <div className="flex gap-2 h-11">
                    {["Wszystkie", "Dostępny", "Sprzedane"].map((status: string) => (
                      <button
                        key={`s-${status}`}
                        onClick={() => setActiveStatus(status as any)}
                        className={`flex-1 px-2 rounded-full text-xs font-semibold transition-all ${
                          activeStatus === status
                            ? "bg-[#303249] text-white shadow-md"
                            : "bg-[#FAF8F5] text-slate-600 hover:text-[#303249] border border-slate-200"
                        }`}
                      >
                        {status === "Wszystkie" ? "Wszystkie" : status === "Dostępny" ? "Wolne" : "Sprzedane"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-2">Metraż</span>
                  <div className="flex items-center bg-[#FAF8F5] rounded-full border border-slate-200 overflow-hidden px-4 shadow-sm h-11 focus-within:border-[#BB9B64] transition-colors">
                    <input
                      type="text"
                      placeholder="30"
                      value={areaMin}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAreaMin(e.target.value)}
                      className="w-full py-2 text-center outline-none text-sm text-slate-600 bg-transparent font-medium"
                    />
                    <span className="text-slate-300 font-light">-</span>
                    <input
                      type="text"
                      placeholder="200"
                      value={areaMax}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAreaMax(e.target.value)}
                      className="w-full py-2 text-center outline-none text-sm text-slate-600 bg-transparent font-medium"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-2">Liczba pokoi</span>
                  <div className="flex items-center bg-[#FAF8F5] rounded-full border border-slate-200 overflow-hidden px-4 shadow-sm h-11 focus-within:border-[#BB9B64] transition-colors">
                    <input
                      type="text"
                      placeholder="2"
                      value={roomsMin}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoomsMin(e.target.value)}
                      className="w-full py-2 text-center outline-none text-sm text-slate-600 bg-transparent font-medium"
                    />
                    <span className="text-slate-300 font-light">-</span>
                    <input
                      type="text"
                      placeholder="4"
                      value={roomsMax}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoomsMax(e.target.value)}
                      className="w-full py-2 text-center outline-none text-sm text-slate-600 bg-transparent font-medium"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-2">Piętro</span>
                  <div className="relative w-full h-11">
                    <select
                      className="w-full h-full border border-slate-200 bg-[#FAF8F5] rounded-full px-6 text-slate-600 outline-none focus:border-[#BB9B64] text-sm appearance-none shadow-sm cursor-pointer font-medium transition-colors"
                      value={activeFloor}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setActiveFloor(e.target.value as any)}
                    >
                      <option value="Wszystkie">1 - 4</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                      <Layers className="w-4 h-4 text-[#BB9B64]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabela */}
          <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-30 pb-24">
            <div className="bg-white rounded-[2rem] shadow-xl border border-[#E8E2D9] overflow-hidden">
              <div className="hidden lg:grid grid-cols-12 gap-4 p-6 bg-[#FAF8F5] border-b border-[#E8E2D9] text-xs font-bold text-[#303249] uppercase tracking-wider">
                <div className="col-span-1">Lokal</div>
                <div className="col-span-2 text-center">Rzut</div>
                <div className="col-span-1">Piętro</div>
                <div className="col-span-1">Pokoje</div>
                <div className="col-span-2">Metraż</div>
                <div className="col-span-2">Pow. Dodatkowa</div>
                <div className="col-span-1">Status</div>
                <div className="col-span-2 text-right pr-4">Akcja</div>
              </div>

              <div className="flex flex-col w-full divide-y divide-slate-100">
                {filteredApartments.map((apt: any, index: number) => (
                  <div
                    key={`${apt.id}-${index}`}
                    className={`apt-row group lg:grid lg:grid-cols-12 gap-4 p-6 items-center flex flex-col transition-all duration-300 ${
                      apt.status === "Sprzedane"
                        ? "bg-slate-50/50 opacity-50 grayscale-[0.5]"
                        : "hover:bg-[#FAF8F5]"
                    }`}
                  >
                    <div className="col-span-1 flex w-full lg:w-auto justify-between lg:justify-start items-center mb-4 lg:mb-0">
                      <span className="lg:hidden text-sm text-slate-500 font-medium">Lokal:</span>
                      <span className={`font-bold text-2xl ${apt.status === "Sprzedane" ? "text-slate-400" : "text-[#303249]"}`}>
                        {apt.id}
                      </span>
                    </div>

                    <div className="col-span-2 flex w-full lg:w-auto justify-center mb-4 lg:mb-0">
                      <button
                        onClick={(e: React.MouseEvent) => {
                          e.preventDefault();
                          if (apt.status === "Dostępny") setPdfModalOpen(`/pdfs/${apt.id}.pdf`);
                        }}
                        className={`w-20 h-20 bg-white border border-[#E8E2D9] rounded-[1rem] p-3 flex items-center justify-center shadow-sm transition-all duration-300 ${
                          apt.status === "Dostępny"
                            ? "group-hover:shadow-md group-hover:scale-105 cursor-pointer hover:border-[#BB9B64]"
                            : "cursor-not-allowed opacity-60"
                        }`}
                        title={apt.status === "Dostępny" ? "Zobacz rzut (PDF)" : "Rzut niedostępny"}
                      >
                        <FileText className={`w-6 h-6 ${apt.status === "Dostępny" ? "text-[#BB9B64] opacity-70 group-hover:opacity-100" : "text-slate-400"}`} />
                      </button>
                    </div>

                    <div className="col-span-1 flex w-full lg:w-auto justify-between lg:justify-start items-center border-b border-slate-100 lg:border-none pb-2 lg:pb-0">
                      <span className="lg:hidden text-sm text-slate-500">Piętro:</span>
                      <span className="font-medium text-slate-600">{apt.floor}</span>
                    </div>

                    <div className="col-span-1 flex w-full lg:w-auto justify-between lg:justify-start items-center border-b border-slate-100 lg:border-none pb-2 lg:pb-0">
                      <span className="lg:hidden text-sm text-slate-500">Pokoje:</span>
                      <div className="flex items-center gap-1.5">
                        <Grid3X3 className={`w-4 h-4 ${apt.status === "Sprzedane" ? "text-slate-300" : "text-[#BB9B64]"}`} />
                        <span className="font-medium text-slate-600">{apt.rooms}</span>
                      </div>
                    </div>

                    <div className="col-span-2 flex w-full lg:w-auto justify-between lg:justify-start items-center border-b border-slate-100 lg:border-none pb-2 lg:pb-0">
                      <span className="lg:hidden text-sm text-slate-500">Metraż:</span>
                      <div className="flex items-center gap-2 font-bold text-lg text-[#303249]">
                        <Maximize className={`w-4 h-4 hidden lg:block ${apt.status === "Sprzedane" ? "text-slate-300" : "text-[#BB9B64]"}`} />
                        {apt.area}
                      </div>
                    </div>

                    <div className="col-span-2 flex w-full lg:w-auto justify-between lg:justify-start items-center border-b border-slate-100 lg:border-none pb-2 lg:pb-0">
                      <span className="lg:hidden text-sm text-slate-500">Dodatkowo:</span>
                      <span className="text-sm text-slate-500 font-light" title={apt.additional_area}>
                        {apt.additional_area || "-"}
                      </span>
                    </div>

                    <div className="col-span-1 flex w-full lg:w-auto justify-between lg:justify-start items-center pb-4 lg:pb-0 mt-2 lg:mt-0">
                      <span className="lg:hidden text-sm text-slate-500">Status:</span>
                      {apt.status === "Dostępny" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50/80 text-emerald-600 text-xs font-bold uppercase tracking-wider border border-emerald-100/50">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          Wolne
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                          Sprzedane
                        </span>
                      )}
                    </div>

                    <div className="col-span-2 flex w-full justify-end mt-4 lg:mt-0">
                      <Link
                        href={apt.status === "Sprzedane" ? "#" : `/apartamenty/${apt.id}`}
                        className={`inline-flex items-center justify-center gap-2 w-full lg:w-auto px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                          apt.status === "Sprzedane"
                            ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200/50"
                            : "bg-[#303249] text-white hover:bg-[#BB9B64] shadow-sm hover:shadow-md"
                        }`}
                        onClick={(e: React.MouseEvent) => apt.status === "Sprzedane" && e.preventDefault()}
                      >
                        Szczegóły
                        {apt.status === "Dostępny" && <ArrowRight className="w-4 h-4 ml-1" />}
                      </Link>
                    </div>
                  </div>
                ))}

                {filteredApartments.length === 0 && (
                  <div className="py-24 flex flex-col items-center justify-center text-slate-500 bg-slate-50/30">
                    <div className="w-20 h-20 bg-white shadow-sm border border-slate-100 rounded-full flex items-center justify-center mb-6">
                      <Search className="w-8 h-8 text-slate-300" />
                    </div>
                    <p className="text-xl font-bold text-[#303249] mb-2">Brak wyników</p>
                    <p className="text-sm max-w-md text-center font-light leading-relaxed">
                      Nie znaleźliśmy apartamentów spełniających podane kryteria. Spróbuj zmienić parametry filtrowania.
                    </p>
                    <button
                      onClick={() => {
                        setActiveBuilding("Wszystkie");
                        setActiveStatus("Wszystkie");
                        setActiveFloor("Wszystkie");
                      }}
                      className="mt-8 px-8 py-3 bg-[#303249] text-white rounded-full text-sm font-bold hover:bg-[#BB9B64] shadow-md transition-all duration-300"
                    >
                      Wyczyść filtry
                    </button>
                  </div>
                )}
              </div>

              <div className="p-5 bg-[#FAF8F5] border-t border-[#E8E2D9] flex items-center justify-center">
                <p className="text-xs text-slate-500 font-medium text-center max-w-2xl">
                  Zgodnie z wymogami: Platforma wygasza z automatu lokale oznaczone jako{" "}
                  <span className="font-bold text-slate-600">Sprzedane</span>
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* PDF Modal */}
      {pdfModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
          onClick={() => setPdfModalOpen(null)}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "24px",
              width: "100%",
              maxWidth: "900px",
              height: "85vh",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
            }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <div
              style={{
                height: "64px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 24px",
                borderBottom: "1px solid #E8E2D9",
                backgroundColor: "#FAF8F5",
                flexShrink: 0,
              }}
            >
              <span style={{ fontWeight: "bold", color: "#303249", fontSize: "16px" }}>
                Rzut apartamentu
              </span>
              <button
                onClick={() => setPdfModalOpen(null)}
                style={{ background: "none", border: "none", cursor: "pointer", padding: "8px" }}
              >
                <X className="w-6 h-6 text-[#303249]" />
              </button>
            </div>

            <div style={{ flexGrow: 1, width: "100%", overflow: "hidden" }}>
              <iframe
                src={`${pdfModalOpen}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                style={{ width: "100%", height: "100%", border: "none" }}
                title="Rzut apartamentu PDF"
              />
            </div>

            <div
              style={{
                height: "64px",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                padding: "0 24px",
                borderTop: "1px solid #E8E2D9",
                backgroundColor: "#FAF8F5",
                gap: "12px",
                flexShrink: 0,
              }}
            >
              <a
                href={pdfModalOpen}
                download
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 20px",
                  backgroundColor: "#BB9B64",
                  color: "white",
                  borderRadius: "9999px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                Pobierz PDF
              </a>
              <button
                onClick={() => setPdfModalOpen(null)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 20px",
                  backgroundColor: "#303249",
                  color: "white",
                  borderRadius: "9999px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Zamknij
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
