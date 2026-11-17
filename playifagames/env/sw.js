/* Play IFA Games service worker — generated at build time (see vite.config.ts). */
const VERSION = '9e362340';
const CACHE = `pig-${VERSION}`;
const PRECACHE = ["/env/","/env/theme.js","/env/manifest.webmanifest","/env/icons/icon-192.png","/env/assets/index-0XyNKjyK.css","/env/assets/three-BO4-fiJ4.js","/env/assets/index-D2pxr1gL.js"];
const MAX_ASSETS = 80;
/** The path the app is served from: "/" or e.g. "/env/" (playifagames.org/env). */
const BASE = '/env/';

self.addEventListener('install', (e) => {
  // First install takes over at once; an update waits until the player chooses to reload.
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => { if (!self.registration.active) return self.skipWaiting(); }));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith('pig-') && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
async function trim(cache) { const keys = await cache.keys(); for (let i = 0; i < keys.length - MAX_ASSETS; i++) await cache.delete(keys[i]); }

self.addEventListener('fetch', (e) => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(BASE) || url.pathname.startsWith(BASE + 'v1/') || url.pathname === BASE + 'ws') return;
  if (req.mode === 'navigate') {
    // the app shell: always try the network first so a new release shows up straight away
    e.respondWith(fetch(req).then((r) => { const copy = r.clone(); if (r.ok) caches.open(CACHE).then((c) => c.put(BASE, copy)); return r; }).catch(() => caches.match(BASE, { ignoreSearch: true })));
    return;
  }
  if (url.pathname.startsWith(BASE + 'assets/') || url.pathname.startsWith(BASE + 'icons/')) {
    e.respondWith(caches.open(CACHE).then(async (c) => {
      const hit = await c.match(req); if (hit) return hit;
      const r = await fetch(req); if (r.ok) { await c.put(req, r.clone()); void trim(c); } return r;
    }));
  }
});
self.addEventListener('message', (e) => { if (e.data === 'skip-waiting') self.skipWaiting(); });
