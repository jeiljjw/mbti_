import { readFileSync } from 'node:fs';

// Byte-level check: titles must contain expected non-ASCII codepoints.
const checks = [
  ['dist/ko/type/enfp/index.html', '<title>ENFP 재기발랄한 활동가 | Simple MBTI</title>'],
  ['dist/ja/blog/mbti-love-languages/index.html', '<title>MBTI愛の言語16タイプ｜恋愛相性ガイド</title>'],
  ['dist/en/match/enfp-intj/index.html', 'Good match'],
  ['dist/en/match/enfp-enfp/index.html', '85'],
];
let ok = 0;
for (const [f, needle] of checks) {
  const html = readFileSync(f, 'utf8');
  const pass = html.includes(needle);
  if (pass) ok++;
  console.log(pass ? 'OK  ' : 'FAIL', f);
}
console.log(`${ok}/${checks.length} utf8 checks passed`);
if (ok !== checks.length) process.exit(1);
