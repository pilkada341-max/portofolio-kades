"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Beranda", href: "#beranda" },
  { label: "Profil", href: "#profil" },
  { label: "Visi & Misi", href: "#visi-misi" },
  { label: "Program", href: "#program" },
  { label: "Galeri", href: "#galeri" },
  { label: "Aspirasi", href: "#aspirasi" },
  { label: "Kontak", href: "#kontak" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("beranda");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = navLinks.map((l) => l.href.slice(1));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const id = href.slice(1);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled ? "navbar-glass py-3 shadow-lg" : "navbar-transparent py-5"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <button
              onClick={() => scrollToSection("#beranda")}
              className="flex items-center gap-3 group"
            >
              {/* Geometric logo mark */}
              <div className="relative w-9 h-9 flex items-center justify-center">
                <div
                  className="absolute inset-0 rotate-45 border-2 group-hover:border-red-400 transition-colors"
                  style={{ borderColor: "#e63946" }}
                />
                <span
                  className="font-display font-black text-xs relative z-10"
                  style={{ color: "#e63946" }}
                >
                  {(process.env.NEXT_PUBLIC_CANDIDATE_NAME || "K")[0].toUpperCase()}
                </span>
              </div>
              <span className="text-white font-display font-bold text-sm tracking-widest uppercase hidden sm:block">
                {process.env.NEXT_PUBLIC_CANDIDATE_NAME || "[Nama Calon]"}
              </span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className={cn(
                      "relative px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-200",
                      isActive ? "text-white" : "text-white/50 hover:text-white/80"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full"
                        style={{ background: "#e63946" }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center">
              <button
                onClick={() => scrollToSection("#aspirasi")}
                className="px-6 py-2.5 text-white font-bold text-xs uppercase tracking-widest rounded transition-all duration-200 hover:opacity-90"
                style={{ background: "#e63946" }}
              >
                Sampaikan Aspirasi
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-white p-2 rounded hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-300",
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-72 shadow-2xl transition-transform duration-300",
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
          style={{ backgroundColor: "#0d0d14", borderLeft: "1px solid rgba(230,57,70,0.2)" }}
        >
          <div className="flex flex-col h-full p-6 pt-20">
            {/* Red accent line at top */}
            <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: "#e63946" }} />

            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className={cn(
                      "text-left px-4 py-3 text-sm font-bold uppercase tracking-widest transition-all duration-200",
                      isActive
                        ? "text-white"
                        : "text-white/40 hover:text-white/70"
                    )}
                    style={isActive ? { borderLeft: "2px solid #e63946", paddingLeft: "1.25rem" } : {}}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-auto">
              <button
                onClick={() => scrollToSection("#aspirasi")}
                className="w-full py-3 text-white font-bold text-xs uppercase tracking-widest rounded transition-colors"
                style={{ background: "#e63946" }}
              >
                Sampaikan Aspirasi
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
