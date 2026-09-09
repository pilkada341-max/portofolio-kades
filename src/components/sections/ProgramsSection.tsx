"use client";

import { useState } from "react";
import { Shield, Users, Eye, ChevronRight, X, ArrowRight, CheckCircle2, Target } from "lucide-react";
import type { Program } from "@/types/database";

const iconMap: Record<string, React.ReactNode> = {
  shield: <Shield size={24} />,
  users: <Users size={24} />,
  eye: <Eye size={24} />,
};

type ColorKey = "emerald" | "gold" | "blue";

const colorStyle: Record<ColorKey, {
  cardBorder: string;
  tagColor: string;
  iconBg: string;
  iconColor: string;
  solutionBg: string;
  solutionBorder: string;
}> = {
  emerald: {
    cardBorder: "rgba(16,185,129,0.25)",
    tagColor: "#34d399",
    iconBg: "rgba(16,185,129,0.1)",
    iconColor: "#34d399",
    solutionBg: "rgba(16,185,129,0.06)",
    solutionBorder: "rgba(16,185,129,0.2)",
  },
  gold: {
    cardBorder: "rgba(245,158,11,0.25)",
    tagColor: "#fbbf24",
    iconBg: "rgba(245,158,11,0.1)",
    iconColor: "#fbbf24",
    solutionBg: "rgba(245,158,11,0.06)",
    solutionBorder: "rgba(245,158,11,0.2)",
  },
  blue: {
    cardBorder: "rgba(59,130,246,0.25)",
    tagColor: "#60a5fa",
    iconBg: "rgba(59,130,246,0.1)",
    iconColor: "#60a5fa",
    solutionBg: "rgba(59,130,246,0.06)",
    solutionBorder: "rgba(59,130,246,0.2)",
  },
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
    <section
      id="program"
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "#050d07" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(16,185,129,0.3), transparent)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 80%, rgba(16,185,129,0.05) 0%, transparent 50%)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 10 }}>
        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="inline-block text-xs font-semibold uppercase"
            style={{ color: "#34d399", letterSpacing: "0.2em" }}
          >
            Program Unggulan
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mt-2">
            3 Program Untuk Desa{" "}
            <span className="gradient-text-emerald">Yang Lebih Maju</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            Setiap program dirancang dengan memahami masalah nyata yang dihadapi masyarakat, bukan sekadar janji kampanye.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {programs.map((program, index) => {
            const c = getColor(program.color);
            return (
              <button
                key={program.id}
                onClick={() => setSelectedProgram(program)}
                className="text-left rounded-3xl p-6 transition-all duration-300 group"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${c.cardBorder}`,
                  backdropFilter: "blur(20px)",
                }}
                aria-label={`Lihat detail program ${program.title}`}
              >
                {/* Tag */}
                <span
                  className="text-xs font-semibold uppercase"
                  style={{ color: c.tagColor, letterSpacing: "0.1em" }}
                >
                  {program.tag}
                </span>

                {/* Icon & number */}
                <div className="flex items-center justify-between my-5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ background: c.iconBg, color: c.iconColor }}
                  >
                    {iconMap[program.icon] || <Shield size={24} />}
                  </div>
                  <span
                    className="font-display font-bold text-6xl leading-none select-none"
                    style={{ color: "rgba(255,255,255,0.05)" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-white font-display font-bold text-xl mb-2">
                  {program.title}
                </h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.55)" }}>
                  {program.subtitle || program.description.slice(0, 90) + "..."}
                </p>

                {/* CTA */}
                <div
                  className="flex items-center gap-2 text-sm font-semibold"
                  style={{ color: c.tagColor }}
                >
                  <span>Lihat Detail</span>
                  <ChevronRight size={15} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Core message */}
        <div className="text-center mt-12">
          <p className="text-sm max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.28)" }}>
            Setiap program menjawab:{" "}
            <span style={{ color: "rgba(255,255,255,0.55)" }}>
              Masalah → Solusi → Cara Kerja → Manfaat bagi masyarakat
            </span>
          </p>
        </div>
      </div>

      {/* Modal */}
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
  const c = getColor(program.color);
  const howItWorks: string[] = Array.isArray(program.how_it_works) ? program.how_it_works : [];
  const benefits: string[] = Array.isArray(program.benefits) ? program.benefits : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="program-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{ background: "rgba(0,0,0,0.7)" }}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="relative w-full sm:max-w-2xl max-h-[90vh] rounded-t-3xl sm:rounded-3xl overflow-y-auto"
        style={{ background: "#050d07", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        {/* Sticky header */}
        <div
          className="sticky top-0 px-6 py-5 flex items-center justify-between"
          style={{
            background: "rgba(5,13,7,0.95)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(20px)",
            zIndex: 10,
          }}
        >
          <div>
            <span
              className="text-xs font-semibold uppercase"
              style={{ color: c.tagColor, letterSpacing: "0.1em" }}
            >
              {program.tag}
            </span>
            <h2
              id="program-modal-title"
              className="text-white font-display font-bold text-xl mt-0.5"
            >
              {program.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
            style={{
              background: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.6)",
            }}
            aria-label="Tutup"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-7">
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
            {program.description}
          </p>

          {/* Problem / Solution */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div
              className="rounded-2xl p-5"
              style={{
                background: "rgba(239,68,68,0.05)",
                border: "1px solid rgba(239,68,68,0.18)",
              }}
            >
              <h3 className="font-semibold text-xs uppercase tracking-wider mb-3" style={{ color: "#f87171" }}>
                Masalah
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                {program.problem}
              </p>
            </div>
            <div
              className="rounded-2xl p-5"
              style={{ background: c.solutionBg, border: `1px solid ${c.solutionBorder}` }}
            >
              <h3
                className="font-semibold text-xs uppercase tracking-wider mb-3"
                style={{ color: c.tagColor }}
              >
                Solusi
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                {program.solution}
              </p>
            </div>
          </div>

          {/* How it works */}
          {howItWorks.length > 0 && (
            <div>
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2 text-sm">
                <ArrowRight size={15} style={{ color: c.tagColor }} />
                Cara Kerja
              </h3>
              <div className="space-y-2.5">
                {howItWorks.map((step, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                      style={{ background: c.iconBg, color: c.tagColor }}
                    >
                      {i + 1}
                    </span>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Benefits */}
          {benefits.length > 0 && (
            <div>
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2 text-sm">
                <CheckCircle2 size={15} style={{ color: "#34d399" }} />
                Manfaat
              </h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {benefits.map((b, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <CheckCircle2 size={13} className="shrink-0 mt-0.5" style={{ color: "#34d399" }} />
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>{b}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Target */}
          {program.target_beneficiary && (
            <div
              className="flex gap-3 items-start rounded-2xl p-4"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Target size={17} className="shrink-0 mt-0.5" style={{ color: c.tagColor }} />
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-1"
                  style={{ color: c.tagColor }}
                >
                  Target Penerima Manfaat
                </p>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                  {program.target_beneficiary}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
