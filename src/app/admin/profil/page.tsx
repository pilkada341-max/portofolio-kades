"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, Plus, Trash2, Upload } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export default function AdminProfilPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    village_name: "",
    birth_place: "",
    birth_date: "",
    bio: "",
    quote: "",
    whatsapp: "",
    instagram: "",
    facebook: "",
    youtube: "",
    email: "",
    photo_url: "",
    education: [] as { year: string; institution: string; degree: string }[],
    experience: [] as { year: string; title: string; organization: string; description: string }[],
    organization: [] as { year: string; name: string; role: string }[],
    social_activity: [] as { year: string; title: string; description: string }[],
  });

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.push("/admin/login");
    });

    supabase
      .from("candidates")
      .select("*")
      .limit(1)
      .single()
      .then(({ data }) => {
        if (data) {
          setForm({
            name: data.name || "",
            village_name: data.village_name || "",
            birth_place: data.birth_place || "",
            birth_date: data.birth_date ? data.birth_date.split("T")[0] : "",
            bio: data.bio || "",
            quote: data.quote || "",
            whatsapp: data.whatsapp || "",
            instagram: data.instagram || "",
            facebook: data.facebook || "",
            youtube: data.youtube || "",
            email: data.email || "",
            photo_url: data.photo_url || "",
            education: data.education || [],
            experience: data.experience || [],
            organization: data.organization || [],
            social_activity: data.social_activity || [],
          });
        }
        setLoading(false);
      });
  }, [router]);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const supabase = createClient();
    const fileName = `candidate-${Date.now()}.${file.name.split(".").pop()}`;

    const { data, error } = await supabase.storage
      .from("photos")
      .upload(fileName, file, { upsert: true });

    if (data) {
      const { data: urlData } = supabase.storage.from("photos").getPublicUrl(fileName);
      setForm((f) => ({ ...f, photo_url: urlData.publicUrl }));
    }
    setUploading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    const supabase = createClient();

    // Check if candidate exists
    const { data: existing } = await supabase.from("candidates").select("id").limit(1).single();

    const payload = {
      ...form,
      updated_at: new Date().toISOString(),
    };

    let error;
    if (existing) {
      ({ error } = await supabase.from("candidates").update(payload).eq("id", existing.id));
    } else {
      ({ error } = await supabase.from("candidates").insert([payload]));
    }

    setSaving(false);
    if (error) {
      setMessage({ type: "error", text: "Gagal menyimpan. " + error.message });
    } else {
      setMessage({ type: "success", text: "Profil berhasil disimpan!" });
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: "#07070a" }}>
        <div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "rgba(230,57,70,0.3)", borderTopColor: "#e63946" }} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#07070a" }}>
      <AdminSidebar />

      <main className="flex-1 p-6 lg:p-8 mt-14 lg:mt-0">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="section-label mb-2">Edit</div>
              <h1 className="text-white font-display font-black text-2xl uppercase">Profil Calon</h1>
              <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>Edit informasi profil calon kepala desa</p>
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 text-white font-bold text-xs uppercase tracking-wider rounded transition-all disabled:opacity-50"
              style={{ background: "#e63946" }}
            >
              {saving ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save size={14} />
              )}
              Simpan
            </button>
          </div>

          {message && (
            <div className="p-4 rounded mb-6 text-sm" style={
              message.type === "success"
                ? { background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)", color: "#34d399" }
                : { background: "rgba(230,57,70,0.08)", border: "1px solid rgba(230,57,70,0.2)", color: "#e63946" }
            }>
              {message.text}
            </div>
          )}

          {/* Photo */}
          <div className="p-6 mb-5 relative" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "0.5rem" }}>
            <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t" style={{ background: "linear-gradient(to right, #e63946, transparent)" }} />
            <h2 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Foto Calon</h2>
            <div className="flex items-center gap-4">
              {form.photo_url ? (
                <img src={form.photo_url} alt="Foto calon" className="w-20 h-20 object-cover" style={{ borderRadius: "0.375rem", border: "1px solid rgba(230,57,70,0.2)" }} />
              ) : (
                <div className="w-20 h-20 flex items-center justify-center text-white/30" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "0.375rem" }}>
                  <span>👤</span>
                </div>
              )}
              <div>
                <label className="cursor-pointer flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", borderRadius: "0.375rem" }}>
                  <Upload size={13} />
                  {uploading ? "Mengupload..." : "Upload Foto"}
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
                <p className="text-xs mt-1.5" style={{ color: "rgba(255,255,255,0.25)" }}>JPG, PNG, WebP. Max 5MB.</p>
              </div>
            </div>
          </div>

          {/* Basic info */}
          <div className="p-6 mb-5 space-y-4 relative" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "0.5rem" }}>
            <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t" style={{ background: "linear-gradient(to right, #e63946, transparent)" }} />
            <h2 className="text-white font-bold text-xs uppercase tracking-widest mb-2">Identitas</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium mb-1.5 block" style={{ color: "rgba(255,255,255,0.45)" }}>Nama Lengkap</label>
                <input type="text" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="form-input-dark" placeholder="Nama Calon" />
              </div>
              <div>
                <label className="text-xs font-medium mb-1.5 block" style={{ color: "rgba(255,255,255,0.45)" }}>Nama Desa</label>
                <input type="text" value={form.village_name} onChange={(e) => setForm((f) => ({ ...f, village_name: e.target.value }))} className="form-input-dark" placeholder="Nama Desa" />
              </div>
              <div>
                <label className="text-xs font-medium mb-1.5 block" style={{ color: "rgba(255,255,255,0.45)" }}>Tempat Lahir</label>
                <input type="text" value={form.birth_place} onChange={(e) => setForm((f) => ({ ...f, birth_place: e.target.value }))} className="form-input-dark" />
              </div>
              <div>
                <label className="text-xs font-medium mb-1.5 block" style={{ color: "rgba(255,255,255,0.45)" }}>Tanggal Lahir</label>
                <input type="date" value={form.birth_date} onChange={(e) => setForm((f) => ({ ...f, birth_date: e.target.value }))} className="form-input-dark" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: "rgba(255,255,255,0.45)" }}>Bio</label>
              <textarea rows={4} value={form.bio} onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))} className="form-input-dark resize-none" placeholder="Deskripsi singkat calon..." />
            </div>
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: "rgba(255,255,255,0.45)" }}>Quote</label>
              <textarea rows={3} value={form.quote} onChange={(e) => setForm((f) => ({ ...f, quote: e.target.value }))} className="form-input-dark resize-none" placeholder='"Quote inspiratif..."' />
            </div>
          </div>

          {/* Contact */}
          <div className="p-6 mb-5 space-y-4 relative" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "0.5rem" }}>
            <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t" style={{ background: "linear-gradient(to right, #e63946, transparent)" }} />
            <h2 className="text-white font-bold text-xs uppercase tracking-widest mb-2">Kontak & Media Sosial</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { key: "whatsapp", label: "WhatsApp", placeholder: "628xx..." },
                { key: "instagram", label: "Instagram", placeholder: "@username" },
                { key: "facebook", label: "Facebook", placeholder: "username atau URL" },
                { key: "youtube", label: "YouTube", placeholder: "@channel" },
                { key: "email", label: "Email", placeholder: "email@domain.com" },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="text-xs font-medium mb-1.5 block" style={{ color: "rgba(255,255,255,0.45)" }}>{label}</label>
                  <input
                    type={key === "email" ? "email" : "text"}
                    value={form[key as keyof typeof form] as string}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    className="form-input-dark"
                    placeholder={placeholder}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="p-6 mb-5 relative" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "0.5rem" }}>
            <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t" style={{ background: "linear-gradient(to right, #e63946, transparent)" }} />
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold text-xs uppercase tracking-widest">Pendidikan</h2>
              <button
                onClick={() => setForm((f) => ({ ...f, education: [...f.education, { year: "", institution: "", degree: "" }] }))}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors"
                style={{ background: "rgba(230,57,70,0.08)", color: "#e63946", border: "1px solid rgba(230,57,70,0.2)" }}
              >
                <Plus size={12} />Tambah
              </button>
            </div>
            <div className="space-y-3">
              {form.education.map((edu, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <div className="grid grid-cols-3 gap-2 flex-1">
                    <input type="text" placeholder="Tahun" value={edu.year} onChange={(e) => { const updated = [...form.education]; updated[i] = { ...updated[i], year: e.target.value }; setForm((f) => ({ ...f, education: updated })); }} className="form-input-dark text-xs" />
                    <input type="text" placeholder="Jenjang / Gelar" value={edu.degree} onChange={(e) => { const updated = [...form.education]; updated[i] = { ...updated[i], degree: e.target.value }; setForm((f) => ({ ...f, education: updated })); }} className="form-input-dark text-xs" />
                    <input type="text" placeholder="Institusi" value={edu.institution} onChange={(e) => { const updated = [...form.education]; updated[i] = { ...updated[i], institution: e.target.value }; setForm((f) => ({ ...f, education: updated })); }} className="form-input-dark text-xs" />
                  </div>
                  <button onClick={() => setForm((f) => ({ ...f, education: f.education.filter((_, idx) => idx !== i) }))} className="text-red-400/50 hover:text-red-400 transition-colors mt-3" aria-label="Hapus">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
