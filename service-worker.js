const CACHE_NAME = 'harley-beer-cache-v1';
const urlsToCache = [
  '/',
  '/index.html', // Assuming index.html is your main file
  '/Icone.png',
  '/alarm.mp3',
  '/manifest.json',
  // Add other icon sizes here once created, e.g., '/Icone-512.png', '/Icone-180.png',
  // Add any other CSS, JavaScript files, etc., that your app depends on
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});