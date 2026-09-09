"use client";

import { useRef, useEffect, useState } from "react";
import { Globe, LayoutList, FileText, Upload, CheckCircle, Download } from "lucide-react";

const steps = [
  { number: "01", icon: <Globe size={20} />,       title: "Buka Website",   description: "Akses website desa dari rumah menggunakan smartphone atau komputer." },
  { number: "02", icon: <LayoutList size={20} />,  title: "Pilih Layanan",  description: "Pilih jenis surat atau layanan administrasi yang dibutuhkan." },
  { number: "03", icon: <FileText size={20} />,    title: "Isi Formulir",   description: "Isi data yang diperlukan secara online dengan mudah dan cepat." },
  { number: "04", icon: <Upload size={20} />,      title: "Upload Berkas",  description: "Upload foto KTP atau dokumen pendukung yang diperlukan." },
  { number: "05", icon: <CheckCircle size={20} />, title: "Verifikasi",     description: "Petugas desa memverifikasi data dan memproses permohonan." },
  { number: "06", icon: <Download size={20} />,    title: "Surat Selesai",  description: "Dokumen selesai dan siap diambil atau dikirimkan kepada Anda." },
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
    <section className="section-padding relative overflow-hidden" style={{ backgroundColor: "#07070a" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(230,57,70,0.2), transparent)" }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-14">
          <div className="section-label mb-3">Cara Kerja</div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase">
            Layanan Desa dari{" "}
            <span className="gradient-text-red">Rumah Anda</span>
          </h2>
          <p className="mt-3 text-sm max-w-lg" style={{ color: "rgba(255,255,255,0.45)" }}>
            Proses pengajuan layanan administrasi desa yang simpel, cepat, dan dapat dipantau secara real-time.
          </p>
        </div>

        {/* Steps grid */}
        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative p-5 transition-all duration-500"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "0.5rem",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transitionDelay: `${index * 80}ms`,
              }}
            >
              {/* Step connector line top */}
              {index > 0 && index % 3 !== 0 && (
                <div className="hidden lg:block absolute top-6 -left-2 w-2 h-px" style={{ background: "rgba(230,57,70,0.3)" }} />
              )}

              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded flex items-center justify-center shrink-0"
                  style={{ background: "rgba(230,57,70,0.08)", border: "1px solid rgba(230,57,70,0.2)", color: "#e63946" }}
                >
                  {step.icon}
                </div>
                <div>
                  <span className="font-mono text-xs font-bold block mb-1" style={{ color: "rgba(230,57,70,0.5)" }}>
                    {step.number}
                  </span>
                  <h3 className="text-white font-bold text-sm mb-1 uppercase">{step.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs mt-8" style={{ color: "rgba(255,255,255,0.2)" }}>
          * Alur layanan final akan disesuaikan dengan sistem yang tersedia di kantor desa.
        </p>
      </div>
    </section>
  );
}
