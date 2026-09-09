"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Upload, Trash2, Plus } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import type { Gallery, GalleryCategory } from "@/types/database";

const categories: { value: GalleryCategory; label: string }[] = [
  { value: "kegiatan", label: "Kegiatan" },
  { value: "masyarakat", label: "Masyarakat" },
  { value: "pemuda", label: "Pemuda" },
  { value: "sosial", label: "Sosial" },
  { value: "lingkungan", label: "Lingkungan" },
  { value: "dokumentasi", label: "Dokumentasi" },
];

export default function AdminGaleriPage() {
  const [gallery, setGallery] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [newCaption, setNewCaption] = useState("");
  const [newCategory, setNewCategory] = useState<GalleryCategory>("dokumentasi");
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.push("/admin/login");
    });
    fetchGallery();
  }, [router]);

  const fetchGallery = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });
    setGallery(data || []);
    setLoading(false);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const supabase = createClient();

    for (const file of Array.from(files)) {
      const fileName = `gallery-${Date.now()}-${Math.random().toString(36).slice(2)}.${file.name.split(".").pop()}`;

      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(fileName, file);

      if (!uploadError) {
        const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(fileName);
        await supabase.from("gallery").insert([{
          image_url: urlData.publicUrl,
          caption: newCaption || file.name.split(".")[0],
          category: newCategory,
        }]);
      }
    }

    setUploading(false);
    setNewCaption("");
    fetchGallery();
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm("Hapus foto ini?")) return;

    const supabase = createClient();
    const fileName = imageUrl.split("/").pop();
    if (fileName) {
      await supabase.storage.from("gallery").remove([fileName]);
    }
    await supabase.from("gallery").delete().eq("id", id);
    setGallery((prev) => prev.filter((g) => g.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-forest-950">
      <AdminSidebar />

      <main className="flex-1 p-6 lg:p-8 mt-14 lg:mt-0">
        <div className="mb-8">
          <h1 className="text-white font-display font-bold text-2xl">Galeri</h1>
          <p className="text-white/50 text-sm mt-1">{gallery.length} foto tersimpan</p>
        </div>

        {/* Upload form */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <h2 className="text-white font-semibold mb-4">Upload Foto</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-white/50 text-xs mb-1.5 block">Caption (opsional)</label>
              <input
                type="text"
                value={newCaption}
                onChange={(e) => setNewCaption(e.target.value)}
                className="form-input-dark"
                placeholder="Keterangan foto..."
              />
            </div>
            <div>
              <label className="text-white/50 text-xs mb-1.5 block">Kategori</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as GalleryCategory)}
                className="form-input-dark bg-forest-950 cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <label className={cn(
            "flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-8 cursor-pointer transition-all duration-200",
            uploading
              ? "border-emerald-500/50 bg-emerald-500/5"
              : "border-white/10 hover:border-emerald-500/30 hover:bg-emerald-500/5"
          )}>
            <Upload size={24} className={uploading ? "text-emerald-400" : "text-white/30"} />
            <p className="text-white/60 text-sm mt-2">
              {uploading ? "Mengupload..." : "Klik atau drag foto ke sini"}
            </p>
            <p className="text-white/30 text-xs mt-1">JPG, PNG, WebP. Bisa pilih beberapa.</p>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>

        {/* Gallery grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : gallery.length === 0 ? (
          <div className="text-center py-20 text-white/30">
            <p>Belum ada foto.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {gallery.map((item) => (
              <div key={item.id} className="group relative rounded-2xl overflow-hidden">
                <img
                  src={item.image_url}
                  alt={item.caption}
                  className="w-full aspect-square object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-200 flex flex-col items-center justify-center">
                  <button
                    onClick={() => handleDelete(item.id, item.image_url)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity w-9 h-9 bg-red-500 rounded-full flex items-center justify-center text-white"
                    aria-label="Hapus foto"
                  >
                    <Trash2 size={14} />
                  </button>
                  <p className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs text-center px-2 mt-2">
                    {item.caption}
                  </p>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white/60 text-xs capitalize">
                    {item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
