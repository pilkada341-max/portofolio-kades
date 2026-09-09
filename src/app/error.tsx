"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ backgroundColor: "#07070a" }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(230,57,70,0.06) 0%, transparent 65%)",
        }}
      />
      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(90deg, #e63946 0px, #e63946 1px, transparent 1px, transparent 80px),
            repeating-linear-gradient(0deg, #e63946 0px, #e63946 1px, transparent 1px, transparent 80px)
          `,
        }}
      />

      <div className="relative text-center max-w-sm">
        {/* Icon */}
        <div
          className="w-16 h-16 flex items-center justify-center mx-auto mb-6 relative"
          style={{
            background: "rgba(230,57,70,0.08)",
            border: "1px solid rgba(230,57,70,0.25)",
            borderRadius: "0.5rem",
          }}
        >
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-3 h-0.5" style={{ background: "#e63946" }} />
          <div className="absolute top-0 left-0 h-3 w-0.5" style={{ background: "#e63946" }} />
          <div className="absolute bottom-0 right-0 w-3 h-0.5" style={{ background: "#e63946" }} />
          <div className="absolute bottom-0 right-0 h-3 w-0.5" style={{ background: "#e63946" }} />
          <AlertTriangle className="w-8 h-8" style={{ color: "#e63946" }} />
        </div>

        <div className="section-label justify-center mb-3">Error</div>
        <h1 className="text-white font-display font-black text-2xl mb-3 uppercase">
          Terjadi Kesalahan
        </h1>
        <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.45)" }}>
          Maaf, terjadi kesalahan yang tidak terduga. Silakan coba lagi.
        </p>

        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 text-white font-bold text-xs uppercase tracking-widest rounded transition-all duration-200 hover:opacity-90"
          style={{ background: "#e63946" }}
        >
          <RefreshCw size={14} />
          Coba Lagi
        </button>
      </div>
    </div>
  );
}
