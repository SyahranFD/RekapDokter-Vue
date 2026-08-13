// ─── Istilah Medis ────────────────────────────────────────────────────────────
export const MEDICAL_TERMS = {
  'ISPA': 'Infeksi Saluran Pernapasan Atas — infeksi pada hidung, tenggorokan, atau sinus yang umum terjadi.',
  'Amoxicillin': 'Antibiotik untuk melawan infeksi bakteri. Harus diminum sampai habis meskipun sudah merasa membaik.',
  'Paracetamol': 'Obat pereda nyeri dan penurun demam yang aman untuk sebagian besar orang.',
  'Inflamasi': 'Peradangan — reaksi tubuh terhadap cedera atau infeksi, ditandai dengan kemerahan, bengkak, atau nyeri.',
  'Tensi': 'Tekanan darah — ukuran kekuatan darah saat mendorong dinding pembuluh darah.',
  'Hipertensi': 'Tekanan darah tinggi secara terus-menerus, dapat meningkatkan risiko penyakit jantung.',
  'Antibiotik': 'Obat yang digunakan untuk membunuh atau menghambat pertumbuhan bakteri penyebab infeksi.',
  'Nebulizer': 'Alat yang mengubah obat cair menjadi uap halus agar bisa dihirup langsung ke saluran pernapasan.',
  'Resep': 'Surat perintah dokter kepada apoteker untuk memberikan obat tertentu kepada pasien.',
  'Kontrol': 'Kunjungan ulang ke dokter untuk memantau perkembangan kondisi kesehatan Anda.',
  'faringitis akut': 'Peradangan akut pada faring (bagian belakang tenggorokan), sering ditandai nyeri menelan dan demam.',
}

// ─── Transcript Dummy ─────────────────────────────────────────────────────────
export const DUMMY_TRANSCRIPT = `Dokter: Selamat pagi, silakan duduk. Ada keluhan apa hari ini?

Pasien: Selamat pagi, Dokter. Sudah tiga hari saya batuk-batuk dan tenggorokan saya sakit. Hidung juga mampet.

Dokter: Baik. Saya lihat gejalanya ya. Ini termasuk gejala ISPA, yaitu Infeksi Saluran Pernapasan Atas. Sudah ada demam?

Pasien: Iya Dokter, kemarin malam sempat demam, sekitar 38 derajat.

Dokter: Oke. Saya periksa dulu tenggorokannya, mohon dibuka mulutnya. Ada sedikit Inflamasi di tenggorokan ya. Tidak terlalu parah.

Pasien: Berbahaya tidak, Dokter?

Dokter: Tidak berbahaya, ini infeksi umum. Saya akan berikan Antibiotik bernama Amoxicillin untuk membantu melawan infeksi bakterinya. Diminum tiga kali sehari ya, sesudah makan, selama lima hari. Harus habis meskipun sudah merasa sembuh.

Pasien: Baik Dokter. Ada obat demamnya juga?

Dokter: Ya, saya tambahkan Paracetamol untuk meredakan demam dan nyeri tenggorokan. Diminum kalau demam atau nyeri saja, tidak perlu rutin. Jarak minumnya minimal empat jam.

Pasien: Oke Dokter. Ada pantangan makanan?

Dokter: Hindari makanan berminyak, pedas, dan minuman dingin dulu. Perbanyak minum air putih hangat. Istirahat yang cukup, jangan terlalu banyak aktivitas berat dua hari ke depan.

Pasien: Kapan saya harus Kontrol lagi, Dokter?

Dokter: Kalau dalam lima hari tidak membaik atau malah makin parah — misalnya demam di atas 39 derajat, sesak napas, atau batuk berdarah — segera kembali. Kalau membaik, Kontrol dua minggu lagi ya untuk memastikan infeksinya benar-benar sembuh.

Pasien: Baik Dokter, terima kasih.

Dokter: Sama-sama. Semoga cepat sembuh. Jangan lupa minum Antibiotiknya sampai habis ya, ini penting supaya bakterinya tidak kebal.`

// ─── Summary Dummy ────────────────────────────────────────────────────────────
export const DUMMY_SUMMARY = {
  medications: [
    {
      name: 'Amoxicillin 500mg',
      dose: '3x sehari',
      duration: '5 hari',
      notes: 'Diminum sesudah makan. HARUS dihabiskan.',
      icon: 'mdi:pill',
      color: '#0D9488',
    },
    {
      name: 'Paracetamol 500mg',
      dose: 'Bila perlu',
      duration: 'Saat demam/nyeri',
      notes: 'Jarak minimal 4 jam antar dosis. Maks 3x sehari.',
      icon: 'mdi:medical-bag',
      color: '#3B82F6',
    },
  ],
  instructions: [
    'Istirahat yang cukup, kurangi aktivitas berat selama 2 hari',
    'Perbanyak minum air putih hangat (minimal 8 gelas sehari)',
    'Hindari makanan berminyak, pedas, dan minuman dingin',
    'Jangan merokok atau berada di area berasap',
    'Jika demam di atas 39°C atau sesak napas, segera kembali ke dokter',
  ],
  nextVisit: {
    date: null,
    notes: 'Kontrol 2 minggu lagi untuk memastikan infeksi sembuh total. Segera kembali jika kondisi memburuk.',
  },
}

// ─── AI Dummy Replies ─────────────────────────────────────────────────────────
export const AI_REPLIES = [
  {
    keywords: ['amoxicillin', 'antibiotik'],
    reply: 'Amoxicillin adalah antibiotik yang diresepkan dokter untuk melawan infeksi bakteri pada saluran pernapasan Anda. Pastikan diminum 3 kali sehari setelah makan dan harus dihabiskan selama 5 hari, meskipun Anda sudah merasa lebih baik sebelum habis.',
  },
  {
    keywords: ['paracetamol', 'demam', 'panas', 'nyeri'],
    reply: 'Paracetamol diberikan untuk meredakan demam dan nyeri tenggorokan. Minum hanya saat demam atau nyeri, dengan jarak minimal 4 jam antar dosis. Maksimal 3 kali sehari. Tidak perlu diminum rutin jika tidak ada gejala.',
  },
  {
    keywords: ['dosis', 'berapa', 'kapan minum', 'jadwal'],
    reply: 'Jadwal minum obat Anda:\n• Amoxicillin 500mg: 3x sehari (pagi, siang, malam) setelah makan\n• Paracetamol 500mg: bila perlu saat demam atau nyeri, jarak minimal 4 jam\n\nPastikan tidak melewatkan dosis Amoxicillin ya!',
  },
  {
    keywords: ['efek samping', 'bahaya', 'aman'],
    reply: 'Efek samping yang mungkin terjadi:\n• Amoxicillin: mual ringan (biasanya hilang setelah beberapa hari), diare ringan. Jika muncul ruam kulit atau sesak napas, hentikan dan segera ke dokter.\n• Paracetamol: umumnya sangat aman bila dikonsumsi sesuai dosis.',
  },
  {
    keywords: ['kontrol', 'kembali', 'kapan', 'follow up'],
    reply: 'Jadwal kontrol Anda berikutnya adalah 2 minggu dari tanggal kunjungan ini. Namun segera kembali ke dokter jika: demam di atas 39°C, sesak napas, batuk berdarah, atau kondisi memburuk sebelum jadwal kontrol.',
  },
  {
    keywords: ['pantangan', 'makanan', 'makan', 'minum', 'larangan'],
    reply: 'Selama masa pemulihan, hindari:\n• Makanan berminyak dan gorengan\n• Makanan/minuman pedas\n• Minuman dingin atau es\n• Rokok dan asap rokok\n\nDianjurkan: perbanyak air putih hangat (minimal 8 gelas/hari) dan sup hangat.',
  },
  {
    keywords: ['ispa', 'infeksi', 'sakit', 'penyakit', 'faringitis'],
    reply: 'ISPA (Infeksi Saluran Pernapasan Atas) adalah infeksi umum pada hidung, tenggorokan, atau sinus. Biasanya disebabkan oleh bakteri atau virus. Dengan pengobatan yang tepat dan istirahat cukup, umumnya sembuh dalam 5-7 hari.',
  },
  {
    keywords: ['istirahat', 'aktivitas', 'olahraga'],
    reply: 'Dokter menyarankan Anda untuk mengurangi aktivitas berat selama minimal 2 hari. Istirahat yang cukup sangat penting agar tubuh dapat memulihkan diri. Tidur minimal 7-8 jam per malam akan sangat membantu proses penyembuhan.',
  },
]

export const DEFAULT_AI_REPLY = 'Maaf, saya belum memahami pertanyaan Anda. Coba tanyakan tentang obat yang diresepkan, dosis, efek samping, pantangan makanan, atau jadwal kontrol berikutnya. Saya siap membantu!'

export function getDummyReply(text) {
  const lower = text.toLowerCase()
  for (const item of AI_REPLIES) {
    if (item.keywords.some((kw) => lower.includes(kw))) {
      return item.reply
    }
  }
  return DEFAULT_AI_REPLY
}

// ─── Format tanggal Indonesia ────────────────────────────────────────────────
export function formatDateID(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatDateShort(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatTime(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}

export function formatDuration(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

export function generateId(prefix = 'id') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
}

export function getNextVisitDate() {
  const d = new Date()
  d.setDate(d.getDate() + 14)
  return d.toISOString()
}

export const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
export const BULAN = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
]
