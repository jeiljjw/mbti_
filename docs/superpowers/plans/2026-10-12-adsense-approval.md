# AdSense Approval Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make simplembti.com pass Google AdSense review on first submission.

**Architecture:** Keep Vite SPA + post-build prerender (`scripts/prerender.mjs` injects per-route `<head>` meta into `dist/`). Extend the existing match-only `<noscript>` fallback to every route kind so a no-JS crawler (Mediapartners-Google without JS, view-source reviewer) sees real text. Gate `ads.txt`/ad rendering so review sees zero invalid inventory. Verify crawler access at CDN layer, then run the repo's own gates (`verify`, `test`, `build`) and a curl-based smoke test.

**Tech Stack:** Vite 8 + React 19 + TypeScript + react-router-dom 7 + i18next + Cloudflare Pages (`public/_headers`, `public/_redirects`) + Node scripts (`prerender.mjs`, `verify-meta.mjs`, `check-duplicate-content.mjs`) + vitest.

**Spec:** `TODO.md` (Phase 0–14 complete, "배포 · 수익화 체크리스트" user steps) + live-crawl findings 2026-10-12 (empty `#root` body on all non-match routes, `pub-0000000000000000` placeholder in `public/ads.txt`, Cloudflare `challenge-platform` present, sitemap 498 URLs, `AdSlot` already returns null without env).

## Global Constraints

- `npm run build` MUST stay `tsc -b && vite build && node scripts/prerender.mjs` — never skip prerender.
- Every valid route is prerendered to `dist/:lang/.../index.html`; do NOT add a global `/* /index.html 200` SPA rewrite in `public/_redirects`.
- Prerendered HTML under `/`, `/ko/*`, `/en/*`, `/ja/*`, `/404.html` MUST stay `Cache-Control: no-cache` in `public/_headers`.
- `src/components/AdSlot.tsx` MUST return null when `VITE_ADSENSE_CLIENT` is unset (no placeholder boxes during review).
- `npm run verify` (`verify-meta.mjs` + `check-duplicate-content.mjs`) and `npx vitest run` MUST pass before any deploy.
- No fake publisher IDs in shipped artifacts under review; `VITE_ADSENSE_CLIENT` default stays `ca-pub-0000000000000000` only in `.env.example`, never injected into `dist/`.

## Review Focus

- No-JS reviewer fetches `/ko`, `/en/about`, `/en/blog/mbti-career-guide`, `/en/type/enfp` with JS disabled and expects ≥1 `<h1>` + ≥1 `<p>` of real text — currently only match pages have `<noscript>`.
- Mediapartners-Google fetches `/en/` and expects HTTP 200 + readable HTML, not a Cloudflare interactive challenge or 403.
- Reviewer fetches `/ads.txt` and expects either a valid `google.com, pub-<16 digits>, DIRECT` line or a missing file — a `pub-0000000000000000` line reads as invalid inventory.
- Reviewer opens Privacy and expects an explicit Google/DoubleClick ads-and-cookies disclosure with opt-out wording — verify it survived all refactors.
- Reviewer compares two match pages (e.g. `enfp-intj` vs `estj-istj`) and expects visibly different body copy, not a score-number-only template swap.

---

### Task 1: Noscript fallback for every route kind

**Files:**
- Modify: `scripts/prerender.mjs:226-235`
- Modify: `scripts/verify-meta.mjs:26-33`
- Test: `scripts/verify-meta.mjs` (extended) + manual `node` check

**Interfaces:**
- Consumes: existing `metaFor(r)` return `{ title, desc, canon, path }` for kinds `home|static|blog|type|share|match`.
- Produces: every `dist/<route>/index.html` contains `<noscript><h1>{title}</h1><p>{desc}</p></noscript>`; `verify-meta.mjs` prints `noscript: OK` for 5+ sampled routes.

- [ ] **Step 1: Write the failing check**

Add to `scripts/verify-meta.mjs` after the existing match noscript block (after line 33):

```js
// AdSense gate: every sampled route must carry a no-JS text fallback.
for (const f of ['dist/ko/index.html', 'dist/en/about/index.html', 'dist/en/blog/mbti-career-guide/index.html', 'dist/ko/type/enfp/index.html']) {
  const h = readFileSync(f, 'utf8');
  console.log('---', f);
  console.log(' noscript:', h.includes('<noscript>') ? 'OK' : 'MISS');
  console.log(' noscript h1:', /<noscript>[\s\S]*?<h1>/.test(h) ? 'OK' : 'MISS');
}
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm run build && npm run verify`
Expected: new lines print `noscript: MISS` for the 4 non-match files (match lines stay OK). Build itself passes; the gate visibly fails.

- [ ] **Step 3: Minimal implementation in prerender**

In `scripts/prerender.mjs`, replace the match-only fallback:

```js
// OLD (lines ~233-234):
// No-JS fallback: unique per-pair summary so crawlers/AdSense see text, not an empty shell.
html = html.replace('<div id="root"></div>', `<div id="root"></div><noscript><h1>${esc(m.title)}</h1><p>${esc(m.desc)}</p></noscript>`);
```

with a route-kind-agnostic version — move it OUT of the `if (m.faq)` block so it applies to all routes:

```js
if (m.faq) {
  const faqJson = `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: m.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  })}</script>`;
  html = html.replace('</head>', `  ${faqJson}\n</head>`);
}
// No-JS fallback (AdSense/Mediapartners without JS): every route carries
// its unique title+description as real text, not an empty shell.
html = html.replace('<div id="root"></div>', `<div id="root"></div><noscript><h1>${esc(m.title)}</h1><p>${esc(m.desc)}</p></noscript>`);
```

Note: `m.title`/`m.desc` are already unique per route (type names, match scores, blog titles per lang), so this satisfies uniqueness without new copy.

- [ ] **Step 4: Run to verify it passes**

Run: `npm run build && npm run verify`
Expected: all `noscript: OK`, `noscript h1: OK`; existing `tier og / faq jsonld / match descriptions unique` lines still OK. Spot-check raw output:

```bash
node -e "const fs=require('node:fs');for(const f of ['dist/ko/index.html','dist/en/about/index.html','dist/en/blog/mbti-career-guide/index.html','dist/ko/type/enfp/index.html','dist/en/match/enfp-intj/index.html']){const h=fs.readFileSync(f,'utf8');console.log(f, h.includes('<noscript><h1>')?'NOSCRIPT-OK':'NOSCRIPT-MISS');}"
```

Expected: all five `NOSCRIPT-OK`.

- [ ] **Step 5: Commit**

```bash
git add scripts/prerender.mjs scripts/verify-meta.mjs
git commit -m "feat(prerender): noscript text fallback on all routes for AdSense review"
```

---

### Task 2: Review-safe ads inventory (ads.txt + AdSlot + headers audit)

**Files:**
- Modify: `public/ads.txt`
- Modify: `src/components/AdSlot.tsx` (read-only audit, change only if placeholder leaks)
- Modify: `public/_headers:1-8` (read-only audit, change only if ad serving blocked)
- Test: `npm run build` + `grep` over `dist/`

**Interfaces:**
- Consumes: `VITE_ADSENSE_CLIENT` env (unset during review).
- Produces: `dist/ads.txt` contains zero `pub-` lines during review; `dist/` contains zero `adsbygoogle` auto-pushes without client; `X-Frame-Options: DENY` kept (it does not block AdSense `<ins>` — only framing of own pages).

- [ ] **Step 1: Write the failing check**

Run:

```bash
npm run build
echo "--- dist ads.txt ---"; cat dist/ads.txt
echo "--- pub lines (expect 0) ---"; grep -c "pub-" dist/ads.txt || echo "0 pub lines"
echo "--- adsbygoogle pushes baked into dist (expect only component code, no client id) ---"; grep -ro "ca-pub-[0-9]*" dist/ | head -n 5 || echo "no client id in dist"
```

Expected FAIL state: `dist/ads.txt` contains `pub-0000000000000000` (1 pub line) — invalid inventory signal.

- [ ] **Step 2: Implement review-safe ads.txt**

Replace `public/ads.txt` content with a comment-only file (no `pub-` line) until approval:

```
# AdSense under review — no publisher ID yet.
# After approval: add "google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0"
# and set VITE_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX before rebuild.
```

Rationale: Google treats missing/informational `ads.txt` as a warning, but a syntactically valid-looking fake `pub-0000…` ID as a trust negative. `TODO.md` step 3 already says to swap the real ID in after approval — this just makes the pre-approval state honest.

- [ ] **Step 3: Audit AdSlot + _headers (no change if already safe)**

Confirm `src/components/AdSlot.tsx:25-27` still early-returns null without client, and `public/_headers` keeps `X-Frame-Options: DENY` (correct — it prevents clickjacking of own pages; AdSense creatives render in their own iframes and are unaffected). If either drifted, restore; otherwise no edit.

- [ ] **Step 4: Re-run check to verify pass**

Run the Step 1 commands again.
Expected: `0 pub lines`, `no client id in dist`, `dist/ads.txt` is comments only.

- [ ] **Step 5: Commit**

```bash
git add public/ads.txt src/components/AdSlot.tsx public/_headers
git commit -m "chore(adsense): comment-only ads.txt during review, verify no ad inventory leaks"
```

---

### Task 3: Crawler-access hardening at CDN layer

**Files:**
- Modify: `public/robots.txt` (only if Mediapartners line missing)
- Modify: `public/_headers` (only if challenge/cache headers need touch — default: no change)
- Test: `curl.exe` smoke commands (Windows pwsh) run against production URL after deploy

**Interfaces:**
- Consumes: production origin `https://www.simplembti.com`.
- Produces: documented evidence that `Mediapartners-Google` receives HTTP 200 + prerendered meta + noscript on 3 sample routes, with no interactive challenge.

- [ ] **Step 1: Write the failing probe (pre-deploy baseline)**

Run against live site and record output:

```powershell
curl.exe -sL -A "Mediapartners-Google/2.1" https://www.simplembti.com/en/ -o $env:TEMP\mp-en.html; (Get-Item $env:TEMP\mp-en.html).Length; Select-String -Path $env:TEMP\mp-en.html -Pattern "<noscript><h1>", "challenge-platform", '<div id="root"></div>' | Select-Object -First 5
curl.exe -sI -A "Mediapartners-Google/2.1" https://www.simplembti.com/en/ | Select-Object -First 12
```

Expected pre-fix: no `<noscript><h1>` on `/en/` (fixed by Task 1 after deploy), `challenge-platform` string present in shell. HTTP status must be 200 — if 403/503, stop and fix Cloudflare first (see Step 3).

- [ ] **Step 2: Confirm robots (no edit if already correct)**

`public/robots.txt` must contain exactly:

```
User-agent: Mediapartners-Google
Allow: /
```

plus `Sitemap: https://www.simplembti.com/sitemap.xml`. It already does — verify, don't duplicate.

- [ ] **Step 3: Cloudflare dashboard checklist (user action, code cannot do it)**

In Cloudflare dashboard for `simplembti.com`, confirm and record:
1. Security → Bots → `Bot Fight Mode` OFF (it challenges good bots), or add explicit skip for `Mediapartners-Google` + `Googlebot`.
2. Security → WAF → no managed-challenge rule matching `/en/*`, `/ko/*`, `/ja/*`, `/ads.txt`, `/robots.txt`, `/sitemap.xml`.
3. Caching → confirm HTML edge cache respects `Cache-Control: no-cache` from `public/_headers` (prerendered pages must revalidate; stale-shell serving caused the earlier wrong-meta incident noted in `vite.config.ts:19-23`).

- [ ] **Step 4: Post-deploy probe passes**

After Task 5 deploy, re-run Step 1 probe for `/en/`, `/ko/type/enfp/`, `/en/match/enfp-intj/`.
Expected: HTTP 200 on all three, `<noscript><h1>` present on all three, no `Just a moment` / captcha body.

- [ ] **Step 5: Commit (only if files changed)**

```bash
git add public/robots.txt public/_headers
git commit -m "chore(crawler): confirm Mediapartners-Google allow + no-cache HTML"
```

If no file changed (robots already correct), skip commit and note evidence in PR/deploy log instead.

---

### Task 4: Policy / E-E-A-T / sitemap preflight

**Files:**
- Audit only: `src/pages/PrivacyPolicy.tsx`, `src/pages/TermsOfService.tsx`, `src/pages/About.tsx`, `src/pages/Contact.tsx`, `public/sitemap.xml`, `public/llms.txt`, `index.html:48-49`
- Modify only if audit finds a gap (missing AdSense cookie disclosure, missing contact email, missing GSC tag)
- Test: `node scripts/generate-sitemap.mjs && npm run verify`

**Interfaces:**
- Consumes: existing Phase 6 content (F1–F4) and Phase 10–14 SEO work.
- Produces: checklist evidence — Privacy mentions Google/DoubleClick + opt-out; Contact shows `contact@simplembti.com` + 4 mailto purposes + SLA; About shows methodology + limits; sitemap count ≥ 490 and excludes `/r/:type`.

- [ ] **Step 1: Audit Privacy for AdSense wording**

```bash
grep -n "DoubleClick\|AdSense\|ads.*cookie\|opt-out\|opt out\|google.*ads" src/pages/PrivacyPolicy.tsx public/llms.txt -i | head -n 20
grep -n "contact@simplembti.com" src/pages/Contact.tsx | head -n 10
grep -n "google-site-verification" index.html dist/ko/index.html | head -n 5
```

Expected: Privacy hits on DoubleClick/AdSense cookies + user rights (GDPR/CCPA/APPI per TODO F1); Contact hits on operator email; GSC tag present in source and dist.

- [ ] **Step 2: Audit sitemap hygiene**

```bash
node scripts/generate-sitemap.mjs
grep -c "<loc>" public/sitemap.xml
grep -c "/r/" public/sitemap.xml || echo "0 /r/ urls (correct)"
grep -c "/match/" public/sitemap.xml
```

Expected: total ~498 (136 pairs × 3 langs + 16 types × 3 + blog 18 + static 24), `/r/` count 0 (thin share pages excluded per `generate-sitemap.mjs:2`), match URLs present with tiered priorities.

- [ ] **Step 3: Fix only what the audit proves missing**

Examples (apply only the failing one):
- Privacy missing ads disclosure → add one paragraph to `src/pages/PrivacyPolicy.tsx` reusing F1 wording, in all 3 locale strings.
- Contact missing email/SLA → restore `contact@simplembti.com`, 4 purpose mailtos, 3-day SLA from TODO F4.
- Otherwise: no edit. Do not invent new pages (YAGNI — blog stays at 6; U10's 6→12 expansion is explicitly optional).

- [ ] **Step 4: Re-run gates**

Run: `npm run verify && npx vitest run`
Expected: `verify` prints OKs, vitest 14/14 pass (per TODO U9/N3 baselines).

- [ ] **Step 5: Commit (only if changed)**

```bash
git add src/pages/PrivacyPolicy.tsx src/pages/Contact.tsx src/pages/About.tsx public/sitemap.xml
git commit -m "docs(policy): pre-AdSense E-E-A-T and disclosure audit fixes"
```

---

### Task 5: Full build, verify, deploy, smoke test

**Files:**
- Build artifact: `dist/` (generated, not committed)
- Source of truth: `package.json:8` build chain
- Test: `npm run build && npm run verify && npx vitest run` + production `curl.exe` probes

**Interfaces:**
- Consumes: Tasks 1–4 merged.
- Produces: deployed site where every AdSense probe passes; deploy log with command outputs pasted.

- [ ] **Step 1: Clean full build + gates**

```bash
npm run build
npm run verify
npx vitest run
npx eslint .
```

Expected: `prerender: 546 pages with injected meta` (or 498+ per sitemap — record actual number), `verify` all OK including new noscript lines, vitest 14/14, eslint zero errors.

- [ ] **Step 2: Deploy dist**

Follow `TODO.md` "배포 · 수익화 체크리스트" step 1: upload `dist/` to current host (Cloudflare Pages per `_headers`/`_redirects`), SPA fallback stays OFF, `404.html` served with real 404.

- [ ] **Step 3: Production smoke test (the AdSense review simulation)**

```powershell
foreach ($u in @("https://www.simplembti.com/ko","https://www.simplembti.com/en/about","https://www.simplembti.com/en/blog/mbti-career-guide","https://www.simplembti.com/ko/type/enfp","https://www.simplembti.com/en/match/enfp-intj")) { $f="$env:TEMP\smoke.html"; curl.exe -sL $u -o $f; $h=Get-Content $f -Raw; Write-Output "$u noscript=$($h.Contains('<noscript><h1>')) title=$([regex]::Match($h,'<title>(.*?)</title>').Groups[1].Value.Substring(0,60))" }
curl.exe -s https://www.simplembti.com/ads.txt
curl.exe -s https://www.simplembti.com/robots.txt | Select-Object -First 10
curl.exe -s https://www.simplembti.com/sitemap.xml -o $env:TEMP\sm.xml; (Select-String -Path $env:TEMP\sm.xml -Pattern "<loc>" | Measure-Object).Count
```

Expected: all five URLs `noscript=True` with correct per-route titles; `ads.txt` comment-only; `robots.txt` shows Mediapartners allow; sitemap count matches `public/sitemap.xml`.

- [ ] **Step 4: Submit (user action)**

Only after Step 3 all-green: GSC sitemap submit → wait for ≥1 indexed page → AdSense application. Record dates. After approval, do the deferred TODO step: real `pub-` ID into `public/ads.txt` + `VITE_ADSENSE_CLIENT` env → rebuild → redeploy.

- [ ] **Step 5: Commit deploy log (if repo tracks it)**

```bash
git add docs/superpowers/plans/2026-10-12-adsense-approval.md
git commit -m "docs(plan): AdSense approval plan with noscript + inventory gates"
```

---

## Self-Review

1. **Spec coverage:** TODO Phases 0–14 (prerender, sitemap, AdSlot, policy F1–F4, uniqueness U1–U9) all referenced; live-crawl gaps (empty body, fake ads.txt, challenge) each own a task. U10 blog 6→12 stays optional per YAGNI.
2. **Placeholder scan:** no TBD/TODO/later; every code step shows exact snippets, paths, and commands.
3. **Type consistency:** `metaFor` shape, `dist/:lang/.../index.html` paths, `VITE_ADSENSE_CLIENT` name, `Mediapartners-Google` spelling consistent across tasks.
4. **Review Focus:** all five lines mapped — Task 1 (no-JS text), Task 3 (challenge/200), Task 2 (ads.txt), Task 4 (Privacy disclosure), Task 1+4 (match uniqueness via existing `uniqueness.test.ts` + noscript desc check).
