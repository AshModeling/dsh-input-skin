// 生成圆角矩形巡游路径关键帧: 线段中心沿圆角弧线平滑转弯, rotate 随切线渐变
// 旋转全程单向递增(每圈 +360): 0%=540, 100%=900, 二者视觉等价 → 无缝循环
const L = 40 // 线段长度 px
const T = 2  // 线段半高 px

// 锚点: [x%, y%, 顺向旋转角 deg]
const A = [
  [50, 0, 540],      // 0 顶中
  [2.5, 0, 540],     // 1 顶左端
  [0.73, 0.73, 585], // 2 左上弧45°
  [0, 2.5, 630],     // 3 左上角
  [0, 97.5, 630],    // 4 左下角
  [0.73, 99.27, 675],// 5 左下弧45°
  [2.5, 100, 720],   // 6 底左端
  [97.5, 100, 720],  // 7 底右端
  [99.27, 99.27, 765], // 8 右下弧45°
  [100, 97.5, 810],  // 9 右下角
  [100, 2.5, 810],   // 10 右上角
  [99.27, 0.73, 855],// 11 右上弧45°
  [97.5, 0, 900],    // 12 顶右端
]
const SEGS = [
  [0, 1, 4], [1, 2, 2], [2, 3, 2], [3, 4, 4], [4, 5, 2], [5, 6, 2],
  [6, 7, 4], [7, 8, 2], [8, 9, 2], [9, 10, 4], [10, 11, 2], [11, 12, 2], [12, 0, 4],
]
const total = SEGS.reduce((s, e) => s + e[2], 0)

function f3(n) { return Math.round(n * 1000) / 1000 }
function posExpr(v, half) {
  if (v === 0) return '-' + half + 'px'
  if (v === 100) return 'calc(100% - ' + half + 'px)'
  return 'calc(' + f3(v) + '% - ' + half + 'px)'
}

let frames = []
let fi = 0
for (const [a, b, n] of SEGS) {
  const closeLoop = (b === 0)
  for (let k = 0; k < n; k++) {
    const t = k / n
    const x = A[a][0] + (A[b][0] - A[a][0]) * t
    const y = A[a][1] + (A[b][1] - A[a][1]) * t
    const r = closeLoop ? A[a][2] : (A[a][2] + (A[b][2] - A[a][2]) * t)
    frames.push(f3(fi / total * 100) + '%{left:' + posExpr(f3(x), L / 2) + ';top:' + posExpr(f3(y), T) + ';transform:rotate(' + f3(r) + 'deg);}')
    fi++
  }
}
frames.push('100%{left:calc(50% - ' + (L / 2) + 'px);top:-' + T + 'px;transform:rotate(900deg);}')
console.log(frames.join('\n'))
