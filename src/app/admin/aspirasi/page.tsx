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
    <div className="flex min-h-screen" style={{ backgroundColor: "#050d07" }}>
      <AdminSidebar />

      <main className="flex-1 p-6 lg:p-8 mt-14 lg:mt-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-white font-display font-bold text-2xl">Aspirasi Masyarakat</h1>
            <p className="text-white/50 text-sm mt-1">
              {aspirations.filter((a) => a.status === "pending").length} aspirasi menunggu moderasi
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <Filter size={14} className="text-white/40" />
          {(["all", "pending", "reviewed", "archived"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                filterStatus === status
                  ? "bg-emerald-500 text-white"
                  : "bg-white/5 text-white/50 hover:text-white"
              )}
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
            <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-white/30">
            <p>Belum ada aspirasi.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((asp) => (
              <div key={asp.id} className="glass-card rounded-2xl p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-white font-medium text-sm">{asp.name}</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/5 text-white/50 text-xs capitalize">
                      {asp.category}
                    </span>
                    <span className={cn("flex items-center gap-1 px-2 py-0.5 rounded-full text-xs", statusConfig[asp.status].color)} style={statusConfig[asp.status].style}>
                      {statusConfig[asp.status].icon}
                      {statusConfig[asp.status].label}
                    </span>
                  </div>
                  <span className="text-white/30 text-xs shrink-0">
                    {new Date(asp.created_at).toLocaleDateString("id-ID")}
                  </span>
                </div>

                <p className="text-white/70 text-sm leading-relaxed mb-4">{asp.message}</p>

                <div className="flex items-center gap-2 flex-wrap">
                  {asp.status !== "reviewed" && (
                    <button
                      onClick={() => updateStatus(asp.id, "reviewed")}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs hover:bg-emerald-500/20 transition-colors"
                    >
                      <CheckCircle2 size={12} />
                      Tandai Ditinjau
                    </button>
                  )}
                  {asp.status !== "archived" && (
                    <button
                      onClick={() => updateStatus(asp.id, "archived")}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 text-white/40 rounded-lg text-xs hover:bg-white/10 transition-colors"
                    >
                      <Archive size={12} />
                      Arsipkan
                    </button>
                  )}
                  {asp.status !== "pending" && (
                    <button
                      onClick={() => updateStatus(asp.id, "pending")}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors"
                      style={{ backgroundColor: "rgba(245,158,11,0.1)", color: "#fbbf24" }}
                    >
                      <Clock size={12} />
                      Set Pending
                    </button>
                  )}
                  <button
                    onClick={() => togglePublic(asp.id, asp.is_public)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors",
                      asp.is_public
                        ? "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                        : "bg-white/5 text-white/40 hover:bg-white/10"
                    )}
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
