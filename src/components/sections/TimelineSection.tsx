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
      { threshold: 0.5 }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [timelines]);

  return (
    <section className="section-padding bg-forest-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(ellipse at 80% 50%, rgba(245, 158, 11, 0.4) 0%, transparent 50%)`,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
            Perjalanan
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
            Jejak Pengabdian
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-emerald-500/40 to-transparent hidden sm:block" />

            <div className="space-y-8 sm:space-y-12">
              {timelines.map((item, index) => (
                <div
                  key={item.id}
                  ref={(el) => { itemRefs.current[index] = el; }}
                  className={cn(
                    "relative flex flex-col sm:flex-row gap-4 sm:gap-8 transition-all duration-500",
                    index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse",
                    activeIndex !== null && activeIndex >= index ? "opacity-100" : "opacity-50"
                  )}
                >
                  {/* Content */}
                  <div className="sm:w-[calc(50%-2rem)] flex flex-col">
                    <div
                      className={cn(
                        "glass-card rounded-2xl p-5 cursor-pointer hover:border-emerald-500/30 transition-all duration-300",
                        activeIndex === index ? "border-emerald-500/40 shadow-emerald" : ""
                      )}
                      onClick={() => setActiveIndex(index === activeIndex ? null : index)}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-emerald-400 font-mono font-bold text-sm">{item.year}</span>
                      </div>
                      <h3 className="text-white font-semibold text-base mb-1">{item.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden sm:flex absolute left-1/2 top-6 -translate-x-1/2 items-center justify-center">
                    <div
                      className={cn(
                        "w-4 h-4 rounded-full border-2 transition-all duration-300",
                        activeIndex === index
                          ? "bg-emerald-500 border-emerald-400 shadow-emerald scale-125"
                          : "bg-forest-950 border-emerald-500/50"
                      )}
                    />
                  </div>

                  {/* Empty space for opposite side */}
                  <div className="hidden sm:block sm:w-[calc(50%-2rem)]" />
                </div>
              ))}
            </div>
          </div>

          {/* Final point */}
          <div className="flex justify-center mt-12">
            <div className="glass-card px-6 py-3 rounded-full border border-emerald-500/30">
              <span className="text-emerald-400 font-semibold text-sm">2026 — Maju Sebagai Calon Kepala Desa</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
