#!/usr/bin/env python3
"""Offline source-level contract for the canonical Pages site."""
from html.parser import HTMLParser
from pathlib import Path
import json
import xml.etree.ElementTree as ET
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"

class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.h1 = 0
        self.figures = 0
        self.captions = 0
        self.links = []
        self.images = []
        self.ids = set()
        self.anchors = []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "h1": self.h1 += 1
        if tag == "figure": self.figures += 1
        if tag == "figcaption": self.captions += 1
        if "id" in a: self.ids.add(a["id"])
        if tag in ("a", "link", "script", "img"):
            href = a.get("href") or a.get("src")
            if href: self.links.append(href)
        if tag == "img": self.images.append(a)

def main():
    metadata = json.loads((ROOT / "courses.json").read_text(encoding="utf-8"))
    chapters = metadata["chapters"]
    assert len(chapters) == 28 and metadata["chapterCount"] == 28
    assert len({c["num"] for c in chapters}) == 28
    pages = [DOCS / "index.html"] + [DOCS / "chapters" / c["file"] for c in chapters]
    for i, path in enumerate(pages):
        assert path.is_file(), f"missing chapter {path}"
        text = path.read_text(encoding="utf-8")
        parser = PageParser()
        parser.feed(text)
        is_revised = i <= 5
        if is_revised:
            assert parser.h1 == 1, f"{path}: one H1 required, got {parser.h1}"
            assert parser.figures == parser.captions, f"{path}: figure/caption mismatch"
            assert "javascript:void" not in text, f"{path}: placeholder link"
            assert all(im.get("alt") for im in parser.images), f"{path}: missing image alt"
        for href in parser.links:
            if href.startswith(("https:", "http:", "mailto:", "data:", "javascript:")):
                continue
            stem, sep, anchor = href.partition("#")
            if stem:
                target = (path.parent / unquote(stem.split("?")[0])).resolve()
                assert target.is_file(), f"{path}: broken local link {href}"
            if is_revised and anchor and not stem:
                assert anchor in parser.ids, f"{path}: absent anchor {href}"
    for index in range(1, 6):
        n = f"{index:02}"
        content = (DOCS / "chapters" / f"{n}.html").read_text(encoding="utf-8")
        assert content.count("<figure>") >= 2
        assert 'class="math-scroll"' in content and "<math display=" in content
        assert "https://openstax.org" in content
        if index >= 3: assert 'data-lab="market"' in content
        ledger = json.loads((DOCS / "evidence" / f"{n}.json").read_text(encoding="utf-8"))
        assert len(ledger["claims"]) >= 2
        assert all(c["status"] in {"verified", "derived", "illustrative"} for c in ledger["claims"])
        assert all(c.get("locator") for c in ledger["claims"])
    svgs = sorted((DOCS / "assets" / "figures").glob("*.svg"))
    assert len(svgs) == 10, f"expected 10 figures, got {len(svgs)}"
    for path in svgs:
        root = ET.parse(path).getroot()
        assert root.tag.endswith("svg") and "viewBox" in root.attrib, path
        assert any(n.tag.endswith("title") for n in root), path
        assert any(n.tag.endswith("desc") for n in root), path
        ids = [elem.attrib["id"] for elem in root.iter() if "id" in elem.attrib]
        assert len(set(ids)) == len(ids), f"duplicate SVG ids in {path}"
    print("PASS: 28 chapter paths, first five revised articles, 10 SVGs, five evidence ledgers and all local links.")
    print("LEGACY NOTE: 06–28 are migrated but their original H2-only markup and content are not audited in this batch.")

if __name__ == "__main__":
    main()
