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
      icon: <GraduationCap size={14} />,
      data: candidate.education || [],
      render: (item: { year: string; institution: string; degree: string }, i: number) => (
        <div key={i} className="flex gap-3">
          <span className="font-mono text-xs w-10 shrink-0 pt-0.5" style={{ color: "#e63946" }}>{item.year}</span>
          <div>
            <p className="text-white text-sm font-medium leading-snug">{item.degree}</p>
            <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{item.institution}</p>
          </div>
        </div>
      ),
    },
    {
      id: "experience",
      label: "Pengalaman",
      icon: <Briefcase size={14} />,
      data: candidate.experience || [],
      render: (item: { year: string; title: string; organization: string; description: string }, i: number) => (
        <div key={i} className="flex gap-3">
          <span className="font-mono text-xs w-10 shrink-0 pt-0.5" style={{ color: "#e63946" }}>{item.year}</span>
          <div>
            <p className="text-white text-sm font-medium leading-snug">{item.title}</p>
            <p className="text-xs" style={{ color: "rgba(230,57,70,0.6)" }}>{item.organization}</p>
            {item.description && <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{item.description}</p>}
          </div>
        </div>
      ),
    },
    {
      id: "organization",
      label: "Organisasi",
      icon: <Users size={14} />,
      data: candidate.organization || [],
      render: (item: { year: string; name: string; role: string }, i: number) => (
        <div key={i} className="flex gap-3">
          <span className="font-mono text-xs w-10 shrink-0 pt-0.5" style={{ color: "#e63946" }}>{item.year}</span>
          <div>
            <p className="text-white text-sm font-medium leading-snug">{item.name}</p>
            <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{item.role}</p>
          </div>
        </div>
      ),
    },
    {
      id: "social",
      label: "Kegiatan Sosial",
      icon: <Heart size={14} />,
      data: candidate.social_activity || [],
      render: (item: { year: string; title: string; description: string }, i: number) => (
        <div key={i} className="flex gap-3">
          <span className="font-mono text-xs w-10 shrink-0 pt-0.5" style={{ color: "#e63946" }}>{item.year}</span>
          <div>
            <p className="text-white text-sm font-medium leading-snug">{item.title}</p>
            {item.description && <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{item.description}</p>}
          </div>
        </div>
      ),
    },
  ];

  return (
    <section
      id="profil"
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "#07070a" }}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 15% 50%, rgba(230,57,70,0.05) 0%, transparent 55%)",
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(230,57,70,0.3), transparent)" }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-14">
          <div className="section-label mb-3">Kenali Sosoknya</div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase">
            Sosok di Balik{" "}
            <span className="gradient-text-red">Perubahan</span>
          </h2>
        </div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start max-w-5xl">

          {/* Foto kolom */}
          <div className="w-full lg:w-72 shrink-0 flex flex-col items-center lg:items-start">
            {/* Frame foto — Valorant style */}
            <div
              className="relative w-56 h-72 sm:w-64 sm:h-80 lg:w-72 lg:h-96 mx-auto lg:mx-0 overflow-hidden"
              style={{
                background: "rgba(13,13,20,0.8)",
                border: "1px solid rgba(230,57,70,0.2)",
                borderRadius: "0.5rem",
              }}
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
                <div className="w-full h-full flex flex-col items-center justify-center" style={{ background: "rgba(13,13,20,0.9)" }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2" style={{ background: "rgba(230,57,70,0.1)", border: "2px solid rgba(230,57,70,0.3)" }}>
                    <span className="text-2xl">👤</span>
                  </div>
                  <p className="text-xs" style={{ color: "rgba(230,57,70,0.5)" }}>[FOTO CALON]</p>
                </div>
              )}
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(7,7,10,0.6) 0%, transparent 60%)" }} />
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-5 h-0.5" style={{ background: "#e63946" }} />
              <div className="absolute top-0 left-0 h-5 w-0.5" style={{ background: "#e63946" }} />
              <div className="absolute bottom-0 right-0 w-5 h-0.5" style={{ background: "#e63946" }} />
              <div className="absolute bottom-0 right-0 h-5 w-0.5" style={{ background: "#e63946" }} />
            </div>

            {/* Info singkat */}
            <div
              className="mt-4 w-56 sm:w-64 lg:w-72 p-4 mx-auto lg:mx-0"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "0.5rem" }}
            >
              <p className="text-white font-display font-bold text-base leading-snug">{candidate.name}</p>
              <p className="text-xs mt-1 font-semibold uppercase tracking-wider" style={{ color: "#e63946" }}>
                Calon Kepala Desa {candidate.village_name}
              </p>
              {candidate.birth_place && candidate.birth_date && (
                <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                  {candidate.birth_place},{" "}
                  {new Date(candidate.birth_date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              )}
            </div>
          </div>

          {/* Info kolom */}
          <div className="flex-1 min-w-0">
            {/* Bio */}
            <p className="text-white/65 leading-relaxed text-sm sm:text-base mb-6 max-w-2xl">
              {candidate.bio || "Putra daerah yang telah lama mengabdi kepada masyarakat desa dengan penuh dedikasi dan komitmen untuk membawa perubahan nyata."}
            </p>

            {/* Quote — Valorant accent */}
            <div
              className="pl-5 py-4 mb-8"
              style={{ borderLeft: "3px solid #e63946", background: "rgba(230,57,70,0.05)", borderRadius: "0 0.5rem 0.5rem 0" }}
            >
              <p className="text-white/80 italic text-sm leading-relaxed">
                {candidate.quote?.replace(/^[""\u201c\u201d]|[""\u201c\u201d]$/g, "") ||
                  "Kepemimpinan bukan tentang berada di depan masyarakat, tetapi tentang berjalan bersama masyarakat."}
              </p>
            </div>

            {/* Tab info */}
            <div className="space-y-3" role="list">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  role="listitem"
                  className="rounded p-4 sm:p-5"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#e63946" }}>
                    {tab.icon}
                    <span>{tab.label}</span>
                  </div>
                  {tab.data.length > 0 ? (
                    <div className="space-y-3">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {(tab.data as any[]).map((item, i) => tab.render(item, i))}
                    </div>
                  ) : (
                    <p className="text-xs italic" style={{ color: "rgba(255,255,255,0.2)" }}>Data belum tersedia.</p>
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
