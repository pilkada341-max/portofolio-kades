"use client";

import { ArrowRight, MessageSquare } from "lucide-react";

export default function FinalCTASection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-padding bg-forest-950 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 100%, rgba(16,185,129,0.15) 0%, transparent 60%)`,
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Tagline */}
          <span className="inline-block text-emerald-400/60 text-xs font-semibold uppercase tracking-[0.3em] mb-6">
            Bersama
          </span>

          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            BERSAMA{" "}
            <span className="gradient-text-emerald">MEMBANGUN</span>
            <br />
            DESA
          </h2>

          <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Perubahan dimulai dari keberanian untuk bergerak, keterbukaan untuk mendengar, dan komitmen untuk melayani.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollTo("program")}
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-2xl transition-all duration-200 hover:shadow-emerald flex items-center justify-center gap-2 group"
            >
              <span>Lihat Program</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollTo("aspirasi")}
              className="px-8 py-4 glass border border-white/10 text-white hover:border-emerald-500/30 hover:bg-emerald-500/10 font-semibold rounded-2xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              <MessageSquare size={16} />
              <span>Sampaikan Aspirasi</span>
            </button>
          </div>

          {/* Core message */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { emoji: "🤝", text: "Mudah Dilayani" },
              { emoji: "💡", text: "Berani Berinovasi" },
              { emoji: "👁️", text: "Terbuka dalam Bekerja" },
              { emoji: "🌿", text: "Bersama Masyarakat" },
            ].map((item) => (
              <div key={item.text} className="glass-card rounded-2xl p-4 text-center">
                <div className="text-2xl mb-2">{item.emoji}</div>
                <p className="text-white/60 text-xs leading-tight">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
