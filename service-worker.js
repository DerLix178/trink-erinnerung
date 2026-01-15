let intervalMinutes = 45; // Standardintervall, wird vom Frontend gesetzt

// Nachricht vom Frontend empfangen
self.addEventListener('message', event => {
  if (event.data.type === 'SET_INTERVAL') {
    intervalMinutes = parseInt(event.data.interval);
    scheduleNext();
  }
});

// Funktion zum Planen der nächsten Benachrichtigung
function scheduleNext() {
  setTimeout(async () => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 8 && hour < 21) {
      // Benachrichtigung anzeigen
      self.registration.showNotification('Zeit zu trinken', {
        body: 'Ein Glas Wasser trinken!',
        icon: '/icon.png', // optional, kannst du später ein Icon setzen
        silent: false
      });
    }

    // nächste Benachrichtigung planen
    scheduleNext();
  }, intervalMinutes * 60 * 1000);
}

// Initialisierung beim Installieren
self.addEventListener('install', event => {
  self.skipWaiting();
});

// Aktivierung
self.addEventListener('activate', event => {
  clients.claim();
});
