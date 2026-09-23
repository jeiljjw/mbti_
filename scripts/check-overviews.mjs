import { readFileSync } from 'node:fs';

const files = [
  'src/data/typeOverviews.en.json',
  'src/data/typeOverviews.ko.json',
  'src/data/typeOverviews.ja.json',
];
for (const f of files) {
  const s = readFileSync(f, 'utf8');
  const keys = [...s.matchAll(/"([A-Z]{4})": \{/g)].map((m) => m[1]);
  const dup = keys.filter((k, i) => keys.indexOf(k) !== i);
  console.log(f, 'count', keys.length, 'dup', dup.length ? dup : 'none');
  try {
    const d = JSON.parse(s);
    const missing = Object.entries(d)
      .filter(([, v]) => {
        const o = v;
        return !o.work || !o.love || !Array.isArray(o.overview);
      })
      .map(([k]) => k);
    console.log(' missing-fields:', missing.length ? missing : 'none');
  } catch (e) {
    console.log(' JSON PARSE ERROR', String(e));
  }
}
