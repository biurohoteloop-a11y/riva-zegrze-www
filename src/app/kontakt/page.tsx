"use client";
import { useState } from "react";
import { Phone, Mail, MapPin, Share2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Kontakt() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
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
            src="/images/apartments/T3S-RivaZegrze-4158-m.jpg" 
            alt="Riva Zegrze Kontakt" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
        </div>
        <div className="container relative z-10 mx-auto px-6 max-w-7xl text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#303249] text-sm font-semibold mb-8 shadow-sm">
            ✨ Kontakt
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 text-white tracking-tight leading-[1.1]">
            Jesteśmy tu, aby pomóc Ci<br />znaleźć idealny apartament
          </h1>
        </div>
      </section>

      {/* Contact Cards - Overlapping Hero */}
      <section className="relative z-20 -mt-32 lg:-mt-40 mb-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Telefon */}
            <div className="bg-white rounded-[2rem] p-10 shadow-lg border border-slate-100 text-center flex flex-col items-center hover:-translate-y-1 transition-transform duration-300">
              <div className="w-16 h-16 bg-[#303249] text-white rounded-2xl flex items-center justify-center mb-6">
                <Phone className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#303249] mb-3">Zadzwoń</h3>
              <div className="space-y-1 text-slate-500 text-sm">
                <a href="tel:+48510038038" className="block text-lg font-medium text-[#111] hover:text-[#BB9B64] transition-colors">+48 510 038 038</a>
                <p>Pon - Pt: 9:00 - 17:00</p>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white rounded-[2rem] p-10 shadow-lg border border-slate-100 text-center flex flex-col items-center hover:-translate-y-1 transition-transform duration-300">
              <div className="w-16 h-16 bg-[#303249] text-white rounded-2xl flex items-center justify-center mb-6">
                <Mail className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#303249] mb-3">Napisz e-mail</h3>
              <div className="space-y-1 text-slate-500 text-sm">
                <a href="mailto:kontakt@rivazegrze.pl" className="block text-lg font-medium text-[#111] hover:text-[#BB9B64] transition-colors">kontakt@rivazegrze.pl</a>
                <p>Odpowiadamy w 24h</p>
              </div>
            </div>

            {/* Biuro */}
            <div className="bg-white rounded-[2rem] p-10 shadow-lg border border-slate-100 text-center flex flex-col items-center hover:-translate-y-1 transition-transform duration-300">
              <div className="w-16 h-16 bg-[#303249] text-white rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#303249] mb-3">Biuro Sprzedaży</h3>
              <div className="space-y-1 text-slate-500 text-sm">
                <p className="text-lg font-medium text-[#111]">ul. Zegrzyńska 12</p>
                <p>05-130 Zegrze</p>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-[2rem] p-10 shadow-lg border border-slate-100 text-center flex flex-col items-center hover:-translate-y-1 transition-transform duration-300">
              <div className="w-16 h-16 bg-[#303249] text-white rounded-2xl flex items-center justify-center mb-6">
                <Share2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#303249] mb-3">Social Media</h3>
              <div className="space-y-1 text-slate-500 text-sm flex flex-col">
                <a href="#" className="text-lg font-medium text-[#111] hover:text-[#BB9B64] transition-colors">Facebook</a>
                <a href="#" className="text-lg font-medium text-[#111] hover:text-[#BB9B64] transition-colors">Instagram</a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#303249] mb-4">Wyślij nam wiadomość</h2>
            <p className="text-lg text-slate-500">Wypełnij poniższy formularz, a skontaktujemy się z Tobą w ciągu 24 godzin.</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] border border-[#E8E2D9] p-8 md:p-12 shadow-sm relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#303249] uppercase tracking-wider">Imię i nazwisko *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Wpisz swoje imię i nazwisko"
                  className="w-full bg-[#FAF8F5] border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#BB9B64] focus:border-transparent transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#303249] uppercase tracking-wider">Adres e-mail *</label>
                <input 
                  type="email" 
                  required
                  placeholder="twoj@email.com"
                  className="w-full bg-[#FAF8F5] border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#BB9B64] focus:border-transparent transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#303249] uppercase tracking-wider">Numer telefonu *</label>
                <input 
                  type="tel" 
                  required
                  placeholder="+48 000 000 000"
                  className="w-full bg-[#FAF8F5] border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#BB9B64] focus:border-transparent transition-all"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#303249] uppercase tracking-wider">Firma (Opcjonalnie)</label>
                <input 
                  type="text" 
                  placeholder="Nazwa Twojej firmy"
                  className="w-full bg-[#FAF8F5] border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#BB9B64] focus:border-transparent transition-all"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                />
              </div>

            </div>

            <div className="space-y-2 mb-8">
              <label className="text-sm font-semibold text-[#303249] uppercase tracking-wider">Temat *</label>
              <input 
                type="text" 
                required
                placeholder="Czego dotyczy wiadomość?"
                className="w-full bg-[#FAF8F5] border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#BB9B64] focus:border-transparent transition-all"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
              />
            </div>

            <div className="space-y-2 mb-8">
              <label className="text-sm font-semibold text-[#303249] uppercase tracking-wider">Twoja wiadomość *</label>
              <textarea 
                required
                rows={5}
                placeholder="Powiedz nam więcej o swoich potrzebach..."
                className="w-full bg-[#FAF8F5] border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#BB9B64] focus:border-transparent transition-all resize-none"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>

            <div className="flex items-start gap-3 mb-10">
              <input 
                type="checkbox" 
                id="privacy" 
                required
                className="mt-1 w-5 h-5 rounded border-slate-300 text-[#303249] focus:ring-[#303249]"
                checked={formData.privacy}
                onChange={(e) => setFormData({...formData, privacy: e.target.checked})}
              />
              <label htmlFor="privacy" className="text-sm text-slate-500 cursor-pointer leading-relaxed">
                Zgadzam się na przetwarzanie moich danych osobowych zgodnie z Polityką Prywatności w celu odpowiedzi na zapytanie.
              </label>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#303249] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#1a1b2e] transition-colors flex items-center justify-center gap-2"
            >
              Wyślij wiadomość <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[600px] w-full relative p-6 mt-10 mb-20">
        <div className="container mx-auto max-w-7xl h-full p-0">
          <div className="w-full h-full rounded-[2.5rem] overflow-hidden shadow-lg border border-slate-200 relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2432.1818167735395!2d21.033621!3d52.458999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ece46bd2c08f9%3A0xc47b9ebc905ab4d!2sRiva%20Zegrze!5e0!3m2!1spl!2spl!4v1709123456789!5m2!1spl!2spl" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="contrast-[1.1] grayscale-[0.1]"
            ></iframe>
            {/* Overlay badge on the map */}
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#303249] rounded-xl flex items-center justify-center text-white">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-[#303249]">Riva Zegrze</div>
                  <div className="text-sm text-slate-500">Zegrzyńska 12, Zegrze</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

          </div>
  );
}
