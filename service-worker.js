let intervalMinutes = 45; // Standardintervall

// Nachricht vom Frontend empfangen
self.addEventListener('message', event => {
  if (event.data.type === 'SET_INTERVAL') {
    intervalMinutes = parseInt(event.data.interval);
    console.log('Intervall gesetzt:', intervalMinutes);
  }
});

// Funktion zum Planen der nächsten Benachrichtigun
function scheduleNext() {
  setTimeout(() => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 8 && hour < 21) {
      self.registration.showNotification('Zeit zu trinken', {
        body: 'Ein Glas Wasser trinken!',
        silent: false
      });
    }

    scheduleNext(); // nächstes Intervall
  }, intervalMinutes * 60 * 1000);
}

// Initialisierung beim Installieren
self.addEventListener('install', event => {
  self.skipWaiting();
});

// Aktivierung
self.addEventListener('activate', event => {
  clients.claim();
  scheduleNext(); // sofort starten
});
