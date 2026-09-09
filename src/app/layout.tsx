import type { Metadata, Viewport } from "next";
import "./globals.css";

const candidateName = process.env.NEXT_PUBLIC_CANDIDATE_NAME || "[Nama Calon]";
const villageName = process.env.NEXT_PUBLIC_VILLAGE_NAME || "[Nama Desa]";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000";

export const metadata: Metadata = {
  title: `${candidateName} — Calon Kepala Desa ${villageName}`,
  description: `Profil, visi, misi, dan program unggulan ${candidateName} untuk Desa ${villageName}. Melayani Lebih Dekat, Membangun Lebih Hebat.`,
  keywords: [
    candidateName,
    villageName,
    "calon kepala desa",
    "pilkades",
    "visi misi",
    "program desa",
    "transparansi desa",
    "pelayanan desa",
    "pemuda desa",
  ],
  authors: [{ name: candidateName }],
  creator: candidateName,
  openGraph: {
    title: `${candidateName} — Calon Kepala Desa ${villageName}`,
    description: `Profil, visi, misi, dan program unggulan ${candidateName} untuk Desa ${villageName}.`,
    url: siteUrl,
    siteName: `${candidateName} for ${villageName}`,
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${candidateName} — Calon Kepala Desa ${villageName}`,
    description: `Melayani Lebih Dekat, Membangun Lebih Hebat.`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  metadataBase: new URL(siteUrl),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#059669",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Sora:wght@100..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
