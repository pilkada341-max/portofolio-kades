"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Archive, Clock, Filter, Eye, EyeOff } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { createClient } from "@/lib/supabase/client";
import { cn, formatDate } from "@/lib/utils";
import type { Aspiration, AspirationStatus } from "@/types/database";

const statusConfig: Record<AspirationStatus, { label: string; color: string; style?: React.CSSProperties; icon: React.ReactNode }> = {
  pending: { label: "Menunggu", color: "", style: { color: "#fbbf24", backgroundColor: "rgba(245,158,11,0.1)" }, icon: <Clock size={12} /> },
  reviewed: { label: "Ditinjau", color: "text-emerald-400 bg-emerald-500/10", icon: <CheckCircle2 size={12} /> },
  archived: { label: "Diarsipkan", color: "text-white/40 bg-white/5", icon: <Archive size={12} /> },
};

export default function AdminAspirasiPage() {
  const [aspirations, setAspirations] = useState<Aspiration[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<AspirationStatus | "all">("all");
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.push("/admin/login");
    });
    fetchAspirations();
  }, [router]);

  const fetchAspirations = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("aspirations")
      .select("*")
      .order("created_at", { ascending: false });
    setAspirations(data || []);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: AspirationStatus) => {
    const supabase = createClient();
    await supabase.from("aspirations").update({ status }).eq("id", id);
    setAspirations((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  };

  const togglePublic = async (id: string, current: boolean) => {
    const supabase = createClient();
    await supabase.from("aspirations").update({ is_public: !current }).eq("id", id);
    setAspirations((prev) =>
      prev.map((a) => (a.id === id ? { ...a, is_public: !current } : a))
    );
  };

  const filtered =
    filterStatus === "all"
      ? aspirations
      : aspirations.filter((a) => a.status === filterStatus);

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#07070a" }}>
      <AdminSidebar />

      <main className="flex-1 p-6 lg:p-8 mt-14 lg:mt-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="section-label mb-2">Moderasi</div>
            <h1 className="text-white font-display font-black text-2xl uppercase">Aspirasi Masyarakat</h1>
            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
              <span style={{ color: "#e63946" }}>
                {aspirations.filter((a) => a.status === "pending").length}
              </span>{" "}
              aspirasi menunggu moderasi
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <Filter size={13} style={{ color: "rgba(255,255,255,0.3)" }} />
          {(["all", "pending", "reviewed", "archived"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all rounded"
              style={
                filterStatus === status
                  ? { background: "#e63946", color: "#fff" }
                  : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.45)" }
              }
            >
              {status === "all" ? "Semua" : statusConfig[status].label}
              {status !== "all" && (
                <span className="ml-1.5 opacity-60">
                  ({aspirations.filter((a) => a.status === status).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* List */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "rgba(230,57,70,0.3)", borderTopColor: "#e63946" }} />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20" style={{ color: "rgba(255,255,255,0.25)" }}>
            <p>Belum ada aspirasi.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((asp) => (
              <div key={asp.id} className="p-5 relative" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "0.5rem" }}>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-white font-semibold text-sm">{asp.name}</span>
                    <span className="px-2 py-0.5 text-xs capitalize" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.45)", borderRadius: "0.25rem" }}>
                      {asp.category}
                    </span>
                    <span className={cn("flex items-center gap-1 px-2 py-0.5 text-xs rounded", statusConfig[asp.status].color)} style={statusConfig[asp.status].style}>
                      {statusConfig[asp.status].icon}
                      {statusConfig[asp.status].label}
                    </span>
                  </div>
                  <span className="text-xs shrink-0" style={{ color: "rgba(255,255,255,0.25)" }}>
                    {new Date(asp.created_at).toLocaleDateString("id-ID")}
                  </span>
                </div>

                <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.65)" }}>{asp.message}</p>

                <div className="flex items-center gap-2 flex-wrap">
                  {asp.status !== "reviewed" && (
                    <button
                      onClick={() => updateStatus(asp.id, "reviewed")}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors"
                      style={{ background: "rgba(52,211,153,0.1)", color: "#34d399" }}
                    >
                      <CheckCircle2 size={12} />Tandai Ditinjau
                    </button>
                  )}
                  {asp.status !== "archived" && (
                    <button
                      onClick={() => updateStatus(asp.id, "archived")}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors"
                      style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)" }}
                    >
                      <Archive size={12} />Arsipkan
                    </button>
                  )}
                  {asp.status !== "pending" && (
                    <button
                      onClick={() => updateStatus(asp.id, "pending")}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-colors"
                      style={{ backgroundColor: "rgba(245,158,11,0.1)", color: "#fbbf24" }}
                    >
                      <Clock size={12} />Set Pending
                    </button>
                  )}
                  <button
                    onClick={() => togglePublic(asp.id, asp.is_public)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-colors"
                    style={asp.is_public
                      ? { background: "rgba(96,165,250,0.1)", color: "#60a5fa" }
                      : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)" }}
                  >
                    {asp.is_public ? <Eye size={12} /> : <EyeOff size={12} />}
                    {asp.is_public ? "Publik" : "Privat"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
