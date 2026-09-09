"use client";

import Image from "next/image";
import { GraduationCap, Briefcase, Users, Heart } from "lucide-react";
import type { Candidate } from "@/types/database";

interface ProfileSectionProps {
  candidate: Candidate;
}

export default function ProfileSection({ candidate }: ProfileSectionProps) {
  const tabs = [
    {
      id: "education",
      label: "Pendidikan",
      icon: <GraduationCap size={15} />,
      data: candidate.education || [],
      render: (item: { year: string; institution: string; degree: string }, i: number) => (
        <div key={i} className="flex gap-3">
          <span className="text-emerald-400 font-mono text-xs w-10 shrink-0 pt-0.5">{item.year}</span>
          <div>
            <p className="text-white text-sm font-medium leading-snug">{item.degree}</p>
            <p className="text-white/40 text-xs mt-0.5">{item.institution}</p>
          </div>
        </div>
      ),
    },
    {
      id: "experience",
      label: "Pengalaman",
      icon: <Briefcase size={15} />,
      data: candidate.experience || [],
      render: (item: { year: string; title: string; organization: string; description: string }, i: number) => (
        <div key={i} className="flex gap-3">
          <span className="text-emerald-400 font-mono text-xs w-10 shrink-0 pt-0.5">{item.year}</span>
          <div>
            <p className="text-white text-sm font-medium leading-snug">{item.title}</p>
            <p className="text-emerald-400/60 text-xs">{item.organization}</p>
            {item.description && <p className="text-white/40 text-xs mt-0.5">{item.description}</p>}
          </div>
        </div>
      ),
    },
    {
      id: "organization",
      label: "Organisasi",
      icon: <Users size={15} />,
      data: candidate.organization || [],
      render: (item: { year: string; name: string; role: string }, i: number) => (
        <div key={i} className="flex gap-3">
          <span className="text-emerald-400 font-mono text-xs w-10 shrink-0 pt-0.5">{item.year}</span>
          <div>
            <p className="text-white text-sm font-medium leading-snug">{item.name}</p>
            <p className="text-white/40 text-xs mt-0.5">{item.role}</p>
          </div>
        </div>
      ),
    },
    {
      id: "social",
      label: "Kegiatan Sosial",
      icon: <Heart size={15} />,
      data: candidate.social_activity || [],
      render: (item: { year: string; title: string; description: string }, i: number) => (
        <div key={i} className="flex gap-3">
          <span className="text-emerald-400 font-mono text-xs w-10 shrink-0 pt-0.5">{item.year}</span>
          <div>
            <p className="text-white text-sm font-medium leading-snug">{item.title}</p>
            {item.description && <p className="text-white/40 text-xs mt-0.5">{item.description}</p>}
          </div>
        </div>
      ),
    },
  ];

  return (
    <section
      id="profil"
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "#050d07" }}
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 20% 50%, rgba(16,185,129,0.06) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(16,185,129,0.3), transparent)" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 10 }}>
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="inline-block text-xs font-semibold uppercase"
            style={{ color: "rgba(52,211,153,0.7)", letterSpacing: "0.2em" }}
          >
            Kenali Sosoknya
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mt-2">
            Mengenal Sosok di Balik{" "}
            <span className="gradient-text-emerald">Perubahan</span>
          </h2>
        </div>

        {/* Layout: foto kiri, info kanan */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start max-w-5xl mx-auto">

          {/* Kolom foto */}
          <div className="w-full lg:w-72 shrink-0 flex flex-col items-center lg:items-start">
            {/* Foto */}
            <div
              className="relative rounded-2xl overflow-hidden border w-56 h-72 sm:w-64 sm:h-80 lg:w-72 lg:h-96 mx-auto lg:mx-0"
              style={{ borderColor: "rgba(16,185,129,0.2)" }}
            >
              {candidate.photo_url ? (
                <Image
                  src={candidate.photo_url}
                  alt={`Foto ${candidate.name}`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 224px, (max-width: 1024px) 256px, 288px"
                />
              ) : (
                <div
                  className="w-full h-full flex flex-col items-center justify-center"
                  style={{ background: "rgba(6,78,59,0.3)" }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
                    style={{ background: "rgba(16,185,129,0.15)", border: "2px solid rgba(16,185,129,0.3)" }}
                  >
                    <span className="text-2xl">👤</span>
                  </div>
                  <p className="text-xs" style={{ color: "rgba(52,211,153,0.5)" }}>
                    [FOTO CALON]
                  </p>
                </div>
              )}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(5,13,7,0.4) 0%, transparent 60%)" }}
              />
            </div>

            {/* Info singkat */}
            <div
              className="mt-4 w-56 sm:w-64 lg:w-72 rounded-2xl p-4 mx-auto lg:mx-0"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <p className="text-white font-display font-bold text-lg leading-snug">
                {candidate.name}
              </p>
              <p className="text-emerald-400 text-xs mt-1">
                Calon Kepala Desa {candidate.village_name}
              </p>
              {candidate.birth_place && candidate.birth_date && (
                <p className="text-white/40 text-xs mt-1">
                  {candidate.birth_place},{" "}
                  {new Date(candidate.birth_date).toLocaleDateString("id-ID", {
                    day: "numeric", month: "long", year: "numeric",
                  })}
                </p>
              )}
            </div>
          </div>

          {/* Kolom info */}
          <div className="flex-1 min-w-0">
            {/* Bio */}
            <p className="text-white/70 leading-relaxed text-sm sm:text-base mb-6 max-w-2xl">
              {candidate.bio ||
                "Putra daerah yang telah lama mengabdi kepada masyarakat desa dengan penuh dedikasi dan komitmen untuk membawa perubahan nyata."}
            </p>

            {/* Quote */}
            <div
              className="rounded-r-2xl px-5 py-4 mb-8"
              style={{
                background: "rgba(6,78,59,0.3)",
                borderLeft: "4px solid #10b981",
                backdropFilter: "blur(16px)",
              }}
            >
              <p className="text-white/85 italic text-sm leading-relaxed">
                {candidate.quote
                  ? candidate.quote.replace(/^[""\u201c\u201d]|[""\u201c\u201d]$/g, "")
                  : "Kepemimpinan bukan tentang berada di depan masyarakat, tetapi tentang berjalan bersama masyarakat."}
              </p>
            </div>

            {/* Tab info */}
            <div className="space-y-3" role="list">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  role="listitem"
                  className="rounded-2xl p-4 sm:p-5"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div
                    className="flex items-center gap-2 text-xs font-semibold mb-3"
                    style={{ color: "#34d399" }}
                  >
                    {tab.icon}
                    <span className="uppercase tracking-wider">{tab.label}</span>
                  </div>
                  {tab.data.length > 0 ? (
                    <div className="space-y-3">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {(tab.data as any[]).map((item, i) => tab.render(item, i))}
                    </div>
                  ) : (
                    <p className="text-white/25 text-xs italic">Data belum tersedia.</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
