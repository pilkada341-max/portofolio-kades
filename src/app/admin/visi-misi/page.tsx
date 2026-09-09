"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export default function AdminVisiMisiPage() {
  const [visionContent, setVisionContent] = useState("");
  const [missions, setMissions] = useState([
    { id: "", order_number: 1, title: "", icon: "shield", description: "" },
    { id: "", order_number: 2, title: "", icon: "users", description: "" },
    { id: "", order_number: 3, title: "", icon: "eye", description: "" },
  ]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.push("/admin/login");
    });

    Promise.all([
      supabase.from("vision").select("*").limit(1).single(),
      supabase.from("missions").select("*").order("order_number"),
    ]).then(([visionRes, missionsRes]) => {
      if (visionRes.data) setVisionContent(visionRes.data.content);
      if (missionsRes.data && missionsRes.data.length > 0) setMissions(missionsRes.data);
      setLoading(false);
    });
  }, [router]);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    const supabase = createClient();

    // Save vision
    const { data: existingVision } = await supabase.from("vision").select("id").limit(1).single();
    if (existingVision) {
      await supabase.from("vision").update({ content: visionContent, updated_at: new Date().toISOString() }).eq("id", existingVision.id);
    } else {
      await supabase.from("vision").insert([{ content: visionContent }]);
    }

    // Save missions
    for (const mission of missions) {
      if (mission.id) {
        await supabase.from("missions").update({
          title: mission.title,
          icon: mission.icon,
          description: mission.description,
          updated_at: new Date().toISOString(),
        }).eq("id", mission.id);
      } else if (mission.title) {
        await supabase.from("missions").insert([{
          order_number: mission.order_number,
          title: mission.title,
          icon: mission.icon,
          description: mission.description,
        }]);
      }
    }

    setSaving(false);
    setMessage({ type: "success", text: "Visi & misi berhasil disimpan!" });
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
              <h1 className="text-white font-display font-bold text-2xl">Visi & Misi</h1>
              <p className="text-white/50 text-sm mt-1">Edit visi dan misi calon</p>
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl text-sm transition-colors disabled:opacity-50"
            >
              {saving ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save size={16} />
              )}
              Simpan
            </button>
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

          {/* Vision */}
          <div className="glass-card rounded-2xl p-6 mb-6">
            <h2 className="text-white font-semibold mb-4">Visi</h2>
            <textarea
              rows={5}
              value={visionContent}
              onChange={(e) => setVisionContent(e.target.value)}
              className="form-input-dark resize-none"
              placeholder="Tulis visi resmi calon..."
            />
          </div>

          {/* Missions */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-white font-semibold mb-4">Misi</h2>
            <div className="space-y-5">
              {missions.map((mission, i) => (
                <div key={i} className="border border-white/10 rounded-xl p-4 space-y-3">
                  <p className="text-emerald-400/70 text-xs font-semibold">
                    Misi {String(i + 1).padStart(2, "0")}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-white/50 text-xs mb-1.5 block">Judul</label>
                      <input
                        type="text"
                        value={mission.title}
                        onChange={(e) => {
                          const updated = [...missions];
                          updated[i] = { ...updated[i], title: e.target.value };
                          setMissions(updated);
                        }}
                        className="form-input-dark"
                        placeholder="Judul misi..."
                      />
                    </div>
                    <div>
                      <label className="text-white/50 text-xs mb-1.5 block">Icon</label>
                      <select
                        value={mission.icon}
                        onChange={(e) => {
                          const updated = [...missions];
                          updated[i] = { ...updated[i], icon: e.target.value };
                          setMissions(updated);
                        }}
                        className="form-input-dark cursor-pointer"
                        style={{ backgroundColor: "#050d07" }}
                      >
                        <option value="shield">Shield (Pelayanan)</option>
                        <option value="users">Users (Pemuda)</option>
                        <option value="eye">Eye (Transparansi)</option>
                        <option value="star">Star</option>
                        <option value="heart">Heart</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-white/50 text-xs mb-1.5 block">Deskripsi</label>
                    <textarea
                      rows={3}
                      value={mission.description}
                      onChange={(e) => {
                        const updated = [...missions];
                        updated[i] = { ...updated[i], description: e.target.value };
                        setMissions(updated);
                      }}
                      className="form-input-dark resize-none"
                      placeholder="Deskripsi misi..."
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
