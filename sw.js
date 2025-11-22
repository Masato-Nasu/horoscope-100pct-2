/* sw.js v52-2 */
const CACHE_VERSION = 'v3-4';
const APP_CACHE = 'horoscope2-' + CACHE_VERSION;
const ASSETS = [
  '/horoscope-100pct-2/',
  '/horoscope-100pct-2/index.html?v3-4',
  '/horoscope-100pct-2/manifest.json',
  '/horoscope-100pct-2/icon-192.png',
  '/horoscope-100pct-2/icon-512.png',
  '/horoscope-100pct-2/icon-180.png',
  '/horoscope-100pct-2/splash.css',
  '/horoscope-100pct-2/splash.js',
  '/horoscope-100pct-2/favicon.svg'
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
