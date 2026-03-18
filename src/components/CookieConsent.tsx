"use client";
import { useState, useEffect } from "react";
import { X, Cookie } from "lucide-react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Sprawdzamy czy użytkownik już podjął decyzję
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      // Opóźnienie pojawienia się, żeby nie straszyć od razu po wejściu
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("cookieConsent", "all");
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "necessary");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pointer-events-none flex justify-center">
      <div className="bg-white/90 backdrop-blur-xl border border-slate-200 shadow-2xl rounded-3xl p-6 md:p-8 max-w-4xl w-full pointer-events-auto flex flex-col md:flex-row items-start md:items-center gap-6 transform transition-all duration-500 translate-y-0 opacity-100">
        
        {/* Ikona i Tekst */}
        <div className="flex-1 flex gap-4 md:gap-6">
          <div className="w-12 h-12 bg-[#FAF8F5] text-[#BB9B64] rounded-2xl flex items-center justify-center shrink-0">
            <Cookie className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#303249] mb-2">Cenimy Twoją prywatność</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Używamy plików cookies, aby zapewnić Ci najlepsze doświadczenia na naszej stronie, analizować ruch oraz dostosowywać treści do Twoich potrzeb. Możesz zaakceptować wszystkie pliki cookies lub dostosować swoje ustawienia. Więcej informacji znajdziesz w naszej <a href="#" className="text-[#BB9B64] hover:underline font-medium">Polityce Prywatności</a>.
            </p>
          </div>
        </div>

        {/* Przyciski */}
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3 shrink-0">
          <button 
            onClick={handleReject}
            className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors text-sm"
          >
            Tylko niezbędne
          </button>
          <button 
            onClick={handleAcceptAll}
            className="px-6 py-3 rounded-xl bg-[#303249] text-white font-medium hover:bg-[#202235] transition-colors shadow-md text-sm"
          >
            Akceptuj wszystkie
          </button>
        </div>

        {/* Przycisk zamknięcia (działa jak tylko niezbędne) */}
        <button 
          onClick={handleReject}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Zamknij"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
