import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ProfileSection from "@/components/sections/ProfileSection";
import TimelineSection from "@/components/sections/TimelineSection";
import VisionMissionSection from "@/components/sections/VisionMissionSection";
import ThreePillarsSection from "@/components/sections/ThreePillarsSection";
import ProgramsSection from "@/components/sections/ProgramsSection";
import ServiceStepsSection from "@/components/sections/ServiceStepsSection";
import TransparencySection from "@/components/sections/TransparencySection";
import GallerySection from "@/components/sections/GallerySection";
import QuoteSection from "@/components/sections/QuoteSection";
import AspirationSection from "@/components/sections/AspirationSection";
import ContactSection from "@/components/sections/ContactSection";
import FinalCTASection from "@/components/sections/FinalCTASection";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import type {
  Candidate,
  Vision,
  Mission,
  Program,
  Timeline,
  Gallery,
  Budget,
} from "@/types/database";

async function getData() {
  const supabase = await createClient();

  const [
    candidateRes,
    visionRes,
    missionsRes,
    programsRes,
    timelinesRes,
    galleryRes,
    budgetRes,
  ] = await Promise.all([
    supabase.from("candidates").select("*").limit(1).single(),
    supabase.from("vision").select("*").limit(1).single(),
    supabase.from("missions").select("*").order("order_number"),
    supabase.from("programs").select("*").order("order_number"),
    supabase.from("timelines").select("*").order("order_number"),
    supabase.from("gallery").select("*").order("order_number").limit(30),
    supabase
      .from("budget")
      .select(
        "*, allocations:budget_allocations(*), documents:budget_documents(*)"
      )
      .order("year", { ascending: false })
      .limit(1)
      .single(),
  ]);

  return {
    candidate: candidateRes.data as Candidate | null,
    vision: visionRes.data as Vision | null,
    missions: (missionsRes.data || []) as Mission[],
    programs: (programsRes.data || []) as Program[],
    timelines: (timelinesRes.data || []) as Timeline[],
    gallery: (galleryRes.data || []) as Gallery[],
    budget: budgetRes.data as Budget | null,
  };
}

const defaultCandidate: Candidate = {
  id: "placeholder",
  name: process.env.NEXT_PUBLIC_CANDIDATE_NAME || "[Nama Calon]",
  village_name: process.env.NEXT_PUBLIC_VILLAGE_NAME || "[Nama Desa]",
  birth_place: "[Tempat Lahir]",
  birth_date: "1985-01-01",
  photo_url: null,
  bio: "Putra daerah yang telah lama mengabdi kepada masyarakat desa dengan penuh dedikasi dan komitmen untuk membawa perubahan nyata.",
  quote:
    '"Kepemimpinan bukan tentang berada di depan masyarakat, tetapi tentang berjalan bersama masyarakat."',
  education: [],
  experience: [],
  organization: [],
  social_activity: [],
  whatsapp: null,
  instagram: null,
  facebook: null,
  youtube: null,
  email: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export default async function HomePage() {
  const { candidate, vision, missions, programs, timelines, gallery, budget } =
    await getData();

  const candidateData = candidate || defaultCandidate;

  return (
    <SmoothScrollProvider>
      <main>
        <Navbar />

        {/* 1. Hero */}
        <HeroSection candidate={candidateData} />

        {/* 2. Profil */}
        <ProfileSection candidate={candidateData} />

        {/* 3. Timeline perjalanan */}
        {timelines.length > 0 && <TimelineSection timelines={timelines} />}

        {/* 4. Visi & Misi */}
        <VisionMissionSection vision={vision} missions={missions} />

        {/* 5. Tiga Pilar */}
        <ThreePillarsSection />

        {/* 6. Program Unggulan */}
        <ProgramsSection programs={programs} />

        {/* 7. Cara Kerja Layanan */}
        <ServiceStepsSection />

        {/* 8. Transparansi APBDes */}
        <TransparencySection budget={budget} />

        {/* 9. Galeri */}
        <GallerySection gallery={gallery} />

        {/* 10. Quote cinematic */}
        <QuoteSection candidate={candidateData} />

        {/* 11. Aspirasi */}
        <AspirationSection />

        {/* 12. Kontak */}
        <ContactSection candidate={candidateData} />

        {/* 13. Final CTA */}
        <FinalCTASection />

        <Footer
          candidateName={candidateData.name}
          villageName={candidateData.village_name}
          instagram={candidateData.instagram}
          facebook={candidateData.facebook}
          youtube={candidateData.youtube}
          whatsapp={candidateData.whatsapp}
          email={candidateData.email}
        />
      </main>
    </SmoothScrollProvider>
  );
}
