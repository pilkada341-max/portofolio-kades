import { MessageCircle, Share2, Video, Mail, MapPin, ExternalLink } from "lucide-react";
import type { Candidate } from "@/types/database";

interface ContactSectionProps {
  candidate: Candidate;
}

export default function ContactSection({ candidate }: ContactSectionProps) {
  const contacts = [
    {
      icon: <MessageCircle size={18} />,
      label: "WhatsApp",
      value: candidate.whatsapp,
      href: candidate.whatsapp ? `https://wa.me/${candidate.whatsapp.replace(/\D/g, "")}` : null,
      accent: "#25d366",
      accentBg: "rgba(37,211,102,0.08)",
      accentBorder: "rgba(37,211,102,0.2)",
    },
    {
      icon: <Share2 size={18} />,
      label: "Instagram",
      value: candidate.instagram,
      href: candidate.instagram ? `https://instagram.com/${candidate.instagram.replace("@", "")}` : null,
      accent: "#e1306c",
      accentBg: "rgba(225,48,108,0.08)",
      accentBorder: "rgba(225,48,108,0.2)",
    },
    {
      icon: <Share2 size={18} />,
      label: "Facebook",
      value: candidate.facebook,
      href: candidate.facebook
        ? candidate.facebook.startsWith("http") ? candidate.facebook : `https://facebook.com/${candidate.facebook}`
        : null,
      accent: "#1877f2",
      accentBg: "rgba(24,119,242,0.08)",
      accentBorder: "rgba(24,119,242,0.2)",
    },
    {
      icon: <Video size={18} />,
      label: "YouTube",
      value: candidate.youtube,
      href: candidate.youtube
        ? candidate.youtube.startsWith("http") ? candidate.youtube : `https://youtube.com/@${candidate.youtube}`
        : null,
      accent: "#ff0000",
      accentBg: "rgba(255,0,0,0.08)",
      accentBorder: "rgba(255,0,0,0.2)",
    },
    {
      icon: <Mail size={18} />,
      label: "Email",
      value: candidate.email,
      href: candidate.email ? `mailto:${candidate.email}` : null,
      accent: "#f59e0b",
      accentBg: "rgba(245,158,11,0.08)",
      accentBorder: "rgba(245,158,11,0.2)",
    },
  ].filter((c) => c.value);

  return (
    <section
      id="kontak"
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "#0d0d14" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(230,57,70,0.3), transparent)" }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="mb-14">
            <div className="section-label mb-3">Kontak</div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase">
              Mari <span className="gradient-text-red">Terhubung</span>
            </h2>
            <p className="mt-3 text-sm max-w-md" style={{ color: "rgba(255,255,255,0.45)" }}>
              Anda dapat menghubungi langsung melalui berbagai saluran komunikasi yang tersedia.
            </p>
          </div>

          {/* Contact cards */}
          {contacts.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-3">
              {contacts.map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href || "#"}
                  target={contact.href?.startsWith("http") ? "_blank" : undefined}
                  rel={contact.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 p-4 transition-all duration-300 group relative"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid rgba(255,255,255,0.08)`,
                    borderRadius: "0.375rem",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = contact.accentBorder;
                    (e.currentTarget as HTMLElement).style.background = contact.accentBg;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                  }}
                >
                  {/* Left accent strip */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: contact.accent }}
                  />
                  <div
                    className="w-10 h-10 rounded flex items-center justify-center shrink-0 transition-colors"
                    style={{ background: contact.accentBg, color: contact.accent, border: `1px solid ${contact.accentBorder}` }}
                  >
                    {contact.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>
                      {contact.label}
                    </p>
                    <p className="text-white font-semibold text-sm truncate mt-0.5">{contact.value}</p>
                  </div>
                  <ExternalLink size={13} className="shrink-0 transition-colors" style={{ color: "rgba(255,255,255,0.2)" }} />
                </a>
              ))}
            </div>
          ) : (
            <div
              className="text-center p-10 rounded"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <p className="text-white/35 text-sm">Informasi kontak belum tersedia.</p>
            </div>
          )}

          {/* Location */}
          <div
            className="mt-4 flex items-center gap-4 p-4 relative"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "0.375rem",
            }}
          >
            <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l" style={{ background: "#e63946" }} />
            <div
              className="w-10 h-10 rounded flex items-center justify-center shrink-0"
              style={{ background: "rgba(230,57,70,0.08)", color: "#e63946", border: "1px solid rgba(230,57,70,0.2)" }}
            >
              <MapPin size={18} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>Lokasi</p>
              <p className="text-white font-semibold text-sm mt-0.5">Desa {candidate.village_name}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
