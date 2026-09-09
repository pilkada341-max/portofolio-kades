export interface Candidate {
  id: string;
  name: string;
  village_name: string;
  birth_place: string;
  birth_date: string;
  photo_url: string | null;
  bio: string;
  quote: string;
  education: Education[];
  experience: Experience[];
  organization: Organization[];
  social_activity: SocialActivity[];
  whatsapp: string | null;
  instagram: string | null;
  facebook: string | null;
  youtube: string | null;
  email: string | null;
  created_at: string;
  updated_at: string;
}

export interface Education {
  year: string;
  institution: string;
  degree: string;
}

export interface Experience {
  year: string;
  title: string;
  organization: string;
  description: string;
}

export interface Organization {
  year: string;
  name: string;
  role: string;
}

export interface SocialActivity {
  year: string;
  title: string;
  description: string;
}

export interface Vision {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface Mission {
  id: string;
  order_number: number;
  title: string;
  icon: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface Program {
  id: string;
  slug: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  solution: string;
  how_it_works: string[];
  benefits: string[];
  target_beneficiary: string;
  icon: string;
  color: string;
  image_url: string | null;
  order_number: number;
  created_at: string;
  updated_at: string;
}

export interface Timeline {
  id: string;
  year: string;
  title: string;
  description: string;
  order_number: number;
  created_at: string;
}

export interface Gallery {
  id: string;
  image_url: string;
  caption: string;
  category: GalleryCategory;
  order_number: number;
  created_at: string;
}

export type GalleryCategory =
  | "semua"
  | "kegiatan"
  | "masyarakat"
  | "pemuda"
  | "sosial"
  | "lingkungan"
  | "dokumentasi";

export interface Aspiration {
  id: string;
  name: string;
  category: AspirationCategory;
  message: string;
  status: AspirationStatus;
  is_public: boolean;
  created_at: string;
}

export type AspirationCategory =
  | "infrastruktur"
  | "pelayanan"
  | "pemuda"
  | "umkm"
  | "pertanian"
  | "sosial"
  | "pendidikan"
  | "lainnya";

export type AspirationStatus = "pending" | "reviewed" | "archived";

export interface Budget {
  id: string;
  year: number;
  total_income: number;
  total_spending: number;
  description: string | null;
  source: string;
  updated_at: string;
  allocations: BudgetAllocation[];
  documents: BudgetDocument[];
}

export interface BudgetAllocation {
  id: string;
  budget_id: string;
  category: string;
  amount: number;
  percentage: number;
  description: string | null;
}

export interface BudgetDocument {
  id: string;
  budget_id: string;
  title: string;
  file_url: string;
  type: string;
  created_at: string;
}
