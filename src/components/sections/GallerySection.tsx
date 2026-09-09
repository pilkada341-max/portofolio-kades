"use client";

import { useState } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Gallery, GalleryCategory } from "@/types/database";

const categories: { id: GalleryCategory | "semua"; label: string }[] = [
  { id: "semua", label: "Semua" },
  { id: "kegiatan", label: "Kegiatan" },
  { id: "masyarakat", label: "Masyarakat" },
  { id: "pemuda", label: "Pemuda" },
  { id: "sosial", label: "Sosial" },
  { id: "lingkungan", label: "Lingkungan" },
  { id: "dokumentasi", label: "Dokumentasi" },
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

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + filtered.length) % filtered.length : null
    );
  const nextImage = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % filtered.length : null
    );

  return (
    <section id="galeri" className="section-padding relative overflow-hidden" style={{ backgroundColor: "#0a1a0e" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="inline-block text-xs font-semibold uppercase"
            style={{ color: "#34d399", letterSpacing: "0.2em" }}
          >
            Galeri
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mt-2">
            Dokumentasi <span className="gradient-text-emerald">Kegiatan</span>
          </h2>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.id
                  ? "text-white"
                  : "text-white/50 hover:text-white"
              }`}
              style={
                activeCategory === cat.id
                  ? { background: "#059669" }
                  : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }
              }
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        {filtered.length > 0 ? (
          <div className="masonry-grid">
            {filtered.map((item, index) => (
              <div
                key={item.id}
                className="masonry-item rounded-2xl overflow-hidden cursor-pointer group relative"
                onClick={() => openLightbox(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && openLightbox(index)}
                aria-label={`Lihat foto: ${item.caption}`}
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={item.image_url}
                    alt={item.caption}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 transition-all duration-300 flex items-end"
                    style={{ background: "rgba(5,13,7,0)" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(5,13,7,0.55)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "rgba(5,13,7,0)")}
                  >
                    <div className="w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white text-sm font-medium">{item.caption}</p>
                      <span className="text-emerald-300 text-xs capitalize">{item.category}</span>
                    </div>
                    <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn size={14} className="text-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p style={{ color: "rgba(255,255,255,0.3)" }}>Belum ada foto di kategori ini.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && filtered[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Lightbox galeri"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            aria-label="Tutup lightbox"
          >
            <X size={20} />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            aria-label="Foto sebelumnya"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="max-w-4xl max-h-[80vh] mx-16">
            <img
              src={filtered[lightboxIndex].image_url}
              alt={filtered[lightboxIndex].caption}
              className="max-w-full max-h-[70vh] object-contain rounded-2xl"
            />
            <div className="text-center mt-4">
              <p className="text-white font-medium">{filtered[lightboxIndex].caption}</p>
              <span className="text-white/50 text-sm capitalize">
                {filtered[lightboxIndex].category}
              </span>
            </div>
          </div>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            aria-label="Foto berikutnya"
          >
            <ChevronRight size={20} />
          </button>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass px-4 py-1.5 rounded-full">
            <span className="text-white/60 text-xs">
              {lightboxIndex + 1} / {filtered.length}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
