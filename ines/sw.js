const CACHE = 'piano-8687833636'
const FICHEROS = ['./', 'index.html', 'manifest.json', 'icono-192.png', 'icono-512.png']
self.addEventListener('install', (e) => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FICHEROS))) })
self.addEventListener('activate', (e) => e.waitUntil(caches.keys().then((ks) =>
  Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())))
self.addEventListener('fetch', (e) => e.respondWith(
  fetch(e.request).then((r) => { const c = r.clone(); caches.open(CACHE).then((x) => x.put(e.request, c)); return r })
    .catch(() => caches.match(e.request))))
