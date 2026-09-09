"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle2, AlertCircle, MessageSquare } from "lucide-react";
import type { AspirationCategory } from "@/types/database";

const categories: { value: AspirationCategory; label: string }[] = [
  { value: "infrastruktur", label: "Infrastruktur" },
  { value: "pelayanan",     label: "Pelayanan" },
  { value: "pemuda",        label: "Pemuda" },
  { value: "umkm",          label: "UMKM" },
  { value: "pertanian",     label: "Pertanian" },
  { value: "sosial",        label: "Sosial" },
  { value: "pendidikan",    label: "Pendidikan" },
  { value: "lainnya",       label: "Lainnya" },
];

const aspirationSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter").max(100, "Nama maksimal 100 karakter"),
  category: z.enum([
    "infrastruktur","pelayanan","pemuda","umkm","pertanian","sosial","pendidikan","lainnya",
  ] as const),
  message: z.string().min(10, "Aspirasi minimal 10 karakter").max(1000, "Aspirasi maksimal 1000 karakter"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Anda harus menyetujui ketentuan penggunaan data" }),
  }),
});

type AspirationFormData = z.infer<typeof aspirationSchema>;

export default function AspirationSection() {
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<AspirationFormData>({
    resolver: zodResolver(aspirationSchema),
    defaultValues: { category: "lainnya" },
  });

  const messageValue = watch("message", "");

  const onSubmit = async (data: AspirationFormData) => {
    setSubmitState("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/aspirasi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name, category: data.category, message: data.message }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Terjadi kesalahan.");
      setSubmitState("success");
      reset();
    } catch (err: unknown) {
      setSubmitState("error");
      setErrorMessage(err instanceof Error ? err.message : "Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  return (
    <section
      id="aspirasi"
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "#07070a" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(230,57,70,0.3), transparent)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 100%, rgba(230,57,70,0.04) 0%, transparent 55%)" }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded flex items-center justify-center"
                style={{ background: "rgba(230,57,70,0.08)", border: "1px solid rgba(230,57,70,0.2)" }}
              >
                <MessageSquare size={20} style={{ color: "#e63946" }} />
              </div>
            </div>
            <div className="section-label mb-3">Aspirasi Masyarakat</div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase">
              Suara Anda <span className="gradient-text-red">Penting</span>
            </h2>
            <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              Sampaikan aspirasi, masukan, atau harapan Anda untuk desa. Setiap aspirasi akan dibaca dan dipertimbangkan dengan serius.
            </p>
          </div>

          {/* Success state */}
          {submitState === "success" ? (
            <div
              className="p-10 text-center relative"
              style={{ background: "rgba(230,57,70,0.06)", border: "1px solid rgba(230,57,70,0.25)", borderRadius: "0.5rem" }}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t" style={{ background: "#e63946" }} />
              <CheckCircle2 size={44} style={{ color: "#e63946" }} className="mx-auto mb-4" />
              <h3 className="text-white font-display font-black text-xl mb-2 uppercase">Aspirasi Terkirim!</h3>
              <p className="text-sm mb-6" style={{ color: "rgba(230,57,70,0.75)" }}>
                Terima kasih telah menyampaikan aspirasi Anda. Aspirasi Anda akan diproses dan dipertimbangkan.
              </p>
              <button
                onClick={() => setSubmitState("idle")}
                className="px-6 py-3 text-white font-bold text-xs uppercase tracking-widest rounded transition-colors"
                style={{ background: "#e63946" }}
              >
                Kirim Aspirasi Lagi
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="p-6 sm:p-8 space-y-5 relative"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "0.5rem" }}
              noValidate
            >
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t" style={{ background: "linear-gradient(to right, #e63946, transparent)" }} />

              {/* Name */}
              <div>
                <label htmlFor="aspiration-name" className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Nama <span style={{ color: "#e63946" }}>*</span>
                </label>
                <input
                  id="aspiration-name"
                  type="text"
                  placeholder="Nama Anda"
                  {...register("name")}
                  className="form-input-dark"
                  style={errors.name ? { borderColor: "rgba(230,57,70,0.5)" } : {}}
                  autoComplete="name"
                />
                {errors.name && <p className="text-xs mt-1" style={{ color: "#e63946" }}>{errors.name.message}</p>}
              </div>

              {/* Category */}
              <div>
                <label htmlFor="aspiration-category" className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Kategori <span style={{ color: "#e63946" }}>*</span>
                </label>
                <select
                  id="aspiration-category"
                  {...register("category")}
                  className="form-input-dark cursor-pointer"
                  style={{ background: "#0d0d14" }}
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value} style={{ background: "#0d0d14" }}>
                      {cat.label}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="text-xs mt-1" style={{ color: "#e63946" }}>{errors.category.message}</p>}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="aspiration-message" className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Aspirasi <span style={{ color: "#e63946" }}>*</span>
                </label>
                <textarea
                  id="aspiration-message"
                  rows={5}
                  placeholder="Tuliskan aspirasi, masukan, atau harapan Anda untuk desa..."
                  {...register("message")}
                  className="form-input-dark resize-none"
                  style={errors.message ? { borderColor: "rgba(230,57,70,0.5)" } : {}}
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.message
                    ? <p className="text-xs" style={{ color: "#e63946" }}>{errors.message.message}</p>
                    : <span />
                  }
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
                    {messageValue.length}/1000
                  </span>
                </div>
              </div>

              {/* Consent */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" {...register("consent")} className="mt-0.5 w-4 h-4 accent-red-600" />
                  <span className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
                    Saya menyetujui bahwa data yang saya berikan akan digunakan untuk keperluan aspirasi dan komunikasi terkait program desa. Data tidak akan disebarluaskan tanpa izin.
                  </span>
                </label>
                {errors.consent && <p className="text-xs mt-1" style={{ color: "#e63946" }}>{errors.consent.message}</p>}
              </div>

              {/* Error */}
              {submitState === "error" && (
                <div
                  className="flex items-center gap-2 p-3 rounded"
                  style={{ background: "rgba(230,57,70,0.08)", border: "1px solid rgba(230,57,70,0.2)" }}
                >
                  <AlertCircle size={15} style={{ color: "#e63946" }} className="shrink-0" />
                  <p className="text-sm" style={{ color: "#e63946" }}>{errorMessage}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitState === "loading"}
                className="w-full py-4 px-6 rounded font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-200 text-white"
                style={{
                  background: submitState === "loading" ? "rgba(230,57,70,0.4)" : "#e63946",
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
                    <Send size={14} />
                    <span>Kirim Aspirasi</span>
                  </>
                )}
              </button>

              <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.2)" }}>
                Aspirasi akan dimoderasi sebelum ditampilkan secara publik.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
