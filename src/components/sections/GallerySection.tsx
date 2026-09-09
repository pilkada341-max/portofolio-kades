"use client";

import { useState } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import type { Gallery, GalleryCategory } from "@/types/database";

const categories: { id: GalleryCategory | "semua"; label: string }[] = [
  { id: "semua",        label: "Semua" },
  { id: "kegiatan",     label: "Kegiatan" },
  { id: "masyarakat",   label: "Masyarakat" },
  { id: "pemuda",       label: "Pemuda" },
  { id: "sosial",       label: "Sosial" },
  { id: "lingkungan",   label: "Lingkungan" },
  { id: "dokumentasi",  label: "Dokumentasi" },
];

interface GallerySectionProps {
  gallery: Gallery[];
}

export default function GallerySection({ gallery }: GallerySectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("semua");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "semua"
      ? gallery
      : gallery.filter((g) => g.category === activeCategory);

  const openLightbox  = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () =>
    setLightboxIndex((p) => (p !== null ? (p - 1 + filtered.length) % filtered.length : null));
  const nextImage = () =>
    setLightboxIndex((p) => (p !== null ? (p + 1) % filtered.length : null));

  return (
    <section
      id="galeri"
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "#07070a" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(230,57,70,0.3), transparent)" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-12">
          <div className="section-label mb-3">Galeri</div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase">
            Dokumentasi <span className="gradient-text-red">Kegiatan</span>
          </h2>
        </div>

        {/* Category filter — Valorant tab style */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-200"
                style={
                  isActive
                    ? { background: "#e63946", color: "#fff", borderRadius: "0.25rem" }
                    : {
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.45)",
                        borderRadius: "0.25rem",
                      }
                }
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Masonry grid */}
        {filtered.length > 0 ? (
          <div className="masonry-grid">
            {filtered.map((item, index) => (
              <div
                key={item.id}
                className="masonry-item cursor-pointer group relative overflow-hidden"
                style={{ borderRadius: "0.375rem" }}
                onClick={() => openLightbox(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && openLightbox(index)}
                aria-label={`Lihat foto: ${item.caption}`}
              >
                <div className="relative overflow-hidden" style={{ borderRadius: "0.375rem" }}>
                  <img
                    src={item.image_url}
                    alt={item.caption}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end"
                    style={{ background: "linear-gradient(to top, rgba(7,7,10,0.85) 0%, rgba(7,7,10,0.3) 50%, transparent 100%)" }}
                  >
                    <div className="p-4">
                      <p className="text-white text-sm font-semibold leading-tight">{item.caption}</p>
                      <span
                        className="text-xs font-bold uppercase tracking-widest mt-1 block"
                        style={{ color: "#e63946" }}
                      >
                        {item.category}
                      </span>
                    </div>
                  </div>
                  {/* Zoom icon */}
                  <div
                    className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: "#e63946", borderRadius: "0.25rem" }}
                  >
                    <ZoomIn size={14} className="text-white" />
                  </div>
                  {/* Corner accents — hidden until hover */}
                  <div
                    className="absolute top-0 left-0 w-4 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: "#e63946" }}
                  />
                  <div
                    className="absolute top-0 left-0 h-4 w-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: "#e63946" }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p style={{ color: "rgba(255,255,255,0.25)" }}>Belum ada foto di kategori ini.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && filtered[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.96)" }}
          role="dialog"
          aria-modal="true"
          aria-label="Lightbox galeri"
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-white transition-colors"
            style={{ background: "#e63946", borderRadius: "0.25rem" }}
            aria-label="Tutup lightbox"
          >
            <X size={18} />
          </button>

          {/* Prev */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white transition-colors hover:bg-white/10"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "0.25rem" }}
            aria-label="Foto sebelumnya"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="max-w-4xl max-h-[80vh] mx-16">
            <img
              src={filtered[lightboxIndex].image_url}
              alt={filtered[lightboxIndex].caption}
              className="max-w-full max-h-[70vh] object-contain"
              style={{ borderRadius: "0.375rem" }}
            />
            <div className="mt-4 flex items-center gap-3">
              <div className="w-1 h-6" style={{ background: "#e63946" }} />
              <div>
                <p className="text-white font-semibold text-sm">{filtered[lightboxIndex].caption}</p>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#e63946" }}>
                  {filtered[lightboxIndex].category}
                </span>
              </div>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white transition-colors hover:bg-white/10"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "0.25rem" }}
            aria-label="Foto berikutnya"
          >
            <ChevronRight size={20} />
          </button>

          {/* Counter */}
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.25rem" }}
          >
            <span className="text-white/50 text-xs font-mono">
              {lightboxIndex + 1} / {filtered.length}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
