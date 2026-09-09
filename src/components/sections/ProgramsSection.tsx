"use client";

import { useState } from "react";
import { Shield, Users, Eye, ChevronRight, X, ArrowRight, CheckCircle2, Target } from "lucide-react";
import type { Program } from "@/types/database";

const iconMap: Record<string, React.ReactNode> = {
  shield: <Shield size={22} />,
  users: <Users size={22} />,
  eye: <Eye size={22} />,
};

type ColorKey = "emerald" | "gold" | "blue";

const colorStyle: Record<ColorKey, {
  accent: string;
  accentBg: string;
  accentBorder: string;
  solutionBg: string;
}> = {
  emerald: { accent: "#e63946", accentBg: "rgba(230,57,70,0.07)", accentBorder: "rgba(230,57,70,0.2)", solutionBg: "rgba(230,57,70,0.05)" },
  gold:    { accent: "#f59e0b", accentBg: "rgba(245,158,11,0.07)", accentBorder: "rgba(245,158,11,0.2)", solutionBg: "rgba(245,158,11,0.05)" },
  blue:    { accent: "#60a5fa", accentBg: "rgba(96,165,250,0.07)", accentBorder: "rgba(96,165,250,0.2)", solutionBg: "rgba(96,165,250,0.05)" },
};

function getColor(key: string) {
  return colorStyle[(key as ColorKey)] || colorStyle.emerald;
}

interface ProgramsSectionProps {
  programs: Program[];
}

export default function ProgramsSection({ programs }: ProgramsSectionProps) {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  return (
    <section id="program" className="section-padding relative overflow-hidden" style={{ backgroundColor: "#07070a" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(230,57,70,0.3), transparent)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 100%, rgba(230,57,70,0.04) 0%, transparent 55%)" }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-14">
          <div className="section-label mb-3">Program Unggulan</div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase">
            3 Program Untuk Desa{" "}
            <span className="gradient-text-red">Yang Lebih Maju</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
            Setiap program dirancang dengan memahami masalah nyata yang dihadapi masyarakat, bukan sekadar janji kampanye.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl">
          {programs.map((program, index) => {
            const c = getColor(program.color);
            return (
              <button
                key={program.id}
                onClick={() => setSelectedProgram(program)}
                className="text-left p-6 transition-all duration-300 group relative"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${c.accentBorder}`,
                  borderRadius: "0.5rem",
                }}
                aria-label={`Lihat detail program ${program.title}`}
              >
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t" style={{ background: c.accent }} />

                {/* Tag */}
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: c.accent }}>
                  {program.tag}
                </span>

                {/* Icon & number */}
                <div className="flex items-center justify-between my-5">
                  <div className="w-12 h-12 rounded flex items-center justify-center" style={{ background: c.accentBg, color: c.accent, border: `1px solid ${c.accentBorder}` }}>
                    {iconMap[program.icon] || <Shield size={22} />}
                  </div>
                  <span className="font-display font-black text-6xl leading-none select-none" style={{ color: "rgba(255,255,255,0.04)" }}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="text-white font-display font-bold text-lg mb-2 uppercase">{program.title}</h3>
                <p className="text-xs leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {program.subtitle || program.description.slice(0, 90) + "..."}
                </p>

                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider" style={{ color: c.accent }}>
                  <span>Lihat Detail</span>
                  <ChevronRight size={13} />
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-10">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
            Setiap program menjawab:{" "}
            <span style={{ color: "rgba(255,255,255,0.45)" }}>
              Masalah → Solusi → Cara Kerja → Manfaat bagi masyarakat
            </span>
          </p>
        </div>
      </div>

      {selectedProgram && (
        <ProgramDetailModal program={selectedProgram} onClose={() => setSelectedProgram(null)} />
      )}
    </section>
  );
}

function ProgramDetailModal({ program, onClose }: { program: Program; onClose: () => void }) {
  const c = getColor(program.color);
  const howItWorks: string[] = Array.isArray(program.how_it_works) ? program.how_it_works : [];
  const benefits: string[] = Array.isArray(program.benefits) ? program.benefits : [];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" role="dialog" aria-modal="true" aria-labelledby="program-modal-title">
      <div className="absolute inset-0 backdrop-blur-sm" style={{ background: "rgba(0,0,0,0.8)" }} onClick={onClose} />

      <div
        className="relative w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto"
        style={{ background: "#0d0d14", border: `1px solid ${c.accentBorder}`, borderRadius: "0.5rem 0.5rem 0 0" }}
      >
        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: c.accent }} />

        {/* Sticky header */}
        <div
          className="sticky top-0 px-6 py-5 flex items-center justify-between"
          style={{ background: "rgba(13,13,20,0.98)", borderBottom: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(20px)", zIndex: 10 }}
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: c.accent }}>{program.tag}</span>
            <h2 id="program-modal-title" className="text-white font-display font-black text-xl uppercase mt-0.5">{program.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded flex items-center justify-center transition-colors hover:bg-white/10"
            style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)" }}
            aria-label="Tutup"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{program.description}</p>

          {/* Problem / Solution */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-5 rounded" style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)" }}>
              <h3 className="font-bold text-xs uppercase tracking-widest mb-3" style={{ color: "#f87171" }}>Masalah</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{program.problem}</p>
            </div>
            <div className="p-5 rounded" style={{ background: c.solutionBg, border: `1px solid ${c.accentBorder}` }}>
              <h3 className="font-bold text-xs uppercase tracking-widest mb-3" style={{ color: c.accent }}>Solusi</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{program.solution}</p>
            </div>
          </div>

          {howItWorks.length > 0 && (
            <div>
              <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                <ArrowRight size={13} style={{ color: c.accent }} />Cara Kerja
              </h3>
              <div className="space-y-2.5">
                {howItWorks.map((step, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: c.accentBg, color: c.accent }}>
                      {i + 1}
                    </span>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {benefits.length > 0 && (
            <div>
              <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                <CheckCircle2 size={13} style={{ color: c.accent }} />Manfaat
              </h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {benefits.map((b, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <CheckCircle2 size={13} className="shrink-0 mt-0.5" style={{ color: c.accent }} />
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{b}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {program.target_beneficiary && (
            <div className="flex gap-3 items-start p-4 rounded" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <Target size={15} className="shrink-0 mt-0.5" style={{ color: c.accent }} />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: c.accent }}>Target Penerima Manfaat</p>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{program.target_beneficiary}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
