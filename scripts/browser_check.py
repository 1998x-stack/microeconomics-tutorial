#!/usr/bin/env python3
"""Real Chromium QA for the revised pages, MathML, diagrams, controls and print."""
import http.server
import socketserver
import threading
import json
from pathlib import Path
from playwright.sync_api import sync_playwright

DOCS=Path(__file__).resolve().parents[1]/"docs"
OUTPUT=Path(__file__).resolve().parents[1]/"reports"/"browser"
OUTPUT.mkdir(parents=True,exist_ok=True)
PORT=8769
ROOT=f"http://127.0.0.1:{PORT}"
CHECKS=[]
ERRORS=[]

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self,*args,**kwargs):
        super().__init__(*args,directory=str(DOCS),**kwargs)
    def log_message(self,*args): pass
class Server(socketserver.TCPServer): allow_reuse_address=True

def set_value(locator, value):
    locator.evaluate("(e,v)=>{e.value=String(v);e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}))}",value)

def test_demo(page,name):
    if name in ("chapters/03","chapters/04","chapters/05"):
        control=page.locator('[data-lab="market"] [data-price]')
        before=page.locator('[data-lab="market"] [data-result]').inner_text()
        set_value(control,30)
        after=page.locator('[data-lab="market"] [data-result]').inner_text()
        assert after!=before and "30" in after
    elif name=="chapters/06":
        set_value(page.locator('[data-lab="elasticity"] [data-price]'),30)
        assert "TR=1800" in page.locator('[data-result]').inner_text()
    elif name=="chapters/07":
        set_value(page.locator('[data-lab="tax"] [data-tax]'),10)
        actual=page.locator('[data-result]').inner_text()
        assert "Pc=26" in actual and "Q=68" in actual and "60" in actual, actual
    elif name=="chapters/08":
        set_value(page.locator('[data-lab="utility"] [data-px]'),1)
        assert "最优 x=6" in page.locator('[data-result]').inner_text()
    elif name=="chapters/09":
        set_value(page.locator('[data-lab="indifference"] [data-income]'),16)
        actual=page.locator('[data-result]').inner_text()
        assert "x=4" in actual and "y=8" in actual, actual
    elif name=="chapters/10":
        page.locator('[data-lab="decomposition"] [data-method]').select_option("slutsky")
        assert "B_x=4.5" in page.locator('[data-result]').inner_text()
        set_value(page.locator('[data-lab="decomposition"] [data-new-price]'),1.5)
        actual=page.locator('[data-result]').inner_text()
        assert "B_x=3.5" in actual and "C_x=4" in actual, actual
    elif name=="chapters/11":
        set_value(page.locator('[data-lab="production"] [data-labor]'),16)
        assert "Q=50.797" in page.locator('[data-result]').inner_text()
    elif name=="chapters/12":
        set_value(page.locator('[data-lab="costs"] [data-output]'),5)
        assert "ATC=16.4" in page.locator('[data-result]').inner_text()
    elif name=="chapters/13":
        set_value(page.locator('[data-lab="competition"] [data-firm-price]'),5)
        assert "停产 q=0" in page.locator('[data-result]').inner_text()
        set_value(page.locator('[data-lab="competition"] [data-firm-price]'),8)
        assert "利润π=-25.697" in page.locator('[data-result]').inner_text()
    elif name=="chapters/14":
        set_value(page.locator('[data-lab="entry"] [data-demand-intercept]'),120)
        assert "需要15家企业" in page.locator('[data-result]').inner_text()
    elif name=="chapters/15":
        set_value(page.locator('[data-lab="monopoly"] [data-monopoly-mc]'),30)
        assert "垄断：Q=35" in page.locator('[data-result]').inner_text()
        page.locator('[data-lab="discrimination"] [data-pricing]').select_option("segment")
        assert "收入3100" in page.locator('[data-lab="discrimination"] [data-result]').inner_text()

with Server(("127.0.0.1",PORT),QuietHandler) as server:
    threading.Thread(target=server.serve_forever,daemon=True).start()
    with sync_playwright() as playwright:
        browser=playwright.chromium.launch()
        for width,height,label in [(1440,900,"desktop"),(768,1024,"tablet"),
                                   (390,844,"mobile390"),(360,800,"mobile360")]:
            context=browser.new_context(viewport={"width":width,"height":height},device_scale_factor=1)
            page=context.new_page()
            page.on("pageerror",lambda err:ERRORS.append(str(err)))
            page.on("console",lambda m:ERRORS.append(m.text) if m.type=="error" else None)
            names=["index"]+[f"chapters/{i:02}" for i in range(1,16)]
            for name in names:
                response=page.goto(f"{ROOT}/{name}.html",wait_until="networkidle")
                assert response and response.status==200, name
                assert page.locator("h1").count()==1, f"H1: {name}"
                dims=page.evaluate("({inner:innerWidth,scroll:document.documentElement.scrollWidth})")
                assert dims["scroll"]<=dims["inner"]+1, f"document horizontal overflow {name} {label}: {dims}"
                # Loading=lazy is intentionally used for long chapters. Scroll each
                # figure into its viewport, await decode, then verify the actual image.
                for im in page.locator("img").all():
                    im.scroll_into_view_if_needed()
                    im.evaluate("(e)=>e.decode()")
                assert page.locator("img").evaluate_all(
                    "(els)=>els.every(e=>e.complete && e.naturalWidth>0)"
                ),f"broken SVG image after load: {name} {label}"
                if name=="index":
                    page.locator("#course-search").fill("支付意愿")
                    assert page.locator(".course-card:visible").count()==1, "catalogue search wrong"
                    page.locator("#course-search").fill("")
                    assert page.locator(".course-card:visible").count()==28
                else:
                    assert page.locator("figure").count()==2, f"figures {name}"
                    assert page.locator("math").count()>=1, f"MathML missing: {name}"
                    assert page.locator("math").first.evaluate(
                        "(e)=>e.namespaceURI==='http://www.w3.org/1998/Math/MathML'"
                    ),f"MathML namespace: {name}"
                    assert page.locator("math").first.evaluate(
                        "(e)=>e.getBoundingClientRect().width>0 && e.getBoundingClientRect().height>0"
                    ),f"MathML not rendered: {name}"
                    assert page.locator("figure img").evaluate_all(
                        "(els)=>els.every(e=>e.naturalWidth>0 && e.getBoundingClientRect().width>0)"
                    ),f"diagram nonzero render: {name}"
                    if name not in ("chapters/01","chapters/02"):test_demo(page,name)
                CHECKS.append({"page":name,"viewport":label,"status":"passed"})
                if label in ("desktop","mobile390") and name in ("index","chapters/06","chapters/07","chapters/09","chapters/10","chapters/11","chapters/12","chapters/13","chapters/14","chapters/15"):
                    page.screenshot(path=str(OUTPUT/f"{name.replace('/','-')}-{label}.png"),full_page=True)
            context.close()
        page=browser.new_page(viewport={"width":390,"height":844})
        page.goto(f"{ROOT}/chapters/02.html",wait_until="networkidle")
        fraction=page.locator("mfrac").first
        assert fraction.count()==1
        geo=fraction.evaluate("(e)=>{let a=e.children[0].getBoundingClientRect(),b=e.children[1].getBoundingClientRect();return {ay:a.y,by:b.y,aw:a.width,bw:b.width}}")
        assert geo["ay"]<geo["by"] and geo["aw"]>0 and geo["bw"]>0,geo
        page.keyboard.press("Tab")
        assert page.evaluate("document.activeElement!==document.body"),"no keyboard focus"
        page.emulate_media(media="print")
        assert page.locator("figure img").first.is_visible(), "print figure hidden"
        page.screenshot(path=str(OUTPUT/"chapter02-print.png"),full_page=True)
        page.goto(f"{ROOT}/chapters/15.html",wait_until="networkidle")
        page.emulate_media(media="print")
        assert page.locator("figure img").first.is_visible()
        page.screenshot(path=str(OUTPUT/"chapter15-print.png"),full_page=True)
        for svg in ("06-price-elasticity","07-tax-wedge","08-utility-budget","09-budget-rotation","10-hicks-decomposition","11-production-curve","12-short-run-costs","13-price-taking-firm","14-entry-exit","15-monopoly-welfare"):
            response=page.goto(f"{ROOT}/assets/figures/{svg}.svg",wait_until="load")
            assert response and response.status==200, svg
            assert page.locator("svg").count()==1
            assert page.locator("svg > title").count()==1
            CHECKS.append({"standalone_svg":svg,"status":"passed"})
        page.close()
        browser.close()
    server.shutdown()
assert not ERRORS, f"JavaScript console/page errors: {ERRORS}"
report={"status":"passed","cases":len(CHECKS),"checks":CHECKS,"errors":ERRORS,
        "viewports":["1440x900","768x1024","390x844","360x800"],
        "extra":["MathML fraction geometry","keyboard focus","print 02 and 15","standalone SVG render","all interactive labs"]}
(OUTPUT/"report.json").write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding="utf-8")
print(f"PASS: {len(CHECKS)} browser cases; 16 pages×4 viewports, 10 standalone SVGs, MathML, search, interactions, print.")
