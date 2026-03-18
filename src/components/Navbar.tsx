"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === "/";
  const navScrolled = isScrolled || !isHomePage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Blokada scrolla przy otwartym menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: "Inwestycja", href: "/inwestycja" },
    { label: "Deweloper", href: "/deweloper" },
    { label: "Galeria", href: "/galeria" },
    { label: "Apartamenty", href: "/apartamenty" },
    { label: "Kontakt", href: "/kontakt" },
  ];

  const catalogPdfPath = "/images/pdfs/riva_zegrze_folder_internet.pdf";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 flex items-center ${
          navScrolled
            ? "h-20 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100"
            : "h-28 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 h-full">
          <div className="flex items-center justify-between h-full relative">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 z-[110] relative group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span
                className={`text-2xl font-semibold tracking-tighter transition-colors ${
                  navScrolled || isMobileMenuOpen
                    ? "text-[#303249]"
                    : "text-white"
                }`}
              >
                RIVA{" "}
                <span className="font-light group-hover:text-[#BB9B64] transition-colors">
                  ZEGRZE
                </span>
              </span>
            </Link>

            {/* Desktop Menu */}
            <div
              className={`hidden md:flex absolute left-1/2 -translate-x-1/2 items-center rounded-full transition-all duration-300 ${
                navScrolled
                  ? "gap-2"
                  : "border border-white/20 bg-white/10 backdrop-blur-md px-2 py-1.5"
              }`}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    navScrolled
                      ? "text-slate-600 hover:bg-slate-100 hover:text-[#303249]"
                      : "text-white/90 hover:bg-white hover:text-[#303249]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA Button */}
            <div className="hidden md:flex items-center gap-4 z-[110]">
              <a
                href={catalogPdfPath}
                download="riva_zegrze_folder_internet.pdf"
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 group ${
                  navScrolled
                    ? "bg-[#303249] text-white hover:bg-[#1a1b2e] shadow-md"
                    : "bg-transparent text-white border border-white/30 hover:bg-white hover:text-[#303249] backdrop-blur-md"
                }`}
              >
                Pobierz katalog
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Mobile Menu Button - Zwiększony z-index i poprawiona logika */}
            <button
              className={`md:hidden z-[110] relative p-2.5 rounded-full transition-all duration-300 active:scale-95 ${
                navScrolled || isMobileMenuOpen
                  ? "text-[#303249] bg-slate-100"
                  : "text-white bg-white/20 border border-white/30 backdrop-blur-sm"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X size={24} className="animate-in fade-in zoom-in duration-300" />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Fullscreen Overlay */}
      <div
        className={`fixed inset-0 bg-[#FAF8F5] z-[90] transition-all duration-500 ease-in-out md:hidden flex flex-col pt-32 px-6 pb-10 ${
          isMobileMenuOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-4 mt-4">
          {navLinks.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="group flex items-center justify-between border-b border-slate-200 pb-5"
              style={{
                transitionDelay: `${i * 75}ms`,
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? "translateX(0)" : "translateX(-20px)",
                transition: "all 0.4s ease-out",
              }}
            >
              <span className="text-2xl font-light text-[#303249]">{link.label}</span>
              <ArrowRight className="w-5 h-5 text-slate-300 group-active:text-[#BB9B64] transition-all" />
            </Link>
          ))}
        </div>

        <div className="mt-auto space-y-4">
          {/* Mobile Contact info */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#303249] text-white rounded-full flex items-center justify-center">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Biuro sprzedaży</p>
                <a href="tel:+48510038038" className="text-base font-bold text-[#303249]">
                  +48 510 038 038
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Download Button */}
          <a
            href={catalogPdfPath}
            download="riva_zegrze_folder_internet.pdf"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-between w-full bg-[#303249] text-white p-5 rounded-2xl active:bg-[#1a1b2e] transition-colors"
          >
            <span className="text-lg font-medium">Pobierz katalog</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </>
  );
}
