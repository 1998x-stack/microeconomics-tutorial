# AGENTS.md — Microeconomics Tutorial

## Mission and audience
Make every page a self-contained, mathematically correct Chinese microeconomics explanation readable by an interested beginner. Do not refer to an unseen lecture, the existence of a handout, or invented first-person experience. Begin with a concrete decision problem, explain causal mechanisms, derive with numerical examples, and close with limitations and a short exercise.

## Source of truth and layout
- `docs/index.html`: public course portal; `docs/chapters/NN.html`: canonical 28 lessons.
- `docs/assets/css/site.css`: shared tokens and layout; `docs/assets/js/lab.js`: accessible deterministic labs.
- `docs/assets/figures/*.svg`: standalone original conceptual diagrams.
- `docs/evidence/NN.json`: claim provenance; `courses.json`: canonical chapter metadata.
- Root `NN.html` stays as legacy compatibility entrypoint; do not delete without verifying inbound links.
- `scripts/validate_site.py`: offline gate; `.github/workflows/`: CI and Pages publishing (requires GitHub Pages configured for GitHub Actions).

## Olah-inspired process
Follow `https://github.com/1998x-stack/Olah-style-posts/tree/main/skills/olah-style-paper-posts` for progressive explanation, semantic HTML, proofread equations, unique SVG storyboards, accessible interaction, citations and browser QA. Take inspiration only; never copy diagrams or prose.

## Editorial contract
1. Every article needs one H1, H2 journey: problem → intuition → diagram → formal reasoning → worked example → boundary cases → exercise → sources.
2. State **assumptions and units**. Distinguish an individual's decision from a market outcome; a shift of a curve from motion along it; comparative advantage from absolute advantage; accounting from opportunity cost.
3. Clearly label every invented parameter as *假设 / 教学示例*. Never present demonstration numbers as observed data. Use `math`/MathML for nontrivial equations. No MathML inside SVG.
4. Cite the official reference near technical claims and in source list; add source URL, locator and `status` to `docs/evidence/NN.json`. Prefer OpenStax, CORE Econ, original economic research.
5. Minimize overclaims: no universal upward-sloping supply, no guarantee that prices converge, no unconstrained welfare theorem, no fictional autobiographical anecdotes.
6. SVG requires xmlns, viewBox, title, desc, axis units, labels >=13 px at native width, semantic colors (demand teal, supply orange, equilibrium purple) and explanation in figcaption. Default view must work without JS.
7. One canonical CSS; responsive width 360/390/768/1440, focus-visible, keyboard labels, print and reduced-motion. Keep scripts local/offline.
8. Validate `python scripts/validate_site.py`; run Playwright browser QA manually/CI when available: mobile overflow, MathML fraction layout, keyboard focus, image loading, slider action, console and print. Unrun checks must be recorded as **not verified**.
9. Avoid aggressive relocations. Update links/redirects, keep older chapters readable, and perform page-by-page edits with reproducible small commits.
10. Do not claim Pages is live until the deploy job and external URL have been checked.

## Review checklist
- Explain what changed and what remains outside scope.
- Check numerical examples independently; unit consistency and all curve intersection arithmetic.
- Verify citations, all internal relative links, nonempty SVG alt/figcaption, complete nav, search and labs.
- Add evidence ledger update and a note to README when a chapter is refactored.

## Consumer theory numerical canon (chapters 06–10)
- Chapter 06: demand Qd=120−2P. Point |elasticity|=2P/Q; midpoint elasticity for (P20,Q80)→(P30,Q60) is 0.7142857 in absolute value. Do not confuse elasticity and slope, revenue and profit, or price movement and a shift.
- Chapter 07: same market Qd=120−2P and Qs=20+3P. For per-unit tax t use Pc=Pp+t, yielding Pc=20+0.6t, Pp=20−0.4t, Q=80−1.2t, revenue=tQ, and DWL=0.6t² under no externalities. Legal remitter is not economic tax bearer. Price ceiling/floor computations distinguish planned from transacted quantities.
- Chapter 08: the discrete TU=12x−x² model is **separate** from Cobb–Douglas U=√(xy). The latter has budget I=12, Px=2, Py=1, interior optimum (3,6). Keep utility ordinal and state interior conditions before using MUx/Px=MUy/Py.
- Chapter 09: for the same Cobb–Douglas model MRS=y/x and budget slope −Px/Py=−2. A smooth tangency does not universally hold at corners or kinks. Price drop Px2→1 rotates the budget and gives C=(6,6).
- Chapter 10: old A=(3,6), new C=(6,6). Hicks B=(√18,√18) at compensated income 2√18; Slutsky B=(4.5,4.5) at compensated income 9. Total Δx=3 in both decompositions, components differ. Cobb–Douglas here implies normal goods; **do not depict Giffen behavior as derived from it**. For documented Giffen evidence cite Jensen & Miller (2008) with population and finding scope.
- Every new lab must function without network access, with live ARIA status, labeled native controls and a deterministic smoke test. Static figures carry the entire explanatory claim if JS is disabled.
- QA now covers chapters 01–10. Never mark 11–28 as reviewed, and do not weaken a failing test to make CI pass.
