// Realtime Synchronization Engine
// Mendukung sinkronisasi penuh: Firebase Realtime Database (Primary Cloud), Instant Cloud Sync (MQTT over WebSocket TLS), dan BroadcastChannel (Multi-tab lokal).

const RealtimeSync = (function() {
  const DEFAULT_ROOM = "TRANSITION-2026";
  const MQTT_BROKER = "broker.emqx.io";
  const MQTT_PORT = 8084; // Secure WSS port
  const MQTT_PATH = "/mqtt";

  let currentRoom = DEFAULT_ROOM;
  let userRole = "player"; // 'player' atau 'host'
  let mqttClient = null;
  let isConnected = false;
  let connectionType = "local"; // 'firebase' | 'mqtt' | 'local'

  let currentParticipant = {
    name: "",
    nip: ""
  };

  try {
    currentParticipant.name = localStorage.getItem('quiz_student_name') || "";
    currentParticipant.nip = localStorage.getItem('quiz_student_nip') || "";
  } catch (e) {}

  let listeners = {
    onSubmission: null,
    onPresence: null,
    onStatusChange: null,
    onHostAction: null
  };

  let localChannel = null;
  let presenceInterval = null;
  let onlineParticipants = new Map();

  // Ambil Room ID dari URL param (?room=XYZ) atau localStorage
  function resolveRoomId() {
    const params = new URLSearchParams(window.location.search);
    const roomFromUrl = params.get('room');
    if (roomFromUrl && roomFromUrl.trim()) {
      return roomFromUrl.trim().toUpperCase();
    }
    const saved = localStorage.getItem('active_quiz_room');
    if (saved) return saved;
    return DEFAULT_ROOM;
  }

  function saveLocalSubmission(sub) {
    if (!sub || !sub.id) return;
    try {
      const key = `submissions_${currentRoom}`;
      const list = JSON.parse(localStorage.getItem(key) || '[]');
      const idx = list.findIndex(s => s.id === sub.id);
      if (idx >= 0) {
        list[idx] = sub;
      } else {
        list.push(sub);
      }
      localStorage.setItem(key, JSON.stringify(list));
    } catch (e) {
      console.warn("Storage save error", e);
    }
  }

  function getLocalSubmissions() {
    try {
      const key = `submissions_${currentRoom}`;
      return JSON.parse(localStorage.getItem(key) || '[]');
    } catch (e) {
      return [];
    }
  }

  // Setup BroadcastChannel untuk multi-tab langsung di perangkat yang sama
  function setupBroadcastChannel() {
    if ('BroadcastChannel' in window) {
      try {
        localChannel = new BroadcastChannel(`quiz_${currentRoom}`);
        localChannel.onmessage = (event) => {
          handleIncomingMessage(event.data, 'broadcast_channel');
        };
      } catch (e) {
        console.warn("BroadcastChannel error:", e);
      }
    }
  }

  // Handle incoming data universal
  function handleIncomingMessage(payload, source = 'unknown') {
    if (!payload || !payload.type) return;

    if (payload.type === 'submission') {
      saveLocalSubmission(payload.data);
      if (listeners.onSubmission) {
        listeners.onSubmission(payload.data);
      }
    } else if (payload.type === 'presence') {
      const p = payload.data;
      if (p && p.clientId) {
        onlineParticipants.set(p.clientId, {
          name: p.name || 'Peserta',
          role: p.role || 'player',
          lastSeen: Date.now()
        });
        prunePresence();
        if (listeners.onPresence) {
          listeners.onPresence(onlineParticipants.size, Array.from(onlineParticipants.values()));
        }
      }
    } else if (payload.type === 'host_action') {
      if (listeners.onHostAction) {
        listeners.onHostAction(payload.data);
      }
    }
  }

  function prunePresence() {
    const now = Date.now();
    for (const [id, data] of onlineParticipants.entries()) {
      if (now - data.lastSeen > 35000) { // 35 detik tanpa ping = offline
        onlineParticipants.delete(id);
      }
    }
  }

  // Setup MQTT over WebSocket (Cloud Realtime Fallback)
  function setupMQTT() {
    if (typeof Paho === 'undefined' || !Paho.MQTT) {
      console.warn("Paho MQTT client belum termuat.");
      if (!firebaseDb) {
        updateStatus(false, "Mode Lokal / Offline", "local");
      }
      return;
    }

    const clientId = `quiz_${userRole}_${Math.random().toString(36).substring(2, 9)}`;

    try {
      mqttClient = new Paho.MQTT.Client(MQTT_BROKER, MQTT_PORT, MQTT_PATH, clientId);

      mqttClient.onConnectionLost = (responseObject) => {
        if (!firebaseDb) {
          isConnected = false;
          updateStatus(false, "Koneksi cloud terputus, mencoba ulang...", "local");
        }
        if (responseObject.errorCode !== 0) {
          console.warn("MQTT connection lost:", responseObject.errorMessage);
        }
        setTimeout(setupMQTT, 5000);
      };

      mqttClient.onMessageArrived = (message) => {
        try {
          const payload = JSON.parse(message.payloadString);
          handleIncomingMessage(payload, 'mqtt');
        } catch (e) {
          console.warn("Failed to parse incoming MQTT payload", e);
        }
      };

      if (!firebaseDb) {
        updateStatus(false, "Menghubungkan ke Cloud Room...", "local");
      }

      mqttClient.connect({
        useSSL: true,
        timeout: 10,
        keepAliveInterval: 30,
        cleanSession: true,
        onSuccess: () => {
          if (!firebaseDb) {
            isConnected = true;
            connectionType = "mqtt";
            updateStatus(true, `Terhubung ke Cloud MQTT (Room: ${currentRoom})`, "mqtt");
          }
          
          // Subscribe ke room topic
          const topic = `antigravity/quiz/${currentRoom}/#`;
          mqttClient.subscribe(topic, { qos: 1 });
          console.log("📡 Terhubung ke topic MQTT:", topic);

          // Mulai presence heartbeat
          startPresenceHeartbeat(clientId);
        },
        onFailure: (err) => {
          if (!firebaseDb) {
            isConnected = false;
            updateStatus(false, "Koneksi Cloud Tertunda (Fallback Aktif)", "local");
          }
          console.warn("MQTT Connect failed:", err);
          setTimeout(setupMQTT, 10000);
        }
      });
    } catch (e) {
      console.warn("MQTT init error:", e);
      if (!firebaseDb) {
        updateStatus(false, "Fallback Mode Aktif", "local");
      }
    }
  }

  function startPresenceHeartbeat(clientId) {
    if (presenceInterval) clearInterval(presenceInterval);
    const sendPing = () => {
      const activeName = currentParticipant.name || userRole;
      RealtimeSync.broadcast('presence', {
        clientId: clientId,
        name: activeName,
        role: userRole,
        time: Date.now()
      });
    };
    sendPing();
    presenceInterval = setInterval(sendPing, 10000); // Tiap 10 detik
  }

  function updateStatus(connected, message, type = "local") {
    isConnected = connected;
    connectionType = type;
    if (listeners.onStatusChange) {
      listeners.onStatusChange(connected, message, type);
    }
  }

  // Setup Firebase Realtime Database
  function setupFirebase() {
    if (typeof firebaseDb !== 'undefined' && firebaseDb) {
      try {
        console.log("🔥 Menginisialisasi listener Firebase Realtime Database pada room:", currentRoom);

        // Pantau status koneksi Firebase
        const connectedRef = firebaseDb.ref(".info/connected");
        connectedRef.on("value", (snap) => {
          if (snap.val() === true) {
            isConnected = true;
            connectionType = "firebase";
            updateStatus(true, `Terhubung ke Firebase Realtime DB (Room: ${currentRoom})`, "firebase");

            // Setup presence otomatis di Firebase
            const myPresenceRef = firebaseDb.ref(`rooms/${currentRoom}/presence/${getPresenceClientId()}`);
            myPresenceRef.onDisconnect().remove();
            myPresenceRef.set({
              name: currentParticipant.name || userRole,
              role: userRole,
              nip: currentParticipant.nip || "-",
              time: Date.now()
            });
          }
        });

        // 1. Ambil data submission yang sudah ada (Initial Snapshot)
        const subRef = firebaseDb.ref(`rooms/${currentRoom}/submissions`);
        subRef.once('value', (snapshot) => {
          const val = snapshot.val();
          if (val) {
            console.log("🔥 Memuat", Object.keys(val).length, "submission dari Firebase Cloud");
            Object.values(val).forEach(item => {
              saveLocalSubmission(item);
              if (listeners.onSubmission) {
                listeners.onSubmission(item);
              }
            });
          }
        });

        // 2. Dengarkan penambahan submission baru
        subRef.on('child_added', (snapshot) => {
          const data = snapshot.val();
          if (data) {
            handleIncomingMessage({ type: 'submission', data: data }, 'firebase');
          }
        });

        // 3. Dengarkan pembaruan nilai submission (misal mahasiswa menjawab soal berikutnya)
        subRef.on('child_changed', (snapshot) => {
          const data = snapshot.val();
          if (data) {
            handleIncomingMessage({ type: 'submission', data: data }, 'firebase');
          }
        });

        // 4. Dengarkan presence di Firebase
        const presRef = firebaseDb.ref(`rooms/${currentRoom}/presence`);
        presRef.on('value', (snapshot) => {
          const presData = snapshot.val() || {};
          const participants = Object.values(presData);
          if (listeners.onPresence) {
            listeners.onPresence(participants.length, participants);
          }
        });

        // 5. Dengarkan aksi host (reset room dsb)
        const hostRef = firebaseDb.ref(`rooms/${currentRoom}/host_action`);
        hostRef.on('value', (snapshot) => {
          const actionData = snapshot.val();
          if (actionData && actionData.timestamp && (Date.now() - actionData.timestamp < 15000)) {
            handleIncomingMessage({ type: 'host_action', data: actionData }, 'firebase');
          }
        });

      } catch (e) {
        console.warn("Firebase listener error:", e);
      }
    }
  }

  let cachedPresenceClientId = null;
  function getPresenceClientId() {
    if (!cachedPresenceClientId) {
      cachedPresenceClientId = `pres_${userRole}_` + Math.random().toString(36).substring(2, 9);
    }
    return cachedPresenceClientId;
  }

  return {
    init(config = {}) {
      currentRoom = config.roomId || resolveRoomId();
      userRole = config.role || "player";
      listeners.onSubmission = config.onSubmission || null;
      listeners.onPresence = config.onPresence || null;
      listeners.onStatusChange = config.onStatusChange || null;
      listeners.onHostAction = config.onHostAction || null;

      try {
        localStorage.setItem('active_quiz_room', currentRoom);
      } catch (e) {}

      setupBroadcastChannel();
      setupFirebase();
      setupMQTT();

      // Trigger interval pembersihan presence lokal
      setInterval(() => {
        prunePresence();
        if (listeners.onPresence && (!firebaseDb || !isConnected)) {
          listeners.onPresence(onlineParticipants.size, Array.from(onlineParticipants.values()));
        }
      }, 5000);

      return {
        room: currentRoom,
        role: userRole,
        connectionType: connectionType
      };
    },

    setParticipant(name, nip = "") {
      currentParticipant.name = (name || "").trim();
      currentParticipant.nip = (nip || "").trim();
      try {
        localStorage.setItem('quiz_student_name', currentParticipant.name);
        localStorage.setItem('quiz_student_nip', currentParticipant.nip);
      } catch (e) {}

      // Update Firebase presence jika terhubung
      if (typeof firebaseDb !== 'undefined' && firebaseDb) {
        try {
          const myPresenceRef = firebaseDb.ref(`rooms/${currentRoom}/presence/${getPresenceClientId()}`);
          myPresenceRef.set({
            name: currentParticipant.name,
            role: userRole,
            nip: currentParticipant.nip,
            time: Date.now()
          });
        } catch (e) {}
      }
    },

    getParticipant() {
      return currentParticipant;
    },

    broadcast(type, data) {
      const packet = {
        type: type,
        room: currentRoom,
        timestamp: Date.now(),
        data: data
      };

      // 1. BroadcastChannel (Antar tab lokal)
      if (localChannel) {
        try {
          localChannel.postMessage(packet);
        } catch (e) {}
      }

      // 2. MQTT Cloud (Antar perangkat internet)
      if (mqttClient && mqttClient.isConnected()) {
        try {
          const topic = `antigravity/quiz/${currentRoom}/${type}`;
          const msg = new Paho.MQTT.Message(JSON.stringify(packet));
          msg.destinationName = topic;
          msg.qos = 1;
          mqttClient.send(msg);
        } catch (e) {
          console.warn("MQTT send error", e);
        }
      }

      // 3. Firebase Realtime Database
      if (typeof firebaseDb !== 'undefined' && firebaseDb) {
        try {
          if (type === 'submission') {
            const subId = data.id || ('sub_' + Date.now());
            firebaseDb.ref(`rooms/${currentRoom}/submissions/${subId}`).set(data);
          } else if (type === 'host_action') {
            firebaseDb.ref(`rooms/${currentRoom}/host_action`).set({
              action: data.action,
              payload: data.payload,
              timestamp: Date.now()
            });
          }
        } catch (e) {
          console.warn("Firebase sync error", e);
        }
      }
    },

    submitAnswer(submissionData) {
      if (!submissionData.id) {
        const studentId = (submissionData.nip && submissionData.nip !== '-') 
          ? submissionData.nip 
          : (submissionData.name || 'anon').replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
        submissionData.id = `sub_pg_${studentId}`;
      }
      submissionData.submittedAt = Date.now();
      submissionData.room = currentRoom;

      saveLocalSubmission(submissionData);
      this.broadcast('submission', submissionData);
      return submissionData;
    },

    broadcastHostAction(actionName, payload = {}) {
      this.broadcast('host_action', { action: actionName, payload: payload });
    },

    getRoomId() {
      return currentRoom;
    },

    setRoomId(newRoom) {
      if (!newRoom) return;
      currentRoom = newRoom.trim().toUpperCase();
      try {
        localStorage.setItem('active_quiz_room', currentRoom);
      } catch (e) {}
      window.location.search = `?room=${encodeURIComponent(currentRoom)}`;
    },

    getAllSubmissions() {
      return getLocalSubmissions();
    },

    clearAllSubmissions() {
      try {
        localStorage.removeItem(`submissions_${currentRoom}`);
      } catch (e) {}

      if (typeof firebaseDb !== 'undefined' && firebaseDb) {
        try {
          firebaseDb.ref(`rooms/${currentRoom}/submissions`).remove();
        } catch (e) {}
      }

      this.broadcastHostAction('clear_submissions');
    },

    deleteSubmission(id) {
      const list = getLocalSubmissions().filter(s => s.id !== id);
      try {
        localStorage.setItem(`submissions_${currentRoom}`, JSON.stringify(list));
      } catch (e) {}

      if (typeof firebaseDb !== 'undefined' && firebaseDb) {
        try {
          firebaseDb.ref(`rooms/${currentRoom}/submissions/${id}`).remove();
        } catch (e) {}
      }
    },

    getConnectionType() {
      return connectionType;
    },

    isLiveConnected() {
      return isConnected;
    }
  };
})();
