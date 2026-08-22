const CACHE_NAME = "study-link-v3";

const urlsToCache = [
  "./",
  "./index.html",
  "./note.html",
  "./calendar.html",
  "./mypage.html",
  "./login.html",
  "./study.html",
  "./css/style.css",
  "./css/study.css",
  "./js/script.js",
  "./js/note.js",
  "./js/calendar.js",
  "./js/mypage.js",
  "./js/login.js",
  "./js/math.js",
  "./manifest.json",
  "./images/icon-192.png",
  "./images/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );

  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );

  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (event.request.method === "GET") {
          const responseClone = response.clone();

          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }

        return response;
      })
      .catch(() => caches.match(event.request))
  );
});