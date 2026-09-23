import { readFileSync, writeFileSync } from 'node:fs';

const p = 'src/data/typeOverviews.ko.json';
let s = readFileSync(p, 'utf8');
s = s.split('ruthless한 에너지 위생이다').join('철저한 에너지 위생이다');
s = s.split('명확한 ownership을 주면').join('명확히 맡긴 일을 주면');
s = s.split('yes를 반복하다').join('승낙을 반복하다');
writeFileSync(p, s);

const lines = s.split('\n');
const keyRe = new RegExp('"[A-Z]{2,4}":|"(overview|love|work)"', 'g');
const latinRe = new RegExp('[A-Za-z]{3,}');
const bad = lines.filter((l) => latinRe.test(l.replace(keyRe, '')) && !l.includes('MBTI'));
console.log('suspicious:', bad.length);
bad.slice(0, 12).forEach((l) => console.log(l.trim().slice(0, 80)));
