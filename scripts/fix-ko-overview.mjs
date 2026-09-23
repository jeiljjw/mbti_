import { readFileSync, writeFileSync } from 'node:fs';

const p = 'src/data/typeOverviews.ko.json';
let s = readFileSync(p, 'utf8');
const pairs = [
  ['뒤에서 tireless하게 움직이며', '뒤에서 지칠 줄 모르고 움직이며'],
  ['ruthless에너지 위생이다', '철저한 에너지 위생이다'],
  ['意味와 장인이 만나는 곳', '의미와 장인이 만나는 곳'],
  ['너를 선택한 것이 biggest 제스처다', '너를 선택한 것이 가장 큰 표현이다'],
  [' tender하고 세심하게 사랑한다', '다정하고 세심하게 사랑한다'],
  ['온전한 presence', '온전한 함께 있어줌'],
  ['steel core를 가진 이상주의자다', '강단 있는 이상주의자다'],
  ['모든 상황에서 意味를', '모든 상황에서 의미를'],
  ['함께 빠지는 rabbit hole', '함께 빠지는 깊은 탐구'],
  ['breakthrough를 낳는다', '돌파구를 낳는다'],
  ['빠르고 만질 수 있는 arena의 왕이다', '빠르고 손에 잡히는 승부처의 왕이다'],
  ['ruthless한 우선순위다', '냉정한 우선순위 정하기다'],
  ['재치로 flirt하고 함께 탐험하며 bond한다', '재치로 다가가고 함께 탐험하며 유대한다'],
  ['deliver하기 위해 태어났다', '결과를 내기 위해 태어났다'],
  ['natural habitat다', '본래의 서식지다'],
  ['ESFJ는 인류의 host다', 'ESFJ는 모두를 챙기는 주인장이다'],
  ['그리로 coach한다', '그곳으로 이끌어준다'],
  ['결과AMD의 commander다', '결과AMD의 commander다'],
  ['ENTJ는 결과의 commander다', 'ENTJ는 결과의 지휘관이다'],
  ['파트너는 인생의 co-founder', '파트너는 인생의 공동 창업자'],
  ['임원 리더십·창업·high-stakes 컨설팅', '임원 리더십·창업·판돈 큰 컨설팅'],
];
let n = 0;
for (const [a, b] of pairs) {
  if (s.includes(a)) {
    s = s.split(a).join(b);
    n++;
  } else {
    console.log('MISS:', a.slice(0, 30));
  }
}
writeFileSync(p, s);
console.log(`replaced ${n}/${pairs.length}`);
// verify: no latin words left except MBTI/ENFJ-style codes
const lines = s.split('\n');
const bad = lines.filter((l, i) => /[A-Za-z]{3,}/.test(l) && !/MBTI|Simple/.test(l));
console.log('remaining latin lines:', bad.length);
bad.slice(0, 10).forEach((l) => console.log(l.trim().slice(0, 90)));
