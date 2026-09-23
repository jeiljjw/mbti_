// Generates public/sitemap.xml covering /ko|en|ja + type/match/blog matrix.
// (/r/:type share pages are built by prerender but excluded here — thin pages.)
// Run: node scripts/generate-sitemap.mjs
import { writeFileSync } from 'node:fs';

const ORIGIN = 'https://www.simplembti.com';
const LANGS = ['ko', 'en', 'ja'];
const TYPES = ['ISTJ','ISFJ','INFJ','INTJ','ISTP','ISFP','INFP','INTP','ESTP','ESFP','ENFP','ENTP','ESTJ','ESFJ','ENFJ','ENTJ'];
const BLOG_SLUGS = ['mbti-relationship-guide', 'mbti-career-guide', 'mbti-stress-management', 'mbti-love-languages', 'mbti-workplace-communication', 'mbti-myths-debunked'];

const pairs = [];
for (let i = 0; i < TYPES.length; i++) {
  for (let j = i; j < TYPES.length; j++) {
    const [a, b] = [TYPES[i], TYPES[j]].sort();
    pairs.push(`${a.toLowerCase()}-${b.toLowerCase()}`);
  }
}

const staticPaths = ['', '/test', '/match', '/blog', '/about', '/privacy', '/terms', '/contact'];
const urls = [];
for (const lang of LANGS) {
  for (const p of staticPaths) urls.push(`/${lang}${p}`);
  for (const s of BLOG_SLUGS) urls.push(`/${lang}/blog/${s}`);
  // NOTE: /r/:type share URLs are intentionally excluded — thin utility pages
  // (type code + one link button), near-duplicates of /type/:type. Submitting
  // them invites thin-content flags during AdSense review.
  for (const t of TYPES) {
    urls.push(`/${lang}/type/${t.toLowerCase()}`);
  }
  for (const pair of pairs) urls.push(`/${lang}/match/${pair}`);
}

const today = new Date().toISOString().slice(0, 10);
const priorityFor = (u) => {
  if (/^\/(ko|en|ja)$/.test(u)) return '1.0';
  if (u.includes('/test')) return '0.9';
  if (u.includes('/type/') || u.includes('/match/')) return '0.8';
  if (u.includes('/blog')) return '0.7';
  return '0.5';
};

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map((u) => `  <url>\n    <loc>${ORIGIN}${u}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priorityFor(u)}</priority>\n  </url>`).join('\n') +
  `\n</urlset>\n`;

writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml);
console.log(`sitemap.xml: ${urls.length} urls (${pairs.length} pairs x ${LANGS.length} langs)`);
