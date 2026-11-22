#!/usr/bin/env python3
"""Chromium smoke check: desktop, tablet, mobile, math, links and live controls."""
import http.server
import socketserver
import threading
import json
from pathlib import Path
from playwright.sync_api import sync_playwright

DOCS = Path(__file__).resolve().parents[1] / "docs"
OUT = Path(__file__).resolve().parents[1] / "reports" / "browser"
OUT.mkdir(parents=True, exist_ok=True)
PORT = 8769

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DOCS), **kwargs)
    def log_message(self, *args):
        pass

class Server(socketserver.TCPServer):
    allow_reuse_address = True

checks=[]
errors=[]
with Server(("127.0.0.1", PORT), QuietHandler) as server:
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for width, height, tag in [(1440, 900, "desktop"), (768, 1024, "tablet"),
                                   (390, 844, "mobile390"), (360, 800, "mobile360")]:
            context = browser.new_context(viewport={"width":width,"height":height}, device_scale_factor=1)
            page = context.new_page()
            page.on("pageerror", lambda e: errors.append(str(e)))
            page.on("console", lambda msg: errors.append(str(msg.text)) if msg.type=="error" else None)
            for index in ["index"] + [f"chapters/{i:02}" for i in range(1, 6)]:
                url = f"http://127.0.0.1:{PORT}/{index}.html"
                response = page.goto(url, wait_until="networkidle")
                assert response and response.status==200, url
                assert page.locator("h1").count()==1, f"H1 {index}"
                dims = page.evaluate("({scroll:document.documentElement.scrollWidth,inner:innerWidth})")
                assert dims["scroll"] <= dims["inner"]+1, f"document overflow {index} {tag}: {dims}"
                assert page.locator("img").evaluate_all(
                    "(els)=>els.every(e=>e.complete && e.naturalWidth>0)"
                ), f"broken SVG image {index} {tag}"
                if index!="index":
                    assert page.locator("math").count()>=1, f"missing MathML {index}"
                    assert page.locator("math").first.evaluate(
                        "(e)=>e.namespaceURI==='http://www.w3.org/1998/Math/MathML'"
                    ), f"wrong math namespace {index}"
                    assert page.locator("math").first.evaluate(
                        "(e)=>e.getBoundingClientRect().width>0 && e.getBoundingClientRect().height>0"
                    ), f"hidden MathML {index}"
                    if index in ["chapters/03","chapters/04","chapters/05"]:
                        before=page.locator("[data-result]").inner_text()
                        control=page.locator("[data-price]")
                        control.evaluate("(e)=>{e.value='30'; e.dispatchEvent(new Event('input',{bubbles:true}))}")
                        after=page.locator("[data-result]").inner_text()
                        assert before!=after and "30" in after, f"inert market lab {index}"
                        control.evaluate("(e)=>{e.value='20'; e.dispatchEvent(new Event('input',{bubbles:true}))}")
                else:
                    page.locator("#course-search").fill("吉芬")
                    assert page.locator(".course-card:visible").count()==1, "catalogue search"
                    page.locator("#course-search").fill("")
                checks.append({"page":index,"viewport":tag,"result":"pass"})
                if index in ["index","chapters/01","chapters/05"]:
                    page.screenshot(path=str(OUT/f"{index.replace('/','-')}-{tag}.png"), full_page=True)
            context.close()
        # MathML layout, print and keyboard behavior in one standalone article.
        page=browser.new_page(viewport={"width":390,"height":844})
        page.goto(f"http://127.0.0.1:{PORT}/chapters/02.html",wait_until="networkidle")
        fractions=page.locator("mfrac")
        assert fractions.count()>=1, "chapter 02 expected stacked fraction"
        f=fractions.first
        values=f.evaluate("(e)=>{let a=e.children[0].getBoundingClientRect(),b=e.children[1].getBoundingClientRect();return {ay:a.y,by:b.y,aw:a.width,bw:b.width}}")
        assert values["ay"]<values["by"] and values["aw"]>0 and values["bw"]>0, values
        page.keyboard.press("Tab")
        assert page.evaluate("document.activeElement!==document.body"), "keyboard focus unavailable"
        page.emulate_media(media="print")
        assert page.locator("figure img").first.is_visible(), "print figure missing"
        page.screenshot(path=str(OUT/"chapter02-print.png"),full_page=True)
        page.close()
        browser.close()
    server.shutdown()
assert not errors, f"browser JS errors: {errors}"
report={"checks":checks,"errors":errors,"tested_viewports":["1440x900","768x1024","390x844","360x800"],"print":"chapter 02", "status":"passed"}
(OUT/"report.json").write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding="utf-8")
print("PASS:",len(checks),"page/viewport checks, math, slider, filter, screenshots, print and keyboard")
