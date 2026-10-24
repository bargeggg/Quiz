# 🎓 Interactive Quiz: Transition Words & Connectors
> **Presenter Team:** Elsa (#1) • Sofia (#2) • Irfan (#3) • Ahmad (#4)  
> **Mata Kuliah:** Bahasa Inggris – Semester 5  
> **Canva Presentation Link:** [https://canva.link/otop855dny25lu6](https://canva.link/otop855dny25lu6)  
> **Live Web App:** [https://bargeggg.github.io/Quiz/](https://bargeggg.github.io/Quiz/)  
> **Timeline:** Submission Deadline: 22 Oktober 2026 | Sesi Latihan Presentasi: 23–24 Oktober 2026

---

## 🌟 Fitur Utama Aplikasi

1. **Sesi Kuis Pilihan Ganda Interaktif (`index.html`)**:
   - **13 Soal Berbobot:** Disusun terstruktur sesuai urutan alur materi 4 presenter (Elsa, Sofia, Irfan, Ahmad).
   - **Mode Focus Card:** Menampilkan 1 soal per tampilan dengan teks passage besar dan jelas, dioptimalkan untuk presentasi layar Zoom.
   - **Navigasi Cepat (Question Pills):** Strip nomor soal interaktif untuk melompat langsung ke soal mana pun.
   - **Game-Show Sound Effects & Confetti:** Suara chime, klik, jawaban benar, jawaban salah, dan animasi konfeti interaktif berbasis Web Audio API (tanpa file audio eksternal).
   - **💡 Pembahasan & Penjelasan Otomatis (Benar & Salah):** Ketika opsi dipilih, langsung muncul evaluasi status (`✅ JAWABAN BENAR` atau `✕ JAWABAN KURANG TEPAT`) disertai pembahasan tata bahasa yang mendalam dan tombol *Coba Jawab Ulang*.

2. **Papan Skor Realtime (Class Live Scoreboard)**:
   - **Banner Ringkasan Progres:** Memantau jumlah soal terjawab, persentase selesai, serta penghitung jawaban benar/salah secara instan.
   - **Tabel 4 Kolom Rapi & Elegan:**
     - **NO SOAL:** Penomoran bersih (`1 Soal 1` s.d. `13 Soal 13`).
     - **TERJAWAB:** Opsi huruf yang dipilih (contoh: `Opsi (C)`).
     - **STATUS:** Indikator visual jelas (`✅ Benar`, `✕ Salah`, atau `⏳ Belum Dijawab`).
     - **TOTAL POIN:** Akumulasi poin per soal (⭐ +10 pts jika benar, ⭐ +2 pts partisipasi).
   - **Salin Ringkasan untuk Chat Zoom:** Tombol 1-klik untuk menyalin rekap nilai kuis lengkap dengan emoji, siap dipaste ke ruang obrolan Zoom atau WhatsApp grup.
   - **Reset Skor:** Kemudahan mereset seluruh sesi untuk latihan atau kelas baru.

3. **Dashboard Monitoring Presenter (`admin.html`)**:
   - **Wheel of Names (Roda Acak):** Mengundi nama mahasiswa secara acak untuk menjawab pertanyaan.
   - **Live Submissions Feed:** Memantau jawaban yang masuk secara real-time.
   - **Export CSV / Print Rekap:** Mengunduh hasil kuis ke format spreadsheet.

---

## 👥 Distribusi Materi & Alur Presenter (13 Soal)

| No Soal | Topik Transisi Kata | Pemateri | Deskripsi Singkat Soal |
|:---:|:---|:---|:---|
| **1** | **Clarification** | **Elsa (#1)** | Analisis kata *specifically* pada kebijakan *congestion pricing* |
| **2** | **Addition** | **Elsa (#1)** | Peran konektor *Furthermore* pada manfaat energi terbarukan |
| **3** | **Definition** | **Elsa (#1)** | Pola definisi formal pada istilah *neurolinguistics* |
| **4** | **Location** | **Sofia (#2)** | Perbedaan jarak spasial antara *within walking distance* vs *far from* |
| **5** | **Time** | **Sofia (#2)** | Klasifikasi transisi waktu *Immediate Succession* pada *as soon as* |
| **6** | **Conclusion** | **Sofia (#2)** | Penggunaan konjungtif *Therefore* sebagai penarik simpulan logis |
| **7** | **Comparison** | **Irfan (#3)** | Kesetaraan karakteristik mobil dengan struktur *Both ... and ...* |
| **8** | **Concession** | **Irfan (#3)** | Preposisi konsesi *Despite* diikuti frasa gerund *studying all night* |
| **9** | **Condition** | **Irfan (#3)** | Hubungan syarat bermain game dengan frasa *as long as* |
| **10** | **Cause** | **Ahmad (#4)** | Analisis akar penyebab (*thick fog*) dengan kata kunci *due to* |
| **11** | **Reason** | **Ahmad (#4)** | Pertimbangan rasional warga terkait transparansi anggaran publik |
| **12** | **Purpose** | **Ahmad (#4)** | Ekspresi tujuan ke masa depan (*to stay healthy*) dengan *to-infinitive* |
| **13** | **Cause / Result** | **Ahmad (#4)** | Hubungan kausalitas penurunan IHSG sebagai pemicu kepanikan investor |

---

## 📁 Struktur Berkas Proyek

```
Quiz/
├── index.html          # Portal Kuis Interaktif 13 Soal & Class Live Scoreboard
├── admin.html          # Dashboard Presenter & Wheel of Names
├── questions.json      # Database 13 Soal, Kunci Jawaban, & Pembahasan Lengkap
├── quiz.txt            # Dokumen Referensi Bank Soal & Skema Presentasi
├── firebase-config.js  # Konfigurasi Sinkronisasi Realtime
├── Quiz.zip            # Arsip zip siap distribusi
├── assets/
│   ├── style.css       # Desain Luxury Dark Glassmorphism & Responsive UI
│   ├── audio.js        # Web Audio API Synthesizer (BGM & Sound Effects)
│   └── realtime.js     # Engine Sinkronisasi Realtime
└── README.md           # Dokumentasi Resmi Proyek
```

---

## 🚀 Cara Akses & Deploy ke GitHub Pages

Aplikasi ini di-hosting di GitHub Pages pada repository `https://github.com/bargeggg/Quiz`:

- 📱 **Link Kuis Interaktif Live:**  
  [https://bargeggg.github.io/Quiz/](https://bargeggg.github.io/Quiz/)
- 💻 **Link Dashboard Presenter:**  
  [https://bargeggg.github.io/Quiz/admin.html](https://bargeggg.github.io/Quiz/admin.html)

### Perintah Git untuk Update:
```powershell
git add .
git commit -m "Update dokumentasi dan fitur kuis terbaru"
git push origin main
```
