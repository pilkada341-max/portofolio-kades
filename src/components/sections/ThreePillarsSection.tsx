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
    cardBg: "linear-gradient(to bottom, rgba(16,185,129,0.12), rgba(5,150,105,0.03))",
    cardBorder: "rgba(16,185,129,0.2)",
    iconBg: "rgba(16,185,129,0.1)",
    iconColor: "#34d399",
    titleColor: "#34d399",
  },
  {
    number: "02",
    title: "BERDAYA",
    subtitle: "Pemuda Punya Ruang",
    description:
      "Pemuda harus diberikan ruang untuk berkembang, berdiskusi, berkreasi, dan menyampaikan aspirasi. Suara generasi muda adalah bagian dari masa depan desa.",
    icon: <Users size={28} />,
    cardBg: "linear-gradient(to bottom, rgba(245,158,11,0.12), rgba(217,119,6,0.03))",
    cardBorder: "rgba(245,158,11,0.2)",
    iconBg: "rgba(245,158,11,0.1)",
    iconColor: "#fbbf24",
    titleColor: "#fbbf24",
  },
  {
    number: "03",
    title: "TERBUKA",
    subtitle: "Pemerintahan Transparan",
    description:
      "Pengelolaan desa harus transparan, amanah, dan dapat diketahui masyarakat. Uang desa adalah hak masyarakat untuk tahu penggunaannya.",
    icon: <Eye size={28} />,
    cardBg: "linear-gradient(to bottom, rgba(59,130,246,0.12), rgba(37,99,235,0.03))",
    cardBorder: "rgba(59,130,246,0.2)",
    iconBg: "rgba(59,130,246,0.1)",
    iconColor: "#60a5fa",
    titleColor: "#60a5fa",
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
              setTimeout(() => {
                setVisibleItems((prev) => [...new Set([...prev, index])]);
              }, index * 150);
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
    <section
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "#050d07" }}
    >
      {/* Background glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(16,185,129,0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 50%, rgba(245,158,11,0.04) 0%, transparent 50%)
          `,
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 10 }}>
        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="inline-block text-xs font-semibold uppercase"
            style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.25em" }}
          >
            Tiga Pilar Komunikasi
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mt-3">
            Nilai yang Kami{" "}
            <span className="gradient-text-emerald">Perjuangkan</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.number}
              ref={(el) => { itemRefs.current[index] = el; }}
              className="relative rounded-3xl p-6 transition-all duration-700"
              style={{
                background: pillar.cardBg,
                border: `1px solid ${pillar.cardBorder}`,
                opacity: visibleItems.includes(index) ? 1 : 0,
                transform: visibleItems.includes(index) ? "translateY(0)" : "translateY(24px)",
              }}
            >
              {/* Number watermark */}
              <span
                className="absolute top-4 right-5 font-display font-bold text-6xl leading-none select-none pointer-events-none"
                style={{ color: "rgba(255,255,255,0.04)" }}
              >
                {pillar.number}
              </span>

              {/* Icon */}
              <div
                className="rounded-2xl flex items-center justify-center mb-5"
                style={{
                  width: "3.25rem",
                  height: "3.25rem",
                  background: pillar.iconBg,
                  color: pillar.iconColor,
                  border: `1px solid ${pillar.cardBorder}`,
                  flexShrink: 0,
                }}
              >
                {pillar.icon}
              </div>

              {/* Title */}
              <h3
                className="font-display font-bold text-2xl mb-1"
                style={{ color: pillar.titleColor }}
              >
                {pillar.title}
              </h3>
              <p
                className="text-xs font-semibold uppercase mb-4"
                style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.12em" }}
              >
                {pillar.subtitle}
              </p>

              {/* Description */}
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
