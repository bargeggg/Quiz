# 🎓 Kuis Interaktif: Transition Words & Connectors
> **Kelompok Presenter:** Elsa (#1) • Sofia (#2) • Irfan (#3) • Ahmad (#4)  
> **Link Slide Presentasi Canva:** [https://canva.link/otop855dny25lu6](https://canva.link/otop855dny25lu6)  
> **Target Kelas:** 19 Siswa (4 Essay, 10 Pilihan Ganda, 5 Sesi Tanya Bebas)  
> **Jadwal:** Deadline 22 Oktober 2026 | Latihan 23-24 Oktober 2026

---

## 🌟 Fitur Unggulan Sistem

1. **Akses Langsung Siswa (`index.html`)**:
   - Teman sekelas cukup membuka link web lewat browser HP / laptop (atau scan QR code di layar proyektor).
   - Dilengkapi 3 mode:
     - 🎯 **Quiz #2: Pilihan Ganda (10 Soal)**: Auto-grading otomatis, skor langsung dihitung, highlight kata transisi.
     - 📝 **Quiz #1: Analisis Kasus Esai (4 Soal)**: Pembagian kasus komprehensif untuk perwakilan kelompok.
     - 💬 **Sesi Tanya Bebas (5 Pertanyaan)**: Kartu pemantik diskusi & kolom kirim pertanyaan live ke presenter.
   - Efek suara sintetis (Web Audio API) & animasi selebrasi Confetti tanpa perlu download file MP3 eksternal.

2. **Dashboard Monitoring Realtime Presenter (`admin.html`)**:
   - **Live Submissions Feed**: Jawaban teman yang masuk langsung tampil secara instan tanpa perlu reload halaman.
   - **Auto-Grading & Review Detail**: Rekap nilai pilihan ganda dan rubrik esai untuk penilaian langsung.
   - **🎡 Roda Keberuntungan (Wheel of Names)**: Putar roda untuk mengundi giliran 19 siswa secara interaktif saat presentasi.
   - **📋 Matriks 19 Siswa & Kunci Jawaban**: Panduan cepat bagi Elsa, Sofia, Irfan, dan Ahmad saat menguji audiens.
   - **📽️ Mode Layar Proyektor**: Tampilan fullscreen lengkap dengan QR Code besar untuk ditembakkan ke layar proyektor kelas.
   - **Export CSV & Cetak Rekap**: Unduh rekap nilai seluruh siswa ke Excel/CSV untuk diserahkan ke dosen.

3. **Koneksi Realtime Tanpa Ribet (Zero-Config Cloud Sync)**:
   - Terhubung otomatis antar-perangkat via **MQTT over WebSocket TLS**.
   - Mendukung **Firebase Realtime Database** bila ingin menyimpan arsip di Firebase pribadi.
   - Dilengkapi fallback lokal untuk simulasi presentasi offline.

---

## 🚀 Cara Upload & Mengaktifkan GitHub Pages

Repositori ini sudah dihubungkan ke `https://github.com/bargeggg/Quiz.git`.

### Langkah 1: Push ke GitHub
Jalankan perintah berikut di terminal (PowerShell):
```powershell
git add .
git commit -m "feat: complete interactive quiz and presenter monitoring dashboard"
git push -u origin main
```
*(Bila diminta login, masukkan akun GitHub Anda atau Personal Access Token)*

### Langkah 2: Aktifkan GitHub Pages (Agar Bisa Diakses Teman)
1. Buka repo Anda: [https://github.com/bargeggg/Quiz](https://github.com/bargeggg/Quiz)
2. Klik tab **Settings** (ikon gerigi di atas).
3. Di sidebar sebelah kiri, klik menu **Pages**.
4. Pada bagian **Build and deployment**:
   - Di bawah **Source**, pilih **Deploy from a branch**.
   - Branch: pilih **`main`** dan folder **`/ (root)`**.
   - Klik **Save**.
5. Tunggu sekitar 1–2 menit, Anda akan mendapatkan URL publik:
   - 📱 **Link Kuis untuk Teman:**  
     `https://bargeggg.github.io/Quiz/`
   - 💻 **Link Monitoring untuk Presenter:**  
     `https://bargeggg.github.io/Quiz/admin.html`

---

## 👥 Pembagian Materi & Kuis 19 Siswa

| No. Siswa | Aktivitas / Sesi | Topik & Presenter Penguji | Keterangan |
|:---:|:---|:---|:---|
| **1** | Quiz #1 - Essay 1 | Elsa (#1 - Addition & Clarification) | Analisis 'furthermore' & 'in other words' |
| **2** | Quiz #1 - Essay 2 | Sofia (#2 - Location & Time) | Analisis 'whenever' & 'downstream' |
| **3** | Quiz #1 - Essay 3 | Irfan (#3 - Contrast & Condition) | Analisis 'provided that' & 'on the contrary' |
| **4** | Quiz #1 - Essay 4 | Ahmad (#4 - Cause, Reason, Purpose, Result) | Analisis 'because', 'purpose of', 'as a result' |
| **5 - 14** | Quiz #2 - PG (1 - 10) | Elsa, Sofia, Irfan, Ahmad | 10 soal pilihan ganda acak auto-graded |
| **15** | Tanya Bebas #1 | Elsa (#1) | Kapan 'furthermore' vs 'in addition' |
| **16** | Tanya Bebas #2 | Sofia (#2) | Frasa kesimpulan yang dihindari di akademik |
| **17** | Tanya Bebas #3 | Irfan (#3) | Contrast vs Concession dalam klausa |
| **18** | Tanya Bebas #4 | Ahmad (#4) | Reason (because) vs Purpose (so that) |
| **19** | Tanya Bebas #5 | Semua Presenter | Dampak overuse kata transisi |

---

## 🛠️ Struktur Berkas

```
Quiz/
├── index.html          # Halaman Kuis Interaktif untuk Teman (Siswa)
├── admin.html          # Dashboard Live Monitoring & Roda Pengacak (Presenter)
├── questions.json      # Bank data 4 Essay, 10 PG, 5 Tanya Bebas, dan Rubrik
├── firebase-config.js  # Konfigurasi opsional Firebase
├── assets/
│   ├── style.css       # Desain Modern Dark Glassmorphism
│   ├── realtime.js     # Realtime Engine (MQTT Cloud + Firebase + Local)
│   └── audio.js        # Efek suara sintetis Web Audio API
├── quiz.txt            # Catatan draft awal materi
└── README.md           # Panduan lengkap penggunaan
```
