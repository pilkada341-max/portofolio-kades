"use client";

import { useState } from "react";
import { Shield, Users, Eye, ChevronRight, X, ArrowRight, CheckCircle2, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Program } from "@/types/database";

const iconMap: Record<string, React.ReactNode> = {
  shield: <Shield size={24} />,
  users: <Users size={24} />,
  eye: <Eye size={24} />,
};

const colorMap: Record<string, { bg: string; border: string; text: string; accent: string }> = {
  emerald: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    accent: "bg-emerald-500",
  },
  gold: {
    bg: "bg-gold-500/10",
    border: "border-gold-500/30",
    text: "text-gold-400",
    accent: "bg-gold-500",
  },
  blue: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    text: "text-blue-400",
    accent: "bg-blue-500",
  },
};

interface ProgramsSectionProps {
  programs: Program[];
}

export default function ProgramsSection({ programs }: ProgramsSectionProps) {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  return (
    <section id="program" className="section-padding bg-forest-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(ellipse at 50% 80%, rgba(16, 185, 129, 0.5) 0%, transparent 50%)`,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-3">
            Program Unggulan
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white">
            3 Program Untuk Desa{" "}
            <span className="gradient-text-emerald">Yang Lebih Maju</span>
          </h2>
          <p className="text-white/50 mt-4 max-w-2xl mx-auto text-sm">
            Setiap program dirancang dengan memahami masalah nyata yang dihadapi masyarakat, bukan sekadar janji kampanye.
          </p>
        </div>

        {/* Program Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {programs.map((program, index) => {
            const color = colorMap[program.color] || colorMap.emerald;
            return (
              <div
                key={program.id}
                className={cn(
                  "glass-card rounded-3xl p-6 border cursor-pointer group hover:-translate-y-2 transition-all duration-400",
                  color.border
                )}
                onClick={() => setSelectedProgram(program)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setSelectedProgram(program)}
                aria-label={`Lihat detail program ${program.title}`}
              >
                {/* Tag */}
                <span className={cn("text-xs font-semibold uppercase tracking-wider", color.text)}>
                  {program.tag}
                </span>

                {/* Icon & Number */}
                <div className="flex items-center justify-between my-5">
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", color.bg, color.text)}>
                    {iconMap[program.icon] || <Shield size={24} />}
                  </div>
                  <span className="text-white/8 font-display font-bold text-6xl leading-none select-none" style={{ color: "rgba(255,255,255,0.05)" }}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-white font-display font-bold text-xl mb-3 group-hover:text-emerald-300 transition-colors">
                  {program.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  {program.subtitle || program.description.slice(0, 100) + "..."}
                </p>

                {/* CTA */}
                <div className={cn("flex items-center gap-2 text-sm font-semibold", color.text)}>
                  <span>Lihat Detail</span>
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Core message */}
        <div className="text-center mt-16">
          <p className="text-white/30 text-sm max-w-xl mx-auto">
            Setiap program menjawab: <span className="text-white/60">Masalah → Solusi → Cara Kerja → Manfaat bagi masyarakat</span>
          </p>
        </div>
      </div>

      {/* Program Detail Modal */}
      {selectedProgram && (
        <ProgramDetailModal
          program={selectedProgram}
          onClose={() => setSelectedProgram(null)}
        />
      )}
    </section>
  );
}

function ProgramDetailModal({ program, onClose }: { program: Program; onClose: () => void }) {
  const color = colorMap[program.color] || colorMap.emerald;

  const howItWorks: string[] = Array.isArray(program.how_it_works)
    ? program.how_it_works
    : [];
  const benefits: string[] = Array.isArray(program.benefits)
    ? program.benefits
    : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="program-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full sm:max-w-2xl max-h-[90vh] bg-forest-950 border border-white/10 rounded-t-3xl sm:rounded-3xl overflow-y-auto">
        {/* Header */}
        <div className={cn("sticky top-0 px-6 py-5 border-b border-white/10 bg-forest-950/95 backdrop-blur-sm flex items-center justify-between z-10")}>
          <div>
            <span className={cn("text-xs font-semibold uppercase tracking-wider", color.text)}>
              {program.tag}
            </span>
            <h2 id="program-modal-title" className="text-white font-display font-bold text-xl mt-0.5">
              {program.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            aria-label="Tutup"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Description */}
          <p className="text-white/70 leading-relaxed">{program.description}</p>

          {/* Problem → Solution */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl p-5 bg-red-500/5 border border-red-500/20">
              <h3 className="text-red-400 font-semibold text-sm uppercase tracking-wider mb-3">
                Masalah
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">{program.problem}</p>
            </div>
            <div className={cn("rounded-2xl p-5 border", color.bg, color.border)}>
              <h3 className={cn("font-semibold text-sm uppercase tracking-wider mb-3", color.text)}>
                Solusi
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">{program.solution}</p>
            </div>
          </div>

          {/* How it works */}
          {howItWorks.length > 0 && (
            <div>
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <ArrowRight size={16} className={color.text} />
                Cara Kerja
              </h3>
              <div className="space-y-2">
                {howItWorks.map((step, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className={cn("w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5", color.bg, color.text)}>
                      {i + 1}
                    </span>
                    <p className="text-white/70 text-sm">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Benefits */}
          {benefits.length > 0 && (
            <div>
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" />
                Manfaat
              </h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                    <p className="text-white/70 text-sm">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Target */}
          {program.target_beneficiary && (
            <div className="flex gap-3 items-start glass-card rounded-2xl p-4">
              <Target size={18} className={cn("shrink-0 mt-0.5", color.text)} />
              <div>
                <p className={cn("text-xs font-semibold uppercase tracking-wider mb-1", color.text)}>
                  Target Penerima Manfaat
                </p>
                <p className="text-white/70 text-sm">{program.target_beneficiary}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
