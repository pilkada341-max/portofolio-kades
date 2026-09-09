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

  return <span ref={ref}>{prefix}{current.toLocaleString("id-ID")}</span>;
}

export default function TransparencySection({ budget }: TransparencySectionProps) {
  return (
    <section className="section-padding relative overflow-hidden" style={{ backgroundColor: "#0d0d14" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(96,165,250,0.25), transparent)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 50%, rgba(96,165,250,0.04) 0%, transparent 55%)" }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-16">
          <div className="section-label-blue mb-3">Transparansi APBDes</div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase">
            Uang Desa, Hak Masyarakat{" "}
            <span style={{ color: "#60a5fa" }}>untuk Tahu</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
            Komitmen pemerintahan desa yang terbuka, jelas, dapat dilihat, dan dapat dipertanggungjawabkan.
          </p>
        </div>

        {budget ? (
          <div className="max-w-4xl">
            {/* Year badges */}
            <div className="flex items-center gap-3 mb-8 flex-wrap">
              <div className="flex items-center gap-2 px-4 py-2 rounded" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <Calendar size={13} style={{ color: "#60a5fa" }} />
                <span className="text-white/60 text-xs font-medium">APBDes Tahun {budget.year}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <RefreshCw size={13} style={{ color: "#e63946" }} />
                <span className="text-white/60 text-xs">Diperbarui: {new Date(budget.updated_at).toLocaleDateString("id-ID")}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="p-7 relative" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(230,57,70,0.2)", borderRadius: "0.5rem" }}>
                <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t" style={{ background: "#e63946" }} />
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(230,57,70,0.7)" }}>Total Pendapatan</p>
                <p className="text-white font-display font-black text-2xl sm:text-3xl">
                  <AnimatedNumber target={budget.total_income} prefix="Rp " />
                </p>
              </div>
              <div className="p-7 relative" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(96,165,250,0.2)", borderRadius: "0.5rem" }}>
                <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t" style={{ background: "#60a5fa" }} />
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(96,165,250,0.7)" }}>Total Belanja</p>
                <p className="text-white font-display font-black text-2xl sm:text-3xl">
                  <AnimatedNumber target={budget.total_spending} prefix="Rp " />
                </p>
              </div>
            </div>

            {/* Allocations */}
            {budget.allocations && budget.allocations.length > 0 && (
              <div className="p-7 mb-6 rounded" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-6 flex items-center gap-2">
                  <TrendingUp size={14} style={{ color: "#e63946" }} />Alokasi Anggaran
                </h3>
                <div className="space-y-4">
                  {budget.allocations.map((alloc) => (
                    <div key={alloc.id}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-white/75 text-sm">{alloc.category}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-white/40 text-xs">{formatCurrency(alloc.amount)}</span>
                          <span className="font-bold text-sm w-12 text-right" style={{ color: "#e63946" }}>{alloc.percentage}%</span>
                        </div>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                        <div className="budget-bar h-full" style={{ width: `${alloc.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Documents */}
            {budget.documents && budget.documents.length > 0 && (
              <div className="p-7 rounded" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                  <FileText size={14} style={{ color: "#60a5fa" }} />Dokumen Resmi
                </h3>
                <div className="space-y-2">
                  {budget.documents.map((doc) => (
                    <a
                      key={doc.id}
                      href={doc.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded transition-colors group"
                      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <div className="flex items-center gap-3">
                        <FileText size={14} style={{ color: "#60a5fa" }} />
                        <span className="text-white/70 text-sm">{doc.title}</span>
                      </div>
                      <ExternalLink size={13} className="text-white/30 group-hover:text-white/60 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            <p className="text-white/25 text-xs mt-6">
              Sumber: {budget.source} • Data bersifat informatif dan merujuk pada dokumen resmi.
            </p>
          </div>
        ) : (
          <div className="max-w-4xl">
            <div className="p-10 text-center rounded relative" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(96,165,250,0.2)" }}>
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t" style={{ background: "#60a5fa" }} />
              <div className="w-16 h-16 rounded flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(96,165,250,0.08)", border: "1px solid rgba(96,165,250,0.2)" }}>
                <TrendingUp size={26} style={{ color: "#60a5fa" }} />
              </div>
              <h3 className="text-white font-display font-black text-xl mb-3 uppercase">Dashboard APBDes</h3>
              <p className="text-white/45 text-sm max-w-md mx-auto mb-4">
                Data APBDes akan ditampilkan di sini berdasarkan dokumen resmi yang telah ditetapkan. Transparansi anggaran desa adalah hak setiap warga.
              </p>
              <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest" style={{ border: "1px solid rgba(96,165,250,0.3)", borderRadius: "0.25rem", color: "rgba(96,165,250,0.7)" }}>
                Terbuka · Jelas · Dapat Dipertanggungjawabkan
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
