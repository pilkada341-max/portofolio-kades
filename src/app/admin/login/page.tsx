"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Email atau password salah. Silakan coba lagi.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

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

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          {/* Geometric logo */}
          <div className="relative w-14 h-14 flex items-center justify-center mx-auto mb-5">
            <div
              className="absolute inset-0 rotate-45"
              style={{ border: "2px solid #e63946", borderRadius: "0.25rem" }}
            />
            <span
              className="font-display font-black text-xl relative z-10"
              style={{ color: "#e63946" }}
            >
              A
            </span>
          </div>
          <h1 className="text-white font-display font-black text-xl uppercase tracking-widest">
            Admin Panel
          </h1>
          <p className="text-xs mt-1 font-medium uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>
            Website Portofolio Calon Kades
          </p>
        </div>

        {/* Form card */}
        <div
          className="p-7 space-y-5 relative"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "0.5rem",
          }}
        >
          {/* Top accent */}
          <div
            className="absolute top-0 left-0 right-0 h-0.5 rounded-t"
            style={{ background: "#e63946" }}
          />
          {/* Corner accents */}
          <div className="absolute bottom-0 left-0 w-6 h-0.5" style={{ background: "rgba(230,57,70,0.3)" }} />
          <div className="absolute bottom-0 left-0 h-6 w-0.5" style={{ background: "rgba(230,57,70,0.3)" }} />
          <div className="absolute top-0 right-0 w-6 h-0.5" style={{ background: "rgba(230,57,70,0.3)" }} />
          <div className="absolute top-0 right-0 h-6 w-0.5" style={{ background: "rgba(230,57,70,0.3)" }} />

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@email.com"
                required
                autoComplete="email"
                className="form-input-dark"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="form-input-dark pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                className="flex items-center gap-2 p-3 rounded"
                style={{
                  background: "rgba(230,57,70,0.08)",
                  border: "1px solid rgba(230,57,70,0.2)",
                }}
              >
                <AlertCircle size={14} style={{ color: "#e63946" }} className="shrink-0" />
                <p className="text-xs" style={{ color: "#e63946" }}>{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-white font-bold text-xs uppercase tracking-widest rounded transition-all duration-200"
              style={{
                background: loading ? "rgba(230,57,70,0.4)" : "#e63946",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Masuk...
                </span>
              ) : (
                "Masuk"
              )}
            </button>
          </form>
        </div>

        <p
          className="text-center text-xs mt-6 uppercase tracking-widest font-medium"
          style={{ color: "rgba(255,255,255,0.15)" }}
        >
          Akses terbatas untuk administrator
        </p>
      </div>
    </div>
  );
}
