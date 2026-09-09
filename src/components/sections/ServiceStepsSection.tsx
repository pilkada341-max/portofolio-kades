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
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-padding bg-stone-50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-emerald-600 text-xs font-semibold uppercase tracking-widest mb-3">
            Cara Kerja
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-stone-900">
            Layanan Desa dari{" "}
            <span className="text-emerald-600">Rumah Anda</span>
          </h2>
          <p className="text-stone-500 mt-3 text-sm max-w-lg mx-auto">
            Proses pengajuan layanan administrasi desa yang simpel, cepat, dan dapat dipantau secara real-time.
          </p>
        </div>

        {/* Steps */}
        <div
          ref={ref}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto"
        >
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`
                relative bg-white rounded-2xl p-6 border border-stone-100 shadow-sm
                hover:border-emerald-200 hover:shadow-md transition-all duration-300
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
              `}
              style={{
                transitionDelay: visible ? `${index * 80}ms` : "0ms",
              }}
            >
              {/* Connector arrow — desktop only */}
              {index < steps.length - 1 && (index + 1) % 3 !== 0 && (
                <div className="hidden lg:block absolute top-8 -right-3 z-10">
                  <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
                    <path d="M0 6H20M20 6L14 1M20 6L14 11" stroke="#d1fae5" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              )}

              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  {step.icon}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-emerald-400/60 font-mono text-xs font-bold">{step.number}</span>
                  </div>
                  <h3 className="text-stone-800 font-semibold text-base mb-1">{step.title}</h3>
                  <p className="text-stone-500 text-xs leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-stone-400 text-xs mt-8 max-w-md mx-auto">
          * Alur layanan final akan disesuaikan dengan sistem yang tersedia. Dapat diakses langsung di kantor desa jika lebih nyaman.
        </p>
      </div>
    </section>
  );
}
