"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Leaf, Eye, EyeOff, AlertCircle } from "lucide-react";
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
    <div className="min-h-screen bg-forest-950 flex items-center justify-center p-4">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, rgba(16,185,129,0.05) 0%, transparent 60%)`,
        }}
      />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Leaf className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-white font-display font-bold text-xl">Admin Panel</h1>
          <p className="text-white/40 text-sm mt-1">Website Portofolio Calon Kades</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleLogin}
          className="glass-card rounded-3xl p-7 space-y-5"
        >
          <div>
            <label htmlFor="email" className="block text-white/60 text-sm mb-1.5">
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

          <div>
            <label htmlFor="password" className="block text-white/60 text-sm mb-1.5">
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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
              <AlertCircle size={15} className="text-red-400 shrink-0" />
              <p className="text-red-400 text-xs">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-800 text-white font-semibold rounded-xl transition-colors text-sm"
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

        <p className="text-center text-white/20 text-xs mt-6">
          Akses terbatas untuk administrator
        </p>
      </div>
    </div>
  );
}
