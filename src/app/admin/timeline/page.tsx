"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, Plus, Trash2 } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import type { Timeline } from "@/types/database";

export default function AdminTimelinePage() {
  const [timelines, setTimelines] = useState<Timeline[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.push("/admin/login");
    });
    supabase.from("timelines").select("*").order("order_number").then(({ data }) => {
      setTimelines(data || []);
      setLoading(false);
    });
  }, [router]);

  const addTimeline = () => {
    const newItem: Timeline = {
      id: `new-${Date.now()}`,
      year: "",
      title: "",
      description: "",
      order_number: timelines.length + 1,
      created_at: new Date().toISOString(),
    };
    setTimelines((prev) => [...prev, newItem]);
  };

  const removeTimeline = async (id: string) => {
    if (id.startsWith("new-")) {
      setTimelines((prev) => prev.filter((t) => t.id !== id));
      return;
    }
    const supabase = createClient();
    await supabase.from("timelines").delete().eq("id", id);
    setTimelines((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    const supabase = createClient();

    for (const item of timelines) {
      if (item.id.startsWith("new-")) {
        if (item.year && item.title) {
          await supabase.from("timelines").insert([{
            year: item.year,
            title: item.title,
            description: item.description,
            order_number: item.order_number,
          }]);
        }
      } else {
        await supabase.from("timelines").update({
          year: item.year,
          title: item.title,
          description: item.description,
          order_number: item.order_number,
        }).eq("id", item.id);
      }
    }

    setSaving(false);
    setMessage({ type: "success", text: "Timeline berhasil disimpan!" });

    // Refresh
    const { data } = await supabase.from("timelines").select("*").order("order_number");
    setTimelines(data || []);
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
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-white font-display font-bold text-2xl">Timeline</h1>
              <p className="text-white/50 text-sm mt-1">Perjalanan karir dan pengabdian</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={addTimeline}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 rounded-xl text-sm transition-colors"
              >
                <Plus size={14} />
                Tambah
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl text-sm transition-colors disabled:opacity-50"
              >
                {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={14} />}
                Simpan
              </button>
            </div>
          </div>

          {message && (
            <div className={cn(
              "p-4 rounded-xl mb-6 text-sm",
              message.type === "success"
                ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                : "bg-red-500/10 border border-red-500/20 text-red-400"
            )}>
              {message.text}
            </div>
          )}

          <div className="space-y-3">
            {timelines.map((item, i) => (
              <div key={item.id} className="glass-card rounded-2xl p-5">
                <div className="grid grid-cols-4 gap-3 items-start">
                  <div>
                    <label className="text-white/40 text-xs mb-1 block">Tahun</label>
                    <input
                      type="text"
                      value={item.year}
                      onChange={(e) => setTimelines((prev) => prev.map((t) => t.id === item.id ? { ...t, year: e.target.value } : t))}
                      className="form-input-dark"
                      placeholder="2024"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-white/40 text-xs mb-1 block">Judul</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => setTimelines((prev) => prev.map((t) => t.id === item.id ? { ...t, title: e.target.value } : t))}
                      className="form-input-dark"
                      placeholder="Judul milestone..."
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-white/40 text-xs mb-1 block">Urutan</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={item.order_number}
                        onChange={(e) => setTimelines((prev) => prev.map((t) => t.id === item.id ? { ...t, order_number: parseInt(e.target.value) || 1 } : t))}
                        className="form-input-dark w-16"
                        min="1"
                      />
                      <button
                        onClick={() => removeTimeline(item.id)}
                        className="text-red-400/50 hover:text-red-400 transition-colors mt-0.5"
                        aria-label="Hapus"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <label className="text-white/40 text-xs mb-1 block">Deskripsi</label>
                  <textarea
                    rows={2}
                    value={item.description}
                    onChange={(e) => setTimelines((prev) => prev.map((t) => t.id === item.id ? { ...t, description: e.target.value } : t))}
                    className="form-input-dark resize-none"
                    placeholder="Deskripsi singkat..."
                  />
                </div>
              </div>
            ))}

            {timelines.length === 0 && (
              <div className="text-center py-10 text-white/30 text-sm">
                Belum ada timeline. Klik "Tambah" untuk menambahkan.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
