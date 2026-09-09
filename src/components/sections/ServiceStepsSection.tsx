"use client";

import { useRef, useEffect, useState } from "react";
import { Globe, LayoutList, FileText, Upload, CheckCircle, Download } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: <Globe size={22} />,
    title: "Buka Website",
    description: "Akses website desa dari rumah menggunakan smartphone atau komputer.",
  },
  {
    number: "02",
    icon: <LayoutList size={22} />,
    title: "Pilih Layanan",
    description: "Pilih jenis surat atau layanan administrasi yang dibutuhkan.",
  },
  {
    number: "03",
    icon: <FileText size={22} />,
    title: "Isi Formulir",
    description: "Isi data yang diperlukan secara online dengan mudah dan cepat.",
  },
  {
    number: "04",
    icon: <Upload size={22} />,
    title: "Upload Berkas",
    description: "Upload foto KTP atau dokumen pendukung yang diperlukan.",
  },
  {
    number: "05",
    icon: <CheckCircle size={22} />,
    title: "Verifikasi",
    description: "Petugas desa memverifikasi data dan memproses permohonan.",
  },
  {
    number: "06",
    icon: <Download size={22} />,
    title: "Surat Selesai",
    description: "Dokumen selesai dan siap diambil atau dikirimkan kepada Anda.",
  },
];

export default function ServiceStepsSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "#0a1a0e" }}
    >
      {/* Separator */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(16,185,129,0.2), transparent)" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 10 }}>
        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="inline-block text-xs font-semibold uppercase"
            style={{ color: "#34d399", letterSpacing: "0.2em" }}
          >
            Cara Kerja
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mt-2">
            Layanan Desa dari{" "}
            <span className="gradient-text-emerald">Rumah Anda</span>
          </h2>
          <p className="mt-3 text-sm max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
            Proses pengajuan layanan administrasi desa yang simpel, cepat, dan dapat dipantau secara real-time.
          </p>
        </div>

        {/* Steps */}
        <div
          ref={ref}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto"
        >
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative rounded-2xl p-5 transition-all duration-500"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transitionDelay: `${index * 80}ms`,
              }}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: "rgba(16,185,129,0.1)",
                    border: "1px solid rgba(16,185,129,0.2)",
                    color: "#34d399",
                  }}
                >
                  {step.icon}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="font-mono text-xs font-bold"
                      style={{ color: "rgba(52,211,153,0.5)" }}
                    >
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-1">{step.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p
          className="text-center text-xs mt-8 max-w-md mx-auto"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          * Alur layanan final akan disesuaikan dengan sistem yang tersedia di kantor desa.
        </p>
      </div>
    </section>
  );
}
