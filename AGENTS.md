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
- QA now covers chapters 01–15. Never mark 16–28 as reviewed, and do not weaken a failing test to make CI pass.


## Producer and market-structure numerical canon (chapters 11–15)
- Chapter 11: the short-run production function is the explicitly hypothetical Q(L)=3L²−0.1L³ with fixed capital K̄=1 (0≤L≤25), so AP=Q/L=3L−0.1L² and MP=Q′(L)=6L−0.3L². Anchors: L=5→Q62.5/AP12.5/MP22.5; L=10→Q200/AP20/MP30; L=15→Q337.5/AP22.5/MP22.5; L=20→Q400/AP20/MP0; L=25→Q312.5/AP12.5/MP−37.5. MP peaks at L=10 (30, the TP inflection), AP peaks at L=15 (22.5, where MP=AP), TP peaks at L=20 (400, where MP=0). Returns to scale is a separate long-run concept: for Cobb–Douglas Q=A·L^a·K^b it is decided by a+b (>1 increasing, =1 constant, <1 decreasing); the cubic Q(L) describes only K̄=1 and must not be extrapolated to other capital. **Do not confuse diminishing marginal returns holding K fixed with returns to scale when all inputs change.**
- Chapter 12: the separate illustrative short-run cost model is TFC=100 and TVC(Q)=20Q−3Q²+0.5Q³, so MC=20−6Q+1.5Q², AVC=20−3Q+0.5Q², AFC=100/Q and ATC=TVC/Q+100/Q. min AVC=15.5 at Q=3 (where MC=AVC); min ATC≈36.65 at Q≈5.886 (where MC=ATC). Accounting example: revenue 50 − explicit cost 40 = accounting profit 10; subtract implicit cost 17 to get economic profit −7; normal profit equals the 17 of implicit cost. Distinguish fixed costs from sunk costs and short-run commitments from long-run avoidability.
- Chapter 13: the illustrative cost function is TC(Q)=200+20Q+5Q² (fixed cost 200), so MC=20+10Q and AVC=20+5Q. Competitive P=MC gives Q*=(P−20)/10 when P≥min AVC=20; at P≤20 the firm shuts down (Q*=0, loss −200). At P=40, Q*=2, TR=80, TC=260, profit −180; AVC(2)=30<P so it keeps producing rather than take the −200 shutdown loss. The short-run-supply figure uses P=100→Q=8 (profit) and P=60→Q=4 (loss but P>AVC=40). MR=MC is necessary for an interior optimum, not a substitute for checking the shutdown option.
- Chapter 14: long-run zero economic profit is conditional on entry/exit, technology and input-price assumptions. For the constant-cost illustration D₀: P=100−Q and S₀: P=20+Q give Q=40, P=60 (=min ATC); a demand shift to D₁: P=140−Q gives the short-run Q=60, P=80, and entry moves supply to S₁: P=Q−20, restoring Q=80, P=60. The independent welfare example uses the same D: P=100−Q and S: P=20+Q, where CS=½(100−60)·40=800, PS=½(60−20)·40=800 and TS=1600. Efficiency does not imply equity; externalities and other market failures break the benchmark.
- Chapter 15: single-price monopoly illustration P=100−Q, MC=20 gives MR=100−2Q, Qm=40, Pm=60, profit 1600; competitive Qc=80/Pc=20; consumer surplus falls from 3200 to 800, and DWL=½(60−20)(80−40)=800. The lab varies MC: Qm=(100−MC)/2, Qc=100−MC. Third-degree price discrimination is treated only conceptually (a table of first/second/third degree) with no numeric two-segment model, and the 800 DWL result is specific to this linear demand and constant MC — **do not generalize this welfare result to every demand shape**. Market power, segmentation and limited resale are distinct requirements; price differences caused by serving costs are not necessarily price discrimination.
- QA now covers chapters 01–15 (30 chapter figures and 15 evidence ledgers); chapters 16–28 are rewritten to the same specification (26 further figures and 13 evidence ledgers) but are not deeply reviewed. Run both static and browser tests; do not weaken a failing assertion to make CI pass.
