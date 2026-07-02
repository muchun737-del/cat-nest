 // 初始化观察日记的 Canvas 画布
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
 
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.6; // 预留顶部导航，下半部分作为画布
 7.jpg
// 加载你刚刚交付给我的第三批物料：梦境小狐狸
const stickerImg = new Image();
stickerImg.src = 'assets/微信图片_20260702175113_1447_66.png';
 
let stickerX = 100;
let stickerY = 100;
let isDragging = false;
 
stickerImg.onload = () => {
  drawCanvas();
};
 
function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // 渲染带有白色手绘描边的小狐狸贴纸
  ctx.drawImage(stickerImg, stickerX, stickerY, 120, 100);
}
 
// 触摸与鼠标的物理拖拽监听
canvas.addEventListener('mousedown', (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  
  // 碰撞检测：判断是否点中了贴纸范围
  if (mouseX >= stickerX && mouseX <= stickerX + 120 && mouseY >= stickerY && mouseY <= stickerY + 100) {
    isDragging = true;
  }
});
 
canvas.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const rect = canvas.getBoundingClientRect();
    stickerX = e.clientX - rect.left - 60; // 居中对齐
    stickerY = e.clientY - rect.top - 50;
    drawCanvas(); // 实时渲染重绘，保证动效绝对顺滑
  }
});
 
window.addEventListener('mouseup', () => {
  isDragging = false;
  console.log('数据已固化。当前贴纸坐标：', stickerX, stickerY);
});
// 扩展之前的 app.js 核心逻辑
let stickerScale = 1.0;   // 默认缩放比例
let stickerAngle = 0;   // 默认旋转角度（弧度制）
 
// 监听移动端双指捏合（Pinch）或 PC 端鼠标滚轮事件
canvas.addEventListener('wheel', (e) => {
    if (isDragging) {
        e.preventDefault();
        
        // 1. 动态计算缩放：滚轮向上放大，向下缩小
        stickerScale += e.deltaY * -0.001;
        stickerScale = Math.min(Math.max(0.5, stickerScale), 2.5); // 限制缩放范围在 0.5 到 2.5 倍之间
 
        // 2. 模拟手账贴纸的微小物理阻尼旋转
        if (e.shiftKey) {
            stickerAngle += (e.deltaY * 0.005); // 按住 Shift 滚动鼠标可自由旋转贴纸
        }
 
        // 3. 触发全帧率实时重绘
        requestAnimationFrame(renderAdvancedCanvas);
    }
});
 
// 高级渲染函数：利用 Canvas 状态栈实现无损旋转与缩放
function renderAdvancedCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.save(); // 保存当前纯净的画布状态
    
    // 将画布原点平移到贴纸的中心点，这是实现精准旋转的关键
    ctx.translate(stickerX + 60, stickerY + 50);
    ctx.rotate(stickerAngle); // 执行弧度旋转
    ctx.scale(stickerScale, stickerScale); // 执行等比例缩放
    
    // 在变换后的局部坐标系中，完美的把小狐狸绘制在中心
    ctx.drawImage(stickerImg, -60, -50, 120, 100);
    
    ctx.restore(); // 恢复画布状态，防止污染接下来的其他组件
}
