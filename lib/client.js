window.__ModuleLoader__.load({
  id: '@linxin666/dsh-light-theater',
  factory: (require) => {
    const React = require('react')
    const inject = ['slots', 'locale']

    const STORAGE_KEY = 'dsh-light-theater:enabled'

    const CSS = `
/* ============================================================
 * ★ 调参区 ★ —— 只改下面这些值，改完 Ctrl+F5 刷新生效
 * ============================================================ */
body[data-input-skin="on"]{
  /* ---------- 内部光束(输入框内部左右两条光) ---------- */
  --lt-beam-l:#22d3ee;   /* 左束颜色(默认青) */
  --lt-beam-r:#8b5cf6;   /* 右束颜色(默认紫) */
  --lt-beam-l2:#ff4d6d;  /* 大周期第二组·左束颜色(默认红) */
  --lt-beam-r2:#3b82f6;  /* 大周期第二组·右束颜色(默认蓝) */
  --lt-beam-flow:6s;     /* 光束扩散一个来回的时长(越小越快) */
  --lt-beam-cycle:24s;   /* 配色大周期时长(第一组×2轮→第二组×2轮) */
  --lt-beam-width:50%;   /* 光束宽度(占输入框宽度百分比) */

  /* ---------- 外部流动(边框上巡游的线段光) ---------- */
  --lt-seg-c1:#12b6d6;   /* 线段颜色①(默认深青) */
  --lt-seg-c2:#2d6cf0;   /* 线段颜色②(默认蓝) */
  --lt-seg-c3:#9333ea;   /* 线段颜色③(默认紫) */
  --lt-seg-color:4s;     /* 线段颜色循环一圈时长(越小越快) */
  --lt-seg-lap:16s;      /* 线段绕边框一整圈时长(越小越快) */
  --lt-seg-len:40px;     /* 线段长度(改这里,路径自动跟随) */

  /* ---------- 呼吸 ---------- */
  --lt-breathe:2.4s;     /* 线段呼吸脉动时长 */
}

/* ===== 内部:双光束向两侧扩散 + 青紫×2→红蓝×2 大周期配色 ===== */
@property --dsh-beam-l{syntax:'<color>';inherits:false;initial-value:#22d3ee;}
@property --dsh-beam-r{syntax:'<color>';inherits:false;initial-value:#8b5cf6;}
@keyframes dsh-light-theater-flow{
  0%{background-position:50% 50%,50% 50%,50% 50%,0 0;}
  50%{background-position:50% 50%,0% 50%,100% 50%,0 0;}
  100%{background-position:50% 50%,50% 50%,50% 50%,0 0;}
}
@keyframes dsh-beam-color{
  0%,25%,49%{--dsh-beam-l:var(--lt-beam-l);--dsh-beam-r:var(--lt-beam-r);}
  51%,75%,99%{--dsh-beam-l:var(--lt-beam-l2);--dsh-beam-r:var(--lt-beam-r2);}
  100%{--dsh-beam-l:var(--lt-beam-l);--dsh-beam-r:var(--lt-beam-r);}
}
body[data-input-skin="on"] [data-composer-card]{
  position:relative;
  border-radius:14px;
  background-image:
    linear-gradient(90deg,
      rgba(255,255,255,0) 0%,
      rgba(255,255,255,.09) 38%,
      rgba(255,255,255,.16) 50%,
      rgba(255,255,255,.09) 62%,
      rgba(255,255,255,0) 100%),
    linear-gradient(90deg,
      rgba(255,255,255,0) 0%,
      color-mix(in srgb,var(--dsh-beam-l) 33%,transparent) 25%,
      color-mix(in srgb,var(--dsh-beam-l) 60%,transparent) 50%,
      color-mix(in srgb,var(--dsh-beam-l) 33%,transparent) 75%,
      rgba(255,255,255,0) 100%),
    linear-gradient(90deg,
      rgba(255,255,255,0) 0%,
      color-mix(in srgb,var(--dsh-beam-r) 33%,transparent) 25%,
      color-mix(in srgb,var(--dsh-beam-r) 60%,transparent) 50%,
      color-mix(in srgb,var(--dsh-beam-r) 33%,transparent) 75%,
      rgba(255,255,255,0) 100%),
    linear-gradient(180deg,
      color-mix(in srgb,var(--dsw-alias-bg-layer-2,#10101a) 60%,#ffffff 40%),
      color-mix(in srgb,var(--dsw-alias-bg-layer-1,#15151a) 85%,#000000 15%),
      var(--dsw-alias-bg-layer-1,#15151a));
  background-size:24% 100%,var(--lt-beam-width) 100%,var(--lt-beam-width) 100%,auto;
  background-position:50% 50%,50% 50%,50% 50%,0 0;
  background-repeat:no-repeat,no-repeat,no-repeat,repeat;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.08),
    inset 0 -1px 0 rgba(0,0,0,.14),
    inset 0 0 0 1px color-mix(in srgb,var(--dsw-alias-label-primary,#e9eef9) 7%,transparent),
    0 2px 10px rgba(0,0,0,.3);
  animation:
    dsh-light-theater-flow var(--lt-beam-flow) ease-in-out infinite,
    dsh-beam-color var(--lt-beam-cycle) linear infinite;
}
body[data-input-skin="on"] [data-composer-card]::before{
  content:'';
  position:absolute;
  inset:1px;
  border-radius:13px;
  box-shadow:
    inset 0 0 0 1px color-mix(in srgb,#ffffff 10%,transparent),
    inset 0 0 6px color-mix(in srgb,#ffffff 5%,transparent);
  pointer-events:none;
  z-index:1;
}
/* ===== 两段线段光:顶部中间出发,沿边框圆角弧线平滑绕行(16s),颜色循环(4s) ===== */
@property --dsh-seg-c{syntax:'<color>';inherits:false;initial-value:#12b6d6;}
@keyframes dsh-seg-color{
  0%{--dsh-seg-c:var(--lt-seg-c1);}
  33.333%{--dsh-seg-c:var(--lt-seg-c2);}
  66.667%{--dsh-seg-c:var(--lt-seg-c3);}
  100%{--dsh-seg-c:var(--lt-seg-c1);}
}
@keyframes dsh-flow-path{
  0%{left:calc(50% - var(--lt-seg-len) / 2);top:-2px;transform:rotate(540deg);}
  3.125%{left:calc(42.083% - var(--lt-seg-len) / 2);top:-2px;transform:rotate(540deg);}
  6.25%{left:calc(34.167% - var(--lt-seg-len) / 2);top:-2px;transform:rotate(540deg);}
  9.375%{left:calc(26.25% - var(--lt-seg-len) / 2);top:-2px;transform:rotate(540deg);}
  12.5%{left:calc(18.333% - var(--lt-seg-len) / 2);top:-2px;transform:rotate(540deg);}
  15.625%{left:calc(10.417% - var(--lt-seg-len) / 2);top:-2px;transform:rotate(540deg);}
  18.75%{left:calc(2.5% - var(--lt-seg-len) / 2);top:-2px;transform:rotate(540deg);}
  21.875%{left:calc(0.73% - var(--lt-seg-len) / 2);top:calc(0.73% - 2px);transform:rotate(585deg);}
  25%{left:-20px;top:calc(2.5% - 2px);transform:rotate(630deg);}
  28.125%{left:-20px;top:calc(50% - 2px);transform:rotate(630deg);}
  31.25%{left:-20px;top:calc(97.5% - 2px);transform:rotate(630deg);}
  34.375%{left:calc(0.73% - var(--lt-seg-len) / 2);top:calc(99.27% - 2px);transform:rotate(675deg);}
  37.5%{left:calc(2.5% - var(--lt-seg-len) / 2);top:calc(100% - 2px);transform:rotate(720deg);}
  40.625%{left:calc(14.375% - var(--lt-seg-len) / 2);top:calc(100% - 2px);transform:rotate(720deg);}
  43.75%{left:calc(26.25% - var(--lt-seg-len) / 2);top:calc(100% - 2px);transform:rotate(720deg);}
  46.875%{left:calc(38.125% - var(--lt-seg-len) / 2);top:calc(100% - 2px);transform:rotate(720deg);}
  50%{left:calc(50% - var(--lt-seg-len) / 2);top:calc(100% - 2px);transform:rotate(720deg);}
  53.125%{left:calc(61.875% - var(--lt-seg-len) / 2);top:calc(100% - 2px);transform:rotate(720deg);}
  56.25%{left:calc(73.75% - var(--lt-seg-len) / 2);top:calc(100% - 2px);transform:rotate(720deg);}
  59.375%{left:calc(85.625% - var(--lt-seg-len) / 2);top:calc(100% - 2px);transform:rotate(720deg);}
  62.5%{left:calc(97.5% - var(--lt-seg-len) / 2);top:calc(100% - 2px);transform:rotate(720deg);}
  65.625%{left:calc(99.27% - var(--lt-seg-len) / 2);top:calc(99.27% - 2px);transform:rotate(765deg);}
  68.75%{left:calc(100% - var(--lt-seg-len) / 2);top:calc(97.5% - 2px);transform:rotate(810deg);}
  71.875%{left:calc(100% - var(--lt-seg-len) / 2);top:calc(50% - 2px);transform:rotate(810deg);}
  75%{left:calc(100% - var(--lt-seg-len) / 2);top:calc(2.5% - 2px);transform:rotate(810deg);}
  78.125%{left:calc(99.27% - var(--lt-seg-len) / 2);top:calc(0.73% - 2px);transform:rotate(855deg);}
  81.25%{left:calc(97.5% - var(--lt-seg-len) / 2);top:-2px;transform:rotate(900deg);}
  84.375%{left:calc(89.583% - var(--lt-seg-len) / 2);top:-2px;transform:rotate(900deg);}
  87.5%{left:calc(81.667% - var(--lt-seg-len) / 2);top:-2px;transform:rotate(900deg);}
  90.625%{left:calc(73.75% - var(--lt-seg-len) / 2);top:-2px;transform:rotate(900deg);}
  93.75%{left:calc(65.833% - var(--lt-seg-len) / 2);top:-2px;transform:rotate(900deg);}
  96.875%{left:calc(57.917% - var(--lt-seg-len) / 2);top:-2px;transform:rotate(900deg);}
  100%{left:calc(50% - var(--lt-seg-len) / 2);top:-2px;transform:rotate(900deg);}
}
@keyframes dsh-flow-breathe{
  0%,100%{opacity:.6;filter:brightness(.9);}
  50%{opacity:1;filter:brightness(1.25);}
}
.dsh-role-flow-a,.dsh-role-flow-b{
  position:absolute;width:var(--lt-seg-len);height:4px;border-radius:2px;
  pointer-events:none;z-index:6;
  background:linear-gradient(90deg,color-mix(in srgb,var(--dsh-seg-c,#12b6d6) 20%,transparent),var(--dsh-seg-c,#12b6d6) 38%,#fff 50%,var(--dsh-seg-c,#12b6d6) 62%,color-mix(in srgb,var(--dsh-seg-c,#12b6d6) 20%,transparent));
  box-shadow:0 0 9px 3px color-mix(in srgb,var(--dsh-seg-c,#12b6d6) 70%,transparent);
}
.dsh-role-flow-a{animation:dsh-flow-path var(--lt-seg-lap) linear infinite,dsh-seg-color var(--lt-seg-color) linear infinite,dsh-flow-breathe var(--lt-breathe) ease-in-out infinite;}
.dsh-role-flow-b{animation:dsh-flow-path var(--lt-seg-lap) linear infinite reverse,dsh-seg-color var(--lt-seg-color) linear infinite,dsh-flow-breathe var(--lt-breathe) ease-in-out infinite;}
body:not([data-input-skin="on"]) .dsh-role-flow-a,body:not([data-input-skin="on"]) .dsh-role-flow-b,body:not([data-input-border="on"]) .dsh-role-flow-a,body:not([data-input-border="on"]) .dsh-role-flow-b{display:none}
/* ===== 发送/停止按钮:彩渐变图标按钮(照片风格,只要图标不要文字) ===== */
body[data-input-skin="on"] [data-composer-card] button:is(
  [aria-label="发送消息"],[aria-label="发送"],[aria-label="Send message"],[aria-label="Send"],
  [aria-label="停止"],[aria-label="停止生成"],[aria-label="Stop"],[aria-label="Stop generating"]
){
  cursor:pointer;
  padding:9px;
  border:none;
  border-radius:12px;
  background:
    linear-gradient(180deg,
      #0d0d10 0%,#0d0d10 25%,
      rgba(13,13,16,.85) 40%,
      rgba(13,13,16,.55) 55%,
      rgba(13,13,16,.2) 70%,
      rgba(13,13,16,0) 82%),
    linear-gradient(90deg,#2ee6c9,#ff4d9e,#6d5cff);
  position:relative;
  display:flex;
  align-items:center;
  justify-content:center;
  color:#fff;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.25),0 2px 8px rgba(0,0,0,.25);
  transition:filter .15s,opacity .15s;
}
body[data-input-skin="on"] [data-composer-card] button:is(
  [aria-label="发送消息"],[aria-label="发送"],[aria-label="Send message"],[aria-label="Send"],
  [aria-label="停止"],[aria-label="停止生成"],[aria-label="Stop"],[aria-label="Stop generating"]
):disabled{
  cursor:default;
  opacity:1;
}
body[data-input-skin="on"] [data-composer-card] button:is(
  [aria-label="发送消息"],[aria-label="发送"],[aria-label="Send message"],[aria-label="Send"],
  [aria-label="停止"],[aria-label="停止生成"],[aria-label="Stop"],[aria-label="Stop generating"]
):hover:not(:disabled){
  filter:brightness(1.08);
}
body[data-input-skin="on"] [data-composer-card] button:is(
  [aria-label="发送消息"],[aria-label="发送"],[aria-label="Send message"],[aria-label="Send"],
  [aria-label="停止"],[aria-label="停止生成"],[aria-label="Stop"],[aria-label="Stop generating"]
):active:not(:disabled){
  filter:brightness(.9);
}
body[data-input-skin="on"] [data-composer-card] button:is(
  [aria-label="发送消息"],[aria-label="发送"],[aria-label="Send message"],[aria-label="Send"],
  [aria-label="停止"],[aria-label="停止生成"],[aria-label="Stop"],[aria-label="Stop generating"]
) svg{display:none;}
body[data-input-skin="on"] [data-composer-card] button:is(
  [aria-label="发送消息"],[aria-label="发送"],[aria-label="Send message"],[aria-label="Send"],
  [aria-label="停止"],[aria-label="停止生成"],[aria-label="Stop"],[aria-label="Stop generating"]
)::before{
  content:"";
  width:16px;height:16px;
  background:currentColor;
  -webkit-mask:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="black" d="M12 3l1.9 6.1L20 11l-6.1 1.9L12 19l-1.9-6.1L4 11l6.1-1.9z"/><path fill="black" d="M19.5 16.5l.6 1.9 1.9.6-1.9.6-.6 1.9-.6-1.9-1.9-.6 1.9-.6z"/></svg>') center/contain no-repeat;
  mask:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="black" d="M12 3l1.9 6.1L20 11l-6.1 1.9L12 19l-1.9-6.1L4 11l6.1-1.9z"/><path fill="black" d="M19.5 16.5l.6 1.9 1.9.6-1.9.6-.6 1.9-.6-1.9-1.9-.6 1.9-.6z"/></svg>') center/contain no-repeat;
}
`

    const tagId = '@linxin666/dsh-light-theater/style'
    if (typeof document !== 'undefined') {
      // 先移除旧 style,避免热更新后旧 CSS 残留
      document.querySelectorAll('style[data-plugin-css="' + tagId + '"]').forEach((s) => s.remove())
      const tag = document.createElement('style')
      tag.dataset.plugin = '@linxin666/dsh-light-theater'
      tag.dataset.pluginCss = tagId
      tag.textContent = CSS
      document.head.appendChild(tag)
    }

    const zh = {
      'title': '输入框皮肤',
      'hint': '输入框小剧场:内部双光束扩散 + 边框线段圆角巡游。总开关控制全部效果;下面的「边框线段」开关只控制边框上巡游的两段线段光,关掉后保留内部光束。展开「调整参数」可实时改颜色/速度/长度。',
      'borderTitle': '边框线段'
    }
    const en = {
      'title': 'Input skin',
      'hint': 'Composer mini-theater: inner beams spread + border light segments cruise on rounded arcs. The master toggle controls everything; the "Border segments" toggle below controls only the two segments cruising along the border (inner beams stay). Expand "Tune parameters" to adjust colors/speeds/length live.',
      'borderTitle': 'Border segments'
    }

    function readEnabled() { try { const v = window.localStorage.getItem(STORAGE_KEY); return v === null ? true : v !== 'off' } catch { return true } }
    function writeEnabled(on) { try { window.localStorage.setItem(STORAGE_KEY, on ? 'on' : 'off') } catch {} }
    function applyAttr() {
      try { document.body.setAttribute('data-input-skin', readEnabled() ? 'on' : 'off') } catch {}
    }
    applyAttr()

    // ============ 边框线段独立开关(只控制沿边框巡游的两段线段光) ============
    const BORDER_KEY = 'dsh-light-theater:border'
    function readBorder() { try { const v = window.localStorage.getItem(BORDER_KEY); return v === null ? true : v !== 'off' } catch { return true } }
    function writeBorder(on) { try { window.localStorage.setItem(BORDER_KEY, on ? 'on' : 'off') } catch {} }
    function applyBorderAttr() {
      try { document.body.setAttribute('data-input-border', readBorder() ? 'on' : 'off') } catch {}
    }
    applyBorderAttr()

    // ============ 调整面板:参数定义 / 持久化 / 应用 ============
    const PARAMS_KEY = 'dsh-light-theater:params'
    const PARAM_DEFAULTS = {
      beamL: '#22d3ee', beamR: '#8b5cf6', beamL2: '#ff4d6d', beamR2: '#3b82f6',
      segC1: '#12b6d6', segC2: '#2d6cf0', segC3: '#9333ea',
      beamFlow: 6, beamCycle: 24, beamWidth: 50,
      segColor: 4, segLap: 16, segLen: 40, breathe: 2.4,
    }
    const PARAM_VARS = {
      beamL: '--lt-beam-l', beamR: '--lt-beam-r', beamL2: '--lt-beam-l2', beamR2: '--lt-beam-r2',
      segC1: '--lt-seg-c1', segC2: '--lt-seg-c2', segC3: '--lt-seg-c3',
      beamFlow: '--lt-beam-flow', beamCycle: '--lt-beam-cycle', beamWidth: '--lt-beam-width',
      segColor: '--lt-seg-color', segLap: '--lt-seg-lap', segLen: '--lt-seg-len', breathe: '--lt-breathe',
    }
    const PARAM_DEFS = [
      { key: 'beamL', label: '左光颜色', group: '内部光束', type: 'color' },
      { key: 'beamR', label: '右光颜色', group: '内部光束', type: 'color' },
      { key: 'beamL2', label: '第二组·左光颜色', group: '内部光束', type: 'color' },
      { key: 'beamR2', label: '第二组·右光颜色', group: '内部光束', type: 'color' },
      { key: 'segC1', label: '线段颜色 ①', group: '边框线段', type: 'color' },
      { key: 'segC2', label: '线段颜色 ②', group: '边框线段', type: 'color' },
      { key: 'segC3', label: '线段颜色 ③', group: '边框线段', type: 'color' },
      { key: 'beamFlow', label: '光束扩散一个来回', group: '内部光束', type: 'range', min: 2, max: 12, step: 0.5, unit: 's' },
      { key: 'beamCycle', label: '配色大周期', group: '内部光束', type: 'range', min: 8, max: 60, step: 2, unit: 's' },
      { key: 'beamWidth', label: '光束宽度', group: '内部光束', type: 'range', min: 20, max: 80, step: 5, unit: '%' },
      { key: 'segColor', label: '颜色循环一圈', group: '边框线段', type: 'range', min: 1, max: 12, step: 0.5, unit: 's' },
      { key: 'segLap', label: '绕边框一整圈', group: '边框线段', type: 'range', min: 6, max: 40, step: 1, unit: 's' },
      { key: 'segLen', label: '线段长度', group: '边框线段', type: 'range', min: 20, max: 90, step: 2, unit: 'px' },
      { key: 'breathe', label: '线段呼吸脉动', group: '边框线段', type: 'range', min: 0.8, max: 6, step: 0.2, unit: 's' },
    ]
    const PARAM_GROUP_META = {
      '内部光束': '输入框内部左右两条光,向两侧扩散再收回;每 24s 切换一组配色(青紫 ×2 → 红蓝 ×2)',
      '边框线段': '两段线段光沿输入框边框圆角巡游一整圈,颜色按 青 → 蓝 → 紫 循环;数值越小动得越快',
    }
    function readParams() { try { return { ...PARAM_DEFAULTS, ...JSON.parse(window.localStorage.getItem(PARAMS_KEY) || '{}') } } catch { return { ...PARAM_DEFAULTS } } }
    function saveParams(p) { try { window.localStorage.setItem(PARAMS_KEY, JSON.stringify(p)) } catch {} }
    function applyParamValue(key, value) {
      try {
        const def = PARAM_DEFS.find((d) => d.key === key)
        const css = (def && def.unit) ? String(value) + def.unit : String(value)
        document.body.style.setProperty(PARAM_VARS[key], css)
      } catch {}
    }
    function applyAllParams() { const p = readParams(); for (const k in PARAM_VARS) applyParamValue(k, p[k]) }
    applyAllParams()

    const h = React.createElement
    const styles = {
      group: { borderBottom: '1px solid var(--dsw-alias-border-l2)', display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px 0' },
      titleRow: { display: 'flex', alignItems: 'center', gap: '10px' },
      title: { color: 'var(--dsw-alias-label-primary)', fontSize: '14px', lineHeight: '22px', flex: 1 },
      hint: { color: 'var(--dsw-alias-label-tertiary)', fontSize: '12px', lineHeight: '18px' },
      toggle: { position: 'relative', width: '38px', height: '22px', borderRadius: '999px', border: '1px solid var(--dsw-alias-border-l2)', background: 'var(--dsw-alias-bg-layer-2)', cursor: 'pointer', transition: 'all .15s', boxSizing: 'border-box', flex: 'none' },
      toggleOn: { background: '#4d86f8', borderColor: '#4d86f8' },
      knob: { position: 'absolute', top: '2px', left: '2px', width: '16px', height: '16px', borderRadius: '50%', background: '#fff', transition: 'left .15s' },
      knobOn: { left: '18px' },
      collapseBtn: { display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 10px', borderRadius: '8px', border: '1px solid var(--dsw-alias-border-l2)', background: 'var(--dsw-alias-bg-layer-2)', color: 'var(--dsw-alias-label-secondary,#9aa3b2)', fontSize: '12px', cursor: 'pointer' },
      collapseBtnOpen: { color: 'var(--dsw-alias-label-primary,#e9eef9)' },
      resetBtn: { padding: '5px 12px', borderRadius: '8px', border: '1px solid var(--dsw-alias-border-l2)', background: 'transparent', color: 'var(--dsw-alias-label-tertiary,#6b7280)', fontSize: '12px', cursor: 'pointer', justifySelf: 'start' }
    }

    function ParamControl(props) {
      const { def, value, onChange } = props
      const lab = h('span', { style: { fontSize: '12px', color: 'var(--dsw-alias-label-secondary,#9aa3b2)', flex: 1, lineHeight: '20px', whiteSpace: 'nowrap' } }, def.label)
      if (def.type === 'color') {
        return h('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
          lab,
          h('input', { type: 'color', value, onChange: (e) => onChange(e.target.value), style: { width: '30px', height: '22px', border: 'none', padding: 0, background: 'transparent', cursor: 'pointer' } }))
      }
      return h('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
        lab,
        h('input', { type: 'range', min: def.min, max: def.max, step: def.step, value, onChange: (e) => onChange(Number(e.target.value)), style: { flex: '1 1 auto', minWidth: 0 } }),
        h('span', { style: { fontSize: '11px', width: '38px', textAlign: 'right', color: 'var(--dsw-alias-label-tertiary,#6b7280)', flex: 'none' } }, String(value) + (def.unit || '')))
    }

    function ParamsPanel() {
      const [params, setParams] = React.useState(() => readParams())
      const [open, setOpen] = React.useState(false)
      const change = (key, v) => {
        const next = { ...params, [key]: v }
        setParams(next)
        applyParamValue(key, v)
        saveParams(next)
      }
      const reset = () => {
        setParams({ ...PARAM_DEFAULTS })
        saveParams({ ...PARAM_DEFAULTS })
        applyAllParams()
      }
      const groups = [...new Set(PARAM_DEFS.map((d) => d.group))]
      return h('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
        h('button', { type: 'button', onClick: () => setOpen(!open), style: { ...styles.collapseBtn, ...(open ? styles.collapseBtnOpen : {}) } },
          (open ? '▾ ' : '▸ ') + '调整参数（颜色 / 速度 / 长度）'),
        open && h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px' } },
          groups.map((g) => h('div', { key: g, style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
            h('div', { style: { fontSize: '13px', fontWeight: 600, color: 'var(--dsw-alias-label-primary)', lineHeight: '18px', marginTop: '2px' } }, g),
            h('div', { style: { fontSize: '11px', color: 'var(--dsw-alias-label-tertiary,#6b7280)', lineHeight: '16px', marginBottom: '2px' } }, PARAM_GROUP_META[g] || ''),
            h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 14px' } },
              PARAM_DEFS.filter((d) => d.group === g).map((def) => h(ParamControl, { key: def.key, def, value: params[def.key], onChange: (v) => change(def.key, v) }))))),
          h('button', { type: 'button', onClick: reset, style: styles.resetBtn }, '恢复默认')))
    }

    function InputSkinRow(props) {
      const [on, setOn] = React.useState(() => readEnabled())
      const [border, setBorder] = React.useState(() => readBorder())
      const toggle = () => {
        const next = !on
        writeEnabled(next)
        setOn(next)
        applyAttr()
      }
      const toggleBorder = () => {
        const next = !border
        writeBorder(next)
        setBorder(next)
        applyBorderAttr()
      }
      const switchBtn = (checked, onClick) => h('button', { type: 'button', role: 'switch', 'aria-checked': checked, onClick, style: { ...styles.toggle, ...(checked ? styles.toggleOn : {}) } },
        h('span', { style: { ...styles.knob, ...(checked ? styles.knobOn : {}) } }))
      return h('div', { style: styles.group },
        h('div', { style: styles.titleRow },
          h('span', { style: styles.title }, props.t('title')),
          switchBtn(on, toggle)),
        h('div', { style: styles.hint }, props.t('hint')),
        h('div', { style: { ...styles.titleRow, paddingLeft: '2px' } },
          h('span', { style: { ...styles.title, fontSize: '13px' } }, props.t('borderTitle')),
          switchBtn(border, toggleBorder)),
        h(ParamsPanel, {}))
    }

    // 注入两段沿边框巡游的线段光:先查后建(元素齐全则不动,避免重建重置动画)
    function mountRoles() {
      try {
        const card = document.querySelector('[data-composer-card]')
        if (!card) return false
        if (card.querySelector('.dsh-role-flow-a') && card.querySelector('.dsh-role-flow-b')) return true
        // 清理历史遗留元素(圆点/灯条等)
        card.querySelectorAll('.dsh-role-top,.dsh-role-right,.dsh-role-bottom,.dsh-role-left,.dsh-role-border,.dsh-role-dot,.dsh-role-topflow,.dsh-role-flow-a,.dsh-role-flow-b')
          .forEach((el) => el.remove())
        const a = document.createElement('span')
        a.className = 'dsh-role-flow-a'
        card.appendChild(a)
        const b = document.createElement('span')
        b.className = 'dsh-role-flow-b'
        card.appendChild(b)
        return true
      } catch { return false }
    }

    function apply(ctx) {
      ctx.effect(() => ctx.locale.register('input-skin', { zh, en }), 'dsh-light-theater: locale')

      // 初始轮询:等 composer 卡片出现后注入
      let tries = 0
      const timer = window.setInterval(() => {
        if (mountRoles() || tries > 60) window.clearInterval(timer)
        tries += 1
      }, 700)

      // 持续监测:React 重建卡片导致注入元素丢失时自动补注入(防抖)
      let obs = null
      let debounce = 0
      const startObserver = () => {
        if (obs) return
        const root = document.body || document.documentElement
        if (!root) return
        obs = new MutationObserver(() => {
          window.clearTimeout(debounce)
          debounce = window.setTimeout(() => { mountRoles() }, 300)
        })
        obs.observe(root, { childList: true, subtree: true })
      }
      const readyTimer = window.setInterval(() => {
        if (document.querySelector('[data-composer-card]')) {
          startObserver()
          window.clearInterval(readyTimer)
        }
      }, 700)

      ctx.effect(() => () => {
        window.clearInterval(timer)
        window.clearInterval(readyTimer)
        window.clearTimeout(debounce)
        if (obs) obs.disconnect()
      }, 'dsh-light-theater: role watch')

      ctx.slots.inject('settings.general.item', () => ctx.slots.register({
        name: 'settings.general.item',
        id: 'input-skin',
        order: 27,
        locale: 'input-skin',
        inject: () => ({})
      }, (props) => h(InputSkinRow, { ...props })))
    }

    return { inject, apply }
  },
})
