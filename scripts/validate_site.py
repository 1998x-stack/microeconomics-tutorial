#!/usr/bin/env python3
"""Offline link, evidence, semantic HTML and standalone SVG gate."""
import json
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
REVISED = 10

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.h1 = 0
        self.figures = 0
        self.captions = 0
        self.images = []
        self.ids = set()
        self.links = []
        self.math_count = 0
        self.frac_children = []
        self.stack = []
    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        if tag == "h1": self.h1 += 1
        if tag == "figure": self.figures += 1
        if tag == "figcaption": self.captions += 1
        if tag == "math": self.math_count += 1
        if "id" in attributes:
            assert attributes["id"] not in self.ids, f"duplicate id: {attributes['id']}"
            self.ids.add(attributes["id"])
        if tag in ("a", "link", "script", "img"):
            url = attributes.get("href") or attributes.get("src")
            if url: self.links.append(url)
        if tag == "img": self.images.append(attributes)
        if self.stack and self.stack[-1][0] == "mfrac":
            self.stack[-1][1][0] += 1
        if tag == "mfrac":
            counter = [0]
            self.frac_children.append(counter)
            self.stack.append(("mfrac",counter))
        elif tag.startswith("m") and tag not in ("meta",):
            self.stack.append((tag,None))
    def handle_endtag(self, tag):
        if tag.startswith("m") and self.stack:
            if self.stack[-1][0] == tag: self.stack.pop()

def main():
    meta = json.loads((ROOT / "courses.json").read_text(encoding="utf-8"))
    chapters = meta["chapters"]
    assert len(chapters) == 28 and meta["chapterCount"] == 28
    assert len({c["num"] for c in chapters}) == 28
    pages = [DOCS/"index.html"] + [DOCS/"chapters"/c["file"] for c in chapters]
    for index, path in enumerate(pages):
        assert path.is_file(), f"missing {path}"
        content = path.read_text(encoding="utf-8")
        page = Page()
        page.feed(content)
        revised = index <= REVISED
        if revised:
            assert page.h1 == 1, f"{path} requires 1 H1; got {page.h1}"
            assert page.figures == page.captions, f"{path} figure/caption mismatch"
            assert all(im.get("alt") for im in page.images), f"{path} missing alt"
            assert "javascript:void" not in content, path
            assert all(v[0] == 2 for v in page.frac_children), f"{path} mfrac requires 2 children"
        for url in page.links:
            if url.startswith(("https:", "http:", "mailto:", "data:", "javascript:")): continue
            filename, sep, fragment = url.partition("#")
            if filename:
                target = (path.parent/unquote(filename.split("?")[0])).resolve()
                assert target.is_file(), f"{path}: broken local link {url}"
            if revised and fragment and not filename:
                assert fragment in page.ids, f"{path}: missing anchor {url}"
    for i in range(1, REVISED+1):
        n=f"{i:02}"
        content = (DOCS/"chapters"/f"{n}.html").read_text(encoding="utf-8")
        assert content.count("<figure>") == 2, f"chapter {n} expected two figures"
        assert 'class="math-scroll"' in content and "<math display=" in content
        assert "openstax.org" in content
        if i >= 3: assert 'data-lab="' in content, n
        evidence=json.loads((DOCS/"evidence"/f"{n}.json").read_text(encoding="utf-8"))
        assert len(evidence["claims"]) >= 2
        assert all(c["status"] in {"verified","derived","illustrative"} for c in evidence["claims"])
        assert all(c.get("locator") for c in evidence["claims"])
        assert (ROOT/f"{n}.html").is_file(), f"legacy link absent for {n}"
    figures=sorted((DOCS/"assets"/"figures").glob("*.svg"))
    assert len(figures) == 44, f"expected 44 SVGs, found {len(figures)}"
    for path in figures:
        root=ET.parse(path).getroot()
        assert root.tag.endswith("svg") and root.get("viewBox"), path
        assert any(c.tag.endswith("title") for c in root), path
        assert any(c.tag.endswith("desc") for c in root), path
        ids=[x.attrib["id"] for x in root.iter() if "id" in x.attrib]
        assert len(ids)==len(set(ids)), f"duplicate SVG IDs: {path}"
        assert not any(x.tag.endswith("script") for x in root.iter()), f"SVG script: {path}"
    print(f"PASS: 28 chapters, first {REVISED} reviewed, 44 SVGs, 10 evidence files, local links, MathML structure.")
    print("LEGACY NOTE: chapters 11–28 retained but not subject to deep editorial audit.")

if __name__=="__main__":
    main()
