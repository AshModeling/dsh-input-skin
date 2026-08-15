window.__ModuleLoader__.load({
  id: '@linxin666/dsh-input-skin',
  factory: (require) => {
    const React = require('react')
    const inject = ['slots', 'locale']

    const STORAGE_KEY = 'dsh-light-theater:enabled'

    const CSS = `
/* ===== 内部:双光束向两侧扩散(6s) + 青紫×2→红蓝×2 大周期配色(24s) ===== */
@property --dsh-beam-l{syntax:'<color>';inherits:false;initial-value:rgba(34,211,238,.6);}
@property --dsh-beam-r{syntax:'<color>';inherits:false;initial-value:rgba(139,92,246,.6);}
@keyframes dsh-light-theater-flow{
  0%{background-position:50% 50%,50% 50%,50% 50%,0 0;}
  50%{background-position:50% 50%,0% 50%,100% 50%,0 0;}
  100%{background-position:50% 50%,50% 50%,50% 50%,0 0;}
}
@keyframes dsh-beam-color{
  0%{--dsh-beam-l:rgba(34,211,238,.6);--dsh-beam-r:rgba(139,92,246,.6);}
  25%{--dsh-beam-l:rgba(34,211,238,.6);--dsh-beam-r:rgba(139,92,246,.6);}
  49%{--dsh-beam-l:rgba(34,211,238,.6);--dsh-beam-r:rgba(139,92,246,.6);}
  51%{--dsh-beam-l:rgba(255,77,109,.6);--dsh-beam-r:rgba(59,130,246,.6);}
  75%{--dsh-beam-l:rgba(255,77,109,.6);--dsh-beam-r:rgba(59,130,246,.6);}
  99%{--dsh-beam-l:rgba(255,77,109,.6);--dsh-beam-r:rgba(59,130,246,.6);}
  100%{--dsh-beam-l:rgba(34,211,238,.6);--dsh-beam-r:rgba(139,92,246,.6);}
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
      color-mix(in srgb,var(--dsh-beam-l) 55%,transparent) 25%,
      var(--dsh-beam-l) 50%,
      color-mix(in srgb,var(--dsh-beam-l) 55%,transparent) 75%,
      rgba(255,255,255,0) 100%),
    linear-gradient(90deg,
      rgba(255,255,255,0) 0%,
      color-mix(in srgb,var(--dsh-beam-r) 55%,transparent) 25%,
      var(--dsh-beam-r) 50%,
      color-mix(in srgb,var(--dsh-beam-r) 55%,transparent) 75%,
      rgba(255,255,255,0) 100%),
    linear-gradient(180deg,
      color-mix(in srgb,var(--dsw-alias-bg-layer-2,#10101a) 60%,#ffffff 40%),
      color-mix(in srgb,var(--dsw-alias-bg-layer-1,#15151a) 85%,#000000 15%),
      var(--dsw-alias-bg-layer-1,#15151a));
  background-size:24% 100%,50% 100%,50% 100%,auto;
  background-position:50% 50%,50% 50%,50% 50%,0 0;
  background-repeat:no-repeat,no-repeat,no-repeat,repeat;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.08),
    inset 0 -1px 0 rgba(0,0,0,.14),
    inset 0 0 0 1px color-mix(in srgb,var(--dsw-alias-label-primary,#e9eef9) 7%,transparent),
    0 2px 10px rgba(0,0,0,.3);
  animation:
    dsh-light-theater-flow 6s ease-in-out infinite,
    dsh-beam-color 24s linear infinite;
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
  0%{--dsh-seg-c:#12b6d6;}
  33.333%{--dsh-seg-c:#2d6cf0;}
  66.667%{--dsh-seg-c:#9333ea;}
  100%{--dsh-seg-c:#12b6d6;}
}
@keyframes dsh-flow-path{
  0%{left:calc(50% - 20px);top:-2px;transform:rotate(540deg);}
  3.125%{left:calc(42.083% - 20px);top:-2px;transform:rotate(540deg);}
  6.25%{left:calc(34.167% - 20px);top:-2px;transform:rotate(540deg);}
  9.375%{left:calc(26.25% - 20px);top:-2px;transform:rotate(540deg);}
  12.5%{left:calc(18.333% - 20px);top:-2px;transform:rotate(540deg);}
  15.625%{left:calc(10.417% - 20px);top:-2px;transform:rotate(540deg);}
  18.75%{left:calc(2.5% - 20px);top:-2px;transform:rotate(540deg);}
  21.875%{left:calc(0.73% - 20px);top:calc(0.73% - 2px);transform:rotate(585deg);}
  25%{left:-20px;top:calc(2.5% - 2px);transform:rotate(630deg);}
  28.125%{left:-20px;top:calc(50% - 2px);transform:rotate(630deg);}
  31.25%{left:-20px;top:calc(97.5% - 2px);transform:rotate(630deg);}
  34.375%{left:calc(0.73% - 20px);top:calc(99.27% - 2px);transform:rotate(675deg);}
  37.5%{left:calc(2.5% - 20px);top:calc(100% - 2px);transform:rotate(720deg);}
  40.625%{left:calc(14.375% - 20px);top:calc(100% - 2px);transform:rotate(720deg);}
  43.75%{left:calc(26.25% - 20px);top:calc(100% - 2px);transform:rotate(720deg);}
  46.875%{left:calc(38.125% - 20px);top:calc(100% - 2px);transform:rotate(720deg);}
  50%{left:calc(50% - 20px);top:calc(100% - 2px);transform:rotate(720deg);}
  53.125%{left:calc(61.875% - 20px);top:calc(100% - 2px);transform:rotate(720deg);}
  56.25%{left:calc(73.75% - 20px);top:calc(100% - 2px);transform:rotate(720deg);}
  59.375%{left:calc(85.625% - 20px);top:calc(100% - 2px);transform:rotate(720deg);}
  62.5%{left:calc(97.5% - 20px);top:calc(100% - 2px);transform:rotate(720deg);}
  65.625%{left:calc(99.27% - 20px);top:calc(99.27% - 2px);transform:rotate(765deg);}
  68.75%{left:calc(100% - 20px);top:calc(97.5% - 2px);transform:rotate(810deg);}
  71.875%{left:calc(100% - 20px);top:calc(50% - 2px);transform:rotate(810deg);}
  75%{left:calc(100% - 20px);top:calc(2.5% - 2px);transform:rotate(810deg);}
  78.125%{left:calc(99.27% - 20px);top:calc(0.73% - 2px);transform:rotate(855deg);}
  81.25%{left:calc(97.5% - 20px);top:-2px;transform:rotate(900deg);}
  84.375%{left:calc(89.583% - 20px);top:-2px;transform:rotate(900deg);}
  87.5%{left:calc(81.667% - 20px);top:-2px;transform:rotate(900deg);}
  90.625%{left:calc(73.75% - 20px);top:-2px;transform:rotate(900deg);}
  93.75%{left:calc(65.833% - 20px);top:-2px;transform:rotate(900deg);}
  96.875%{left:calc(57.917% - 20px);top:-2px;transform:rotate(900deg);}
  100%{left:calc(50% - 20px);top:-2px;transform:rotate(900deg);}
}
@keyframes dsh-flow-breathe{
  0%,100%{opacity:.6;filter:brightness(.9);}
  50%{opacity:1;filter:brightness(1.25);}
}
.dsh-role-flow-a,.dsh-role-flow-b{
  position:absolute;width:40px;height:4px;border-radius:2px;
  pointer-events:none;z-index:6;
  background:linear-gradient(90deg,color-mix(in srgb,var(--dsh-seg-c,#12b6d6) 20%,transparent),var(--dsh-seg-c,#12b6d6) 38%,#fff 50%,var(--dsh-seg-c,#12b6d6) 62%,color-mix(in srgb,var(--dsh-seg-c,#12b6d6) 20%,transparent));
  box-shadow:0 0 9px 3px color-mix(in srgb,var(--dsh-seg-c,#12b6d6) 70%,transparent);
}
.dsh-role-flow-a{animation:dsh-flow-path 16s linear infinite,dsh-seg-color 4s linear infinite,dsh-flow-breathe 2.4s ease-in-out infinite;}
.dsh-role-flow-b{animation:dsh-flow-path 16s linear infinite reverse,dsh-seg-color 4s linear infinite,dsh-flow-breathe 2.4s ease-in-out infinite;}
/* ===== 发送/停止按钮:outer-cont 胶囊(精确匹配,不影响命令等按钮) ===== */
body[data-input-skin="on"] [data-composer-card] button:is(
  [aria-label="发送消息"],[aria-label="发送"],[aria-label="Send message"],[aria-label="Send"],
  [aria-label="停止"],[aria-label="停止生成"],[aria-label="Stop"],[aria-label="Stop generating"]
){
  cursor:pointer;
  padding:12px 20px;
  border:none;
  font-size:1rem;
  margin-top:3px;
  border-radius:16px;
  background:radial-gradient(circle 80px at 80% -10%,#ffffff,#181b1b);
  position:relative;
  display:flex;
  align-items:center;
  gap:5px;
  color:#2a2f38;
  transition:filter .15s,background .15s,opacity .15s;
}
body[data-input-skin="on"] [data-composer-card] button:is(
  [aria-label="发送消息"],[aria-label="发送"],[aria-label="Send message"],[aria-label="Send"],
  [aria-label="停止"],[aria-label="停止生成"],[aria-label="Stop"],[aria-label="Stop generating"]
):disabled{
  opacity:.45;
  cursor:default;
}
body[data-input-skin="on"] [data-composer-card] button:is(
  [aria-label="发送消息"],[aria-label="发送"],[aria-label="Send message"],[aria-label="Send"],
  [aria-label="停止"],[aria-label="停止生成"],[aria-label="Stop"],[aria-label="Stop generating"]
):hover:not(:disabled){
  filter:brightness(1.06);
}
body[data-input-skin="on"] [data-composer-card] button:is(
  [aria-label="发送消息"],[aria-label="发送"],[aria-label="Send message"],[aria-label="Send"],
  [aria-label="停止"],[aria-label="停止生成"],[aria-label="Stop"],[aria-label="Stop generating"]
):active:not(:disabled){
  background:var(--dsw-alias-button-ghost-active-fill,#2c3765);
  color:#fff;
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
  width:16px;height:16px;flex:none;
  background:currentColor;
  -webkit-mask:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="black" d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9z"/></svg>') center/contain no-repeat;
  mask:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="black" d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9z"/></svg>') center/contain no-repeat;
}
body[data-input-skin="on"] [data-composer-card] button:is(
  [aria-label="发送消息"],[aria-label="发送"],[aria-label="Send message"],[aria-label="Send"],
  [aria-label="停止"],[aria-label="停止生成"],[aria-label="Stop"],[aria-label="Stop generating"]
)::after{
  content:attr(aria-label);
  font-weight:500;
  line-height:1;
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
      'hint': '输入框小剧场:两段 40px 线段光从顶部中间出发沿边框圆角弧线平滑绕行(16s),青→蓝→紫颜色循环(4s,加重),呼吸脉动;内部双光束 青紫×2→红蓝×2(24s) 向两侧巡视。'
    }
    const en = {
      'title': 'Input skin',
      'hint': 'Composer mini-theater: two 40px light segments start at the top-center and cruise the border on smooth rounded-corner arcs (16s), cycling deep cyan→blue→violet (4s, richer), breathing; inner beams cycle cyan/violet ×2 then red/blue ×2 (24s).'
    }

    function readEnabled() { try { const v = window.localStorage.getItem(STORAGE_KEY); return v === null ? true : v !== 'off' } catch { return true } }
    function writeEnabled(on) { try { window.localStorage.setItem(STORAGE_KEY, on ? 'on' : 'off') } catch {} }
    function applyAttr() {
      try { document.body.setAttribute('data-input-skin', readEnabled() ? 'on' : 'off') } catch {}
    }
    applyAttr()

    const h = React.createElement
    const styles = {
      group: { borderBottom: '1px solid var(--dsw-alias-border-l2)', display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px 0' },
      titleRow: { display: 'flex', alignItems: 'center', gap: '10px' },
      title: { color: 'var(--dsw-alias-label-primary)', fontSize: '14px', lineHeight: '22px', flex: 1 },
      hint: { color: 'var(--dsw-alias-label-tertiary)', fontSize: '12px', lineHeight: '18px' },
      toggle: { position: 'relative', width: '38px', height: '22px', borderRadius: '999px', border: '1px solid var(--dsw-alias-border-l2)', background: 'var(--dsw-alias-bg-layer-2)', cursor: 'pointer', transition: 'all .15s', boxSizing: 'border-box', flex: 'none' },
      toggleOn: { background: 'var(--dsw-alias-brand-primary,#4d86f8)', borderColor: 'var(--dsw-alias-brand-primary,#4d86f8)' },
      knob: { position: 'absolute', top: '2px', left: '2px', width: '16px', height: '16px', borderRadius: '50%', background: '#fff', transition: 'left .15s' },
      knobOn: { left: '18px' }
    }

    function InputSkinRow(props) {
      const [on, setOn] = React.useState(() => readEnabled())
      const toggle = () => {
        const next = !on
        writeEnabled(next)
        setOn(next)
        applyAttr()
      }
      return h('div', { style: styles.group },
        h('div', { style: styles.titleRow },
          h('span', { style: styles.title }, props.t('title')),
          h('button', { type: 'button', role: 'switch', 'aria-checked': on, onClick: toggle, style: { ...styles.toggle, ...(on ? styles.toggleOn : {}) } },
            h('span', { style: { ...styles.knob, ...(on ? styles.knobOn : {}) } }))),
        h('div', { style: styles.hint }, props.t('hint')))
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
