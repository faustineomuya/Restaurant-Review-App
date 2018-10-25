/**
 * Service worker registration
 */

if(navigator.serviceWorker) {
  navigator.serviceWorker.register('/serviceWorker.js').then(function(registrated) {
    console.log('Service Worker successfuly registrated');
  }).catch(function (error) {
    console.log('Service Worker not registrated', error);
  });
}
