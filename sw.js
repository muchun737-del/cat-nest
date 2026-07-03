const CACHE_NAME = 'cat-nest-v2';
// 替换为 V2.0 真正存在的新资产路径
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/大底图.png',
  '/assets/头图-垫子.png',
  '/assets/头图-猫闭眼.png',
  '/assets/头图-猫睁眼.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting(); // 强制新版本立刻接管，不准排队
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('大黑猫正在缓存 V2.0 终极魔法素材...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (event) => {
  // 核心杀招：无情剿灭 V1.0 的所有旧缓存
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('旧猫窝缓存已彻底清理。');
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});