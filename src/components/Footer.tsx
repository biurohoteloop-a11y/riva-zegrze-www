"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col lg:flex-row">
      
      {/* Left Side - Light Area */}
      <div className="w-full lg:w-1/2 bg-[#F5F2EE] px-8 py-16 md:p-20 flex flex-col justify-between min-h-[600px]">
        <div>
          {/* Logo */}
          <Link href="/" className="inline-block mb-10">
            <span className="font-serif text-4xl md:text-5xl tracking-widest text-[#303249] font-bold uppercase">
              RIVA
            </span>
          </Link>

          <p className="text-slate-600 text-lg md:text-xl max-w-md leading-relaxed mb-12">
            Tworzymy wyjątkowe przestrzenie do życia, łącząc doskonałość architektoniczną ze spokojem natury i spersonalizowanym podejściem.
          </p>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-[#BB9B64] mt-1 shrink-0" />
              <div>
                <h4 className="font-bold text-[#303249] mb-1">BIURO SPRZEDAŻY</h4>
                <p className="text-slate-600 leading-relaxed">
                  ul. Odkryta 6 lok.8<br />
                  03-140 Warszawa
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Phone className="w-6 h-6 text-[#BB9B64] shrink-0" />
              <a href="tel:+48510038038" className="text-slate-600 hover:text-[#303249] transition-colors font-medium text-lg">
                +48 510 038 038
              </a>
            </div>

            <div className="flex items-center gap-4">
              <Mail className="w-6 h-6 text-[#BB9B64] shrink-0" />
              <a href="mailto:sprzedaz@rivazegrze.pl" className="text-slate-600 hover:text-[#303249] transition-colors font-medium text-lg">
                sprzedaz@rivazegrze.pl
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter / Action */}
        <div className="mt-20">
          <h4 className="font-bold text-[#303249] text-xl mb-4">Pobierz Katalog Inwestycji</h4>
          <div className="flex items-center bg-white rounded-full p-2 border border-slate-200 shadow-sm max-w-md">
            <input 
              type="email" 
              placeholder="Twój adres email" 
              className="flex-1 bg-transparent px-4 py-2 outline-none text-slate-700"
            />
            <button className="bg-[#303249] text-white px-6 py-3 rounded-full font-medium hover:bg-[#0c2830] transition-colors flex items-center gap-2">
              Pobierz <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Dark Area */}
      <div className="w-full lg:w-1/2 bg-[#303249] text-white px-8 py-16 md:p-20 flex flex-col justify-between min-h-[600px]">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8">
          
          {/* Menu */}
          <div>
            <h4 className="text-[#BB9B64] font-semibold tracking-wider uppercase mb-8">Nawigacja</h4>
            <nav className="flex flex-col gap-4">
              <Link href="/" className="text-white/80 hover:text-white hover:translate-x-1 transition-all">HOME</Link>
              <Link href="/inwestycja" className="text-white/80 hover:text-white hover:translate-x-1 transition-all">INWESTYCJA</Link>
              <Link href="/lokalizacja" className="text-white/80 hover:text-white hover:translate-x-1 transition-all">LOKALIZACJA</Link>
              <Link href="/apartamenty" className="text-white/80 hover:text-white hover:translate-x-1 transition-all">APARTAMENTY</Link>
              <Link href="/galeria" className="text-white/80 hover:text-white hover:translate-x-1 transition-all">GALERIA</Link>
              <Link href="/deweloper" className="text-white/80 hover:text-white hover:translate-x-1 transition-all">DEWELOPER</Link>
              <Link href="/kontakt" className="text-white/80 hover:text-white hover:translate-x-1 transition-all">KONTAKT</Link>
            </nav>
          </div>

          {/* Developer Data */}
          <div>
            <h4 className="text-[#BB9B64] font-semibold tracking-wider uppercase mb-8">Dane Dewelopera</h4>
            <div className="text-white/70 leading-relaxed space-y-2">
              <p className="font-medium text-white">OPEN ONE SP. Z O.O. S.K.</p>
              <p>ul. Odkryta 6 lok.8</p>
              <p>03-140 Warszawa</p>
              <p className="pt-4">NIP: 524-287-77-32</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} Riva Zegrze. Wszelkie prawa zastrzeżone.
          </p>
          
          <p className="text-white/40 text-xs max-w-lg leading-relaxed text-left md:text-right">
            Nasz serwis korzysta z plików cookies. Korzystanie z niniejszej witryny oznacza zgodę na wykorzystywanie plików cookies. Jeśli nie chcesz, by pliki cookies były zapisywane na Twoim dysku, zmień ustawienia swojej przeglądarki. Zapoznaj się z naszą polityką prywatności, kliknij <Link href="/polityka" className="text-[#BB9B64] hover:underline">TUTAJ</Link>
          </p>
        </div>

      </div>

    </footer>
  );
}