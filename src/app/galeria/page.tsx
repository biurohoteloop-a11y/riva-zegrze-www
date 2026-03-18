"use client";
import { useState, useEffect } from "react";
import { Plus, Image as ImageIcon, X } from "lucide-react";

const defaultGalleryPhotos = [
  { id: 1, src: "/images/apartments/gallery-ref-2.png", title: "Widok na marinę", colSpan: 2, rowSpan: 2 },
  { id: 2, src: "/images/apartments/T3S-RivaZegrze-4168-m.jpg", title: "Przestronny salon", colSpan: 1, rowSpan: 1 },
  { id: 3, src: "/images/apartments/gallery-ref-2.png", title: "Elewacja nocą", colSpan: 1, rowSpan: 1 },
  { id: 4, src: "/images/apartments/T3S-RivaZegrze-4168-m.jpg", title: "Aneks kuchenny", colSpan: 2, rowSpan: 1 },
  { id: 5, src: "/images/apartments/gallery-ref-2.png", title: "Prywatna plaża", colSpan: 1, rowSpan: 2 },
  { id: 6, src: "/images/apartments/T3S-RivaZegrze-4168-m.jpg", title: "Taras wypoczynkowy", colSpan: 1, rowSpan: 1 },
  { id: 7, src: "/images/apartments/gallery-ref-2.png", title: "Nowoczesna architektura", colSpan: 2, rowSpan: 2 },
  { id: 8, src: "/images/apartments/T3S-RivaZegrze-4168-m.jpg", title: "Designerskie wnętrza", colSpan: 1, rowSpan: 1 },
  { id: 9, src: "/images/apartments/gallery-ref-2.png", title: "Otoczenie inwestycji", colSpan: 1, rowSpan: 1 },
  { id: 10, src: "/images/apartments/T3S-RivaZegrze-4168-m.jpg", title: "Sypialnia z widokiem", colSpan: 2, rowSpan: 1 },
  { id: 11, src: "/images/apartments/gallery-ref-2.png", title: "Wysoki standard", colSpan: 1, rowSpan: 1 },
  { id: 12, src: "/images/apartments/T3S-RivaZegrze-4168-m.jpg", title: "Balkon", colSpan: 1, rowSpan: 1 },
];

function parseClassName(className: string | undefined): { colSpan: number; rowSpan: number } {
  if (!className) return { colSpan: 1, rowSpan: 1 };
  let colSpan = 1;
  let rowSpan = 1;
  const colMatch = className.match(/col-span-(\d)/);
  const rowMatch = className.match(/row-span-(\d)/);
  if (colMatch) colSpan = parseInt(colMatch[1]);
  if (rowMatch) rowSpan = parseInt(rowMatch[1]);
  return { colSpan, rowSpan };
}

const bentoPattern = [
  { colSpan: 2, rowSpan: 2 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 2 },
  { colSpan: 2, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 2, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 2, rowSpan: 2 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
];

function assignBentoLayout(photos: any[]) {
  return photos.map((photo, index) => {
    if (photo.colSpan !== undefined && photo.colSpan !== 1 || photo.rowSpan !== undefined && photo.rowSpan !== 1) {
      if (photo.colSpan > 1 || photo.rowSpan > 1) return photo;
    }
    const patternIndex = index % bentoPattern.length;
    return { ...photo, colSpan: bentoPattern[patternIndex].colSpan, rowSpan: bentoPattern[patternIndex].rowSpan };
  });
}

export default function Galeria() {
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [galleryPhotos, setGalleryPhotos] = useState(defaultGalleryPhotos);

  useEffect(() => {
    fetch("/api/gallery")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((item: any) => {
            const { colSpan, rowSpan } = parseClassName(item.className || item.class_name);
            return { ...item, colSpan, rowSpan };
          });
          setGalleryPhotos(mapped);
        }
      })
      .catch(() => {});
  }, []);

  const layoutPhotos = assignBentoLayout(galleryPhotos);

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-[120px] pb-24 font-sans">
      
      <div className="container mx-auto px-6 max-w-[1400px] mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E8E2D9] text-[#303249] text-sm font-semibold mb-6 shadow-sm">
              <ImageIcon className="w-4 h-4 text-[#BB9B64]" />
              Galeria inwestycji
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#303249] tracking-tight">
              Odkryj Riva Zegrze <span className="font-light italic text-slate-500">w detalach</span>
            </h1>
            <p className="mt-6 text-slate-500 max-w-2xl text-lg">
              Przejrzyj naszą galerię i zobacz z bliska niesamowitą architekturę, luksusowe wnętrza oraz zapierające dech w piersiach widoki na Zalew Zegrzyński.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-[1400px]">
        <div 
          className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6"
          style={{ gridAutoRows: '250px', gridAutoFlow: 'dense' }}
        >
          {layoutPhotos.map((photo) => (
            <div 
              key={photo.id} 
              style={{ 
                gridColumn: `span ${photo.colSpan || 1}`, 
                gridRow: `span ${photo.rowSpan || 1}`,
              }}
              className="group rounded-[2rem] overflow-hidden bg-slate-200 relative shadow-sm cursor-pointer border border-slate-200/60"
              onClick={() => setFullscreenImage(photo.src)}
            >
              <img 
                src={photo.src} 
                alt={photo.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://placehold.co/800x600/e2e8f0/94a3b8?text=Brak+zdj%C4%99cia";
                }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#303249]/80 via-[#303249]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-bold text-xl drop-shadow-md mb-2">{photo.title}</h3>
                  <div className="inline-flex items-center gap-2 text-white/80 text-sm font-medium">
                    <Plus className="w-4 h-4" /> Powiększ
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {fullscreenImage && (
        <div 
          className="fixed inset-0 z-[100] bg-[#303249]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 opacity-100 transition-opacity"
          onClick={() => setFullscreenImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-3 backdrop-blur-sm"
            onClick={(e) => { e.stopPropagation(); setFullscreenImage(null); }}
          >
            <X className="w-8 h-8" />
          </button>
          
          <img 
            src={fullscreenImage} 
            alt="Fullscreen" 
            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}

    </div>
  );
}