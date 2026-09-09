"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Candidate } from "@/types/database";

interface HeroSectionProps {
  candidate: Candidate;
}

export default function HeroSection({ candidate }: HeroSectionProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Parallax mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5,
        });
      }
    };
    const hero = heroRef.current;
    hero?.addEventListener("mousemove", handleMouseMove);
    return () => hero?.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: Particle[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    class Particle {
      x: number; y: number; size: number;
      speedX: number; speedY: number; opacity: number; color: string;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 1.5 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.25;
        this.speedY = (Math.random() - 0.5) * 0.25;
        this.opacity = Math.random() * 0.4 + 0.05;
        // Valorant palette: mostly red/white with rare gold
        const colors = ["#e63946", "#ff6b62", "#ffffff", "#ffffff", "#fbbf24"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(w: number, h: number) {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > w) this.x = 0;
        if (this.x < 0) this.x = w;
        if (this.y > h) this.y = 0;
        if (this.y < 0) this.y = h;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < 70; i++) particles.push(new Particle(canvas.width, canvas.height));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => { p.update(canvas.width, canvas.height); p.draw(ctx); });
      animationId = requestAnimationFrame(animate);
    };

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mq.matches) animate();
    setIsLoaded(true);

    return () => { cancelAnimationFrame(animationId); window.removeEventListener("resize", resize); };
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="beranda"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "#07070a" }}
    >
      {/* ── Background layers ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Big red circle glow — Valorant style */}
        <div
          className="absolute"
          style={{
            right: "5%",
            top: "50%",
            transform: "translateY(-50%)",
            width: "min(640px, 70vw)",
            height: "min(640px, 70vw)",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(230,57,70,0.22) 0%, rgba(230,57,70,0.06) 50%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(90deg, rgba(230,57,70,1) 0px, rgba(230,57,70,1) 1px, transparent 1px, transparent 80px),
              repeating-linear-gradient(0deg, rgba(230,57,70,1) 0px, rgba(230,57,70,1) 1px, transparent 1px, transparent 80px)
            `,
          }}
        />
        {/* Bottom vignette */}
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{ background: "linear-gradient(to top, #07070a, transparent)" }}
        />
      </div>

      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-screen py-32">

          {/* Left — Text */}
          <div
            className={cn(
              "transition-all duration-1000",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            {/* Section label — Valorant style */}
            <div className="section-label mb-6">
              Calon Kepala Desa {candidate.village_name}
            </div>

            {/* Name */}
            <h2
              className="font-display font-semibold text-base sm:text-lg mb-3 tracking-wider uppercase"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              {candidate.name}
            </h2>

            {/* Hero headline — big & bold */}
            <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white leading-none mb-6 uppercase">
              MEMBANGUN{" "}
              <span className="gradient-text-red block">DESA.</span>
              MELAYANI{" "}
              <span className="gradient-text-gold">DENGAN</span>
              <span className="text-white"> HATI.</span>
            </h1>

            {/* Description with left accent line */}
            <div className="accent-line-red pl-4 mb-8">
              <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-md">
                Bersama membangun desa yang lebih maju, transparan, dan memberikan
                pelayanan yang mudah bagi seluruh masyarakat.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => scrollToSection("profil")}
                className="px-7 py-3.5 text-white font-bold text-xs uppercase tracking-widest rounded transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
                style={{ background: "#e63946" }}
              >
                Kenali Calonnya
              </button>
              <button
                onClick={() => scrollToSection("program")}
                className="px-7 py-3.5 text-white/70 font-bold text-xs uppercase tracking-widest rounded border border-white/15 hover:border-white/30 hover:text-white transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                Lihat Program
              </button>
            </div>

            {/* Tagline */}
            <p className="mt-8 text-white/20 text-xs font-semibold uppercase tracking-[0.3em]">
              Melayani Lebih Dekat · Membangun Lebih Hebat
            </p>
          </div>

          {/* Right — 3D Portrait (unchanged 3D behavior, restyled frame) */}
          <div
            className={cn(
              "flex justify-center items-center transition-all duration-1000 delay-300",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <div
              className="relative"
              style={{
                transform: `perspective(1000px) rotateX(${mousePos.y * -5}deg) rotateY(${mousePos.x * 5}deg)`,
                transition: "transform 0.1s ease-out",
              }}
            >
              {/* Red ambient glow */}
              <div
                className="absolute inset-0 rounded-full blur-3xl scale-110 animate-pulse-slow"
                style={{ background: "rgba(230,57,70,0.18)" }}
              />

              {/* Portrait frame */}
              <div className="relative w-72 h-80 sm:w-80 sm:h-96 lg:w-96 lg:h-[480px]">
                {/* Outer rotating ring — diamond/angular */}
                <div
                  className="absolute inset-0 rounded-none animate-spin-slow"
                  style={{
                    border: "1px solid rgba(230,57,70,0.2)",
                    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                    transform: "scale(1.15)",
                  }}
                />

                {/* Inner portrait */}
                <div
                  className="absolute inset-4 overflow-hidden relative"
                  style={{
                    background: "rgba(13,13,20,0.8)",
                    border: "1px solid rgba(230,57,70,0.25)",
                    borderRadius: "0.75rem",
                    boxShadow: "0 0 40px rgba(230,57,70,0.12), inset 0 0 40px rgba(0,0,0,0.5)",
                  }}
                >
                  {candidate.photo_url ? (
                    <Image
                      src={candidate.photo_url}
                      alt={`Foto ${candidate.name}`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 288px, (max-width: 1024px) 320px, 384px"
                      priority
                    />
                  ) : (
                    <div
                      className="w-full h-full flex flex-col items-center justify-center"
                      style={{ background: "linear-gradient(to bottom, #12121c, #07070a)" }}
                    >
                      <div
                        className="w-32 h-32 rounded-full flex items-center justify-center mb-4"
                        style={{
                          background: "rgba(230,57,70,0.1)",
                          border: "2px solid rgba(230,57,70,0.3)",
                        }}
                      >
                        <span className="text-4xl">👤</span>
                      </div>
                      <p className="text-xs" style={{ color: "rgba(230,57,70,0.6)" }}>
                        [FOTO CALON]
                      </p>
                    </div>
                  )}

                  {/* Bottom gradient */}
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(7,7,10,0.7) 0%, transparent 50%)" }}
                  />

                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-6 h-0.5" style={{ background: "#e63946" }} />
                  <div className="absolute top-0 left-0 h-6 w-0.5" style={{ background: "#e63946" }} />
                  <div className="absolute bottom-0 right-0 w-6 h-0.5" style={{ background: "#e63946" }} />
                  <div className="absolute bottom-0 right-0 h-6 w-0.5" style={{ background: "#e63946" }} />
                </div>

                {/* Floating badge */}
                <div
                  className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded whitespace-nowrap"
                  style={{
                    background: "#e63946",
                    boxShadow: "0 4px 20px rgba(230,57,70,0.4)",
                  }}
                >
                  <span className="text-white text-xs font-bold uppercase tracking-widest">
                    Calon Kades {candidate.village_name}
                  </span>
                </div>

                {/* Floating particles around portrait */}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 rounded-full"
                    style={{
                      background: i % 2 === 0 ? "#e63946" : "#fbbf24",
                      top: `${15 + i * 13}%`,
                      right: i % 2 === 0 ? "-10px" : "auto",
                      left: i % 2 !== 0 ? "-10px" : "auto",
                      animation: `float ${3 + i * 0.4}s ease-in-out infinite`,
                      animationDelay: `${i * 0.3}s`,
                      opacity: 0.7,
                    }}
                  />
                ))}
              </div>

              {/* Floating stat cards — Valorant ability style */}
              <div
                className="absolute -left-6 top-1/4 px-3 py-2 rounded hidden sm:block"
                style={{
                  background: "rgba(13,13,20,0.9)",
                  border: "1px solid rgba(230,57,70,0.3)",
                  boxShadow: "0 0 12px rgba(230,57,70,0.15)",
                }}
              >
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#e63946" }}>MUDAH</span>
              </div>
              <div
                className="absolute -right-6 top-1/2 px-3 py-2 rounded hidden sm:block"
                style={{
                  background: "rgba(13,13,20,0.9)",
                  border: "1px solid rgba(245,158,11,0.3)",
                  boxShadow: "0 0 12px rgba(245,158,11,0.15)",
                }}
              >
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#fbbf24" }}>BERDAYA</span>
              </div>
              <div
                className="absolute -left-6 top-2/3 px-3 py-2 rounded hidden sm:block"
                style={{
                  background: "rgba(13,13,20,0.9)",
                  border: "1px solid rgba(96,165,250,0.3)",
                  boxShadow: "0 0 12px rgba(96,165,250,0.15)",
                }}
              >
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#60a5fa" }}>TERBUKA</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollToSection("profil")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 hover:text-white/60 transition-colors animate-bounce"
        aria-label="Scroll ke bawah"
      >
        <ChevronDown size={28} />
      </button>

      {/* Left side — vertical text label (Valorant-style) */}
      <div
        className="absolute left-4 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-3"
        style={{ color: "rgba(255,255,255,0.15)" }}
      >
        <div className="w-px h-16" style={{ background: "rgba(230,57,70,0.3)" }} />
        <span
          className="text-xs font-bold uppercase tracking-[0.3em]"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          {candidate.village_name}
        </span>
        <div className="w-px h-16" style={{ background: "rgba(230,57,70,0.3)" }} />
      </div>
    </section>
  );
}
