const CACHE_NAME = "study-link-v1";

const urlsToCache = [
  "./",
  "./index.html",
  "./note.html",
  "./calendar.html",
  "./mypage.html",
  "./login.html",
  "./css/style.css",
  "./js/script.js",
  "./js/note.js",
  "./js/calendar.js",
  "./js/mypage.js",
  "./js/login.js",
  "./manifest.json",
  "./images/icon-192.png",
  "./images/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});