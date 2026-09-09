-- =============================================
-- SCHEMA: Website Portofolio Calon Kepala Desa
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- TABLE: candidates
-- =============================================
CREATE TABLE IF NOT EXISTS candidates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL DEFAULT '[NAMA CALON]',
  village_name TEXT NOT NULL DEFAULT '[NAMA DESA]',
  birth_place TEXT NOT NULL DEFAULT '',
  birth_date DATE,
  photo_url TEXT,
  bio TEXT DEFAULT '',
  quote TEXT DEFAULT '"Kepemimpinan bukan tentang berada di depan masyarakat, tetapi tentang berjalan bersama masyarakat."',
  education JSONB DEFAULT '[]'::jsonb,
  experience JSONB DEFAULT '[]'::jsonb,
  organization JSONB DEFAULT '[]'::jsonb,
  social_activity JSONB DEFAULT '[]'::jsonb,
  whatsapp TEXT,
  instagram TEXT,
  facebook TEXT,
  youtube TEXT,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- TABLE: vision
-- =============================================
CREATE TABLE IF NOT EXISTS vision (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content TEXT NOT NULL DEFAULT '"Mewujudkan Desa yang maju, transparan, mandiri, dan sejahtera dengan pelayanan yang dekat dengan masyarakat."',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- TABLE: missions
-- =============================================
CREATE TABLE IF NOT EXISTS missions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number INTEGER NOT NULL DEFAULT 1,
  title TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'star',
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- TABLE: programs
-- =============================================
CREATE TABLE IF NOT EXISTS programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  tag TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL,
  problem TEXT NOT NULL DEFAULT '',
  solution TEXT NOT NULL DEFAULT '',
  how_it_works JSONB DEFAULT '[]'::jsonb,
  benefits JSONB DEFAULT '[]'::jsonb,
  target_beneficiary TEXT DEFAULT '',
  icon TEXT NOT NULL DEFAULT 'star',
  color TEXT NOT NULL DEFAULT 'emerald',
  image_url TEXT,
  order_number INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- TABLE: timelines
-- =============================================
CREATE TABLE IF NOT EXISTS timelines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  year TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  order_number INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- TABLE: gallery
-- =============================================
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_url TEXT NOT NULL,
  caption TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'dokumentasi',
  order_number INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- TABLE: aspirations
-- =============================================
CREATE TABLE IF NOT EXISTS aspirations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'lainnya',
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- TABLE: budget
-- =============================================
CREATE TABLE IF NOT EXISTS budget (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  year INTEGER NOT NULL,
  total_income BIGINT NOT NULL DEFAULT 0,
  total_spending BIGINT NOT NULL DEFAULT 0,
  description TEXT,
  source TEXT NOT NULL DEFAULT 'APBDes Resmi',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- TABLE: budget_allocations
-- =============================================
CREATE TABLE IF NOT EXISTS budget_allocations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  budget_id UUID NOT NULL REFERENCES budget(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  amount BIGINT NOT NULL DEFAULT 0,
  percentage NUMERIC(5,2) NOT NULL DEFAULT 0,
  description TEXT
);

-- =============================================
-- TABLE: budget_documents
-- =============================================
CREATE TABLE IF NOT EXISTS budget_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  budget_id UUID NOT NULL REFERENCES budget(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  file_url TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'pdf',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE vision ENABLE ROW LEVEL SECURITY;
ALTER TABLE missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE timelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE aspirations ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_allocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_documents ENABLE ROW LEVEL SECURITY;

-- =============================================
-- PUBLIC READ POLICIES (SELECT only)
-- =============================================
CREATE POLICY "Public read candidates"
  ON candidates FOR SELECT USING (true);

CREATE POLICY "Public read vision"
  ON vision FOR SELECT USING (true);

CREATE POLICY "Public read missions"
  ON missions FOR SELECT USING (true);

CREATE POLICY "Public read programs"
  ON programs FOR SELECT USING (true);

CREATE POLICY "Public read timelines"
  ON timelines FOR SELECT USING (true);

CREATE POLICY "Public read gallery"
  ON gallery FOR SELECT USING (true);

CREATE POLICY "Public read budget"
  ON budget FOR SELECT USING (true);

CREATE POLICY "Public read budget_allocations"
  ON budget_allocations FOR SELECT USING (true);

CREATE POLICY "Public read budget_documents"
  ON budget_documents FOR SELECT USING (true);

-- Aspirasi: hanya tampilkan yang sudah disetujui admin
CREATE POLICY "Public read public aspirations"
  ON aspirations FOR SELECT
  USING (is_public = true AND status = 'reviewed');

-- =============================================
-- PUBLIC INSERT POLICY (aspirasi saja)
-- WITH CHECK digunakan untuk INSERT, bukan USING
-- =============================================
CREATE POLICY "Anyone can insert aspirations"
  ON aspirations FOR INSERT
  WITH CHECK (true);

-- =============================================
-- ADMIN POLICIES — pisahkan SELECT, INSERT, UPDATE, DELETE
-- Karena FOR ALL dengan USING saja tidak valid untuk INSERT
-- =============================================

-- candidates
CREATE POLICY "Admin select candidates"
  ON candidates FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin insert candidates"
  ON candidates FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin update candidates"
  ON candidates FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin delete candidates"
  ON candidates FOR DELETE
  USING (auth.role() = 'authenticated');

-- vision
CREATE POLICY "Admin select vision"
  ON vision FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin insert vision"
  ON vision FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin update vision"
  ON vision FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin delete vision"
  ON vision FOR DELETE
  USING (auth.role() = 'authenticated');

-- missions
CREATE POLICY "Admin select missions"
  ON missions FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin insert missions"
  ON missions FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin update missions"
  ON missions FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin delete missions"
  ON missions FOR DELETE
  USING (auth.role() = 'authenticated');

-- programs
CREATE POLICY "Admin select programs"
  ON programs FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin insert programs"
  ON programs FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin update programs"
  ON programs FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin delete programs"
  ON programs FOR DELETE
  USING (auth.role() = 'authenticated');

-- timelines
CREATE POLICY "Admin select timelines"
  ON timelines FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin insert timelines"
  ON timelines FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin update timelines"
  ON timelines FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin delete timelines"
  ON timelines FOR DELETE
  USING (auth.role() = 'authenticated');

-- gallery
CREATE POLICY "Admin select gallery"
  ON gallery FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin insert gallery"
  ON gallery FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin update gallery"
  ON gallery FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin delete gallery"
  ON gallery FOR DELETE
  USING (auth.role() = 'authenticated');

-- aspirations
CREATE POLICY "Admin select aspirations"
  ON aspirations FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin insert aspirations"
  ON aspirations FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin update aspirations"
  ON aspirations FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin delete aspirations"
  ON aspirations FOR DELETE
  USING (auth.role() = 'authenticated');

-- budget
CREATE POLICY "Admin select budget"
  ON budget FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin insert budget"
  ON budget FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin update budget"
  ON budget FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin delete budget"
  ON budget FOR DELETE
  USING (auth.role() = 'authenticated');

-- budget_allocations
CREATE POLICY "Admin select budget_allocations"
  ON budget_allocations FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin insert budget_allocations"
  ON budget_allocations FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin update budget_allocations"
  ON budget_allocations FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin delete budget_allocations"
  ON budget_allocations FOR DELETE
  USING (auth.role() = 'authenticated');

-- budget_documents
CREATE POLICY "Admin select budget_documents"
  ON budget_documents FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin insert budget_documents"
  ON budget_documents FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin update budget_documents"
  ON budget_documents FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin delete budget_documents"
  ON budget_documents FOR DELETE
  USING (auth.role() = 'authenticated');

-- =============================================
-- STORAGE BUCKETS
-- =============================================
INSERT INTO storage.buckets (id, name, public)
  VALUES ('photos', 'photos', true)
  ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
  VALUES ('gallery', 'gallery', true)
  ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
  VALUES ('documents', 'documents', false)
  ON CONFLICT (id) DO NOTHING;

-- =============================================
-- STORAGE POLICIES
-- INSERT pada storage.objects harus pakai WITH CHECK
-- =============================================
CREATE POLICY "Public read photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'photos');

CREATE POLICY "Public read gallery"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'gallery');

CREATE POLICY "Admin insert photos"
  ON storage.objects FOR INSERT
  WITH CHECK (auth.role() = 'authenticated' AND bucket_id = 'photos');

CREATE POLICY "Admin insert gallery"
  ON storage.objects FOR INSERT
  WITH CHECK (auth.role() = 'authenticated' AND bucket_id = 'gallery');

CREATE POLICY "Admin select documents"
  ON storage.objects FOR SELECT
  USING (auth.role() = 'authenticated' AND bucket_id = 'documents');

CREATE POLICY "Admin insert documents"
  ON storage.objects FOR INSERT
  WITH CHECK (auth.role() = 'authenticated' AND bucket_id = 'documents');

CREATE POLICY "Admin update documents"
  ON storage.objects FOR UPDATE
  USING (auth.role() = 'authenticated' AND bucket_id = 'documents')
  WITH CHECK (auth.role() = 'authenticated' AND bucket_id = 'documents');

CREATE POLICY "Admin delete documents"
  ON storage.objects FOR DELETE
  USING (auth.role() = 'authenticated' AND bucket_id = 'documents');

-- Update & delete storage objects (photos & gallery) untuk admin
CREATE POLICY "Admin update photos"
  ON storage.objects FOR UPDATE
  USING (auth.role() = 'authenticated' AND bucket_id = 'photos')
  WITH CHECK (auth.role() = 'authenticated' AND bucket_id = 'photos');

CREATE POLICY "Admin delete photos"
  ON storage.objects FOR DELETE
  USING (auth.role() = 'authenticated' AND bucket_id = 'photos');

CREATE POLICY "Admin update gallery objects"
  ON storage.objects FOR UPDATE
  USING (auth.role() = 'authenticated' AND bucket_id = 'gallery')
  WITH CHECK (auth.role() = 'authenticated' AND bucket_id = 'gallery');

CREATE POLICY "Admin delete gallery objects"
  ON storage.objects FOR DELETE
  USING (auth.role() = 'authenticated' AND bucket_id = 'gallery');

-- =============================================
-- SEED DATA
-- =============================================

INSERT INTO candidates (name, village_name, birth_place, birth_date, bio, quote)
VALUES (
  '[NAMA CALON]',
  '[NAMA DESA]',
  '[TEMPAT LAHIR]',
  '1985-01-01',
  'Putra daerah yang telah lama mengabdi kepada masyarakat desa dengan penuh dedikasi dan komitmen.',
  '"Kepemimpinan bukan tentang berada di depan masyarakat, tetapi tentang berjalan bersama masyarakat."'
) ON CONFLICT DO NOTHING;

INSERT INTO vision (content)
VALUES (
  'Mewujudkan Desa [NAMA DESA] yang maju, transparan, mandiri, dan sejahtera dengan pelayanan yang dekat dengan masyarakat.'
) ON CONFLICT DO NOTHING;

INSERT INTO missions (order_number, title, icon, description) VALUES
  (1, 'Pelayanan',     'shield', 'Memberikan pelayanan desa yang cepat, mudah, gratis, dan dekat dengan masyarakat.'),
  (2, 'Pemuda',        'users',  'Membangun ruang bagi pemuda untuk berkembang, berdiskusi, berkreasi, dan menyampaikan aspirasi.'),
  (3, 'Transparansi',  'eye',    'Mendorong pemerintahan desa yang terbuka, amanah, dan dapat dipertanggungjawabkan.')
ON CONFLICT DO NOTHING;

INSERT INTO programs (
  slug, tag, title, subtitle, description,
  problem, solution, how_it_works, benefits,
  target_beneficiary, icon, color, order_number
) VALUES
(
  'pelayanan-gratis',
  'PELAYANAN DESA',
  'Pelayanan Desa Gratis & Cekatan',
  'Layanan administrasi desa yang mudah, cepat, dan tanpa biaya',
  'Program pelayanan administrasi desa yang modern, efisien, dan gratis untuk seluruh masyarakat. Dengan digitalisasi layanan, masyarakat tidak perlu antri lama dan dapat mengurus dokumen dari rumah.',
  'Masyarakat masih harus datang langsung ke kantor desa, menunggu lama, dan terkadang menghadapi proses yang berbelit-belit untuk urusan administrasi sederhana.',
  'Membangun sistem pelayanan terintegrasi yang dapat diakses secara digital maupun langsung, dengan standar pelayanan yang jelas dan waktu yang terukur.',
  '["Buka website atau datang ke kantor desa", "Pilih jenis layanan yang dibutuhkan", "Isi formulir secara online atau offline", "Upload dokumen persyaratan", "Verifikasi dan proses oleh petugas", "Surat/dokumen selesai dan dapat diambil"]',
  '["Hemat waktu dan biaya transportasi", "Layanan gratis tanpa pungutan", "Proses lebih cepat dan transparan", "Dapat dipantau secara real-time"]',
  'Seluruh masyarakat Desa [NAMA DESA]',
  'shield', 'emerald', 1
),
(
  'pemuda-berdaya',
  'PEMUDA & GENERASI MASA DEPAN',
  'Ruang Berpikir Pemuda',
  'Ruang bagi pemuda untuk berkembang, berkreasi, dan berinovasi',
  'Program pemberdayaan pemuda yang menyediakan ruang fisik dan digital untuk diskusi, kreativitas, pembelajaran, dan pengembangan potensi generasi muda desa.',
  'Pemuda desa seringkali tidak memiliki ruang yang cukup untuk mengembangkan potensi, menyampaikan aspirasi, dan berpartisipasi aktif dalam pembangunan desa.',
  'Membangun ruang komunitas pemuda yang inklusif sebagai tempat diskusi, pelatihan, dan pengembangan kreativitas yang dapat berkontribusi pada kemajuan desa.',
  '["Pembentukan komunitas pemuda aktif", "Penyediaan ruang diskusi dan kreativitas", "Program pelatihan dan pengembangan skill", "Platform digital untuk aspirasi pemuda", "Kegiatan sosial dan kemasyarakatan", "Dukungan untuk UMKM pemuda"]',
  '["Pemuda lebih aktif dalam pembangunan desa", "Tersedia ruang ekspresi dan kreativitas", "Peningkatan skill dan kompetensi", "Jaringan komunitas yang lebih kuat"]',
  'Pemuda Desa [NAMA DESA] usia 15-35 tahun',
  'users', 'gold', 2
),
(
  'desa-transparan',
  'TRANSPARANSI PEMERINTAHAN',
  'Desa Transparan & Amanah',
  'Pengelolaan desa yang terbuka, jelas, dan dapat dipertanggungjawabkan',
  'Program flagship transparansi yang membuka akses informasi pengelolaan APBDes dan program pembangunan kepada masyarakat sesuai data resmi dan mekanisme publikasi yang berlaku.',
  'Informasi pengelolaan anggaran dan program desa seringkali tidak mudah diakses oleh masyarakat umum, menimbulkan kesenjangan informasi antara pemerintah desa dan warganya.',
  'Membangun sistem publikasi informasi desa yang komprehensif, dapat diakses oleh siapa saja, dan terus diperbarui secara berkala sesuai sumber data resmi.',
  '["Publikasi APBDes secara real-time di website", "Laporan realisasi program setiap periode", "Dokumentasi kegiatan pembangunan", "Forum aspirasi dan pengaduan masyarakat", "Laporan pertanggungjawaban tahunan"]',
  '["Masyarakat dapat memantau penggunaan anggaran", "Meningkatnya kepercayaan terhadap pemerintah desa", "Akuntabilitas program lebih terukur", "Partisipasi masyarakat dalam pengawasan meningkat"]',
  'Seluruh masyarakat Desa [NAMA DESA]',
  'eye', 'blue', 3
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO timelines (year, title, description, order_number) VALUES
  ('2010', 'Pendidikan',              'Menyelesaikan pendidikan formal dengan prestasi akademik yang baik.', 1),
  ('2015', 'Pengalaman Organisasi',   'Aktif dalam berbagai organisasi kemasyarakatan di tingkat desa dan kecamatan.', 2),
  ('2018', 'Kegiatan Masyarakat',     'Terlibat langsung dalam berbagai kegiatan sosial dan pemberdayaan masyarakat.', 3),
  ('2022', 'Pengabdian Desa',         'Mengabdi dan berkontribusi aktif dalam pembangunan desa.', 4),
  ('2026', 'Maju Sebagai Calon Kepala Desa', 'Dengan dukungan masyarakat, maju sebagai calon kepala desa untuk membawa perubahan nyata.', 5)
ON CONFLICT DO NOTHING;
