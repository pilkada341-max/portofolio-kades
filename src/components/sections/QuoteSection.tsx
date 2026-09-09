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
      style={{ backgroundColor: "#0d0d14" }}
    >
      {/* Grid decoration — Valorant-style subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(90deg, rgba(230,57,70,0.03) 0px, rgba(230,57,70,0.03) 1px, transparent 1px, transparent 80px),
            repeating-linear-gradient(0deg, rgba(230,57,70,0.03) 0px, rgba(230,57,70,0.03) 1px, transparent 1px, transparent 80px)
          `,
        }}
      />
      {/* Red glow center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(230,57,70,0.07) 0%, transparent 65%)",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(230,57,70,0.25), transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(230,57,70,0.15), transparent)" }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
              className="relative w-20 h-20 overflow-hidden mx-auto mb-8"
              style={{
                border: "2px solid rgba(230,57,70,0.4)",
                boxShadow: "0 0 24px rgba(230,57,70,0.2)",
                borderRadius: "0.375rem",
              }}
            >
              <Image
                src={candidate.photo_url}
                alt={candidate.name}
                fill
                className="object-cover object-top"
                sizes="80px"
              />
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-3 h-0.5" style={{ background: "#e63946" }} />
              <div className="absolute top-0 left-0 h-3 w-0.5" style={{ background: "#e63946" }} />
              <div className="absolute bottom-0 right-0 w-3 h-0.5" style={{ background: "#e63946" }} />
              <div className="absolute bottom-0 right-0 h-3 w-0.5" style={{ background: "#e63946" }} />
            </div>
          )}

          {/* Opening quote mark */}
          <div
            className="font-display font-black leading-none select-none mb-2"
            style={{ fontSize: "5rem", lineHeight: 1, color: "rgba(230,57,70,0.12)" }}
          >
            &ldquo;
          </div>

          <blockquote
            className="font-display font-black text-xl sm:text-2xl lg:text-3xl leading-relaxed mb-8 uppercase"
            style={{ color: "rgba(255,255,255,0.92)" }}
          >
            {candidate.quote?.replace(/^[""\u201c\u201d]|[""\u201c\u201d]$/g, "") ||
              "Desa yang maju bukan hanya tentang pembangunan fisik, tetapi tentang masyarakat yang merasa dilayani, didengar, dan dilibatkan."}
          </blockquote>

          {/* Attribution */}
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12" style={{ background: "rgba(230,57,70,0.4)" }} />
            <div>
              <p className="text-white font-bold text-sm uppercase tracking-widest">{candidate.name}</p>
              <p className="text-xs font-semibold uppercase tracking-widest mt-0.5" style={{ color: "rgba(230,57,70,0.6)" }}>
                Calon Kepala Desa {candidate.village_name}
              </p>
            </div>
            <div className="h-px w-12" style={{ background: "rgba(230,57,70,0.4)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
