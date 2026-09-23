// Copies dist/index.html to every static route AND injects per-route <head>
// meta (title, description, canonical, hreflang, OG/Twitter, JSON-LD).
// This makes OG/SEO visible to crawlers that do not execute JS.
// Run after build: node scripts/prerender.mjs
import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { scoreOf, tierOf } from './score.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const shellPath = join(dist, 'index.html');
if (!existsSync(shellPath)) {
  console.error('dist/index.html not found. Run `npm run build` first (prerender skipped).');
  process.exit(0);
}
const shell = readFileSync(shellPath, 'utf8');

const ORIGIN = 'https://www.simplembti.com';
const LANGS = ['ko', 'en', 'ja'];
const TYPES = ['istj','isfj','infj','intj','istp','isfp','infp','intp','estp','esfp','enfp','entp','estj','esfj','enfj','entj'];
const BLOG = {
  'mbti-relationship-guide': {
    img: '/blog/relationship.png',
    ko: ['MBTI 유형별 궁합 완벽 가이드 | 관계의 심리학', '내 성격에 딱 맞는 최고의 파트너는 누구일까요? MBTI 유형별 궁합 표와 관계 개선 팁을 확인하세요.'],
    en: ['The Ultimate MBTI Compatibility Guide | Psychology of Relationships', 'Find your perfect match based on your personality type. Compatibility chart and relationship tips.'],
    ja: ['MBTI相性完全ガイド｜恋愛の心理学', 'あなたの性格に合う最高のパートナーは？MBTI相性表と関係改善のコツをチェック。'],
  },
  'mbti-career-guide': {
    img: '/blog/career.png',
    ko: ['MBTI 직업 추천 가이드 | 나에게 맞는 커리어 찾기', '성격 유형별 최적의 직업군과 업무 스타일을 MBTI 기반으로 제안합니다.'],
    en: ['MBTI Career Guide: Finding the Right Path for You', 'Best career fields and work styles for each MBTI personality type.'],
    ja: ['MBTI職業ガイド｜自分に合うキャリア', '性格タイプ別の最適職種と働き方を分析します。'],
  },
  'mbti-stress-management': {
    img: '/blog/stress.png',
    ko: ['MBTI 스트레스 해소법 | 성격별 멘탈 관리 전략', '유형별 번아웃 방지법과 마음의 평화를 되찾는 맞춤형 솔루션을 확인하세요.'],
    en: ['MBTI Stress Management | Mental Wellness by Personality Type', 'Burnout prevention strategies and personalized solutions for mental peace.'],
    ja: ['MBTIストレス解消法｜タイプ別メンタル管理', 'タイプ別の燃え尽き防止法と回復法をチェック。'],
  },
  'mbti-love-languages': {
    img: '/1.webp',
    ko: ['MBTI 사랑의 언어 16유형 정리 | 연애 궁합 가이드', '유형별 사랑 표현 방식과 연인과 잘 통하는 대화법을 확인하세요.'],
    en: ['MBTI Love Languages: All 16 Types Explained', 'How each MBTI type expresses love, plus communication tips.'],
    ja: ['MBTI愛の言語16タイプ｜恋愛相性ガイド', 'タイプ別の愛情表現と通じ合う会話法をチェック。'],
  },
  'mbti-workplace-communication': {
    img: '/2.webp',
    ko: ['MBTI 직장 소통 가이드 | 유형별 협업과 리더십', '상사·동료·후배와 일하는 실전 팁을 확인하세요.'],
    en: ['MBTI Workplace Guide: Communication by Type', 'Practical tips for bosses, teammates, and feedback.'],
    ja: ['MBTI職場ガイド｜タイプ別コミュニケーション', '上司・同僚との実践のコツをチェック。'],
  },
  'mbti-myths-debunked': {
    img: '/3.webp',
    ko: ['MBTI 오해와 진실 5가지 | 과학적 근거 정리', '흔한 오해 5가지를 팩트 기반으로 바로잡습니다.'],
    en: ['5 MBTI Myths vs Facts | Scientific Accuracy Guide', 'Debunking 5 common myths about MBTI with evidence.'],
    ja: ['MBTIの誤解と真実5つ｜科学的根拠', 'よくある誤解5つをファクトで正します。'],
  },
};

const tr = {};
for (const l of LANGS) {
  tr[l] = JSON.parse(readFileSync(join(root, 'src', 'locales', l, 'translation.json'), 'utf8'));
}

// Port of src/utils/compatibility.ts scoring (must stay in sync).
// (moved to ./score.mjs — single source of truth)
const TIER = {
  ko: ['최고의 궁합', '좋은 궁합', '무난한 궁합', '노력이 필요한 궁합'],
  ja: ['最高の相性', '良い相性', 'まずまずの相性', '努力が必要な相性'],
  en: ['Excellent match', 'Good match', 'Average match', 'Challenging match'],
};

const HOME_T = {
  ko: ['Simple MBTI - 빠르고 정확한 성격 테스트', 'Simple MBTI로 2분 만에 성격 유형을 확인하세요. 16유형 리포트, 136 궁합 분석, 한/영/일 지원.'],
  ja: ['Simple MBTI - 速く正確な性格診断', '2分で性格タイプが分かるMBTI診断。16タイプレポート、136の相性分析、日英韓対応。'],
  en: ['Simple MBTI - Fast & Accurate Personality Test', 'Discover your personality type in 2 minutes. 16 type reports, 136 compatibility analyses, KO/EN/JA.'],
};
const STATIC_T = {
  '/test': {
    ko: ['MBTI 성격 테스트 | 초간단 12문항·스탠다드·정밀', '가입 없이 2분 만에 끝나는 무료 MBTI 테스트. 결과 카드 저장과 공유 지원.'],
    ja: ['MBTI性格診断｜超シンプル12問・精密48問', '登録不要・無料のMBTI診断。結果カード保存と共有対応。'],
    en: ['Free MBTI Test | 12-Question Quick & 48-Question Deep', 'Free MBTI test with no signup. Save and share your result card.'],
  },
  '/match': {
    ko: ['MBTI 궁합 파인더 | 136쌍 전체 매트릭스', '두 유형을 고르면 궁합 점수와 심층 분석을 보여줍니다. 16×16 전체 매트릭스 수록.'],
    ja: ['MBTI相性ファインダー｜136組マトリクス', '2タイプを選ぶと相性スコアと深掘り分析を表示。16×16全マトリクス収録。'],
    en: ['MBTI Compatibility Finder | All 136 Pairs', 'Pick two types for a compatibility score and deep analysis. Full 16×16 matrix.'],
  },
  '/blog': {
    ko: ['MBTI 블로그 - 성격 유형에 대한 모든 통찰', 'MBTI 궁합, 직업, 스트레스 관리 등 성격 유형 가이드.'],
    ja: ['MBTIブログ - 性格タイプの洞察', 'MBTI相性・職業・ストレス管理などの性格タイプガイド。'],
    en: ['MBTI Blog - Insights into Personality Types', 'Compatibility guides, career advice, and stress strategies by type.'],
  },
  '/about': {
    ko: ['Simple MBTI 소개 | 미션·검사 방법론', '무료 다국어 성격검사. 투명한 검사 방법론과 에디토리얼 기준을 공개합니다.'],
    ja: ['Simple MBTIについて｜使命・診断方法', '無料の多言語性格診断。透明な方法論と編集基準を公開しています。'],
    en: ['About Simple MBTI | Mission & Methodology', 'Free multilingual personality test with transparent methodology.'],
  },
  '/privacy': {
    ko: ['개인정보처리방침 | Simple MBTI', '수집 정보, Google 광고·분석 쿠키, 이용자 권리(GDPR·CCPA·APPI)를 안내합니다.'],
    ja: ['プライバシーポリシー｜Simple MBTI', '収集情報、Google広告・分析Cookie、利用者の権利を案内します。'],
    en: ['Privacy Policy | Simple MBTI', 'Data collection, Google ads/analytics cookies, and your rights (GDPR/CCPA/APPI).'],
  },
  '/terms': {
    ko: ['이용약관 | Simple MBTI', '서비스 이용 조건, 검사 한계 고지, 허용·금지 행위를 안내합니다.'],
    ja: ['利用規約｜Simple MBTI', '利用条件、診断の限界、許可・禁止行為を案内します。'],
    en: ['Terms of Service | Simple MBTI', 'Service terms, test limitations, and permitted use.'],
  },
  '/contact': {
    ko: ['문의하기 | Simple MBTI', '광고·제휴, 오류 신고, 개인정보 요청. 영업일 3일 이내 답변.'],
    ja: ['お問い合わせ｜Simple MBTI', '広告・提携、誤り報告、プライバシー請求。3営業日以内に返信。'],
    en: ['Contact Us | Simple MBTI', 'Ads, partnerships, corrections, privacy requests. Replies in 3 business days.'],
  },
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const pairs = [];
for (let i = 0; i < TYPES.length; i++)
  for (let j = i; j < TYPES.length; j++) {
    const [x, y] = [TYPES[i], TYPES[j]].sort();
    pairs.push(`${x}-${y}`);
  }

const routes = [];
for (const lang of LANGS) {
  routes.push({ route: `/${lang}`, kind: 'home', lang, path: '/' });
  for (const p of Object.keys(STATIC_T)) routes.push({ route: `/${lang}${p}`, kind: 'static', lang, path: p });
  for (const s of Object.keys(BLOG)) routes.push({ route: `/${lang}/blog/${s}`, kind: 'blog', lang, slug: s });
  for (const t of TYPES) {
    routes.push({ route: `/${lang}/type/${t}`, kind: 'type', lang, code: t.toUpperCase() });
    routes.push({ route: `/${lang}/r/${t}`, kind: 'share', lang, code: t.toUpperCase() });
  }
  for (const pair of pairs) routes.push({ route: `/${lang}/match/${pair}`, kind: 'match', lang, pair });
}

function metaFor(r) {
  const { kind, lang } = r;
  const canon = (p) => `${ORIGIN}/${lang}${p === '/' ? '' : p}`;
  if (kind === 'home') {
    const [title, desc] = HOME_T[lang];
    return { title, desc, img: `${ORIGIN}/mbti_dashboard_mockup.png`, canon: canon('/'), path: '/', jsonld: true };
  }
  if (kind === 'static') {
    const [title, desc] = STATIC_T[r.path][lang];
    return { title, desc, img: `${ORIGIN}/mbti_dashboard_mockup.png`, canon: canon(r.path), path: r.path };
  }
  if (kind === 'blog') {
    const b = BLOG[r.slug];
    const [title, desc] = b[lang];
    return { title, desc, img: `${ORIGIN}${b.img}`, canon: canon(`/blog/${r.slug}`), path: `/blog/${r.slug}`, article: true };
  }
  if (kind === 'type' || kind === 'share') {
    const code = r.code;
    const name = tr[lang].results.types[code].name;
    const d = tr[lang].results.types[code].desc;
    const label = lang === 'ko' ? '성격 유형' : lang === 'ja' ? '性格タイプ' : 'Personality Type';
    return {
      title: `${code} ${name} | Simple MBTI`,
      desc: `${code} (${name}): ${d}`.slice(0, 160),
      img: `${ORIGIN}/og/${code.toLowerCase()}.png`,
      canon: canon(kind === 'type' ? `/type/${code.toLowerCase()}` : `/r/${code.toLowerCase()}`),
      path: kind === 'type' ? `/type/${code.toLowerCase()}` : `/r/${code.toLowerCase()}`,
    };
  }
  if (kind === 'match') {
    const [x, y] = r.pair.split('-').map((s) => s.toUpperCase());
    const score = scoreOf(x, y);
    const tier = TIER[lang][tierOf(score)];
    const label = lang === 'ko' ? '궁합' : lang === 'ja' ? '相性' : 'Compatibility';
    const unit = lang === 'en' ? 'points' : lang === 'ja' ? '点' : '점';
    return {
      title: `${x} × ${y} ${label} ${score}${lang === 'en' ? '' : unit} — ${tier} | Simple MBTI`,
      desc: lang === 'ko' ? `${x}와 ${y}의 MBTI 궁합 ${score}점(${tier}). 지표별 심층 분석, 강점과 주의점, 데이트 가이드, FAQ까지.`
        : lang === 'ja' ? `${x}と${y}のMBTI相性${score}点（${tier}）。指標別の深掘り、強みと注意点、デートガイド、FAQまで。`
        : `MBTI compatibility of ${x} and ${y}: ${score} ${unit} (${tier}). Dimension analysis, strengths, dating guide, FAQ.`,
      img: `${ORIGIN}/og/match.png`,
      canon: canon(`/match/${r.pair}`),
      path: `/match/${r.pair}`,
    };
  }
  throw new Error('unknown kind');
}

const orgJsonLd = (lang) => `<script type="application/ld+json">${JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Organization', name: 'Simple MBTI', url: ORIGIN, logo: `${ORIGIN}/icons/icon-512.png`, sameAs: [] },
    { '@type': 'WebSite', name: 'Simple MBTI', url: `${ORIGIN}/${lang}`, inLanguage: [lang], potentialAction: { '@type': 'SearchAction' } },
  ],
})}</script>`;

let n = 0;
for (const r of routes) {
  const m = metaFor(r);
  let html = shell;
  html = html.replace(/<html lang="[^"]*">/, `<html lang="${m ? r.lang : 'en'}">`);
  html = html.replace(/<title>.*?<\/title>/, `<title>${esc(m.title)}</title>`);
  html = html.replace(/<meta name="title" content="[^"]*" \/>/, `<meta name="title" content="${esc(m.title)}" />`);
  html = html.replace(/<meta name="description"\s+content="[^"]*" \/>/, `<meta name="description" content="${esc(m.desc)}" />`);
  html = html.replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${m.canon}" />`);
  html = html.replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${esc(m.title)}" />`);
  html = html.replace(/<meta property="og:description"\s+content="[^"]*" \/>/, `<meta property="og:description" content="${esc(m.desc)}" />`);
  html = html.replace(/<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${m.img}" />`);
  html = html.replace(/<meta property="twitter:url" content="[^"]*" \/>/, `<meta property="twitter:url" content="${m.canon}" />`);
  html = html.replace(/<meta property="twitter:title" content="[^"]*" \/>/, `<meta property="twitter:title" content="${esc(m.title)}" />`);
  html = html.replace(/<meta property="twitter:description"\s+content="[^"]*" \/>/, `<meta property="twitter:description" content="${esc(m.desc)}" />`);
  html = html.replace(/<meta property="twitter:image" content="[^"]*" \/>/, `<meta property="twitter:image" content="${m.img}" />`);
  html = html.replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${m.canon}" />`);
  for (const l of LANGS) {
    html = html.replace(
      new RegExp(`<link rel="alternate" hreflang="${l}" href="[^"]*" \\/>`),
      `<link rel="alternate" hreflang="${l}" href="${ORIGIN}/${l}${m.path === '/' ? '' : m.path}" />`
    );
  }
  if (m.jsonld) html = html.replace('</head>', `  ${orgJsonLd(r.lang)}\n</head>`);
  const out = join(dist, r.route.slice(1), 'index.html');
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  n++;
}
console.log(`prerender: ${n} pages with injected meta`);
