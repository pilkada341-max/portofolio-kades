"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Leaf } from "lucide-react";
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

      // Update active section based on scroll position
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
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "navbar-glass py-3 shadow-lg"
            : "navbar-transparent py-5"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => scrollToSection("#beranda")}
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center group-hover:bg-emerald-400 transition-colors">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-display font-bold text-sm sm:text-base tracking-wide">
                {process.env.NEXT_PUBLIC_CANDIDATE_NAME || "[Nama Calon]"}
              </span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    activeSection === link.href.slice(1)
                      ? "text-emerald-400 bg-emerald-500/10"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  )}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => scrollToSection("#program")}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm rounded-xl transition-all duration-200 hover:shadow-emerald"
              >
                Kenali Program
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Panel */}
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-72 shadow-2xl transition-transform duration-300",
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
          style={{ backgroundColor: "#050d07", borderLeft: "1px solid rgba(6,78,59,0.5)" }}
        >
          <div className="flex flex-col h-full p-6 pt-20">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={cn(
                    "text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                    activeSection === link.href.slice(1)
                      ? "text-emerald-400 bg-emerald-500/10"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  )}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="mt-auto">
              <button
                onClick={() => scrollToSection("#program")}
                className="w-full px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl transition-colors"
              >
                Kenali Program
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
