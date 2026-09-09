"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, Plus, Trash2 } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

interface Allocation {
  id?: string;
  category: string;
  amount: number;
  percentage: number;
  description: string;
}

export default function AdminAPBDesPage() {
  const [budgetId, setBudgetId] = useState<string | null>(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [totalIncome, setTotalIncome] = useState("");
  const [totalSpending, setTotalSpending] = useState("");
  const [source, setSource] = useState("APBDes Resmi");
  const [description, setDescription] = useState("");
  const [allocations, setAllocations] = useState<Allocation[]>([
    { category: "Pembangunan", amount: 0, percentage: 0, description: "" },
    { category: "Pemberdayaan", amount: 0, percentage: 0, description: "" },
    { category: "Pelayanan", amount: 0, percentage: 0, description: "" },
    { category: "Program Sosial", amount: 0, percentage: 0, description: "" },
  ]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.push("/admin/login");
    });

    supabase
      .from("budget")
      .select("*, allocations:budget_allocations(*)")
      .order("year", { ascending: false })
      .limit(1)
      .single()
      .then(({ data }) => {
        if (data) {
          setBudgetId(data.id);
          setYear(data.year);
          setTotalIncome(data.total_income.toString());
          setTotalSpending(data.total_spending.toString());
          setSource(data.source || "APBDes Resmi");
          setDescription(data.description || "");
          if (data.allocations && data.allocations.length > 0) {
            setAllocations(data.allocations);
          }
        }
        setLoading(false);
      });
  }, [router]);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    const supabase = createClient();

    const budgetPayload = {
      year,
      total_income: parseInt(totalIncome.replace(/\D/g, "")) || 0,
      total_spending: parseInt(totalSpending.replace(/\D/g, "")) || 0,
      source,
      description,
      updated_at: new Date().toISOString(),
    };

    let currentBudgetId = budgetId;

    if (budgetId) {
      await supabase.from("budget").update(budgetPayload).eq("id", budgetId);
      // Delete existing allocations and re-insert
      await supabase.from("budget_allocations").delete().eq("budget_id", budgetId);
    } else {
      const { data: newBudget } = await supabase.from("budget").insert([budgetPayload]).select().single();
      currentBudgetId = newBudget?.id || null;
      if (currentBudgetId) setBudgetId(currentBudgetId);
    }

    if (currentBudgetId && allocations.length > 0) {
      const allocationsPayload = allocations
        .filter((a) => a.category.trim())
        .map((a) => ({
          budget_id: currentBudgetId,
          category: a.category,
          amount: typeof a.amount === "string" ? parseInt((a.amount as string).replace(/\D/g, "")) || 0 : a.amount,
          percentage: parseFloat(a.percentage.toString()) || 0,
          description: a.description,
        }));

      if (allocationsPayload.length > 0) {
        await supabase.from("budget_allocations").insert(allocationsPayload);
      }
    }

    setSaving(false);
    setMessage({ type: "success", text: "Data APBDes berhasil disimpan!" });
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
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-white font-display font-bold text-2xl">Data APBDes</h1>
              <p className="text-white/50 text-sm mt-1">Input data anggaran desa resmi</p>
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl text-sm transition-colors disabled:opacity-50"
            >
              {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={16} />}
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

          <div className="glass-card rounded-2xl p-6 mb-6 space-y-4">
            <h2 className="text-white font-semibold mb-2">Informasi Umum</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-white/50 text-xs mb-1.5 block">Tahun Anggaran</label>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(parseInt(e.target.value))}
                  className="form-input-dark"
                  min="2020"
                  max="2030"
                />
              </div>
              <div>
                <label className="text-white/50 text-xs mb-1.5 block">Sumber Data</label>
                <input
                  type="text"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="form-input-dark"
                  placeholder="APBDes Resmi"
                />
              </div>
              <div>
                <label className="text-white/50 text-xs mb-1.5 block">Total Pendapatan (Rp)</label>
                <input
                  type="text"
                  value={totalIncome}
                  onChange={(e) => setTotalIncome(e.target.value)}
                  className="form-input-dark"
                  placeholder="Contoh: 1500000000"
                />
              </div>
              <div>
                <label className="text-white/50 text-xs mb-1.5 block">Total Belanja (Rp)</label>
                <input
                  type="text"
                  value={totalSpending}
                  onChange={(e) => setTotalSpending(e.target.value)}
                  className="form-input-dark"
                  placeholder="Contoh: 1400000000"
                />
              </div>
            </div>
            <div>
              <label className="text-white/50 text-xs mb-1.5 block">Keterangan</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-input-dark resize-none"
                placeholder="Keterangan singkat APBDes..."
              />
            </div>
          </div>

          {/* Allocations */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold">Alokasi Anggaran</h2>
              <button
                onClick={() => setAllocations((a) => [...a, { category: "", amount: 0, percentage: 0, description: "" }])}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs hover:bg-emerald-500/20 transition-colors"
              >
                <Plus size={12} />
                Tambah
              </button>
            </div>
            <div className="space-y-3">
              {allocations.map((alloc, i) => (
                <div key={i} className="border border-white/10 rounded-xl p-3 grid sm:grid-cols-4 gap-2 items-start">
                  <div>
                    <label className="text-white/30 text-xs mb-1 block">Kategori</label>
                    <input
                      type="text"
                      value={alloc.category}
                      onChange={(e) => {
                        const updated = [...allocations];
                        updated[i] = { ...updated[i], category: e.target.value };
                        setAllocations(updated);
                      }}
                      className="form-input-dark text-xs"
                      placeholder="Pembangunan"
                    />
                  </div>
                  <div>
                    <label className="text-white/30 text-xs mb-1 block">Jumlah (Rp)</label>
                    <input
                      type="text"
                      value={alloc.amount || ""}
                      onChange={(e) => {
                        const updated = [...allocations];
                        updated[i] = { ...updated[i], amount: e.target.value as unknown as number };
                        setAllocations(updated);
                      }}
                      className="form-input-dark text-xs"
                      placeholder="500000000"
                    />
                  </div>
                  <div>
                    <label className="text-white/30 text-xs mb-1 block">Persentase (%)</label>
                    <input
                      type="number"
                      value={alloc.percentage || ""}
                      onChange={(e) => {
                        const updated = [...allocations];
                        updated[i] = { ...updated[i], percentage: parseFloat(e.target.value) || 0 };
                        setAllocations(updated);
                      }}
                      className="form-input-dark text-xs"
                      placeholder="30"
                      min="0"
                      max="100"
                      step="0.01"
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <label className="text-white/30 text-xs mb-1 block">Keterangan</label>
                      <input
                        type="text"
                        value={alloc.description}
                        onChange={(e) => {
                          const updated = [...allocations];
                          updated[i] = { ...updated[i], description: e.target.value };
                          setAllocations(updated);
                        }}
                        className="form-input-dark text-xs"
                        placeholder="(opsional)"
                      />
                    </div>
                    <button
                      onClick={() => setAllocations((a) => a.filter((_, idx) => idx !== i))}
                      className="text-red-400/50 hover:text-red-400 transition-colors mb-3"
                      aria-label="Hapus"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-white/20 text-xs mt-4">
              ⚠️ Masukkan data berdasarkan dokumen APBDes resmi yang telah ditetapkan.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
