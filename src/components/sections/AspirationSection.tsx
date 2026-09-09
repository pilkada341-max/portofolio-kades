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
    <section id="aspirasi" className="section-padding bg-stone-50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-5">
              <MessageSquare size={24} className="text-emerald-600" />
            </div>
            <span className="inline-block text-emerald-600 text-xs font-semibold uppercase tracking-widest mb-3">
              Aspirasi Masyarakat
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-stone-900">
              Suara Anda <span className="text-emerald-600">Penting</span>
            </h2>
            <p className="text-stone-500 mt-3 text-sm">
              Sampaikan aspirasi, masukan, atau harapan Anda untuk desa. Setiap aspirasi akan dibaca dan dipertimbangkan dengan serius.
            </p>
          </div>

          {/* Success state */}
          {submitState === "success" ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-10 text-center">
              <CheckCircle2 size={48} className="text-emerald-500 mx-auto mb-4" />
              <h3 className="text-emerald-800 font-display font-bold text-xl mb-2">
                Aspirasi Terkirim!
              </h3>
              <p className="text-emerald-600 text-sm mb-6">
                Terima kasih telah menyampaikan aspirasi Anda. Aspirasi Anda akan diproses dan dipertimbangkan.
              </p>
              <button
                onClick={() => setSubmitState("idle")}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-2xl transition-colors text-sm"
              >
                Kirim Aspirasi Lagi
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-5"
              noValidate
            >
              {/* Name */}
              <div>
                <label htmlFor="aspiration-name" className="block text-sm font-medium text-stone-700 mb-1.5">
                  Nama <span className="text-red-500">*</span>
                </label>
                <input
                  id="aspiration-name"
                  type="text"
                  placeholder="Nama Anda"
                  {...register("name")}
                  className={cn(
                    "form-input",
                    errors.name && "border-red-300 focus:ring-red-400"
                  )}
                  autoComplete="name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label htmlFor="aspiration-category" className="block text-sm font-medium text-stone-700 mb-1.5">
                  Kategori <span className="text-red-500">*</span>
                </label>
                <select
                  id="aspiration-category"
                  {...register("category")}
                  className={cn(
                    "form-input bg-white cursor-pointer",
                    errors.category && "border-red-300 focus:ring-red-400"
                  )}
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="aspiration-message" className="block text-sm font-medium text-stone-700 mb-1.5">
                  Aspirasi <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="aspiration-message"
                  rows={5}
                  placeholder="Tuliskan aspirasi, masukan, atau harapan Anda untuk desa..."
                  {...register("message")}
                  className={cn(
                    "form-input resize-none",
                    errors.message && "border-red-300 focus:ring-red-400"
                  )}
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.message ? (
                    <p className="text-red-500 text-xs">{errors.message.message}</p>
                  ) : (
                    <span />
                  )}
                  <span className="text-stone-400 text-xs">
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
                  <span className="text-stone-500 text-xs leading-relaxed">
                    Saya menyetujui bahwa data yang saya berikan akan digunakan untuk keperluan aspirasi dan komunikasi terkait program desa. Data tidak akan disebarluaskan tanpa izin.
                  </span>
                </label>
                {errors.consent && (
                  <p className="text-red-500 text-xs mt-1">{errors.consent.message}</p>
                )}
              </div>

              {/* Error */}
              {submitState === "error" && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl">
                  <AlertCircle size={16} className="text-red-500 shrink-0" />
                  <p className="text-red-600 text-sm">{errorMessage}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitState === "loading"}
                className={cn(
                  "w-full py-4 px-6 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200",
                  submitState === "loading"
                    ? "bg-emerald-300 text-white cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-500 text-white hover:shadow-lg hover:-translate-y-0.5"
                )}
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

              <p className="text-stone-400 text-xs text-center">
                Aspirasi akan dimoderasi sebelum ditampilkan secara publik.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
