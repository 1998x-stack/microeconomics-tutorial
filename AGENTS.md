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


## Producer and market-structure numerical canon (chapters 11–15)
- Chapter 11: use the explicitly hypothetical Cobb–Douglas production function Q=2L^(2/3)K^(2/3). With K=8, Q=8L^(2/3), MPL=(16/3)L^(−1/3); for Q=32 the isoquant satisfies LK=64 and MRTS=K/L. The exponents sum to 4/3, so scaling both inputs by λ scales output by λ^(4/3). **Do not confuse diminishing MPL holding K fixed with returns to scale when all inputs change.**
- Chapter 12: the separate illustrative short-run cost function is TC=32+q³−6q²+15q; FC=32, AVC=(q−3)²+6, AFC=32/q, ATC=AVC+AFC, MC=3q²−12q+15. min AVC=6 at q=3; min ATC=15 at q=4. Accounting example: revenue1200−explicit850=accounting profit350; subtract implicit opportunity costs250+150 to get economic profit−50. Distinguish fixed costs from sunk costs and short-run commitments from long-run avoidability.
- Chapter 13: reuse chapter 12 cost model. Competitive supply uses the rising MC branch only when P≥min AVC=6. For P≥6, q=2+sqrt((P−3)/3); below6, short-run shutdown q=0. At P8 the firm operates at a loss≈−25.697, smaller than the shutdown loss−32; at P15 q4 and economic profit0; at P18 q=2+sqrt5 and profit≈12.36068. MR=MC is necessary for an interior optimum, not a substitute for checking the shutdown option.
- Chapter 14: long-run zero economic profit is conditional on entry/exit, technology and input-price assumptions. For the constant-cost illustration QD=A−4P, long-run P15, firm q4, A100→120 implies Q40→60 and firm count10→15. Separate this from the independent welfare example P_D=80−Q and MC=20+0.5Q, where Q40, P40, CS800, PS400, TS1200. Efficiency does not imply equity; externalities and other market failures break the benchmark.
- Chapter 15: single-price monopoly illustration P=100−Q, MC20 gives MR=100−2Q, Qm40, Pm60, competitive Qc80/Pc20, monopoly CS800/PS1600/DWL800. Lerner index (P−MC)/P=1/|ε| at an interior optimum. For the separate two-segment example PA=80−QA and PB=60−0.5QB, MC20 gives third-degree prices (50,40), quantities (30,40). In this particular linear example total quantity remains70 and total surplus falls by100/3 under discrimination; **do not generalize this welfare result to every demand shape**. Market power, segmentation and limited resale are distinct requirements; price differences caused by serving costs are not necessarily price discrimination.
- QA now covers chapters 01–15, 30 original SVGs and 15 evidence files. Never mark 16–28 as deeply reviewed. Run both static and browser tests; do not weaken a failing assertion to make CI pass.
