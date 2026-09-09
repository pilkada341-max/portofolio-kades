"use client";

import { useRef, useEffect, useState } from "react";
import { Zap, Users, Eye } from "lucide-react";

const pillars = [
  {
    number: "01",
    title: "MUDAH",
    subtitle: "Pelayanan Dekat & Cepat",
    description:
      "Pelayanan desa harus dekat, mudah, cepat, dan tidak berbelit-belit. Masyarakat berhak mendapat layanan terbaik tanpa hambatan birokrasi yang rumit.",
    icon: <Zap size={28} />,
    color: "emerald",
    gradient: "from-emerald-500/20 to-emerald-600/5",
    border: "border-emerald-500/20",
    iconBg: "bg-emerald-500/10",
    iconText: "text-emerald-400",
    accent: "text-emerald-400",
  },
  {
    number: "02",
    title: "BERDAYA",
    subtitle: "Pemuda Punya Ruang",
    description:
      "Pemuda harus diberikan ruang untuk berkembang, berdiskusi, berkreasi, dan menyampaikan aspirasi. Suara generasi muda adalah bagian dari masa depan desa.",
    icon: <Users size={28} />,
    color: "gold",
    gradient: "from-gold-500/20 to-gold-600/5",
    border: "border-gold-500/20",
    iconBg: "bg-gold-500/10",
    iconText: "text-gold-400",
    accent: "text-gold-400",
  },
  {
    number: "03",
    title: "TERBUKA",
    subtitle: "Pemerintahan Transparan",
    description:
      "Pengelolaan desa harus transparan, amanah, dan dapat diketahui masyarakat. Uang desa adalah hak masyarakat untuk tahu penggunaannya.",
    icon: <Eye size={28} />,
    color: "blue",
    gradient: "from-blue-500/20 to-blue-600/5",
    border: "border-blue-500/20",
    iconBg: "bg-blue-500/10",
    iconText: "text-blue-400",
    accent: "text-blue-400",
  },
];

export default function ThreePillarsSection() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = itemRefs.current.findIndex((ref) => ref === entry.target);
            if (index !== -1) {
              setTimeout(() => {
                setVisibleItems((prev) => [...new Set([...prev, index])]);
              }, index * 150);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-padding bg-forest-950 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(16, 185, 129, 0.08) 0%, transparent 40%),
            radial-gradient(ellipse at 80% 50%, rgba(245, 158, 11, 0.05) 0%, transparent 40%)
          `,
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-white/30 text-xs font-semibold uppercase tracking-[0.3em] mb-4">
            Tiga Pilar Komunikasi
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
            Nilai yang Kami <span className="gradient-text-emerald">Perjuangkan</span>
          </h2>
        </div>

        {/* Pillars grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.number}
              ref={(el) => { itemRefs.current[index] = el; }}
              className={`
                relative rounded-3xl p-7 border bg-gradient-to-b ${pillar.gradient} ${pillar.border}
                transition-all duration-700
                ${visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
              `}
            >
              {/* Number watermark */}
              <span
                className="absolute top-5 right-6 font-display font-bold text-6xl leading-none select-none"
                style={{ color: "rgba(255,255,255,0.04)" }}
              >
                {pillar.number}
              </span>

              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${pillar.iconBg} ${pillar.iconText}`}>
                {pillar.icon}
              </div>

              {/* Title */}
              <h3 className={`font-display font-bold text-3xl mb-1 ${pillar.accent}`}>
                {pillar.title}
              </h3>
              <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-4">
                {pillar.subtitle}
              </p>

              {/* Description */}
              <p className="text-white/60 text-sm leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
