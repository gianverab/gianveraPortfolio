self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('static-cache-v1')
    .then(function(cache) {
      return cache.addAll([
        '.',
        'index.html',
        'css/app.min.css',
        'https://fonts.googleapis.com/css?family=Montserrat:500|Open+Sans:300,400|Quattrocento',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
        'js/app.min.js',
        'img/touch/icon-128x128.png',
        'img/touch/icon-192x192.png',
        'img/touch/icon-256x256.png',
        'img/touch/icon-384x384.png',
        'img/touch/icon-512x512.png',
        'img/ajax.svg',
        'img/avatar_gianvera.jpg',
        'img/css.svg',
        'img/firebase.svg',
        'img/gulp.svg',
        'img/hero_bg.jpg',
        'img/html.svg',
        'img/javascript.svg',
        'img/jquery.svg',
        'img/logo-dark.svg',
        'img/logo-grey.svg',
        'img/postcss.svg',
        'img/project_gianvera.jpg',
        'img/project_imcg.jpg',
        'img/project_sidesys.jpg',
        'img/project_tiendalatam.jpg',
        'img/project_valvoline.jpg',
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request)
  .then(function(response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});