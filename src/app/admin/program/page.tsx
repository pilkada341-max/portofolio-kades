"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import type { Program } from "@/types/database";

export default function AdminProgramPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [message, setMessage] = useState<{ id: string; type: "success" | "error"; text: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.push("/admin/login");
    });
    supabase.from("programs").select("*").order("order_number").then(({ data }) => {
      setPrograms(data || []);
      setLoading(false);
    });
  }, [router]);

  const handleSave = async (program: Program) => {
    setSaving(program.id);
    const supabase = createClient();
    const { error } = await supabase.from("programs").update({
      title: program.title,
      subtitle: program.subtitle,
      tag: program.tag,
      description: program.description,
      problem: program.problem,
      solution: program.solution,
      how_it_works: program.how_it_works,
      benefits: program.benefits,
      target_beneficiary: program.target_beneficiary,
      updated_at: new Date().toISOString(),
    }).eq("id", program.id);
    setSaving(null);
    setMessage({ id: program.id, type: error ? "error" : "success", text: error ? "Gagal menyimpan." : "Tersimpan!" });
    setTimeout(() => setMessage(null), 3000);
  };

  const updateProgram = (id: string, key: keyof Program, value: unknown) => {
    setPrograms((prev) => prev.map((p) => p.id === id ? { ...p, [key]: value } : p));
  };

  const updateListItem = (programId: string, key: "how_it_works" | "benefits", index: number, value: string) => {
    setPrograms((prev) => prev.map((p) => {
      if (p.id !== programId) return p;
      const list = [...(p[key] as string[])];
      list[index] = value;
      return { ...p, [key]: list };
    }));
  };

  const addListItem = (programId: string, key: "how_it_works" | "benefits") => {
    setPrograms((prev) => prev.map((p) => p.id === programId ? { ...p, [key]: [...(p[key] as string[]), ""] } : p));
  };

  const removeListItem = (programId: string, key: "how_it_works" | "benefits", index: number) => {
    setPrograms((prev) => prev.map((p) => {
      if (p.id !== programId) return p;
      const list = (p[key] as string[]).filter((_, i) => i !== index);
      return { ...p, [key]: list };
    }));
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: "#050d07" }}>
        <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#050d07" }}>
      <AdminSidebar />
      <main className="flex-1 p-6 lg:p-8 mt-14 lg:mt-0">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-white font-display font-bold text-2xl">Program Unggulan</h1>
            <p className="text-white/50 text-sm mt-1">Edit 3 program unggulan</p>
          </div>

          <div className="space-y-4">
            {programs.map((program) => (
              <div key={program.id} className="glass-card rounded-2xl overflow-hidden">
                {/* Header */}
                <button
                  onClick={() => setExpanded(expanded === program.id ? null : program.id)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <div>
                    <p className="text-emerald-400/70 text-xs font-semibold uppercase">{program.tag}</p>
                    <p className="text-white font-semibold mt-0.5">{program.title}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {message?.id === program.id && (
                      <span className={cn("text-xs", message.type === "success" ? "text-emerald-400" : "text-red-400")}>
                        {message.text}
                      </span>
                    )}
                    {expanded === program.id ? <ChevronUp size={18} className="text-white/40" /> : <ChevronDown size={18} className="text-white/40" />}
                  </div>
                </button>

                {/* Content */}
                {expanded === program.id && (
                  <div className="px-5 pb-5 space-y-4 border-t border-white/10 pt-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-white/50 text-xs mb-1.5 block">Judul</label>
                        <input type="text" value={program.title} onChange={(e) => updateProgram(program.id, "title", e.target.value)} className="form-input-dark" />
                      </div>
                      <div>
                        <label className="text-white/50 text-xs mb-1.5 block">Tag</label>
                        <input type="text" value={program.tag} onChange={(e) => updateProgram(program.id, "tag", e.target.value)} className="form-input-dark" />
                      </div>
                    </div>
                    <div>
                      <label className="text-white/50 text-xs mb-1.5 block">Subtitle</label>
                      <input type="text" value={program.subtitle} onChange={(e) => updateProgram(program.id, "subtitle", e.target.value)} className="form-input-dark" />
                    </div>
                    <div>
                      <label className="text-white/50 text-xs mb-1.5 block">Deskripsi</label>
                      <textarea rows={3} value={program.description} onChange={(e) => updateProgram(program.id, "description", e.target.value)} className="form-input-dark resize-none" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-white/50 text-xs mb-1.5 block">Masalah</label>
                        <textarea rows={3} value={program.problem} onChange={(e) => updateProgram(program.id, "problem", e.target.value)} className="form-input-dark resize-none" />
                      </div>
                      <div>
                        <label className="text-white/50 text-xs mb-1.5 block">Solusi</label>
                        <textarea rows={3} value={program.solution} onChange={(e) => updateProgram(program.id, "solution", e.target.value)} className="form-input-dark resize-none" />
                      </div>
                    </div>

                    {/* How it works */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-white/50 text-xs">Cara Kerja</label>
                        <button onClick={() => addListItem(program.id, "how_it_works")} className="text-emerald-400 text-xs flex items-center gap-1 hover:text-emerald-300">
                          <Plus size={12} /> Tambah
                        </button>
                      </div>
                      <div className="space-y-2">
                        {(program.how_it_works as string[]).map((step, i) => (
                          <div key={i} className="flex gap-2">
                            <span className="text-white/30 text-xs mt-3 w-5 shrink-0">{i + 1}.</span>
                            <input type="text" value={step} onChange={(e) => updateListItem(program.id, "how_it_works", i, e.target.value)} className="form-input-dark text-xs flex-1" />
                            <button onClick={() => removeListItem(program.id, "how_it_works", i)} className="text-red-400/50 hover:text-red-400 mt-2.5">
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-white/50 text-xs">Manfaat</label>
                        <button onClick={() => addListItem(program.id, "benefits")} className="text-emerald-400 text-xs flex items-center gap-1 hover:text-emerald-300">
                          <Plus size={12} /> Tambah
                        </button>
                      </div>
                      <div className="space-y-2">
                        {(program.benefits as string[]).map((benefit, i) => (
                          <div key={i} className="flex gap-2">
                            <input type="text" value={benefit} onChange={(e) => updateListItem(program.id, "benefits", i, e.target.value)} className="form-input-dark text-xs flex-1" />
                            <button onClick={() => removeListItem(program.id, "benefits", i)} className="text-red-400/50 hover:text-red-400 mt-2.5">
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-white/50 text-xs mb-1.5 block">Target Penerima Manfaat</label>
                      <input type="text" value={program.target_beneficiary} onChange={(e) => updateProgram(program.id, "target_beneficiary", e.target.value)} className="form-input-dark" />
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => handleSave(program)}
                        disabled={saving === program.id}
                        className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl text-sm transition-colors disabled:opacity-50"
                      >
                        {saving === program.id ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={16} />}
                        Simpan Program Ini
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
