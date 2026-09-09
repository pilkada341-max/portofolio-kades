import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Image, MessageSquare, TrendingUp, ExternalLink, Users } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const [galleryRes, aspirationsRes, candidateRes] = await Promise.all([
    supabase.from("gallery").select("id", { count: "exact", head: true }),
    supabase.from("aspirations").select("id", { count: "exact", head: true }),
    supabase.from("candidates").select("name, village_name").limit(1).single(),
  ]);

  const pendingAsp = await supabase
    .from("aspirations")
    .select("id", { count: "exact", head: true })
    .eq("status", "pending");

  const stats = [
    {
      label: "Total Foto",
      value: galleryRes.count || 0,
      icon: <Image size={18} />,
      href: "/admin/galeri",
      accent: "#a78bfa",
      accentBg: "rgba(167,139,250,0.08)",
      accentBorder: "rgba(167,139,250,0.2)",
    },
    {
      label: "Total Aspirasi",
      value: aspirationsRes.count || 0,
      icon: <MessageSquare size={18} />,
      href: "/admin/aspirasi",
      accent: "#60a5fa",
      accentBg: "rgba(96,165,250,0.08)",
      accentBorder: "rgba(96,165,250,0.2)",
    },
    {
      label: "Aspirasi Pending",
      value: pendingAsp.count || 0,
      icon: <Users size={18} />,
      href: "/admin/aspirasi",
      accent: "#fbbf24",
      accentBg: "rgba(245,158,11,0.08)",
      accentBorder: "rgba(245,158,11,0.2)",
    },
  ];

  const quickLinks = [
    { href: "/admin/profil",    label: "Edit Profil Calon" },
    { href: "/admin/visi-misi", label: "Edit Visi & Misi" },
    { href: "/admin/program",   label: "Kelola Program" },
    { href: "/admin/galeri",    label: "Upload Foto" },
    { href: "/admin/aspirasi",  label: "Moderasi Aspirasi" },
    { href: "/admin/apbdes",    label: "Update APBDes" },
  ];

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#07070a" }}>
      <AdminSidebar />

      <main className="flex-1 p-6 lg:p-8 mt-14 lg:mt-0">
        {/* Header */}
        <div className="mb-8">
          <div className="section-label mb-2">Dashboard</div>
          <h1 className="text-white font-display font-black text-2xl uppercase">
            Panel Admin
          </h1>
          <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
            {user.email} •{" "}
            <span style={{ color: "#e63946" }}>
              {candidateRes.data?.name || "[Nama Calon]"}
            </span>{" "}
            — {candidateRes.data?.village_name || "[Nama Desa]"}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {stats.map((stat) => (
            <Link key={stat.label} href={stat.href}>
              <div
                className="p-5 transition-all duration-200 cursor-pointer relative group"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${stat.accentBorder}`,
                  borderRadius: "0.5rem",
                }}
              >
                {/* Top accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 rounded-t"
                  style={{ background: stat.accent }}
                />
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded flex items-center justify-center"
                    style={{ background: stat.accentBg, color: stat.accent }}
                  >
                    {stat.icon}
                  </div>
                  <TrendingUp
                    size={13}
                    className="transition-colors"
                    style={{ color: "rgba(255,255,255,0.15)" }}
                  />
                </div>
                <p className="text-white font-display font-black text-3xl mb-1">{stat.value}</p>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>{stat.label}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick actions */}
        <div
          className="p-6 mb-6 relative"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "0.5rem",
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t" style={{ background: "linear-gradient(to right, #e63946, transparent)" }} />
          <h2 className="text-white font-bold text-xs uppercase tracking-widest mb-4">
            Aksi Cepat
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "0.375rem",
                  color: "rgba(255,255,255,0.5)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(230,57,70,0.07)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(230,57,70,0.2)";
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)";
                }}
              >
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* View site */}
        <div
          className="p-5 flex items-center justify-between"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "0.5rem",
          }}
        >
          <div>
            <p className="text-white font-bold text-sm">Lihat Website</p>
            <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
              Cek tampilan publik website
            </p>
          </div>
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2.5 text-white font-bold text-xs uppercase tracking-widest rounded transition-all duration-200 hover:opacity-90"
            style={{ background: "#e63946" }}
          >
            <ExternalLink size={13} />
            <span>Buka</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
