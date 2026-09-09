"use client";

import { useRef } from "react";
import { GraduationCap, Briefcase, Users, Heart } from "lucide-react";
import type { Candidate } from "@/types/database";
import { formatDate } from "@/lib/utils";

interface ProfileSectionProps {
  candidate: Candidate;
}

export default function ProfileSection({ candidate }: ProfileSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const tabs = [
    {
      id: "education",
      label: "Pendidikan",
      icon: <GraduationCap size={16} />,
      data: candidate.education || [],
      render: (item: { year: string; institution: string; degree: string }) => (
        <div key={item.year} className="flex gap-4">
          <span className="text-emerald-400 font-mono text-sm w-12 shrink-0 pt-0.5">{item.year}</span>
          <div>
            <p className="text-white font-medium text-sm">{item.degree}</p>
            <p className="text-white/50 text-xs mt-0.5">{item.institution}</p>
          </div>
        </div>
      ),
    },
    {
      id: "experience",
      label: "Pengalaman",
      icon: <Briefcase size={16} />,
      data: candidate.experience || [],
      render: (item: { year: string; title: string; organization: string; description: string }) => (
        <div key={item.year} className="flex gap-4">
          <span className="text-emerald-400 font-mono text-sm w-12 shrink-0 pt-0.5">{item.year}</span>
          <div>
            <p className="text-white font-medium text-sm">{item.title}</p>
            <p className="text-emerald-400/70 text-xs">{item.organization}</p>
            {item.description && (
              <p className="text-white/50 text-xs mt-1">{item.description}</p>
            )}
          </div>
        </div>
      ),
    },
    {
      id: "organization",
      label: "Organisasi",
      icon: <Users size={16} />,
      data: candidate.organization || [],
      render: (item: { year: string; name: string; role: string }) => (
        <div key={item.year} className="flex gap-4">
          <span className="text-emerald-400 font-mono text-sm w-12 shrink-0 pt-0.5">{item.year}</span>
          <div>
            <p className="text-white font-medium text-sm">{item.name}</p>
            <p className="text-white/50 text-xs mt-0.5">{item.role}</p>
          </div>
        </div>
      ),
    },
    {
      id: "social",
      label: "Kegiatan Sosial",
      icon: <Heart size={16} />,
      data: candidate.social_activity || [],
      render: (item: { year: string; title: string; description: string }) => (
        <div key={item.year} className="flex gap-4">
          <span className="text-emerald-400 font-mono text-sm w-12 shrink-0 pt-0.5">{item.year}</span>
          <div>
            <p className="text-white font-medium text-sm">{item.title}</p>
            {item.description && (
              <p className="text-white/50 text-xs mt-1">{item.description}</p>
            )}
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="profil" className="section-padding bg-forest-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(ellipse at 20% 50%, rgba(16, 185, 129, 0.4) 0%, transparent 50%)`,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-3">
            Kenali Sosoknya
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white">
            Mengenal Sosok di Balik{" "}
            <span className="gradient-text-emerald">Perubahan</span>
          </h2>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Photo column */}
          <div className="lg:col-span-2 flex flex-col items-center lg:items-start">
            {/* Photo */}
            <div className="relative w-64 h-80 sm:w-72 sm:h-96 mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-emerald-500/10 rounded-3xl blur-2xl" />
              <div className="relative h-full rounded-3xl overflow-hidden border border-emerald-500/20">
                {candidate.photo_url ? (
                  <img
                    src={candidate.photo_url}
                    alt={`Foto ${candidate.name}`}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-emerald-950/50">
                    <div className="text-center">
                      <div className="text-5xl mb-3">👤</div>
                      <p className="text-emerald-400/50 text-xs">[FOTO CALON]</p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/40 to-transparent" />
              </div>
            </div>

            {/* Quick info */}
            <div className="w-full mt-6 glass-card rounded-2xl p-5 space-y-3">
              <h3 className="text-white font-display font-bold text-xl">{candidate.name}</h3>
              <p className="text-emerald-400 text-sm">Calon Kepala Desa {candidate.village_name}</p>
              {candidate.birth_place && candidate.birth_date && (
                <p className="text-white/50 text-xs">
                  {candidate.birth_place},{" "}
                  {new Date(candidate.birth_date).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              )}
            </div>
          </div>

          {/* Info column */}
          <div className="lg:col-span-3">
            {/* Bio */}
            <p className="text-white/70 leading-relaxed text-base mb-10">
              {candidate.bio || "Putra daerah yang telah lama mengabdi kepada masyarakat desa dengan penuh dedikasi dan komitmen."}
            </p>

            {/* Quote */}
            <blockquote className="glass-dark border-l-4 border-emerald-500 px-6 py-5 rounded-r-2xl mb-10">
              <p className="text-white/90 italic text-base leading-relaxed">
                {candidate.quote || '"Kepemimpinan bukan tentang berada di depan masyarakat, tetapi tentang berjalan bersama masyarakat."'}
              </p>
            </blockquote>

            {/* Tabs */}
            <div className="space-y-6">
              {tabs.map((tab) => (
                <div key={tab.id} className="glass-card rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-4">
                    {tab.icon}
                    <span>{tab.label}</span>
                  </div>
                  {tab.data.length > 0 ? (
                    <div className="space-y-3">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {tab.data.map((item: any) => tab.render(item))}
                    </div>
                  ) : (
                    <p className="text-white/30 text-sm italic">Data belum tersedia.</p>
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
