import Link from "next/link";
import { Leaf, Share2, Video, MessageCircle, Mail, MapPin } from "lucide-react";

const navLinks = [
  { label: "Beranda", href: "#beranda" },
  { label: "Profil", href: "#profil" },
  { label: "Visi & Misi", href: "#visi-misi" },
  { label: "Program", href: "#program" },
  { label: "Galeri", href: "#galeri" },
  { label: "Aspirasi", href: "#aspirasi" },
  { label: "Kontak", href: "#kontak" },
];

interface FooterProps {
  candidateName: string;
  villageName: string;
  instagram?: string | null;
  facebook?: string | null;
  youtube?: string | null;
  whatsapp?: string | null;
  email?: string | null;
}

export default function Footer({
  candidateName,
  villageName,
  instagram,
  facebook,
  youtube,
  whatsapp,
  email,
}: FooterProps) {
  return (
    <footer className="border-t text-white" style={{ backgroundColor: "#050d07", borderColor: "rgba(6,78,59,0.3)" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-emerald-500 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-lg">{candidateName}</span>
            </div>
            <p className="text-white/50 text-sm mb-2">Calon Kepala Desa</p>
            <p className="text-emerald-400 font-semibold mb-6">{villageName}</p>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Melayani Lebih Dekat, Membangun Lebih Hebat. Bersama masyarakat
              membangun desa yang maju, transparan, dan sejahtera.
            </p>

            {/* Social */}
            <div className="flex items-center gap-3 mt-6">
              {instagram && (
                <a
                  href={`https://instagram.com/${instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-emerald-500/20 flex items-center justify-center text-white/60 hover:text-emerald-400 transition-all duration-200"
                  aria-label="Instagram"
                >
                  <Share2 size={18} />
                </a>
              )}
              {facebook && (
                <a
                  href={facebook.startsWith("http") ? facebook : `https://facebook.com/${facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-emerald-500/20 flex items-center justify-center text-white/60 hover:text-emerald-400 transition-all duration-200"
                  aria-label="Facebook"
                >
                  <Share2 size={18} />
                </a>
              )}
              {youtube && (
                <a
                  href={youtube.startsWith("http") ? youtube : `https://youtube.com/@${youtube}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-emerald-500/20 flex items-center justify-center text-white/60 hover:text-emerald-400 transition-all duration-200"
                  aria-label="YouTube"
                >
                  <Video size={18} />
                </a>
              )}
              {whatsapp && (
                <a
                  href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-emerald-500/20 flex items-center justify-center text-white/60 hover:text-emerald-400 transition-all duration-200"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={18} />
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-emerald-500/20 flex items-center justify-center text-white/60 hover:text-emerald-400 transition-all duration-200"
                  aria-label="Email"
                >
                  <Mail size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">
              Navigasi
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-emerald-400 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">
              Kontak
            </h3>
            <ul className="space-y-3">
              {whatsapp && (
                <li>
                  <a
                    href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/60 hover:text-emerald-400 text-sm transition-colors duration-200"
                  >
                    <MessageCircle size={14} />
                    <span>{whatsapp}</span>
                  </a>
                </li>
              )}
              {email && (
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-2 text-white/60 hover:text-emerald-400 text-sm transition-colors duration-200"
                  >
                    <Mail size={14} />
                    <span>{email}</span>
                  </a>
                </li>
              )}
              <li className="flex items-start gap-2 text-white/60 text-sm">
                <MapPin size={14} className="mt-0.5 shrink-0" />
                <span>Desa {villageName}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © 2026 {candidateName}. Semua informasi berdasarkan data resmi.
          </p>
          <p className="text-white/30 text-xs">
            Desa Maju. Masyarakat Berdaya. Pemerintahan Terbuka.
          </p>
        </div>
      </div>
    </footer>
  );
}
