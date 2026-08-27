const CACHE_NAME = "innovtech-shell-v2";
const APP_SHELL = ["/", "/admin", "/site.webmanifest", "/admin.webmanifest", "/media/branding/innovtech-symbol.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))));
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;
  if (request.mode === "navigate") {
    event.respondWith(fetch(request).catch(() => caches.match(url.pathname.startsWith("/admin") ? "/admin" : "/")));
    return;
  }
  event.respondWith(caches.match(request).then((cached) => cached || fetch(request).then((response) => {
    if (response.ok && url.pathname.startsWith("/assets/")) {
      const clone = response.clone();
      void caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
    }
    return response;
  })));
});
