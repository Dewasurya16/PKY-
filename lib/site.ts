export const site = {
  shortName: "BPKY",
  fullName: "Biro Pusat Kesehatan Yudikatif",
  institution: "Kejaksaan Republik Indonesia",
  tagline:
    "Membina dan mengelola layanan kesehatan aparatur kejaksaan secara profesional, modern, dan terpercaya",
  domain: "bpky.kejaksaan.go.id",
  address:
    "Jl. Sultan Hasanuddin No. 1, Kebayoran Baru, Jakarta Selatan 12160",
  phone: "(021) 739-7088",
  hotline: "0800-1-500-600",
  email: "bpky@kejaksaan.go.id",
};

export const navLinks = [
  { href: "/#beranda", label: "Beranda" },
  { href: "/#tentang", label: "Tentang" },
  { href: "/#layanan", label: "Layanan" },
  { href: "/#proses", label: "Alur Layanan" },
  { href: "/#tim", label: "Tim Medis" },
  { href: "/#berita", label: "Berita" },
  { href: "/#faq", label: "FAQ" },
];

export const stats = [
  { value: 12500, suffix: "+", label: "Aparatur Dilayani" },
  { value: 98, suffix: "%", label: "Tingkat Kepuasan" },
  { value: 34, suffix: "", label: "Provinsi Terjangkau" },
  { value: 156, suffix: "", label: "Tenaga Medis Profesional" },
];

export const profileTabs = [
  {
    label: "Tugas & Fungsi",
    body: [
      "Membina, mengawasi, dan mengelola penyelenggaraan fasilitas kesehatan (Klinik dan Rumah Sakit Adhyaksa) bagi aparatur di lingkungan Kejaksaan RI.",
      "Melakukan standarisasi pemeriksaan kesehatan berkala (MCU) serta penilaian kelayakan kesehatan untuk penempatan jabatan.",
      "Merumuskan kebijakan program kesehatan kerja, distribusi obat, dan pembinaan K3 di seluruh fasilitas kesehatan kejaksaan nasional.",
    ],
  },
  {
    label: "Visi & Misi",
    body: [
      "Visi: Menjadi pusat biro terdepan yang profesional dalam membina klinik dan rumah sakit untuk menjamin kesehatan aparatur kejaksaan.",
      "Misi: Menyelenggarakan pengawasan dan standarisasi layanan kesehatan berstandar tinggi di seluruh Klinik dan RS Adhyaksa.",
      "Misi: Memastikan ketersediaan obat, alat medis, serta SDM kesehatan yang kompeten di setiap satuan kerja kejaksaan.",
    ],
  },
  {
    label: "Dasar Hukum",
    body: [
      "Peraturan Jaksa Agung tentang Organisasi dan Tata Kerja Kejaksaan Republik Indonesia, yang mengatur kedudukan Biro Kesehatan.",
      "Undang-Undang tentang Kesehatan dan Keselamatan Kerja (K3) sebagai landasan penyelenggaraan pelayanan kesehatan aparatur.",
      "Peraturan Pemerintah tentang Manajemen ASN, khususnya terkait persyaratan kesehatan jabatan dan pemeriksaan berkala.",
    ],
  },
];

export const services = [
  {
    icon: "Stethoscope",
    title: "Pemeriksaan Kesehatan Berkala",
    description:
      "Pelaksanaan medical check-up komprehensif bagi aparatur kejaksaan di seluruh Klinik Adhyaksa secara rutin.",
    color: "teal",
  },
  {
    icon: "HeartPulse",
    title: "Konsultasi Medis Online",
    description:
      "Layanan telemedicine dan konsultasi kesehatan daring dengan tenaga medis profesional kapan saja.",
    color: "rose",
  },
  {
    icon: "Pill",
    title: "Distribusi Obat & Alkes",
    description:
      "Penyediaan dan pendistribusian obat-obatan serta alkes ke seluruh Klinik dan RS Adhyaksa di Indonesia.",
    color: "amber",
  },
  {
    icon: "Activity",
    title: "Program Kesehatan Kerja",
    description:
      "Promosi kesehatan, pencegahan penyakit akibat kerja, dan pembinaan K3 di lingkungan kejaksaan.",
    color: "blue",
  },
  {
    icon: "ClipboardCheck",
    title: "Penilaian Kelayakan Kesehatan",
    description:
      "Evaluasi kondisi kesehatan untuk penempatan jabatan, promosi, dan persiapan pensiun aparatur.",
    color: "purple",
  },
  {
    icon: "Ambulance",
    title: "Pengelolaan RS Adhyaksa",
    description:
      "Pembinaan dan pengembangan Rumah Sakit Adhyaksa sebagai pusat rujukan utama bagi aparatur kejaksaan.",
    color: "emerald",
  },
];

export const processSteps = [
  {
    title: "Standarisasi Mutu",
    description:
      "Menetapkan standar operasional pelayanan yang ketat di seluruh Klinik dan RS Adhyaksa.",
  },
  {
    title: "Pengawasan Layanan",
    description:
      "Memastikan fasilitas kesehatan beroperasi sesuai dengan regulasi dan protokol medis terkini.",
  },
  {
    title: "Sertifikasi Tenaga Medis",
    description:
      "Melakukan verifikasi kompetensi dan kelayakan praktik bagi seluruh staf medis di lingkungan kejaksaan.",
  },
  {
    title: "Evaluasi Berkala",
    description:
      "Melakukan penilaian rutin untuk terus meningkatkan kualitas dan responsivitas fasilitas kesehatan aparatur.",
  },
];

export const orgMembers = [
  {
    name: "dr. Ratna Dewi Kusumawardani, Sp.PD., M.Kes.",
    role: "Kepala Biro Kesehatan Yudikatif",
  },
  {
    name: "dr. Arief Budiman, Sp.OG.",
    role: "Wakil Kepala Bidang Rumah Sakit Adhyaksa",
  },
  {
    name: "drg. Sinta Maharani, M.M.",
    role: "Koordinator Kesehatan Gigi & Mulut",
  },
  {
    name: "dr. Hendra Pratama, Sp.KJ.",
    role: "Koordinator Kesehatan Mental & Psikologi",
  },
  {
    name: "Apt. Dian Puspitasari, M.Farm.",
    role: "Koordinator Farmasi & Distribusi Obat",
  },
  {
    name: "dr. Bagas Nugroho, Sp.KK.",
    role: "Koordinator Kesehatan Kerja & K3",
  },
];

export const newsItems = [
  {
    slug: "jadwal-mcu-semester-2-2026",
    date: "20 Jun 2026",
    category: "Pengumuman",
    image: "/image/news_mcu.png",
    title: "Jadwal MCU Semester II 2026 telah diterbitkan untuk seluruh satker",
    excerpt:
      "Pemeriksaan kesehatan berkala semester kedua akan dimulai Juli 2026 dengan cakupan 34 provinsi secara bertahap.",
    content: "Biro Pusat Kesehatan Yudikatif (BPKY) Kejaksaan Republik Indonesia mengumumkan bahwa jadwal Medical Check Up (MCU) Semester II Tahun 2026 telah resmi diterbitkan. Pelaksanaan MCU ini merupakan bagian dari komitmen institusi untuk memastikan kesehatan optimal bagi seluruh aparatur negara di bawah Kejaksaan RI.\n\nPemeriksaan kesehatan ini akan dimulai pada awal bulan Juli 2026 dan dilaksanakan secara bertahap mencakup 34 provinsi di seluruh Indonesia. BPKY telah mengkoordinasikan kesiapan fasilitas di berbagai Rumah Sakit Adhyaksa dan Klinik Utama Adhyaksa di tingkat daerah.\n\nPara aparatur diimbau untuk segera mengecek jadwal spesifik di satuan kerja masing-masing dan melakukan konfirmasi kehadiran melalui portal daring BPKY."
  },
  {
    slug: "telemedicine-bpky-24-jam",
    date: "15 Jun 2026",
    category: "Layanan",
    image: "/image/news_tele.png",
    title: "Layanan telemedicine BPKY kini tersedia 24 jam via aplikasi mobile",
    excerpt:
      "Aparatur kejaksaan dapat berkonsultasi dengan dokter kapan saja melalui fitur video call di aplikasi BPKY Mobile.",
    content: "Dalam upaya memberikan pelayanan kesehatan yang responsif dan inklusif, BPKY secara resmi mengumumkan pembaruan pada fitur aplikasi BPKY Mobile. Kini, layanan Telemedicine tersedia selama 24 jam penuh setiap harinya.\n\nPembaruan ini memungkinkan aparatur Kejaksaan untuk melakukan konsultasi medis darurat maupun non-darurat dengan dokter umum yang bertugas kapan saja, langsung melalui fitur Video Call terenkripsi.\n\nSelain itu, hasil konsultasi dan resep elektronik akan terintegrasi langsung ke dalam Rekam Medis Elektronik (RME) pasien, yang dapat diakses di seluruh jaringan Fasilitas Kesehatan Adhyaksa di Indonesia."
  },
  {
    slug: "webinar-kesehatan-mental",
    date: "02 Jun 2026",
    category: "Edukasi",
    image: "/image/news_webinar.png",
    title: "Webinar kesehatan mental: mengelola stres di lingkungan kerja hukum",
    excerpt:
      "Program edukasi bulanan menghadirkan psikolog profesional untuk membahas kesehatan mental aparatur kejaksaan.",
    content: "Sebagai aparatur penegak hukum, tekanan dan tantangan pekerjaan sehari-hari seringkali memicu beban mental yang signifikan. Mengingat pentingnya keseimbangan emosional, BPKY akan kembali menggelar Webinar Edukasi Kesehatan Mental bertajuk 'Mengelola Stres di Lingkungan Kerja Hukum'.\n\nAcara yang akan diselenggarakan secara virtual ini mengundang beberapa Psikolog Klinis terkemuka yang tergabung dalam tim Konsultasi Psikologi BPKY. Sesi ini akan membahas mengenai metode deteksi dini kelelahan mental (burnout), teknik relaksasi singkat, hingga bagaimana mencari bantuan profesional secara rahasia melalui fasilitas BPKY.\n\nWebinar terbuka bagi seluruh aparatur Kejaksaan beserta keluarga inti. Link pendaftaran dapat diakses melalui portal utama BPKY."
  },
];

export const facilitiesData = [
  {
    slug: "rsu-adhyaksa-ceger",
    name: "RSU Adhyaksa Ceger",
    type: "Rumah Sakit Umum",
    address: "Jl. Hankam Raya Ceger, Jakarta Timur",
    status: "Akreditasi Paripurna",
    contact: "(021) 8459-2511",
    available: true,
    description: "Rumah Sakit Umum Adhyaksa Ceger merupakan rumah sakit rujukan utama dengan fasilitas dan tenaga medis yang lengkap untuk melayani aparatur kejaksaan serta masyarakat umum di wilayah ibu kota dan sekitarnya.",
    services: ["IGD 24 Jam", "Rawat Inap", "Rawat Jalan (Poliklinik)", "ICU/NICU", "Laboratorium Lengkap", "Radiologi", "Rehabilitasi Medik"]
  },
  {
    slug: "klinik-adhyaksa-banten",
    name: "Klinik Adhyaksa Banten",
    type: "Klinik Pratama",
    address: "Jl. Raya Serang-Pandeglang, Serang, Banten",
    status: "Akreditasi Utama",
    contact: "(0254) 200-123",
    available: true,
    description: "Klinik Pratama Adhyaksa Banten memberikan pelayanan kesehatan tingkat pertama yang difokuskan pada upaya preventif, kuratif, dan rehabilitatif bagi aparatur kejaksaan di wilayah Banten.",
    services: ["Pemeriksaan Umum", "Pemeriksaan Gigi", "Laboratorium Dasar", "Farmasi", "Konsultasi Kesehatan Kerja"]
  },
  {
    slug: "rs-adhyaksa-surabaya",
    name: "RS Adhyaksa Surabaya",
    type: "Rumah Sakit Khusus",
    address: "Jl. Kejati Jatim, Surabaya",
    status: "Dalam Pembangunan",
    contact: "-",
    available: false,
    description: "Rumah Sakit Adhyaksa Surabaya sedang dalam tahap pembangunan dan direncanakan akan menjadi pusat rujukan kesehatan wilayah timur Indonesia.",
    services: []
  },
];

export const faqItems = [
  {
    question: "Apa peran BPKY dalam layanan kesehatan?",
    answer:
      "BPKY adalah biro pusat yang membawahi, mengelola, dan membina seluruh Klinik dan Rumah Sakit Adhyaksa yang melayani aparatur Kejaksaan Republik Indonesia.",
  },
  {
    question: "Bagaimana cara mendaftar pemeriksaan kesehatan berkala?",
    answer:
      "Pendaftaran MCU dapat dilakukan melalui portal daring BPKY, aplikasi BPKY Mobile, atau datang langsung ke Klinik Adhyaksa di masing-masing wilayah dengan membawa kartu identitas pegawai.",
  },
  {
    question: "Apakah tersedia layanan konsultasi dokter spesialis?",
    answer:
      "Ya, BPKY menyediakan layanan konsultasi dengan dokter spesialis melalui program telemedicine dan klinik langsung. Untuk spesialisasi tertentu, BPKY bekerja sama dengan rumah sakit mitra untuk rujukan.",
  },
  {
    question: "Apakah keluarga aparatur juga dilayani?",
    answer:
      "Saat ini layanan BPKY diutamakan untuk aparatur aktif. Untuk keluarga, tersedia program rujukan ke fasilitas kesehatan mitra dengan tarif khusus melalui koordinasi BPKY.",
  },
  {
    question: "Bagaimana prosedur rujukan ke rumah sakit?",
    answer:
      "Dokter BPKY akan memberikan surat rujukan resmi setelah konsultasi. Aparatur dapat memilih rumah sakit mitra yang tersedia di jaringan BPKY di seluruh Indonesia.",
  },
];
