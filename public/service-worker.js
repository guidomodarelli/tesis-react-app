const doCache = false;
const CACHE_NAME = "pwa-cache";

self.addEventListener("activate", function (event) {
  const cacheWhiteList = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function (keyList) {
      Promise.all(
        keyList.map(function (key) {
          if (!cacheWhiteList.includes(key)) {
            console.log(`Deleting cache: ${key}`);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener("install", function (event) {
  if (doCache) {
    event.waitUntil(
      caches.open(CACHE_NAME).then(function (cache) {
        fetch("manifest.json")
          .then(function (response) {
            return response.json();
          })
          .then(function (assets) {
            const urlsToCache = ["/", assets["bundle.js"]];
            cache.addAll(urlsToCache);
            console.log("cached");
          });
      })
    );
  }
});

self.addEventListener("fetch", function (event) {
  if (doCache) {
    event.respondWith(
      caches.match(event.request).then(function (reponse) {
        return reponse || fetch(event.request);
      })
    );
  }
});
