"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  User,
  Eye,
  Award,
  Image,
  MessageSquare,
  DollarSign,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
  Clock,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin",           label: "Dashboard",    icon: <LayoutDashboard size={16} /> },
  { href: "/admin/profil",    label: "Profil Calon", icon: <User size={16} /> },
  { href: "/admin/visi-misi", label: "Visi & Misi",  icon: <Eye size={16} /> },
  { href: "/admin/program",   label: "Program",      icon: <Award size={16} /> },
  { href: "/admin/timeline",  label: "Timeline",     icon: <Clock size={16} /> },
  { href: "/admin/galeri",    label: "Galeri",       icon: <Image size={16} /> },
  { href: "/admin/aspirasi",  label: "Aspirasi",     icon: <MessageSquare size={16} /> },
  { href: "/admin/apbdes",    label: "APBDes",       icon: <DollarSign size={16} /> },
];

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div
        className="px-5 py-5 relative"
        style={{ borderBottom: "1px solid rgba(230,57,70,0.15)" }}
      >
        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: "#e63946" }} />
        <div className="flex items-center gap-3">
          {/* Diamond logo */}
          <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
            <div
              className="absolute inset-0 rotate-45"
              style={{ border: "1.5px solid #e63946", borderRadius: "0.15rem" }}
            />
            <span className="font-display font-black text-xs relative z-10" style={{ color: "#e63946" }}>
              A
            </span>
          </div>
          <div>
            <p className="text-white font-bold text-sm uppercase tracking-wider">Admin Panel</p>
            <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.3)" }}>Portofolio Kades</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-all duration-200 relative",
                isActive ? "text-white" : "text-white/45 hover:text-white/75"
              )}
              style={{
                background: isActive ? "rgba(230,57,70,0.1)" : "transparent",
                borderLeft: isActive ? "2px solid #e63946" : "2px solid transparent",
                borderRadius: "0 0.375rem 0.375rem 0",
              }}
            >
              <span style={{ color: isActive ? "#e63946" : "inherit" }}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-all duration-200 text-white/40 hover:text-red-400 rounded"
          style={{ background: "transparent" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(230,57,70,0.08)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
        >
          <LogOut size={16} />
          <span>Keluar</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex flex-col w-56 min-h-screen sticky top-0"
        style={{
          backgroundColor: "#0d0d14",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div
        className="lg:hidden fixed top-0 left-0 right-0 z-40 px-4 py-3 flex items-center justify-between"
        style={{
          backgroundColor: "rgba(13,13,20,0.95)",
          borderBottom: "1px solid rgba(230,57,70,0.15)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <div className="relative w-7 h-7 flex items-center justify-center">
            <div className="absolute inset-0 rotate-45" style={{ border: "1.5px solid #e63946", borderRadius: "0.15rem" }} />
            <span className="font-display font-black text-xs relative z-10" style={{ color: "#e63946" }}>A</span>
          </div>
          <span className="text-white font-bold text-sm uppercase tracking-wider">Admin</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white p-1.5 rounded transition-colors hover:bg-white/10"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 z-30 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <aside
            className="lg:hidden fixed left-0 top-0 bottom-0 z-40 w-56"
            style={{
              backgroundColor: "#0d0d14",
              borderRight: "1px solid rgba(230,57,70,0.15)",
            }}
          >
            <SidebarContent />
          </aside>
        </>
      )}
    </>
  );
}
