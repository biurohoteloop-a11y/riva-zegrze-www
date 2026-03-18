"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, Pause } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function HomeShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".showcase-content", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section ref={containerRef} className="relative h-[80vh] md:h-[90vh] w-full overflow-hidden bg-[#303249]">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/video/riva-render.mp4"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="absolute inset-0 container mx-auto px-6 max-w-7xl flex flex-col justify-end pb-16 md:pb-24">
        <div className="showcase-content flex flex-col md:flex-row md:items-end justify-between gap-8">
          
          {/* Text Area */}
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              Poczuj klimat Rivy
            </h2>
            <p className="text-lg md:text-xl text-white/80 font-light">
              Zobacz zwiastun wideo
            </p>
          </div>

          {/* Play/Pause Button */}
          <button 
            onClick={togglePlay}
            className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center text-[#303249] hover:scale-105 transition-transform duration-300 group shadow-2xl"
            aria-label={isPlaying ? "Zatrzymaj wideo" : "Odtwórz wideo"}
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 fill-current" />
            ) : (
              <Play className="w-8 h-8 fill-current ml-1" />
            )}
          </button>

        </div>
      </div>
    </section>
  );
}