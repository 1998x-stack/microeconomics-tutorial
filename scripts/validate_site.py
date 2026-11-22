#!/usr/bin/env python3
"""Offline structural checks; browser checks are a separate gate."""
from html.parser import HTMLParser
from pathlib import Path
import json
import re
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"

class LinkParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.ids = set()
        self.h1 = 0
        self.images = []
        self.math_depth = 0
        self.figures = 0
        self.captions = 0
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "h1": self.h1 += 1
        if tag == "figure": self.figures += 1
        if tag == "figcaption": self.captions += 1
        if "id" in a: self.ids.add(a["id"])
        if tag in ("a", "link", "script", "img"):
            url = a.get("href") or a.get("src")
            if url: self.links.append(url)
        if tag == "img": self.images.append(a)

def main():
    chapters = json.loads((ROOT / "courses.json").read_text(encoding="utf-8"))["chapters"]
    assert len(chapters)==28
    assert len({c["num"] for c in chapters})==28
    paths=[DOCS / "index.html"]+[DOCS / "chapters" / c["file"] for c in chapters]
    for path in paths:
        assert path.exists(), f"missing {path}"
        text=path.read_text(encoding="utf-8")
        p=LinkParser(); p.feed(text)
        assert p.h1==1, f"{path}: expected one H1, got {p.h1}"
        assert p.figures==p.captions, f"{path}: figure without figcaption"
        assert "javascript:void" not in text, f"{path}: void link"
        for url in p.links:
            if url.startswith(("http:", "https:", "mailto:", "data:", "#", "javascript:")): continue
            target=(path.parent / url.split("#")[0].split("?")[0]).resolve()
            assert target.is_file(), f"{path}: broken asset/link {url}"
        for im in p.images:
            assert im.get("alt"), f"{path}: missing alt"
    for i in range(1,6):
        html=(DOCS/"chapters"/f"{i:02}.html").read_text(encoding="utf-8")
        assert "https://openstax.org" in html
        assert "class=\"math-scroll\"" in html
        assert html.count("<figure")>=2
        assert 'data-lab="market"' in html if i>=3 else True
        evidence=json.loads((DOCS/"evidence"/f"{i:02}.json").read_text(encoding="utf-8"))
        assert len(evidence["claims"])>=2
        assert all(c["status"] in ["verified","derived","illustrative"] for c in evidence["claims"])
    svgs=list((DOCS/"assets"/"figures").glob("*.svg"))
    assert len(svgs)>=10
    for path in svgs:
        doc=ET.parse(path).getroot()
        assert doc.tag.endswith("svg"), path
        assert "viewBox" in doc.attrib, path
        assert any(ch.tag.endswith("title") for ch in doc), path
        assert any(ch.tag.endswith("desc") for ch in doc), path
    print(f"OK: {len(paths)} HTML files, {len(svgs)} SVG, 5 evidence ledgers, links/assets.")
if __name__=="__main__":
    main()
