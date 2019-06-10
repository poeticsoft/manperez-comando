
// https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/
// https://itnext.io/service-workers-your-first-step-towards-progressive-web-apps-pwa-e4e11d1a2e85
let CACHE_NAME = 'playmotiv-pwa';

self.addEventListener(
  'install', 
  (event) => {

    event.waitUntil(
      caches
      .open(CACHE_NAME)
      .then(cache => cache.addAll([
        '/'
      ])) 
    );
  }
);

self.addEventListener(
  'activate', 
  function (event) {

  }
);

self.addEventListener(
  'fetch', 
  function (event) {

    event.respondWith(
      caches
      .match(event.request)
      .then(function(response) {

        return response || fetch(event.request);
      })
    );
  }
);