"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { Timeline } from "@/types/database";

interface TimelineSectionProps {
  timelines: Timeline[];
}

export default function TimelineSection({ timelines }: TimelineSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = itemRefs.current.findIndex((ref) => ref === entry.target);
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      { threshold: 0.4 }
    );
    itemRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, [timelines]);

  return (
    <section className="section-padding relative overflow-hidden" style={{ backgroundColor: "#0d0d14" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 80% 50%, rgba(245,158,11,0.04) 0%, transparent 50%)" }} />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)" }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-14">
          <div className="section-label-gold mb-3">Perjalanan</div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase">
            Jejak <span className="gradient-text-gold">Pengabdian</span>
          </h2>
        </div>

        <div className="max-w-3xl">
          <div className="relative">
            {/* Center line */}
            <div
              className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-px hidden sm:block"
              style={{ background: "linear-gradient(to bottom, transparent, rgba(230,57,70,0.3), transparent)" }}
            />

            <div className="space-y-8 sm:space-y-12">
              {timelines.map((item, index) => (
                <div
                  key={item.id}
                  ref={(el) => { itemRefs.current[index] = el; }}
                  className={cn(
                    "relative flex flex-col sm:flex-row gap-4 sm:gap-8 transition-all duration-500",
                    index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse",
                    activeIndex !== null && activeIndex >= index ? "opacity-100" : "opacity-30"
                  )}
                >
                  {/* Card */}
                  <div className="sm:w-[calc(50%-2rem)]">
                    <button
                      className="text-left w-full p-5 transition-all duration-300"
                      style={{
                        background: activeIndex === index ? "rgba(230,57,70,0.06)" : "rgba(255,255,255,0.03)",
                        border: activeIndex === index ? "1px solid rgba(230,57,70,0.35)" : "1px solid rgba(255,255,255,0.07)",
                        borderRadius: "0.5rem",
                        boxShadow: activeIndex === index ? "0 0 20px rgba(230,57,70,0.1)" : "none",
                      }}
                      onClick={() => setActiveIndex(index === activeIndex ? null : index)}
                    >
                      {activeIndex === index && (
                        <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t" style={{ background: "#e63946" }} />
                      )}
                      <span className="font-mono font-bold text-sm block mb-1.5" style={{ color: "#e63946" }}>
                        {item.year}
                      </span>
                      <h3 className="text-white font-bold text-sm mb-1 uppercase">{item.title}</h3>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                        {item.description}
                      </p>
                    </button>
                  </div>

                  {/* Dot */}
                  <div className="hidden sm:flex absolute left-1/2 top-6 -translate-x-1/2 items-center justify-center">
                    <div
                      className="w-3 h-3 rounded-full transition-all duration-300"
                      style={
                        activeIndex === index
                          ? { background: "#e63946", border: "2px solid #ff6b62", boxShadow: "0 0 12px rgba(230,57,70,0.7)", transform: "scale(1.4)" }
                          : { background: "#07070a", border: "2px solid rgba(230,57,70,0.35)" }
                      }
                    />
                  </div>

                  <div className="hidden sm:block sm:w-[calc(50%-2rem)]" />
                </div>
              ))}
            </div>
          </div>

          {/* End badge */}
          <div className="flex justify-start mt-12">
            <div
              className="px-6 py-3 rounded"
              style={{ background: "rgba(230,57,70,0.08)", border: "1px solid rgba(230,57,70,0.25)" }}
            >
              <span className="font-bold text-xs uppercase tracking-widest" style={{ color: "#e63946" }}>
                2026 — Maju Sebagai Calon Kepala Desa
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
