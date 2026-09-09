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
      <div className="flex min-h-screen bg-forest-950 items-center justify-center">
        <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-forest-950">
      <AdminSidebar />

      <main className="flex-1 p-6 lg:p-8 mt-14 lg:mt-0">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-white font-display font-bold text-2xl">Profil Calon</h1>
              <p className="text-white/50 text-sm mt-1">Edit informasi profil calon kepala desa</p>
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

          {/* Photo */}
          <div className="glass-card rounded-2xl p-6 mb-6">
            <h2 className="text-white font-semibold mb-4">Foto Calon</h2>
            <div className="flex items-center gap-4">
              {form.photo_url ? (
                <img src={form.photo_url} alt="Foto calon" className="w-20 h-20 rounded-xl object-cover" />
              ) : (
                <div className="w-20 h-20 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/30">
                  <span>👤</span>
                </div>
              )}
              <div>
                <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 rounded-xl text-sm transition-colors">
                  <Upload size={14} />
                  {uploading ? "Mengupload..." : "Upload Foto"}
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
                <p className="text-white/30 text-xs mt-1.5">JPG, PNG, WebP. Max 5MB.</p>
              </div>
            </div>
          </div>

          {/* Basic info */}
          <div className="glass-card rounded-2xl p-6 mb-6 space-y-4">
            <h2 className="text-white font-semibold mb-2">Identitas</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-white/50 text-xs mb-1.5 block">Nama Lengkap</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="form-input-dark"
                  placeholder="Nama Calon"
                />
              </div>
              <div>
                <label className="text-white/50 text-xs mb-1.5 block">Nama Desa</label>
                <input
                  type="text"
                  value={form.village_name}
                  onChange={(e) => setForm((f) => ({ ...f, village_name: e.target.value }))}
                  className="form-input-dark"
                  placeholder="Nama Desa"
                />
              </div>
              <div>
                <label className="text-white/50 text-xs mb-1.5 block">Tempat Lahir</label>
                <input
                  type="text"
                  value={form.birth_place}
                  onChange={(e) => setForm((f) => ({ ...f, birth_place: e.target.value }))}
                  className="form-input-dark"
                />
              </div>
              <div>
                <label className="text-white/50 text-xs mb-1.5 block">Tanggal Lahir</label>
                <input
                  type="date"
                  value={form.birth_date}
                  onChange={(e) => setForm((f) => ({ ...f, birth_date: e.target.value }))}
                  className="form-input-dark"
                />
              </div>
            </div>
            <div>
              <label className="text-white/50 text-xs mb-1.5 block">Bio</label>
              <textarea
                rows={4}
                value={form.bio}
                onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                className="form-input-dark resize-none"
                placeholder="Deskripsi singkat calon..."
              />
            </div>
            <div>
              <label className="text-white/50 text-xs mb-1.5 block">Quote</label>
              <textarea
                rows={3}
                value={form.quote}
                onChange={(e) => setForm((f) => ({ ...f, quote: e.target.value }))}
                className="form-input-dark resize-none"
                placeholder='"Quote inspiratif..."'
              />
            </div>
          </div>

          {/* Contact */}
          <div className="glass-card rounded-2xl p-6 mb-6 space-y-4">
            <h2 className="text-white font-semibold mb-2">Kontak & Media Sosial</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { key: "whatsapp", label: "WhatsApp", placeholder: "628xx..." },
                { key: "instagram", label: "Instagram", placeholder: "@username" },
                { key: "facebook", label: "Facebook", placeholder: "username atau URL" },
                { key: "youtube", label: "YouTube", placeholder: "@channel" },
                { key: "email", label: "Email", placeholder: "email@domain.com" },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="text-white/50 text-xs mb-1.5 block">{label}</label>
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
          <div className="glass-card rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold">Pendidikan</h2>
              <button
                onClick={() => setForm((f) => ({ ...f, education: [...f.education, { year: "", institution: "", degree: "" }] }))}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs hover:bg-emerald-500/20 transition-colors"
              >
                <Plus size={12} />
                Tambah
              </button>
            </div>
            <div className="space-y-3">
              {form.education.map((edu, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <div className="grid grid-cols-3 gap-2 flex-1">
                    <input
                      type="text"
                      placeholder="Tahun"
                      value={edu.year}
                      onChange={(e) => {
                        const updated = [...form.education];
                        updated[i] = { ...updated[i], year: e.target.value };
                        setForm((f) => ({ ...f, education: updated }));
                      }}
                      className="form-input-dark text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Jenjang / Gelar"
                      value={edu.degree}
                      onChange={(e) => {
                        const updated = [...form.education];
                        updated[i] = { ...updated[i], degree: e.target.value };
                        setForm((f) => ({ ...f, education: updated }));
                      }}
                      className="form-input-dark text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Institusi"
                      value={edu.institution}
                      onChange={(e) => {
                        const updated = [...form.education];
                        updated[i] = { ...updated[i], institution: e.target.value };
                        setForm((f) => ({ ...f, education: updated }));
                      }}
                      className="form-input-dark text-xs"
                    />
                  </div>
                  <button
                    onClick={() => setForm((f) => ({ ...f, education: f.education.filter((_, idx) => idx !== i) }))}
                    className="text-red-400/50 hover:text-red-400 transition-colors mt-3"
                    aria-label="Hapus"
                  >
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
