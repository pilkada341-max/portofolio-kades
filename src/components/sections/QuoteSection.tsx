"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import type { Candidate } from "@/types/database";

interface QuoteSectionProps {
  candidate: Candidate;
}

export default function QuoteSection({ candidate }: QuoteSectionProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "#071a0f" }}
    >
      {/* Grid decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, rgba(16,185,129,0.04) 0px, rgba(16,185,129,0.04) 1px, transparent 1px, transparent 60px),
            repeating-linear-gradient(0deg, rgba(16,185,129,0.04) 0px, rgba(16,185,129,0.04) 1px, transparent 1px, transparent 60px)`,
        }}
      />

      {/* Top/bottom separator */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(16,185,129,0.25), transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(16,185,129,0.15), transparent)" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 10 }}>
        <div
          ref={ref}
          className="max-w-3xl mx-auto text-center transition-all duration-1000"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
          }}
        >
          {/* Portrait */}
          {candidate.photo_url && (
            <div
              className="relative w-20 h-20 rounded-full overflow-hidden mx-auto mb-8"
              style={{ border: "4px solid rgba(16,185,129,0.3)", boxShadow: "0 0 24px rgba(16,185,129,0.2)" }}
            >
              <Image
                src={candidate.photo_url}
                alt={candidate.name}
                fill
                className="object-cover object-top"
                sizes="80px"
              />
            </div>
          )}

          {/* Opening quote */}
          <div
            className="font-display font-bold leading-none select-none mb-2"
            style={{ fontSize: "5rem", lineHeight: 1, color: "rgba(16,185,129,0.15)" }}
          >
            &ldquo;
          </div>

          <blockquote
            className="font-display font-semibold text-xl sm:text-2xl lg:text-3xl leading-relaxed mb-8"
            style={{ color: "rgba(255,255,255,0.9)" }}
          >
            {candidate.quote?.replace(/^[""\u201c\u201d]|[""\u201c\u201d]$/g, "") ||
              "Desa yang maju bukan hanya tentang pembangunan fisik, tetapi tentang masyarakat yang merasa dilayani, didengar, dan dilibatkan."}
          </blockquote>

          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12" style={{ background: "rgba(52,211,153,0.4)" }} />
            <div>
              <p className="text-white font-semibold text-sm">{candidate.name}</p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(52,211,153,0.6)" }}>
                Calon Kepala Desa {candidate.village_name}
              </p>
            </div>
            <div className="h-px w-12" style={{ background: "rgba(52,211,153,0.4)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
