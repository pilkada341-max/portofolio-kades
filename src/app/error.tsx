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
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#050d07" }}>
      <div className="relative text-center max-w-sm">
        <div className="w-16 h-16 bg-red-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-red-500/20">
          <AlertTriangle className="w-8 h-8 text-red-400" />
        </div>

        <h1 className="text-white font-display font-bold text-2xl mb-3">
          Terjadi Kesalahan
        </h1>
        <p className="text-white/50 text-sm mb-8">
          Maaf, terjadi kesalahan yang tidak terduga. Silakan coba lagi.
        </p>

        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-2xl transition-colors text-sm"
        >
          <RefreshCw size={16} />
          Coba Lagi
        </button>
      </div>
    </div>
  );
}
