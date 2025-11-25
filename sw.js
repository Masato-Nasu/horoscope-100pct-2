/* sw.js v52-2 */
const CACHE_VERSION = 'v52-2';
const APP_CACHE = 'horoscope-' + CACHE_VERSION;
const ASSETS = [
  '/horoscope-100pct/',
  '/horoscope-100pct/index.html?v=52-2',
  '/horoscope-100pct/manifest.json',
  '/horoscope-100pct/icon-192.png',
  '/horoscope-100pct/icon-512.png',
  '/horoscope-100pct/icon-180.png',
  '/horoscope-100pct/splash.css',
  '/horoscope-100pct/splash.js',
  '/horoscope-100pct/favicon.svg'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(APP_CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const ks = await caches.keys();
    await Promise.all(ks.filter(k => k !== APP_CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
