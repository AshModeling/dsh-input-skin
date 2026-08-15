from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 900})
    page.goto("http://127.0.0.1:3080")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(4000)
    page.screenshot(path="D:/OneDrive/Desktop/deepseek/.dsh-plugins/dsh-input-skin/_gui.png", full_page=False)
    card = page.query_selector("[data-composer-card]")
    print("CARD found:", bool(card))
    if card:
        btns = card.query_selector_all("button")
        print("buttons in card:", len(btns))
        for i, b in enumerate(btns):
            print(f"--- button {i} ---")
            print(b.evaluate("el => el.outerHTML"))
    else:
        print("no [data-composer-card]; trying global buttons")
        btns = page.query_selector_all("button")
        print("total buttons:", len(btns))
        for i, b in enumerate(btns[:25]):
            html = b.evaluate("el => el.outerHTML")
            print(i, html[:250].replace("\n", " "))
    browser.close()
