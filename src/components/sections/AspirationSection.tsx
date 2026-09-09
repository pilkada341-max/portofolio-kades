"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle2, AlertCircle, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AspirationCategory } from "@/types/database";

const categories: { value: AspirationCategory; label: string }[] = [
  { value: "infrastruktur", label: "Infrastruktur" },
  { value: "pelayanan", label: "Pelayanan" },
  { value: "pemuda", label: "Pemuda" },
  { value: "umkm", label: "UMKM" },
  { value: "pertanian", label: "Pertanian" },
  { value: "sosial", label: "Sosial" },
  { value: "pendidikan", label: "Pendidikan" },
  { value: "lainnya", label: "Lainnya" },
];

const aspirationSchema = z.object({
  name: z
    .string()
    .min(2, "Nama minimal 2 karakter")
    .max(100, "Nama maksimal 100 karakter"),
  category: z.enum([
    "infrastruktur",
    "pelayanan",
    "pemuda",
    "umkm",
    "pertanian",
    "sosial",
    "pendidikan",
    "lainnya",
  ] as const),
  message: z
    .string()
    .min(10, "Aspirasi minimal 10 karakter")
    .max(1000, "Aspirasi maksimal 1000 karakter"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Anda harus menyetujui ketentuan penggunaan data" }),
  }),
});

type AspirationFormData = z.infer<typeof aspirationSchema>;

export default function AspirationSection() {
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<AspirationFormData>({
    resolver: zodResolver(aspirationSchema),
    defaultValues: {
      category: "lainnya",
    },
  });

  const messageValue = watch("message", "");

  const onSubmit = async (data: AspirationFormData) => {
    setSubmitState("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/aspirasi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          category: data.category,
          message: data.message,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Terjadi kesalahan.");
      }

      setSubmitState("success");
      reset();
    } catch (err: unknown) {
      console.error("Error submitting aspiration:", err);
      setSubmitState("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Terjadi kesalahan. Silakan coba lagi."
      );
    }
  };

  return (
    <section id="aspirasi" className="section-padding relative overflow-hidden" style={{ backgroundColor: "#071a0f" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}
            >
              <MessageSquare size={24} style={{ color: "#34d399" }} />
            </div>
            <span
              className="inline-block text-xs font-semibold uppercase"
              style={{ color: "#34d399", letterSpacing: "0.2em" }}
            >
              Aspirasi Masyarakat
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mt-2">
              Suara Anda <span className="gradient-text-emerald">Penting</span>
            </h2>
            <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              Sampaikan aspirasi, masukan, atau harapan Anda untuk desa. Setiap aspirasi akan dibaca dan dipertimbangkan dengan serius.
            </p>
          </div>

          {/* Success state */}
          {submitState === "success" ? (
            <div
              className="rounded-3xl p-10 text-center"
              style={{
                background: "rgba(16,185,129,0.08)",
                border: "1px solid rgba(16,185,129,0.25)",
              }}
            >
              <CheckCircle2 size={48} style={{ color: "#34d399" }} className="mx-auto mb-4" />
              <h3 className="text-white font-display font-bold text-xl mb-2">
                Aspirasi Terkirim!
              </h3>
              <p className="text-sm mb-6" style={{ color: "rgba(52,211,153,0.8)" }}>
                Terima kasih telah menyampaikan aspirasi Anda. Aspirasi Anda akan diproses dan dipertimbangkan.
              </p>
              <button
                onClick={() => setSubmitState("idle")}
                className="px-6 py-3 text-white font-semibold rounded-2xl text-sm transition-colors"
                style={{ background: "#059669" }}
              >
                Kirim Aspirasi Lagi
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-3xl p-6 sm:p-8 space-y-5"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              noValidate
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="aspiration-name"
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  Nama <span style={{ color: "#f87171" }}>*</span>
                </label>
                <input
                  id="aspiration-name"
                  type="text"
                  placeholder="Nama Anda"
                  {...register("name")}
                  className="form-input-dark"
                  style={errors.name ? { borderColor: "rgba(248,113,113,0.5)" } : {}}
                  autoComplete="name"
                />
                {errors.name && (
                  <p className="text-xs mt-1" style={{ color: "#f87171" }}>{errors.name.message}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="aspiration-category"
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  Kategori <span style={{ color: "#f87171" }}>*</span>
                </label>
                <select
                  id="aspiration-category"
                  {...register("category")}
                  className="form-input-dark cursor-pointer"
                  style={{ background: "#0a1a0e" }}
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value} style={{ background: "#0a1a0e" }}>
                      {cat.label}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-xs mt-1" style={{ color: "#f87171" }}>{errors.category.message}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="aspiration-message"
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  Aspirasi <span style={{ color: "#f87171" }}>*</span>
                </label>
                <textarea
                  id="aspiration-message"
                  rows={5}
                  placeholder="Tuliskan aspirasi, masukan, atau harapan Anda untuk desa..."
                  {...register("message")}
                  className="form-input-dark resize-none"
                  style={errors.message ? { borderColor: "rgba(248,113,113,0.5)" } : {}}
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.message ? (
                    <p className="text-xs" style={{ color: "#f87171" }}>{errors.message.message}</p>
                  ) : <span />}
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {messageValue.length}/1000
                  </span>
                </div>
              </div>

              {/* Consent */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("consent")}
                    className="mt-0.5 w-4 h-4 accent-emerald-600"
                  />
                  <span className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Saya menyetujui bahwa data yang saya berikan akan digunakan untuk keperluan aspirasi dan komunikasi terkait program desa. Data tidak akan disebarluaskan tanpa izin.
                  </span>
                </label>
                {errors.consent && (
                  <p className="text-xs mt-1" style={{ color: "#f87171" }}>{errors.consent.message}</p>
                )}
              </div>

              {/* Error */}
              {submitState === "error" && (
                <div
                  className="flex items-center gap-2 p-3 rounded-xl"
                  style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}
                >
                  <AlertCircle size={16} style={{ color: "#f87171" }} className="shrink-0" />
                  <p className="text-sm" style={{ color: "#f87171" }}>{errorMessage}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitState === "loading"}
                className="w-full py-4 px-6 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 text-white"
                style={{
                  background: submitState === "loading" ? "rgba(16,185,129,0.4)" : "#059669",
                  cursor: submitState === "loading" ? "not-allowed" : "pointer",
                }}
              >
                {submitState === "loading" ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Mengirim...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Kirim Aspirasi</span>
                  </>
                )}
              </button>

              <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.25)" }}>
                Aspirasi akan dimoderasi sebelum ditampilkan secara publik.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
