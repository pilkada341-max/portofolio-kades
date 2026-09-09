import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Users, Image, MessageSquare, TrendingUp, ExternalLink } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  // Fetch stats
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
      icon: <Image size={20} />,
      href: "/admin/galeri",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      inlineStyle: undefined as React.CSSProperties | undefined,
    },
    {
      label: "Total Aspirasi",
      value: aspirationsRes.count || 0,
      icon: <MessageSquare size={20} />,
      href: "/admin/aspirasi",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      inlineStyle: undefined as React.CSSProperties | undefined,
    },
    {
      label: "Aspirasi Pending",
      value: pendingAsp.count || 0,
      icon: <Users size={20} />,
      href: "/admin/aspirasi",
      color: "",
      bg: "",
      inlineStyle: { backgroundColor: "rgba(245,158,11,0.1)", color: "#fbbf24" } as React.CSSProperties,
    },
  ];

  const quickLinks = [
    { href: "/admin/profil", label: "Edit Profil Calon" },
    { href: "/admin/visi-misi", label: "Edit Visi & Misi" },
    { href: "/admin/program", label: "Kelola Program" },
    { href: "/admin/galeri", label: "Upload Foto" },
    { href: "/admin/aspirasi", label: "Moderasi Aspirasi" },
    { href: "/admin/apbdes", label: "Update APBDes" },
  ];

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#050d07" }}>
      <AdminSidebar />

      <main className="flex-1 p-6 lg:p-8 mt-14 lg:mt-0">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-white font-display font-bold text-2xl">Dashboard</h1>
          <p className="text-white/50 text-sm mt-1">
            Selamat datang, {user.email} •{" "}
            {candidateRes.data?.name || "[Nama Calon]"} —{" "}
            {candidateRes.data?.village_name || "[Nama Desa]"}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {stats.map((stat) => (
            <Link key={stat.label} href={stat.href}>
              <div className="glass-card rounded-2xl p-5 hover:border-emerald-500/30 transition-all duration-200 group cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`} style={stat.inlineStyle}>
                    {stat.icon}
                  </div>
                  <TrendingUp size={14} className="text-white/20 group-hover:text-emerald-400 transition-colors" />
                </div>
                <p className="text-white font-display font-bold text-3xl mb-1">{stat.value}</p>
                <p className="text-white/50 text-sm">{stat.label}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick actions */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <h2 className="text-white font-semibold mb-4">Aksi Cepat</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-emerald-500/10 text-white/70 hover:text-emerald-400 text-sm transition-all duration-200"
              >
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* View site */}
        <div className="glass-card rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-white font-medium text-sm">Lihat Website</p>
            <p className="text-white/40 text-xs">Cek tampilan publik website</p>
          </div>
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-sm hover:bg-emerald-500/20 transition-colors"
          >
            <ExternalLink size={14} />
            <span>Buka</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
