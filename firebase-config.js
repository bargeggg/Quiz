// Konfigurasi Firebase Realtime Database
// Dapatkan kredensial gratis di https://console.firebase.google.com/
// 1. Buat project baru (contoh: "quiz-transition")
// 2. Aktifkan Realtime Database (Pilih Tab 'Realtime Database' -> Create Database -> Mode Test: read & write: true)
// 3. Salin Web Config (Project Settings -> General -> Your apps -> Web app) dan tempel di bawah ini:

const defaultFirebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// Deteksi otomatis konfigurasi Firebase dari:
// 1. Parameter URL (?fb_db=...&fb_key=...) -> berguna saat scan QR code dari admin
// 2. LocalStorage browser ('custom_firebase_config')
// 3. defaultFirebaseConfig di file ini
let activeFirebaseConfig = null;
try {
  const urlParams = new URLSearchParams(window.location.search);
  const qDb = urlParams.get('fb_db');
  const qKey = urlParams.get('fb_key');

  if (qDb && qKey) {
    activeFirebaseConfig = {
      databaseURL: decodeURIComponent(qDb),
      apiKey: decodeURIComponent(qKey),
      projectId: (decodeURIComponent(qDb).split('//')[1] || '').split('.')[0]
    };
    try {
      localStorage.setItem('custom_firebase_config', JSON.stringify(activeFirebaseConfig));
    } catch (e) {}
  } else {
    const saved = localStorage.getItem('custom_firebase_config');
    if (saved) {
      activeFirebaseConfig = JSON.parse(saved);
    } else if (defaultFirebaseConfig.apiKey && defaultFirebaseConfig.databaseURL) {
      activeFirebaseConfig = defaultFirebaseConfig;
    }
  }
} catch (e) {
  console.warn("Firebase config load error:", e);
}

// Inisialisasi Firebase Realtime Database
let firebaseDb = null;
if (typeof firebase !== 'undefined' && activeFirebaseConfig && activeFirebaseConfig.apiKey && activeFirebaseConfig.databaseURL) {
  try {
    if (!firebase.apps.length) {
      firebase.initializeApp(activeFirebaseConfig);
    }
    firebaseDb = firebase.database();
    console.log("🔥 Firebase Realtime Database aktif terhubung:", activeFirebaseConfig.databaseURL);
  } catch (err) {
    console.warn("Inisialisasi Firebase gagal, sistem otomatis beralih ke Instant Cloud Sync (MQTT):", err);
  }
}

// Helper untuk mengetahui apakah Firebase sedang aktif
function isFirebaseActive() {
  return !!(firebaseDb && activeFirebaseConfig && activeFirebaseConfig.apiKey);
}

