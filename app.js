/**
 * app.js - 大黑猫与小花猫的猫窝 (V22 物理通铺与挂绳断层终极修复版)
 * 严格遵照霍漪总监要求：全动效精准校准、绝对不产生任何报错或省略
 */

document.addEventListener("DOMContentLoaded", () => {
  initBubbleBounce();
  initCatTouchInteraction();
  initAmbientClouds();
  initAmbientLeaves();
});

/**
 * 1. 气泡 Q 弹微交互控制器 (仅仅触发 .bubble-body 缩放，绝不动星星绳)
 */
function initBubbleBounce() {
  const bubbles = document.querySelectorAll(".bubble-body");

  bubbles.forEach((bubble) => {
    bubble.addEventListener("click", function () {
      this.classList.remove("is-bouncing");
      void this.offsetWidth; // 触发浏览器的重排 (Reflow)，确保连续点击瞬间重放
      this.classList.add("is-bouncing");
    });

    bubble.addEventListener("animationend", function (e) {
      if (e.animationName === "bubble-bounce") {
        this.classList.remove("is-bouncing");
      }
    });
  });
}

/**
 * 2. 主图黑猫“抚摸睁眼”交互控制器 (5秒定时平滑回落)
 */
function initCatTouchInteraction() {
  const mainCat = document.getElementById("main-cat");
  if (!mainCat) return;

  const closedEyeSrc =
    "https://cat-nest-sandy.vercel.app/assets/头图-猫闭眼.png";
  const openEyeSrc = "https://cat-nest-sandy.vercel.app/assets/头图-猫睁眼.png";

  let isCatAwake = false;
  let sleepTimer = null;

  mainCat.addEventListener("click", () => {
    if (sleepTimer) {
      clearTimeout(sleepTimer);
    }

    if (!isCatAwake) {
      mainCat.src = openEyeSrc;
      isCatAwake = true;
    }

    sleepTimer = setTimeout(() => {
      mainCat.src = closedEyeSrc;
      isCatAwake = false;
      sleepTimer = null;
    }, 5000);
  });
}

/**
 * 3. 6 朵云朵自然漫步生成系统 (大幅提速：7s~11s 周期，游动更活跃)
 */
function initAmbientClouds() {
  const cloudLayer = document.getElementById("cloud-layer");
  if (!cloudLayer) return;

  const cloudConfigs = [
    {
      src: "https://cat-nest-sandy.vercel.app/assets/装饰-云大.png",
      top: "16dvh",
      left: "-5%",
      width: "150px",
      opacity: 0.88,
      duration: 8,
      delay: -2,
    },
    {
      src: "https://cat-nest-sandy.vercel.app/assets/装饰-云小.png",
      top: "28dvh",
      left: "68%",
      width: "100px",
      opacity: 0.7,
      duration: 7,
      delay: -5,
    },
    {
      src: "https://cat-nest-sandy.vercel.app/assets/装饰-云大.png",
      top: "44dvh",
      left: "12%",
      width: "170px",
      opacity: 0.92,
      duration: 10,
      delay: -3,
    },
    {
      src: "https://cat-nest-sandy.vercel.app/assets/装饰-云小.png",
      top: "58dvh",
      left: "76%",
      width: "95px",
      opacity: 0.75,
      duration: 9,
      delay: -7,
    },
    {
      src: "https://cat-nest-sandy.vercel.app/assets/装饰-云大.png",
      top: "70dvh",
      left: "4%",
      width: "140px",
      opacity: 0.85,
      duration: 11,
      delay: -6,
    },
    {
      src: "https://cat-nest-sandy.vercel.app/assets/装饰-云小.png",
      top: "80dvh",
      left: "48%",
      width: "115px",
      opacity: 0.78,
      duration: 8,
      delay: -4,
    },
  ];

  cloudConfigs.forEach((config) => {
    const img = document.createElement("img");
    img.src = config.src;
    img.className = "ambient-cloud";
    img.style.top = config.top;
    img.style.left = config.left;
    img.style.width = config.width;
    img.style.opacity = config.opacity;
    img.style.animationDuration = `${config.duration}s`;
    img.style.animationDelay = `${config.delay}s`;
    cloudLayer.appendChild(img);
  });
}

/**
 * 4. 10 片枫叶自然飘落生成系统 (极度放缓：16s~23s 落地周期，呈现秋意慵懒)
 */
function initAmbientLeaves() {
  const leafLayer = document.getElementById("leaf-layer");
  if (!leafLayer) return;

  const leafTypes = [
    "https://cat-nest-sandy.vercel.app/assets/装饰-枫叶红.png",
    "https://cat-nest-sandy.vercel.app/assets/装饰-枫叶绿.png",
    "https://cat-nest-sandy.vercel.app/assets/装饰-枫叶棕.png",
  ];

  const totalLeaves = 10;

  for (let i = 0; i < totalLeaves; i++) {
    const img = document.createElement("img");
    const randomType = leafTypes[i % leafTypes.length];
    img.src = randomType;
    img.className = "ambient-leaf";

    const startLeft = Math.floor(Math.random() * 86) + 4;
    const size = Math.floor(Math.random() * 14) + 22;
    const fallX = Math.floor(Math.random() * 180) - 60;
    const fallRot = Math.floor(Math.random() * 360) + 180;
    const duration = Math.floor(Math.random() * 8) + 16; // 大幅放缓至 16-23s
    const delay = -(Math.random() * 18);

    img.style.left = `${startLeft}%`;
    img.style.width = `${size}px`;
    img.style.setProperty("--fall-x", `${fallX}px`);
    img.style.setProperty("--fall-rot", `${fallRot}deg`);
    img.style.animationDuration = `${duration}s`;
    img.style.animationDelay = `${delay}s`;

    leafLayer.appendChild(img);
  }
}
