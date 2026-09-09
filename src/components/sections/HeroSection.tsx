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
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.1;
        const colors = ["#10b981", "#34d399", "#f59e0b", "#fbbf24", "#6ee7b7"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvasWidth) this.x = 0;
        if (this.x < 0) this.x = canvasWidth;
        if (this.y > canvasHeight) this.y = 0;
        if (this.y < 0) this.y = canvasHeight;
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

    // Create particles
    for (let i = 0; i < 80; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update(canvas.width, canvas.height);
        p.draw(ctx);
      });
      animationId = requestAnimationFrame(animate);
    };

    // Check reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mediaQuery.matches) {
      animate();
    }

    setIsLoaded(true);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="beranda"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "#050d07" }}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom right, rgba(2,44,34,0.8), #050d07, #050d07)" }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(ellipse at 70% 50%, rgba(16, 185, 129, 0.2) 0%, transparent 60%)`,
          }}
        />
      </div>

      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-screen py-32">
          {/* Left — Text */}
          <div
            className={cn(
              "transition-all duration-1000",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            {/* Label */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-xs font-semibold uppercase tracking-widest">
                Calon Kepala Desa {candidate.village_name}
              </span>
            </div>

            {/* Name */}
            <h2 className="text-emerald-400/80 font-display font-medium text-lg sm:text-xl mb-2">
              {candidate.name}
            </h2>

            {/* Headline */}
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight mb-6">
              MEMBANGUN{" "}
              <span className="gradient-text-emerald">DESA.</span>
              <br />
              MELAYANI{" "}
              <span className="gradient-text-gold">DENGAN HATI.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
              Bersama membangun desa yang lebih maju, transparan, dan memberikan
              pelayanan yang mudah bagi seluruh masyarakat.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection("profil")}
                className="px-7 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-2xl transition-all duration-200 hover:shadow-emerald hover:-translate-y-0.5 text-sm"
              >
                Kenali Calonnya
              </button>
              <button
                onClick={() => scrollToSection("program")}
                className="px-7 py-4 glass border border-white/10 text-white hover:border-emerald-500/30 hover:bg-emerald-500/10 font-semibold rounded-2xl transition-all duration-200 text-sm"
              >
                Lihat Program
              </button>
            </div>

            {/* Tagline */}
            <p className="mt-8 text-white/30 text-xs italic">
              "Melayani Lebih Dekat, Membangun Lebih Hebat."
            </p>
          </div>

          {/* Right — 3D Portrait */}
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
              {/* Ambient glow */}
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-3xl scale-110 animate-pulse-slow" />

              {/* Portrait frame */}
              <div className="relative w-72 h-80 sm:w-80 sm:h-96 lg:w-96 lg:h-[480px]">
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-3xl border-2 border-emerald-500/20 animate-spin-slow" />

                {/* Inner frame */}
                <div className="absolute inset-4 rounded-2xl overflow-hidden glass-card relative">
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
                    // Placeholder
                    <div
                      className="w-full h-full flex flex-col items-center justify-center"
                      style={{ background: "linear-gradient(to bottom, #022c22, #050d07)" }}
                    >
                      <div className="w-32 h-32 rounded-full bg-emerald-500/20 border-2 border-emerald-500/30 flex items-center justify-center mb-4">
                        <span className="text-4xl">👤</span>
                      </div>
                      <p className="text-emerald-400/60 text-sm text-center px-4">
                        [FOTO CALON]
                      </p>
                    </div>
                  )}

                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(5,13,7,0.6), transparent, transparent)" }}
                  />
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass-card px-5 py-2.5 rounded-full border border-emerald-500/20 whitespace-nowrap">
                  <span className="text-white text-xs font-semibold">
                    Calon Kades {candidate.village_name}
                  </span>
                </div>

                {/* Decorative particles */}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "absolute w-1.5 h-1.5 rounded-full",
                      i % 2 === 0 ? "bg-emerald-400" : "bg-yellow-400"
                    )}
                    style={{
                      top: `${15 + i * 14}%`,
                      right: i % 2 === 0 ? "-8px" : "auto",
                      left: i % 2 !== 0 ? "-8px" : "auto",
                      animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
                      animationDelay: `${i * 0.3}s`,
                      opacity: 0.6,
                    }}
                  />
                ))}
              </div>

              {/* Three pillars floating cards */}
              <div className="absolute -left-4 top-1/3 glass-card px-3 py-2 rounded-xl hidden sm:block">
                <span className="text-emerald-400 text-xs font-bold">MUDAH</span>
              </div>
              <div className="absolute -right-4 top-1/2 glass-card px-3 py-2 rounded-xl hidden sm:block">
                <span className="text-xs font-bold" style={{ color: "#fbbf24" }}>BERDAYA</span>
              </div>
              <div className="absolute -left-4 top-2/3 glass-card px-3 py-2 rounded-xl hidden sm:block">
                <span className="text-blue-400 text-xs font-bold">TERBUKA</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollToSection("profil")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/70 transition-colors animate-bounce"
        aria-label="Scroll ke bawah"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
}
