"use client";

import { useRef, useEffect, useState } from "react";
import type { Candidate } from "@/types/database";

interface QuoteSectionProps {
  candidate: Candidate;
}

export default function QuoteSection({ candidate }: QuoteSectionProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden bg-stone-50 py-24">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              #059669 0px,
              #059669 1px,
              transparent 1px,
              transparent 60px
            ), repeating-linear-gradient(
              0deg,
              #059669 0px,
              #059669 1px,
              transparent 1px,
              transparent 60px
            )`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={ref}
          className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Portrait */}
          {candidate.photo_url && (
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-emerald-100 shadow-lg mx-auto mb-8">
              <img
                src={candidate.photo_url}
                alt={candidate.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
          )}

          {/* Quote mark */}
          <div className="text-emerald-200 font-display text-8xl leading-none mb-2 select-none">
            "
          </div>

          <blockquote className="text-stone-800 font-display font-semibold text-xl sm:text-2xl lg:text-3xl leading-relaxed mb-8">
            {candidate.quote?.replace(/^[""]|[""]$/g, "") ||
              "Desa yang maju bukan hanya tentang pembangunan fisik, tetapi tentang masyarakat yang merasa dilayani, didengar, dan dilibatkan."}
          </blockquote>

          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-emerald-300" />
            <div>
              <p className="text-stone-800 font-semibold text-sm">{candidate.name}</p>
              <p className="text-stone-500 text-xs">Calon Kepala Desa {candidate.village_name}</p>
            </div>
            <div className="h-px w-12 bg-emerald-300" />
          </div>
        </div>
      </div>
    </section>
  );
}
