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
    <section
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "#050d07" }}
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 80% 50%, rgba(245,158,11,0.04) 0%, transparent 50%)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 10 }}>
        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="inline-block text-xs font-semibold uppercase"
            style={{ color: "#fbbf24", letterSpacing: "0.2em" }}
          >
            Perjalanan
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mt-2">
            Jejak Pengabdian
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Center vertical line */}
            <div
              className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-px hidden sm:block"
              style={{
                background: "linear-gradient(to bottom, transparent, rgba(16,185,129,0.35), transparent)",
              }}
            />

            <div className="space-y-8 sm:space-y-12">
              {timelines.map((item, index) => (
                <div
                  key={item.id}
                  ref={(el) => { itemRefs.current[index] = el; }}
                  className={cn(
                    "relative flex flex-col sm:flex-row gap-4 sm:gap-8 transition-all duration-500",
                    index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse",
                    activeIndex !== null && activeIndex >= index ? "opacity-100" : "opacity-40"
                  )}
                >
                  {/* Content card */}
                  <div className="sm:w-[calc(50%-2rem)] flex flex-col">
                    <button
                      className="text-left rounded-2xl p-5 transition-all duration-300"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: activeIndex === index
                          ? "1px solid rgba(16,185,129,0.4)"
                          : "1px solid rgba(255,255,255,0.08)",
                        backdropFilter: "blur(20px)",
                        boxShadow: activeIndex === index
                          ? "0 0 20px rgba(16,185,129,0.1)"
                          : "none",
                      }}
                      onClick={() => setActiveIndex(index === activeIndex ? null : index)}
                    >
                      <span
                        className="font-mono font-bold text-sm block mb-1.5"
                        style={{ color: "#34d399" }}
                      >
                        {item.year}
                      </span>
                      <h3 className="text-white font-semibold text-base mb-1">{item.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                        {item.description}
                      </p>
                    </button>
                  </div>

                  {/* Center dot */}
                  <div className="hidden sm:flex absolute left-1/2 top-6 -translate-x-1/2 items-center justify-center">
                    <div
                      className="w-4 h-4 rounded-full transition-all duration-300"
                      style={
                        activeIndex === index
                          ? {
                              background: "#10b981",
                              border: "2px solid #34d399",
                              boxShadow: "0 0 12px rgba(16,185,129,0.6)",
                              transform: "scale(1.3)",
                            }
                          : {
                              background: "#050d07",
                              border: "2px solid rgba(16,185,129,0.4)",
                            }
                      }
                    />
                  </div>

                  {/* Spacer opposite side */}
                  <div className="hidden sm:block sm:w-[calc(50%-2rem)]" />
                </div>
              ))}
            </div>
          </div>

          {/* End badge */}
          <div className="flex justify-center mt-12">
            <div
              className="px-6 py-3 rounded-full"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(16,185,129,0.3)",
                backdropFilter: "blur(12px)",
              }}
            >
              <span className="font-semibold text-sm" style={{ color: "#34d399" }}>
                2026 — Maju Sebagai Calon Kepala Desa
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
