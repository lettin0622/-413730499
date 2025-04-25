let notes = [];
let lockMenuVisibility = false; // 用於鎖定選單的可見性
let noteSymbols = ['♪', '♫', '♬', '♩', '𝄞']; // 音符圖案
let colors = ['#FBF8CC', '#FFCFD2', '#FDE4CF', '#F1C0E8', '#CFBAF0', '#A3C4F3', '#8EECF5', '#90DBF4', '#98F5E1'];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#001f54');
  
  // 產生 40 個音符的初始位置與屬性
  for (let i = 0; i < 40; i++) {
    notes.push({
      x: random(width),
      y: random(height),
      size: random(80, 150), // 音符變得更大
      color: random(colors),
      symbol: random(noteSymbols),
      speedX: random(-0.5, 0.5), // 水平漂浮速度
      speedY: random(-0.5, 0.5), // 垂直漂浮速度
      rotation: random(TWO_PI), // 初始旋轉角度
      rotationSpeed: random(0.001, 0.005) // 非常慢的旋轉速度
    });
  }
}

function draw() {
  background('#001f54'); // 確保背景不會累積
  
  for (let note of notes) {
    push();
    translate(note.x, note.y); // 移動到音符的位置
    rotate(note.rotation); // 旋轉音符
    fill(note.color);
    textSize(note.size);
    drawingContext.shadowBlur = 20; // 設定光暈效果
    drawingContext.shadowColor = note.color; // 光暈顏色與音符顏色一致
    text(note.symbol, 0, 0); // 繪製音符圖案
    pop();

    // 更新音符位置與旋轉
    note.x += note.speedX;
    note.y += note.speedY;
    note.rotation += note.rotationSpeed;

    // 如果音符超出畫面，從另一側進入
    if (note.x > width) note.x = 0;
    if (note.x < 0) note.x = width;
    if (note.y > height) note.y = 0;
    if (note.y < 0) note.y = height;
  }

  // 控制選單顯示與隱藏
  const menu = document.querySelector('.menu');
  if (menu) {
    menu.style.color = '#FFFFFF'; // 選單字體顏色改為白色
  }
  if (!lockMenuVisibility) { // 如果未鎖定選單可見性
    if (mouseY < 250) {
      menu.classList.add('visible');
    } else {
      menu.classList.remove('visible');
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// 鎖定選單可見性
function lockMenu() {
  lockMenuVisibility = true;
}

// 解鎖選單可見性
function unlockMenu() {
  lockMenuVisibility = false;
}

const iframe = document.querySelector('.content-frame');
iframe.onload = () => {
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  const introImage = iframeDoc.querySelector('.intro-image'); // 假設圖片有 intro-image 類別
  if (introImage) {
    introImage.style.width = '50%'; // 調整圖片大小
    introImage.style.height = 'auto'; // 保持比例
  }
};const homeTitle = document.querySelector('.home-title');

iframe.addEventListener('load', () => {
  if (iframe.src.includes('home.html')) {
    homeTitle.classList.remove('hidden');
  } else {
    homeTitle.classList.add('hidden');
  }
});

function hideIframe() {
  document.querySelector('.content-frame').style.display = 'none';
  document.querySelector('.home-title').classList.remove('hidden');
}

function showIframe() {
  document.querySelector('.content-frame').style.display = 'block';
  document.querySelector('.home-title').classList.add('hidden');
}

