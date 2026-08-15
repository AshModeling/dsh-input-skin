from playwright.sync_api import sync_playwright
import json

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 900})
    page.goto("http://127.0.0.1:3080")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(3500)

    def snap(tag):
        page.screenshot(path=f"D:/OneDrive/Desktop/deepseek/.dsh-plugins/dsh-input-skin/_s_{tag}.png")

    # 1) 当前界面概览: 所有可见文字 + 按钮 aria-label
    texts = page.evaluate("() => document.body.innerText.slice(0, 800)")
    print("=== VISIBLE TEXT ===")
    print(texts)
    print("=== BUTTONS (aria-label / title) ===")
    btns = page.evaluate("""() => [...document.querySelectorAll('button')].map(b => ({
        label: b.getAttribute('aria-label'),
        title: b.getAttribute('title'),
        cls: b.className
      })).filter(b => b.label || b.title)""")
    for b in btns[:30]:
        print(b)
    snap("init")

    # 2) 尝试找"新建会话/对话"入口
    candidates = page.query_selector_all("button, [role=button], a")
    print("=== total clickable:", len(candidates))
    # 优先 aria-label/title 含 新建/新/对话/会话/chat/new 的
    for c in candidates:
        lab = (c.get_attribute("aria-label") or "") + (c.get_attribute("title") or "") + (c.inner_text() or "")
        if any(k in lab for k in ["新建", "新对话", "新会话", "new chat", "New Chat", "新建会话", "对话"]):
            print("CANDIDATE:", c.evaluate("el => el.outerHTML")[:180])

    browser.close()
