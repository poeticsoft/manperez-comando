
// https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/

let CACHE_NAME = 'playmotiv-pwa';

self.addEventListener(
  'install', 
  (event) => {

    event.waitUntil(
      caches
      .open(CACHE_NAME)
      .then(cache => cache.addAll([
        /* Cache files on install */ 
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