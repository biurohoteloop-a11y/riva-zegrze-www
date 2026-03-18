import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent"; // Dodany import

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    default: "Riva Zegrze | Apartamenty nad Zalewem Zegrzyńskim",
    template: "%s | Riva Zegrze",
  },
  description:
    "Ekskluzywne apartamenty nad Zalewem Zegrzyńskim. Własna marina, widok na wodę, 30 km od Warszawy. Sprawdź dostępne apartamenty.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-inter bg-white">
        <Navbar />
        {/* Dodany pop-up CookieConsent - pojawi się globalnie na każdej podstronie */}
        <CookieConsent />
        {children}
        <Footer />
      </body>
    </html>
  );
}