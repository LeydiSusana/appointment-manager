const CACHE_NAME = "appointment-manager-v1";
const urlsToCache = [
    "./",
    "./index.php",
    "./css/styles.css",
    "./doctores.png",
    "./manifest.json",
    "./js/main.js",
    "./js/loading.js",
    "./doctores.php",
    "./appointment.php",
    "./dashboard.php",
    "./logout.php",
    "./register.php",
    "./confirm_appointment.php",
    "./config.php"
];
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Archivos en caché");
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("activate", (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});