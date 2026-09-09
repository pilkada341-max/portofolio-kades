"use client";

import { Shield, Users, Eye } from "lucide-react";
import type { Vision, Mission } from "@/types/database";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  shield: <Shield size={28} />,
  users: <Users size={28} />,
  eye: <Eye size={28} />,
};

interface VisionMissionSectionProps {
  vision: Vision | null;
  missions: Mission[];
}

export default function VisionMissionSection({ vision, missions }: VisionMissionSectionProps) {
  return (
    <section id="visi-misi" className="relative overflow-hidden">
      {/* Vision part - dark */}
      <div className="section-padding relative" style={{ backgroundColor: "#050d07" }}>
        <div className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, rgba(16,185,129,0.08) 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(16,185,129,0.3), transparent)" }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block text-emerald-400/60 text-xs font-semibold uppercase tracking-[0.3em] mb-8">
              Visi
            </span>

            <div className="relative">
              {/* Decorative quotes */}
              <span className="absolute -top-8 -left-4 text-emerald-500/10 font-display text-[120px] leading-none select-none hidden sm:block">
                "
              </span>
              <blockquote className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white leading-tight">
                <span className="gradient-text-emerald">
                  {vision?.content || 'Mewujudkan Desa yang maju, transparan, mandiri, dan sejahtera dengan pelayanan yang dekat dengan masyarakat.'}
                </span>
              </blockquote>
              <span className="absolute -bottom-16 -right-4 text-emerald-500/10 font-display text-[120px] leading-none select-none hidden sm:block">
                "
              </span>
            </div>

            {/* Pillar badges */}
            <div className="flex flex-wrap justify-center gap-3 mt-16">
              {["Maju", "Transparan", "Mandiri", "Sejahtera"].map((word) => (
                <span
                  key={word}
                  className="px-5 py-2 rounded-full border border-emerald-500/30 text-emerald-400 text-sm font-medium glass"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mission part - dark background dengan inline style sebagai fallback */}
      <div className="section-padding relative" style={{ backgroundColor: "#071a0f" }}>
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(245,158,11,0.2), transparent)" }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <span
              className="inline-block text-xs font-semibold uppercase"
              style={{ color: "rgba(251,191,36,0.7)", letterSpacing: "0.25em" }}
            >
              Misi
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
              Tiga Pilar <span className="gradient-text-gold">Kepemimpinan</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {missions.length > 0 ? missions.map((mission, index) => (
              <div
                key={mission.id}
                className="glass-card rounded-3xl p-7 hover:border-emerald-500/30 transition-all duration-300 group hover:-translate-y-1"
              >
                {/* Number */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                    {iconMap[mission.icon] || <Shield size={28} />}
                  </div>
                  <span className="text-white/10 font-display font-bold text-5xl leading-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="text-white font-display font-bold text-xl mb-3">
                  {mission.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {mission.description}
                </p>
              </div>
            )) : (
              // Placeholder cards
              [{
                num: "01", title: "Pelayanan", icon: "shield",
                desc: "Memberikan pelayanan desa yang cepat, mudah, gratis, dan dekat dengan masyarakat.",
              }, {
                num: "02", title: "Pemuda", icon: "users",
                desc: "Membangun ruang bagi pemuda untuk berkembang, berdiskusi, berkreasi, dan menyampaikan aspirasi.",
              }, {
                num: "03", title: "Transparansi", icon: "eye",
                desc: "Mendorong pemerintahan desa yang terbuka, amanah, dan dapat dipertanggungjawabkan.",
              }].map((m) => (
                <div key={m.num} className="glass-card rounded-3xl p-7 hover:border-emerald-500/30 transition-all duration-300 group hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                      {iconMap[m.icon]}
                    </div>
                    <span className="text-white/10 font-display font-bold text-5xl leading-none">{m.num}</span>
                  </div>
                  <h3 className="text-white font-display font-bold text-xl mb-3">{m.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{m.desc}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
