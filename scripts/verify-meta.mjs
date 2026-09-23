import { readFileSync } from 'node:fs';

const grab = (file, re) => {
  const html = readFileSync(file, 'utf8');
  const m = html.match(re);
  return m ? m[1].slice(0, 110) : 'MISS';
};

const checks = [
  ['dist/ko/type/enfp/index.html', 'type-ko'],
  ['dist/en/match/enfp-intj/index.html', 'match-en'],
  ['dist/ja/blog/mbti-love-languages/index.html', 'blog-ja'],
  ['dist/ko/index.html', 'home-ko'],
  ['dist/en/test/index.html', 'test-en'],
];
for (const [f, label] of checks) {
  console.log('===', label, f);
  console.log(' title:', grab(f, /<title>(.*?)<\/title>/));
  console.log(' og:image:', grab(f, /<meta property="og:image" content="([^"]*)"/));
  console.log(' canonical:', grab(f, /<link rel="canonical" href="([^"]*)"/));
  console.log(' lang:', grab(f, /<html lang="([^"]*)">/));
}
const home = readFileSync('dist/ko/index.html', 'utf8');
console.log('home jsonld:', home.includes('application/ld+json') ? 'OK' : 'MISS');
console.log('home hreflang ja:', home.includes('hreflang="ja" href="https://www.simplembti.com/ja"') ? 'OK' : 'MISS');
// Match uniqueness spot-check: tier OG + FAQ JSON-LD + noscript must exist.
for (const f of ['dist/en/match/enfp-intj/index.html', 'dist/ko/match/estj-isfj/index.html']) {
  const h = readFileSync(f, 'utf8');
  console.log('---', f);
  console.log(' tier og:', /og\/match-(excellent|good|average|challenging)\.png/.test(h) ? 'OK' : 'MISS');
  console.log(' faq jsonld:', h.includes('"FAQPage"') ? 'OK' : 'MISS');
  console.log(' noscript:', h.includes('<noscript>') ? 'OK' : 'MISS');
}
// Duplicate meta descriptions across sampled match pages.
{
  const files = ['dist/en/match/enfp-intj/index.html', 'dist/en/match/estj-istj/index.html', 'dist/en/match/enfp-enfp/index.html'];
  const descs = files.map((f) => (readFileSync(f, 'utf8').match(/<meta name="description"\s+content="([^"]*)"/) || [])[1] || 'MISS');
  const uniq = new Set(descs).size;
  console.log('match descriptions unique:', `${uniq}/${files.length}`, uniq === files.length ? 'OK' : 'DUP');
}
