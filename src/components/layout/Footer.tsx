import { Share2, Video, MessageCircle, Mail, MapPin } from "lucide-react";

const navLinks = [
  { label: "Beranda",   href: "#beranda" },
  { label: "Profil",    href: "#profil" },
  { label: "Visi & Misi", href: "#visi-misi" },
  { label: "Program",   href: "#program" },
  { label: "Galeri",    href: "#galeri" },
  { label: "Aspirasi",  href: "#aspirasi" },
  { label: "Kontak",    href: "#kontak" },
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
    <footer
      style={{
        backgroundColor: "#07070a",
        borderTop: "1px solid rgba(230,57,70,0.15)",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            {/* Logo mark */}
            <div className="flex items-center gap-3 mb-5">
              <div
                className="relative w-9 h-9 flex items-center justify-center"
              >
                <div
                  className="absolute inset-0 rotate-45 border-2"
                  style={{ borderColor: "#e63946" }}
                />
                <span className="font-display font-black text-xs relative z-10" style={{ color: "#e63946" }}>
                  {candidateName[0]?.toUpperCase() || "K"}
                </span>
              </div>
              <span className="font-display font-black text-base text-white uppercase tracking-widest">
                {candidateName}
              </span>
            </div>

            <p className="text-white/35 text-xs uppercase tracking-widest mb-1 font-semibold">Calon Kepala Desa</p>
            <p className="font-bold text-sm uppercase tracking-widest mb-5" style={{ color: "#e63946" }}>
              {villageName}
            </p>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Melayani Lebih Dekat, Membangun Lebih Hebat. Bersama masyarakat
              membangun desa yang maju, transparan, dan sejahtera.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2 mt-6">
              {instagram && (
                <a
                  href={`https://instagram.com/${instagram.replace("@", "")}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded flex items-center justify-center transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(230,57,70,0.4)";
                    (e.currentTarget as HTMLElement).style.color = "#e63946";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)";
                  }}
                  aria-label="Instagram"
                >
                  <Share2 size={15} />
                </a>
              )}
              {facebook && (
                <a
                  href={facebook.startsWith("http") ? facebook : `https://facebook.com/${facebook}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded flex items-center justify-center transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(230,57,70,0.4)";
                    (e.currentTarget as HTMLElement).style.color = "#e63946";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)";
                  }}
                  aria-label="Facebook"
                >
                  <Share2 size={15} />
                </a>
              )}
              {youtube && (
                <a
                  href={youtube.startsWith("http") ? youtube : `https://youtube.com/@${youtube}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded flex items-center justify-center transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(230,57,70,0.4)";
                    (e.currentTarget as HTMLElement).style.color = "#e63946";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)";
                  }}
                  aria-label="YouTube"
                >
                  <Video size={15} />
                </a>
              )}
              {whatsapp && (
                <a
                  href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded flex items-center justify-center transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(230,57,70,0.4)";
                    (e.currentTarget as HTMLElement).style.color = "#e63946";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)";
                  }}
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={15} />
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="w-9 h-9 rounded flex items-center justify-center transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(230,57,70,0.4)";
                    (e.currentTarget as HTMLElement).style.color = "#e63946";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)";
                  }}
                  aria-label="Email"
                >
                  <Mail size={15} />
                </a>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-5" style={{ color: "rgba(255,255,255,0.25)" }}>
              Navigasi
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/45 hover:text-white text-sm font-medium transition-colors duration-200 uppercase tracking-wider text-xs"
                    style={{ letterSpacing: "0.1em" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-5" style={{ color: "rgba(255,255,255,0.25)" }}>
              Kontak
            </h3>
            <ul className="space-y-3">
              {whatsapp && (
                <li>
                  <a
                    href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/45 hover:text-white text-sm transition-colors duration-200"
                  >
                    <MessageCircle size={13} style={{ color: "#e63946" }} />
                    <span>{whatsapp}</span>
                  </a>
                </li>
              )}
              {email && (
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-2 text-white/45 hover:text-white text-sm transition-colors duration-200"
                  >
                    <Mail size={13} style={{ color: "#e63946" }} />
                    <span>{email}</span>
                  </a>
                </li>
              )}
              <li className="flex items-start gap-2 text-white/45 text-sm">
                <MapPin size={13} className="mt-0.5 shrink-0" style={{ color: "#e63946" }} />
                <span>Desa {villageName}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-white/25 text-xs font-medium">
            © 2026 {candidateName}. Semua informasi berdasarkan data resmi.
          </p>
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(230,57,70,0.35)" }}>
            Maju · Berdaya · Terbuka
          </p>
        </div>
      </div>
    </footer>
  );
}
