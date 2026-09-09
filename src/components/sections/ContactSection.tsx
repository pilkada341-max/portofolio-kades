import { MessageCircle, Share2, Video, Mail, MapPin, ExternalLink } from "lucide-react";
import type { Candidate } from "@/types/database";

interface ContactSectionProps {
  candidate: Candidate;
}

export default function ContactSection({ candidate }: ContactSectionProps) {
  const contacts = [
    {
      icon: <MessageCircle size={20} />,
      label: "WhatsApp",
      value: candidate.whatsapp,
      href: candidate.whatsapp ? `https://wa.me/${candidate.whatsapp.replace(/\D/g, "")}` : null,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      icon: <Share2 size={20} />,
      label: "Instagram",
      value: candidate.instagram,
      href: candidate.instagram ? `https://instagram.com/${candidate.instagram.replace("@", "")}` : null,
      color: "text-pink-400",
      bg: "bg-pink-500/10",
    },
    {
      icon: <Share2 size={20} />,
      label: "Facebook",
      value: candidate.facebook,
      href: candidate.facebook
        ? candidate.facebook.startsWith("http")
          ? candidate.facebook
          : `https://facebook.com/${candidate.facebook}`
        : null,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      icon: <Video size={20} />,
      label: "YouTube",
      value: candidate.youtube,
      href: candidate.youtube
        ? candidate.youtube.startsWith("http")
          ? candidate.youtube
          : `https://youtube.com/@${candidate.youtube}`
        : null,
      color: "text-red-400",
      bg: "bg-red-500/10",
    },
    {
      icon: <Mail size={20} />,
      label: "Email",
      value: candidate.email,
      href: candidate.email ? `mailto:${candidate.email}` : null,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
  ].filter((c) => c.value);

  return (
    <section id="kontak" className="section-padding relative overflow-hidden" style={{ backgroundColor: "#050d07" }}>
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(16,185,129,0.3), transparent)" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <span className="inline-block text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-3">
              Kontak
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
              Mari <span className="gradient-text-emerald">Terhubung</span>
            </h2>
            <p className="text-white/50 mt-3 text-sm max-w-md mx-auto">
              Anda dapat menghubungi langsung melalui berbagai saluran komunikasi yang tersedia.
            </p>
          </div>

          {/* Contact cards */}
          {contacts.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {contacts.map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href || "#"}
                  target={contact.href?.startsWith("http") ? "_blank" : undefined}
                  rel={contact.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="glass-card rounded-2xl p-5 flex items-center gap-4 hover:border-emerald-500/30 transition-all duration-300 group hover:-translate-y-0.5"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${contact.bg} ${contact.color}`}>
                    {contact.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/40 text-xs uppercase tracking-wider">{contact.label}</p>
                    <p className="text-white font-medium text-sm truncate mt-0.5">{contact.value}</p>
                  </div>
                  <ExternalLink size={14} className="text-white/20 group-hover:text-white/50 transition-colors shrink-0" />
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center glass-card rounded-2xl p-10">
              <p className="text-white/40 text-sm">Informasi kontak belum tersedia.</p>
            </div>
          )}

          {/* Location */}
          <div className="mt-6 glass-card rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wider">Lokasi</p>
              <p className="text-white font-medium text-sm mt-0.5">
                Desa {candidate.village_name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
