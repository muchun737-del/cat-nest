pngconst CACHE_NAME = 'cat-nest-v1';
// 将你下午发给我的第一批核心视觉资产全部锁进本地缓存
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/7.jpg', // 燕麦色背景纸
  '/assets/微信图片_20260702181201_1460_66.png', // 闭眼主图
  '/assets/已移除背景的4.png' // 日记本图标
];
 
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('大黑猫正在拼命帮你缓存绘本素材...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});
 
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // 优先从本地缓存读取，实现丝滑的离线无缝加载
      return response || fetch(event.request);
    })
  );
});
