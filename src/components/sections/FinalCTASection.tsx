"use client";

import { ArrowRight, MessageSquare } from "lucide-react";

export default function FinalCTASection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "#07070a" }}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Big red glow bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "300px",
            background: "radial-gradient(ellipse at 50% 100%, rgba(230,57,70,0.18) 0%, transparent 70%)",
          }}
        />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(90deg, #e63946 0px, #e63946 1px, transparent 1px, transparent 80px),
              repeating-linear-gradient(0deg, #e63946 0px, #e63946 1px, transparent 1px, transparent 80px)
            `,
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(230,57,70,0.4), transparent)" }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">

          {/* Label */}
          <div className="section-label justify-center mb-6">Bersama</div>

          {/* Headline */}
          <h2 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white mb-6 leading-none uppercase">
            BERSAMA{" "}
            <span className="gradient-text-red">MEMBANGUN</span>
            {" "}DESA
          </h2>

          <p className="text-white/55 text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Perubahan dimulai dari keberanian untuk bergerak, keterbukaan untuk mendengar, dan komitmen untuk melayani.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollTo("program")}
              className="px-8 py-4 text-white font-bold text-xs uppercase tracking-widest rounded flex items-center justify-center gap-2 group transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              style={{ background: "#e63946", boxShadow: "0 4px 20px rgba(230,57,70,0.35)" }}
            >
              <span>Lihat Program</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollTo("aspirasi")}
              className="px-8 py-4 text-white/70 font-bold text-xs uppercase tracking-widest rounded border border-white/12 hover:border-red-500/40 hover:text-white flex items-center justify-center gap-2 transition-all duration-200"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <MessageSquare size={14} />
              <span>Sampaikan Aspirasi</span>
            </button>
          </div>

          {/* Value cards — Valorant ability card style */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: "🤝", label: "MUDAH", sub: "Dilayani" },
              { icon: "💡", label: "BERANI", sub: "Berinovasi" },
              { icon: "👁️", label: "TERBUKA", sub: "Dalam Bekerja" },
              { icon: "🌿", label: "BERSAMA", sub: "Masyarakat" },
            ].map((item) => (
              <div
                key={item.label}
                className="p-4 text-center relative group transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "0.375rem",
                }}
              >
                {/* Hover top accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 rounded-t opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "#e63946" }}
                />
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="text-white font-black text-xs uppercase tracking-widest">{item.label}</p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
