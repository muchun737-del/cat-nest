const CACHE_NAME = 'cat-nest-v17';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/大底图.png',
  '/assets/头图-垫子.png',
  '/assets/头图-猫闭眼.png',
  '/assets/头图-猫睁眼.png',
  '/assets/icon.png',
  '/assets/泡泡.png',
  '/assets/藤蔓装饰.png',
  '/assets/星星挂绳.png',
  '/assets/入口-观察日记.png',
  '/assets/入口-小猫故事.png',
  '/assets/入口-碎碎念念.png',
  '/assets/入口-罐头鱼干.png',
  '/assets/装饰-云大.png',
  '/assets/装饰-云小.png',
  '/assets/装饰-星星.png',
  '/assets/装饰-枫叶红.png',
  '/assets/装饰-枫叶绿.png',
  '/assets/装饰-枫叶棕.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting(); // 强制新版本立刻接管，不准排队
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('大黑猫正在缓存 V11.0 终极魔法素材...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('大黑猫正在清除旧版本缓存:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});