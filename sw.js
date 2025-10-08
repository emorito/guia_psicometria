/* sw.js – Service worker mínimo */
const CACHE = 'psico-v1';
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache =>
      cache.addAll([
        '/',
        '/index.html',
        '/css/styles.css',
        '/js/utils.js',
        '/js/quizzes.js',
        '/js/progress-badges.js',
        '/js/export-pdf.js'
      ])
    )
  );
});
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
