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
    icon: <Zap size={24} />,
    accent: "#e63946",
    accentBg: "rgba(230,57,70,0.08)",
    accentBorder: "rgba(230,57,70,0.2)",
  },
  {
    number: "02",
    title: "BERDAYA",
    subtitle: "Pemuda Punya Ruang",
    description:
      "Pemuda harus diberikan ruang untuk berkembang, berdiskusi, berkreasi, dan menyampaikan aspirasi. Suara generasi muda adalah bagian dari masa depan desa.",
    icon: <Users size={24} />,
    accent: "#f59e0b",
    accentBg: "rgba(245,158,11,0.08)",
    accentBorder: "rgba(245,158,11,0.2)",
  },
  {
    number: "03",
    title: "TERBUKA",
    subtitle: "Pemerintahan Transparan",
    description:
      "Pengelolaan desa harus transparan, amanah, dan dapat diketahui masyarakat. Uang desa adalah hak masyarakat untuk tahu penggunaannya.",
    icon: <Eye size={24} />,
    accent: "#60a5fa",
    accentBg: "rgba(96,165,250,0.08)",
    accentBorder: "rgba(96,165,250,0.2)",
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
            const index = itemRefs.current.findIndex((r) => r === entry.target);
            if (index !== -1) {
              setTimeout(() => setVisibleItems((prev) => [...new Set([...prev, index])]), index * 150);
            }
          }
        });
      },
      { threshold: 0.15 }
    );
    itemRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-padding relative overflow-hidden" style={{ backgroundColor: "#0d0d14" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)" }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-14">
          <div className="section-label mb-3">Tiga Pilar</div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase">
            Nilai yang Kami{" "}
            <span className="gradient-text-red">Perjuangkan</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.number}
              ref={(el) => { itemRefs.current[index] = el; }}
              className="relative p-6 transition-all duration-700"
              style={{
                background: pillar.accentBg,
                border: `1px solid ${pillar.accentBorder}`,
                borderRadius: "0.5rem",
                opacity: visibleItems.includes(index) ? 1 : 0,
                transform: visibleItems.includes(index) ? "translateY(0)" : "translateY(24px)",
              }}
            >
              {/* Number watermark */}
              <span
                className="absolute top-4 right-5 font-display font-black text-6xl leading-none select-none pointer-events-none"
                style={{ color: "rgba(255,255,255,0.04)" }}
              >
                {pillar.number}
              </span>

              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t" style={{ background: pillar.accent }} />

              {/* Icon */}
              <div
                className="w-12 h-12 rounded flex items-center justify-center mb-5"
                style={{ background: "rgba(255,255,255,0.05)", color: pillar.accent, border: `1px solid ${pillar.accentBorder}` }}
              >
                {pillar.icon}
              </div>

              {/* Title */}
              <h3 className="font-display font-black text-2xl mb-1 uppercase" style={{ color: pillar.accent }}>
                {pillar.title}
              </h3>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>
                {pillar.subtitle}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
