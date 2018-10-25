// Cache Version
var cacheName = 'reviewsApp-v1';
var images = [];
for (var i = 1; i <= 10; i++) {
  images.push(`./img/${i}.jpg`);
  images.push(`./img/${i}-l.jpg`);
};


// Install Service Worker
self.addEventListener('install', function(event){
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      cache.addAll(images); 
      return cache.addAll([
        './',
        './index.html',
        './restaurant.html',
        './js/dbhelper.js',
        './js/main.js',
        './js/restaurant_info.js',
        './data/restaurants.json',
        './css/styles.css',
      ]);
    })
  );
});


/**
 * Handle file requests
 * checks cache for requests
 * returns requests if in cache
 * put files in cache for time when network will not be available
 */

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function (response) { 
      return response || fetch(event.request).then(function (responseToFetch) { 
        return caches.open(cacheName).then(function (cache) { 
          cache.put(event.request, responseToFetch.clone());
          return responseToFetch;
        });
      });
    }).catch(function (error) {
      // logs error message if requested file is not found in cache and network connection is unavailable
      console.log('files not cached & no network connection', error); 
    })
  );
});


// deletes old caches
self.addEventListener('activate', function(event){
    event.waitUntil(
    caches.keys().then(function(allCaches) {
      return Promise.all(allCaches.map(function (thisCache){
        if(thisCache !== cacheName) {
          return caches.delete(thisCache);
        }
      }));
    })
  );
});
