import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ backgroundColor: "#07070a" }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(230,57,70,0.05) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(90deg, #e63946 0px, #e63946 1px, transparent 1px, transparent 80px),
            repeating-linear-gradient(0deg, #e63946 0px, #e63946 1px, transparent 1px, transparent 80px)
          `,
        }}
      />

      <div className="relative text-center">
        {/* Big 404 */}
        <p
          className="font-display font-black leading-none mb-4 select-none"
          style={{
            fontSize: "clamp(6rem, 20vw, 14rem)",
            color: "rgba(230,57,70,0.08)",
            letterSpacing: "-0.05em",
          }}
        >
          404
        </p>

        {/* Overlay content */}
        <div className="-mt-8 sm:-mt-12 relative">
          <div className="section-label justify-center mb-4">Halaman tidak ditemukan</div>

          <h1 className="text-white font-display font-black text-2xl sm:text-3xl mb-3 uppercase">
            Halaman Tidak Ditemukan
          </h1>
          <p
            className="text-sm mb-8 max-w-sm mx-auto"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Halaman yang Anda cari tidak ada. Mungkin sudah dipindah atau tidak
            pernah ada.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 text-white font-bold text-xs uppercase tracking-widest rounded transition-all duration-200 hover:opacity-90"
            style={{ background: "#e63946" }}
          >
            <Home size={14} />
            Kembali ke Beranda
          </Link>
        </div>

        {/* Decorative corner lines */}
        <div
          className="absolute -top-8 -left-8 w-16 h-0.5 hidden sm:block"
          style={{ background: "rgba(230,57,70,0.2)" }}
        />
        <div
          className="absolute -top-8 -left-8 w-0.5 h-16 hidden sm:block"
          style={{ background: "rgba(230,57,70,0.2)" }}
        />
        <div
          className="absolute -bottom-8 -right-8 w-16 h-0.5 hidden sm:block"
          style={{ background: "rgba(230,57,70,0.2)" }}
        />
        <div
          className="absolute -bottom-8 -right-8 w-0.5 h-16 hidden sm:block"
          style={{ background: "rgba(230,57,70,0.2)" }}
        />
      </div>
    </div>
  );
}
