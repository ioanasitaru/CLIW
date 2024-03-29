// importScripts('/cache-polyfill.js');
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('asle').then(function(cache) {
            // console.log("is this working?");
            return cache.addAll([
                'service-worker.min.js',
                '/html/index.html',
                '/html/score.html',
                '/css/about.min.css',
                '/css/index.min.css',
                '/css/score.min.css',
                '/img/favicon-96x96.png',
                '/img/favicon-32x32.png',
                '/img/favicon-16x16.png',
                '/img/japanese.jpg',
                '/img/level1.png',
                '/img/level2.png',
                '/img/level3.png',
                '/img/level4.png',
                '/img/logo.png',
                '/img/logo2.png',
                '/img/overlay.png',
                '/img/pic05.jpg',
                '/img/tsunami.jpg',
                '/js/DataService.min.js',
                '/js/PronunciationService.min.js',
                '/js/ModuleLoader.min.js',
                '/js/Score.min.js',
                '/components/draw/draw.html',
                '/components/draw/draw.min.css',
                '/components/draw/draw.min.js',
                '/components/quiz/quiz.html',
                '/components/quiz/quiz.min.css',
                '/components/quiz/quiz.min.js',
                'comp.json',
                'https://fonts.gstatic.com/s/roboto/v18/2tsd397wLxj96qwHyNIkxPesZW2xOQ-xsNqO47m55DA.woff2',
                'https://fonts.gstatic.com/s/roboto/v18/d-6IYplOFocCacKzxwXSOFtXRa8TVwTICgirnJhmVJw.woff2',
                'https://fonts.gstatic.com/s/roboto/v18/Hgo13k-tfSpn0qi1SFdUfVtXRa8TVwTICgirnJhmVJw.woff2',
                'https://fonts.gstatic.com/s/roboto/v18/CWB0XYA8bzo0kSThX0UTuA.woff2',
                'https://fonts.gstatic.com/s/roboto/v18/e7MeVAyvogMqFwwl61PKhBTbgVql8nDJpwnrE27mub0.woff2',
                'https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,500,700',
                '/fonts/fontawesome-webfont.ttf',
                '/fonts/fontawesome-webfont.woff',
                '/fonts/fontawesome-webfont.woff2',
                'manifest.json'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request)
                .catch(function(event) {
                    // console.log("Could not fetch data: ", event);
                    return caches.match(event.request);;
            })
        })
    );
});