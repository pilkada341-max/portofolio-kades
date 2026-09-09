"use client";

import { useEffect, useRef, useState } from "react";
import { FileText, TrendingUp, ExternalLink, Calendar, RefreshCw } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { Budget } from "@/types/database";

interface TransparencySectionProps {
  budget: Budget | null;
}

function AnimatedNumber({ target, prefix = "" }: { target: number; prefix?: string }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let step = 0;

          const timer = setInterval(() => {
            step++;
            setCurrent(Math.min(Math.round(increment * step), target));
            if (step >= steps) clearInterval(timer);
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {prefix}
      {current.toLocaleString("id-ID")}
    </span>
  );
}

export default function TransparencySection({ budget }: TransparencySectionProps) {
  return (
    <section className="section-padding relative overflow-hidden" style={{ backgroundColor: "#050d07" }}>
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(59,130,246,0.3), transparent)" }}
      />
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(ellipse at 30% 50%, rgba(59, 130, 246, 0.4) 0%, transparent 50%)`,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block text-blue-400 text-xs font-semibold uppercase tracking-widest mb-3">
            Transparansi APBDes
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white">
            Uang Desa, Hak Masyarakat{" "}
            <span className="text-blue-400">untuk Tahu</span>
          </h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto text-sm">
            Komitmen pemerintahan desa yang terbuka, jelas, dapat dilihat, dan dapat dipertanggungjawabkan.
          </p>
        </div>

        {budget ? (
          <div className="max-w-4xl mx-auto">
            {/* Year badge */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-full">
                <Calendar size={14} className="text-blue-400" />
                <span className="text-white/70 text-sm">APBDes Tahun {budget.year}</span>
              </div>
              <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-full">
                <RefreshCw size={14} className="text-emerald-400" />
                <span className="text-white/70 text-xs">
                  Diperbarui: {new Date(budget.updated_at).toLocaleDateString("id-ID")}
                </span>
              </div>
            </div>

            {/* Main stats */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="glass-card rounded-3xl p-7 border border-emerald-500/20">
                <p className="text-emerald-400/70 text-xs uppercase tracking-wider mb-2">
                  Total Pendapatan
                </p>
                <p className="text-white font-display font-bold text-2xl sm:text-3xl">
                  <AnimatedNumber target={budget.total_income} prefix="Rp " />
                </p>
              </div>
              <div className="glass-card rounded-3xl p-7 border border-blue-500/20">
                <p className="text-blue-400/70 text-xs uppercase tracking-wider mb-2">
                  Total Belanja
                </p>
                <p className="text-white font-display font-bold text-2xl sm:text-3xl">
                  <AnimatedNumber target={budget.total_spending} prefix="Rp " />
                </p>
              </div>
            </div>

            {/* Allocations */}
            {budget.allocations && budget.allocations.length > 0 && (
              <div className="glass-card rounded-3xl p-7 mb-8">
                <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
                  <TrendingUp size={18} className="text-emerald-400" />
                  Alokasi Anggaran
                </h3>
                <div className="space-y-4">
                  {budget.allocations.map((alloc) => (
                    <div key={alloc.id}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-white/80 text-sm">{alloc.category}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-white/50 text-xs">
                            {formatCurrency(alloc.amount)}
                          </span>
                          <span className="text-emerald-400 font-semibold text-sm w-12 text-right">
                            {alloc.percentage}%
                          </span>
                        </div>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full budget-bar"
                          style={{ width: `${alloc.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Documents */}
            {budget.documents && budget.documents.length > 0 && (
              <div className="glass-card rounded-3xl p-7">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <FileText size={18} className="text-blue-400" />
                  Dokumen Resmi
                </h3>
                <div className="space-y-3">
                  {budget.documents.map((doc) => (
                    <a
                      key={doc.id}
                      href={doc.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <FileText size={16} className="text-blue-400" />
                        <span className="text-white/80 text-sm">{doc.title}</span>
                      </div>
                      <ExternalLink size={14} className="text-white/40 group-hover:text-white/70 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Source note */}
            <p className="text-center text-white/30 text-xs mt-6">
              Sumber: {budget.source} • Data bersifat informatif dan merujuk pada dokumen resmi.
            </p>
          </div>
        ) : (
          // Placeholder
          <div className="max-w-4xl mx-auto">
            <div className="glass-card rounded-3xl p-10 text-center border border-blue-500/20">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={28} className="text-blue-400" />
              </div>
              <h3 className="text-white font-display font-bold text-xl mb-3">
                Dashboard APBDes
              </h3>
              <p className="text-white/50 text-sm max-w-md mx-auto mb-4">
                Data APBDes akan ditampilkan di sini berdasarkan dokumen resmi yang telah ditetapkan. Transparansi anggaran desa adalah hak setiap warga.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 text-blue-400/70 text-xs">
                <span>Terbuka. Jelas. Dapat Dipertanggungjawabkan.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
