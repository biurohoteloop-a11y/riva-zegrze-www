"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const benefits = [
  "Z widokiem na Zalew Zegrzyński",
  "Własna marina na terenie inwestycji",
  "Siłownia i basen na terenie budynku",
  "Własny teren rekreacyjny z plażą",
  "Tereny zielone na wyciągnięcie ręki",
  "Z dala od zgiełku miasta",
  "Dogodna komunikacja z Warszawą",
];

export default function HomeMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Tworzymy nieskończoną animację przesuwającą się w lewo
    const ctx = gsap.context(() => {
      gsap.to(track, {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1,
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={marqueeRef} className="py-6 bg-[#0B1121] border-y border-white/10 overflow-hidden flex items-center">
      <div ref={trackRef} className="flex whitespace-nowrap w-[200%] md:w-[200%]">
        {/* Renderujemy listę dwa razy, aby połączyć ją w nieskończoną pętlę */}
        {[...benefits, ...benefits].map((benefit, index) => (
          <div 
            key={index}
            className="flex items-center"
          >
            <span className="text-white/80 text-sm md:text-base font-medium tracking-wide uppercase px-8">
              {benefit}
            </span>
            <span className="text-blue-500/50">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}