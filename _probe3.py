from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 900})
    page.goto("http://127.0.0.1:3080")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(3500)

    print("card:", page.query_selector("[data-composer-card]") is not None)
    # 输入框: contenteditable 或 textarea
    ed = page.query_selector("[contenteditable=true], textarea")
    print("editable:", bool(ed))
    if ed:
        # 向上找最近的容器(composer)
        cont = ed.evaluate("""el => {
          let n = el;
          for (let i = 0; i < 8 && n; i++) {
            n = n.parentElement;
            if (n && (n.className || n.getAttribute('data-*'))) return {tag: n.tagName, cls: n.className, attrs: [...n.attributes].map(a=>a.name+'='+a.value).join(' '), html: n.outerHTML.slice(0, 600)};
          }
          return null;
        }""")
        print("container:", cont)
    # 发送按钮 outerHTML
    send = page.query_selector("button[aria-label='发送消息']")
    if send:
        print("=== SEND BUTTON ===")
        print(send.evaluate("el => el.outerHTML"))
        # 向上几层容器
        wrap = send.evaluate("""el => {
          let n = el;
          for (let i = 0; i < 6 && n; i++) {
            n = n.parentElement;
            if (n) return {tag: n.tagName, cls: (typeof n.className==='string'?n.className:''), attrs: [...n.attributes].map(a=>a.name+'='+a.value).join(' ')};
          }
          return null;
        }""")
        print("send wrap:", wrap)
    # 所有 composer 区域按钮(label 含 命令/发送/停止/附件 等)
    print("=== composer-area buttons ===")
    btns = page.evaluate("""() => [...document.querySelectorAll('button')].filter(b => {
      const t = (b.getAttribute('aria-label')||'') + (b.title||'');
      return /发送|停止|命令|附件|attach|send|stop/i.test(t);
    }).map(b => b.outerHTML.slice(0,220))""")
    for b in btns:
        print(b)
    browser.close()
