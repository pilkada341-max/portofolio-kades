import Link from "next/link";
import { Leaf, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#050d07" }}>
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, rgba(16,185,129,0.05) 0%, transparent 60%)`,
        }}
      />

      <div className="relative text-center">
        <div className="w-16 h-16 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
          <Leaf className="w-8 h-8 text-emerald-400" />
        </div>

        <p className="text-emerald-400 font-mono text-sm mb-2">404</p>
        <h1 className="text-white font-display font-bold text-3xl mb-3">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-white/50 text-sm mb-8 max-w-sm mx-auto">
          Halaman yang Anda cari tidak ada. Mungkin sudah dipindah atau tidak
          pernah ada.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-2xl transition-colors text-sm"
        >
          <Home size={16} />
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
