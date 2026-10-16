# 🎓 Interactive Quiz: Transition Words & Connectors
> **Presenter Team:** Elsa (#1) • Sofia (#2) • Irfan (#3) • Ahmad (#4)  
> **Canva Presentation Link:** [https://canva.link/otop855dny25lu6](https://canva.link/otop855dny25lu6)  
> **Target Audience:** 19 Participants (4 Essay Cases, 10 Multiple Choice Questions, 5 Q&A Discussion Prompts)  
> **Timeline:** Submission Deadline: October 22, 2026 | Rehearsal Sessions: October 23-24, 2026

---

## 🌟 Key Application Features

1. **Student / Participant Portal (`index.html`)**:
   - Participants enter their **NIP** (Employee/Student ID) and **Full Name**.
   - Accessible from any smartphone or laptop browser (or by scanning the projector QR code).
   - Features 3 specialized assessment modes:
     - 🎯 **Quiz #2: Multiple Choice (10 Questions)**: Focus carousel mode (one question at a time), instant number jump strip, real-time auto-grading, and progress dock.
     - 📝 **Quiz #1: Essay Case Analysis (4 Cases)**: Comprehensive passages for assigned group representatives.
     - 💬 **Q&A Discussion Session (5 Prompts)**: Structured inquiry cards & custom question transmission to presenters.
   - **Procedural Lo-Fi Chill Music Player**: Built-in algorithmic synthesizer generating soothing chords (Web Audio API) with volume control and track styles (Cozy Lo-Fi / Ambient Chill). Zero external MP3 downloads required.

2. **Presenter Live Monitoring Dashboard (`admin.html`)**:
   - **Realtime Submissions Feed**: Incoming participant answers appear with millisecond latency without refreshing the browser.
   - **Auto-Grading & Review**: Instant score breakdown for Multiple Choice and rubric guidance for Essays.
   - **🎡 Wheel of Names (Randomizer)**: Interactive wheel to randomly pick students for Essays, Multiple Choice, or Q&A roles.
   - **📋 19 Students Matrix & Answer Keys**: Side-by-side answer keys for Elsa, Sofia, Irfan, and Ahmad.
   - **📽️ Projector Screen Mode**: Clean fullscreen display with large QR code and live participant counter.
   - **CSV Export & Report Printing**: Download attendance & grade records directly into Excel / CSV format.

3. **Seamless Realtime Cloud Sync**:
   - Out-of-the-box cross-device communication via **MQTT over WebSocket TLS**.
   - Optional support for **Firebase Realtime Database**.
   - Local fallback for offline presentations.

---

## 🚀 How to Push & Deploy to GitHub Pages

This workspace is connected to `https://github.com/bargeggg/Quiz.git`.

### Step 1: Push Updates to GitHub
Run the following command in PowerShell:
```powershell
git add .
git commit -m "feat: full English localization with NIP credentials and chill lo-fi music"
git push origin main
```

### Step 2: Enable GitHub Pages
1. Navigate to: [https://github.com/bargeggg/Quiz](https://github.com/bargeggg/Quiz)
2. Click **Settings** (gear icon) > click **Pages** in the left sidebar.
3. Under **Build and deployment**:
   - Source: **Deploy from a branch**.
   - Branch: **`main`** and folder **`/ (root)`**.
   - Click **Save**.
4. In 1–2 minutes, your live URLs will be active:
   - 📱 **Participant Quiz URL:**  
     `https://bargeggg.github.io/Quiz/`
   - 💻 **Presenter Admin Dashboard:**  
     `https://bargeggg.github.io/Quiz/admin.html`

---

## 👥 Topic Distribution (19 Students)

| Slot | Activity | Presenter & Focus Area | Description |
|:---:|:---|:---|:---|
| **1** | Quiz #1 - Essay 1 | Elsa (#1 - Addition & Clarification) | Passage analysis of 'furthermore' & 'in other words' |
| **2** | Quiz #1 - Essay 2 | Sofia (#2 - Location & Time) | Passage analysis of 'whenever' & 'downstream' |
| **3** | Quiz #1 - Essay 3 | Irfan (#3 - Contrast & Condition) | Passage analysis of 'provided that' & 'on the contrary' |
| **4** | Quiz #1 - Essay 4 | Ahmad (#4 - Cause, Reason, Purpose, Result) | Case study of 'because', 'purpose of', 'as a result' |
| **5 - 14** | Quiz #2 - MC (1 - 10) | Elsa, Sofia, Irfan, Ahmad | 10 multiple choice questions auto-graded |
| **15** | Q&A Inquiry #1 | Elsa (#1) | Nuance between 'furthermore' and 'in addition' |
| **16** | Q&A Inquiry #2 | Sofia (#2) | Informal concluding phrases to avoid in academic writing |
| **17** | Q&A Inquiry #3 | Irfan (#3) | Contrast vs Concession clauses |
| **18** | Q&A Inquiry #4 | Ahmad (#4) | Reason ('because') vs Purpose ('so that') |
| **19** | Q&A Inquiry #5 | All Presenters | Negative effects of overusing transition words |

---

## 📁 Project Structure

```
Quiz/
├── index.html          # Participant Quiz Portal (NIP & Name, Chill Music, MC & Essay)
├── admin.html          # Presenter Live Monitoring Dashboard & Wheel of Names
├── questions.json      # Complete English Question Bank & Rubrics
├── firebase-config.js  # Optional Firebase Realtime DB configuration
├── assets/
│   ├── style.css       # Enterprise Dark Glassmorphic Design System
│   ├── realtime.js     # Realtime Synchronization Engine
│   └── audio.js        # Web Audio API Synthesizer (Chill Lo-Fi BGM & SFX)
├── quiz.txt            # Original draft syllabus notes
└── README.md           # Project documentation
```
