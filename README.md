# dsh-light-theater · DSH 输入框皮肤

> DeepSeek Harness (DSH) Web UI 输入框皮肤插件：跟随当前皮肤主题，给输入框加一套「科技风灯光剧场」。

![预览](docs/preview.png)

## ✨ 特性

输入框（composer）有三层动画，节奏互相咬合：

| 层 | 效果 | 节奏 |
| --- | --- | --- |
| **顶部边框** | 两段 40px 线段光从顶边中间出发，沿边框**圆角弧线平滑转弯**反向巡游一整圈（顶边水平滑行 → 角上 45° 弧线 → 侧边垂直下行 → 底部交错 → 返回顶中） | 16s / 圈 |
| **线段颜色** | 青 → 蓝 → 紫 循环，渐变浓度随循环加深 | 4s / 圈 |
| **内部光束** | 青 + 紫两道宽光束从中间向两侧扩散再收回；大周期配色：青紫 ×2 遍 → 红蓝 ×2 遍 → 往复 | 6s / 来回，24s / 大周期 |
| **呼吸** | 线段与内部光同步呼吸脉动（缩放/明暗） | 2.4s |

- 全部为 CSS 动画（`background-position` / `transform: rotate` / `@property` 自定义属性驱动颜色），零依赖、零 JS 逻辑，性能友好。
- 颜色全部用 `color-mix` 跟随 DSH 皮肤主题变量，换肤自动适配。
- 在 **设置 → 通用** 中提供开关，一键启停。

## 📦 安装

**一键安装（推荐）：**

```bash
dsh plugin --profile web add dsh-light-theater
```

重启 DSH web，进入 **设置 → 通用 → 输入框皮肤** 开启即可。

**本地开发 / 调试（源码方式）：**

克隆本仓库后，通过 `pnpm add link:<本地路径>` + `cordis.patch.yml` 挂载（参考 [DSH 插件开发文档](https://github.com/deepseek-ai/deepseek-harness)）。

```bash
# 1. 克隆 / 下载本仓库到本地（如 ~/dsh-plugins/dsh-light-theater）

# 2. 在 DSH web 插件目录安装
cd <dsh-web 目录>
pnpm add link:<本仓库路径>
```

在 `~/.dsh/profiles/web/cordis.patch.yml` 中追加挂载：

```yaml
- insert:
    - id: dsh-light-theater
      name: 'dsh-light-theater'
```

重启 DSH web，进入 **设置 → 通用 → 输入框皮肤** 开启即可。

> 注意：`lib/client.js` 由浏览器实时读取，修改源码后刷新页面（建议 Ctrl+F5）即可生效，无需重启服务。

## 🎛️ 调参区（自己调整）

打开 `lib/client.js`，**CSS 模板最顶部的 `★ 调参区 ★`** 就是全部参数，改完 Ctrl+F5 刷新生效：

```css
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
```

> 颜色支持 `#hex`、`rgb()`、`hsl()`、颜色名；时长支持 `s`/`ms`。角半径（转弯弧度）在 `gen-flow.mjs` 锚点 `2.5%`，需重新生成关键帧。

## 🗂️ 目录结构

```
dsh-light-theater/
├── lib/
│   ├── index.js        # host 半区（最小实现）
│   └── client.js       # 全部 CSS 动画 + 设置开关注入
├── gen-flow.mjs        # 边框巡游圆角路径生成脚本（Node）
├── test-preview.html   # 本地预览页（浏览器直接打开即可看效果）
├── cordis.patch.yml    # DSH 挂载配置示例
└── package.json
```

## 🛠️ 技术要点

- **平滑转弯**：巡游路径由 `gen-flow.mjs` 生成 37 个关键帧，线段中心沿圆角弧线走，`transform: rotate` 随路径切线连续旋转（全程单向递增 540°→900°，闭环无缝）。
- **颜色循环**：`@property` 注册 `<color>` 自定义属性 + `var()` 引用，颜色在渐变里平滑插值（避免 `hue-rotate` 滤镜动画在某些环境不推进的问题）。
- **主题适配**：`color-mix(in srgb, var(--dsw-alias-*, #fallback) x%, ...)` 跟随 DSH 皮肤。

## ✅ 前置要求

- DeepSeek Harness (DSH) 已安装,Web UI 可用(`npx @deepseek-ai/dsh web`)
- 目标 profile 为 **web**(`--profile web`)
- 无额外依赖:纯 CSS 实现,不引入任何运行时库

## 🔒 权限与数据

- **零权限**:不请求系统权限、不读写文件、不访问网络
- **零凭据**:不接触任何 token / 密钥
- **数据只存本地**:开关与调参全部写入浏览器 `localStorage`(`dsh-light-theater:*` 键),不上传、不同步

## ⚠️ 已知限制

- 颜色通过 `color-mix` 跟随 DSH 皮肤主题变量(`--dsw-alias-*`);若某皮肤未定义这些变量,会回退到内置 fallback 色,观感略有差异
- 依赖 `@property` 注册自定义属性,需较新的 Chromium 内核(Edge / Chrome 105+)
- 仅作用于 Web UI 的输入框(composer),不涉及 TUI 等其它前端

## 🔄 更新

发布新版本后,重新执行安装命令即拉到最新版(或在 DSH Web UI **设置 → 插件** 中移除后重装):

```bash
dsh plugin --profile web add dsh-light-theater
```

## 📄 License

[MIT](LICENSE) © AshModeling
