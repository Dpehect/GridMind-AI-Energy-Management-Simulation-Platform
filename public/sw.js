const SHELL = "gridmind-shell-v1";
const OFFLINE = ["/", "/dashboard", "/dashboard/analytics", "/dashboard/operations", "/dashboard/reports"];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(SHELL).then(cache => cache.addAll(OFFLINE)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const clone = response.clone();
        caches.open(SHELL).then(cache => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request).then(hit => hit || caches.match("/dashboard")))
  );
});
