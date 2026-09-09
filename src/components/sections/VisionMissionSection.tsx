"use client";

import { Shield, Users, Eye } from "lucide-react";
import type { Vision, Mission } from "@/types/database";

const iconMap: Record<string, React.ReactNode> = {
  shield: <Shield size={24} />,
  users:  <Users size={24} />,
  eye:    <Eye size={24} />,
};

interface VisionMissionSectionProps {
  vision: Vision | null;
  missions: Mission[];
}

export default function VisionMissionSection({ vision, missions }: VisionMissionSectionProps) {
  return (
    <section id="visi-misi" className="relative overflow-hidden">

      {/* ── VISI ── */}
      <div className="section-padding relative" style={{ backgroundColor: "#07070a" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, rgba(230,57,70,0.06) 0%, transparent 70%)" }} />
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(230,57,70,0.3), transparent)" }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <div className="section-label mb-6">Visi</div>

            {/* Big quote */}
            <div className="relative pl-6" style={{ borderLeft: "3px solid #e63946" }}>
              <span
                className="absolute -top-6 -left-2 font-display font-black leading-none select-none hidden sm:block"
                style={{ fontSize: "6rem", lineHeight: 1, color: "rgba(230,57,70,0.08)" }}
              >
                "
              </span>
              <blockquote className="font-display font-black text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white leading-tight uppercase">
                {vision?.content || 'Mewujudkan Desa yang maju, transparan, mandiri, dan sejahtera dengan pelayanan yang dekat dengan masyarakat.'}
              </blockquote>
            </div>

            {/* Pillar badges */}
            <div className="flex flex-wrap gap-3 mt-12">
              {["Maju", "Transparan", "Mandiri", "Sejahtera"].map((word) => (
                <span
                  key={word}
                  className="px-5 py-2 text-sm font-bold uppercase tracking-widest"
                  style={{
                    background: "rgba(230,57,70,0.08)",
                    border: "1px solid rgba(230,57,70,0.25)",
                    borderRadius: "0.25rem",
                    color: "#e63946",
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── MISI ── */}
      <div className="section-padding relative" style={{ backgroundColor: "#0d0d14" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(245,158,11,0.2), transparent)" }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-14">
            <div className="section-label-gold mb-3">Misi</div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase">
              Tiga Pilar <span className="gradient-text-gold">Kepemimpinan</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl">
            {(missions.length > 0 ? missions : [
              { id: "1", title: "Pelayanan", icon: "shield", description: "Memberikan pelayanan desa yang cepat, mudah, gratis, dan dekat dengan masyarakat.", order_number: 1 },
              { id: "2", title: "Pemuda",    icon: "users",  description: "Membangun ruang bagi pemuda untuk berkembang, berdiskusi, berkreasi, dan menyampaikan aspirasi.", order_number: 2 },
              { id: "3", title: "Transparansi", icon: "eye", description: "Mendorong pemerintahan desa yang terbuka, amanah, dan dapat dipertanggungjawabkan.", order_number: 3 },
            ] as Mission[]).map((mission, index) => (
              <div
                key={mission.id}
                className="p-7 transition-all duration-300 group hover:-translate-y-1 relative"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "0.5rem",
                }}
              >
                {/* Top accent on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 rounded-t opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "linear-gradient(to right, #e63946, #f59e0b)" }}
                />

                <div className="flex items-start justify-between mb-6">
                  <div
                    className="w-12 h-12 rounded flex items-center justify-center group-hover:bg-red-500/20 transition-colors"
                    style={{ background: "rgba(230,57,70,0.08)", color: "#e63946", border: "1px solid rgba(230,57,70,0.2)" }}
                  >
                    {iconMap[mission.icon] || <Shield size={24} />}
                  </div>
                  <span className="font-display font-black text-5xl leading-none" style={{ color: "rgba(255,255,255,0.04)" }}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-white font-display font-black text-xl mb-3 uppercase">{mission.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{mission.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
