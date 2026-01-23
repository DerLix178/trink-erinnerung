let intervalMinutes = 45;
let running = false;
let timeoutId = null;

self.addEventListener('message', event => {
  if (event.data?.type === 'START') {
    intervalMinutes = parseInt(event.data.interval, 10) || 45;
    running = true;
    scheduleNext();
  }

  if (event.data?.type === 'STOP') {
    running = false;
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = null;
  }
});

function scheduleNext() {
  if (!running) return;

  // Bestehenden Timeout ersetzen, damit ein neues Intervall sofort greift
  if (timeoutId) clearTimeout(timeoutId);

  timeoutId = setTimeout(() => {
    const hour = new Date().getHours();

    if (hour >= 8 && hour < 21) {
      self.registration.showNotification('Zeit zu trinken', {
        body: 'Ein Glas Wasser reicht.',
        silent: false
      });
    }

    scheduleNext();
  }, intervalMinutes * 60 * 1000);
}

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
