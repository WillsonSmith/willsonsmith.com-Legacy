/** Service Worker
 * Docs: https://developers.google.com/web/ilt/pwa/introduction-to-service-worker
 */

const filesToCache = [
  '/',
  'index.html',
  'assets/css/main.css',
  'assets/js/index.js',
  'assets/static/icon.png',
  'assets/vendor/shoelace/dist/themes/light.css',
  'assets/vendor/shoelace/dist/themes/dark.css',
  /**
   * Add caching for each imported shoelace component
   */
];

// Todo: Automatically increment version number
const staticCacheName = 'pages-cache-v1';
self.addEventListener('install', (event) => {
  // Perform install steps
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('Activating new service worker...');
  const cacheAllowlist = [staticCacheName];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        if (response) {
          console.log('Found ', event.request.url, ' in cache');
          return response;
        }
        console.log('Network request for ', event.request.url);
        return fetch(event.request).then((response) => {
          // TODO 5 - Respond with custom 404 page
          return caches.open(staticCacheName).then((cache) => {
            cache.put(event.request.url, response.clone());
            return response;
          });
        });
      })
      .catch((error) => {
        // TODO 6 - Respond with custom offline page
      })
  );
});
