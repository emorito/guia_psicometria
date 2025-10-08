/* sw.js – minimal funcional */
const CACHE = 'psico-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/utils.js',
  '/js/quizzes.js',
  '/js/chat.js',
  '/js/render-page.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
