import { readFileSync, writeFileSync } from 'node:fs';

const p = 'src/locales/ja/translation.json';
const d = JSON.parse(readFileSync(p, 'utf8'));

d.features = {
  title: 'この診断の特徴',
  f1_title: '速い＆簡単',
  f1_desc: '10分以内で完了。面倒な登録なしにすぐ結果が分かります。',
  f2_title: '高い精度',
  f2_desc: '実証された心理学フレームワークに基づき、性格の機微を捉えます。',
  f3_title: '実用的な洞察',
  f3_desc: 'キャリアと人間関係にすぐ活かせる、あなた専用のアドバイスが得られます。',
};
d.showcase = {
  title: '性格レポート',
  subtitle: 'あなたの性格タイプを詳しく分析します。',
};
Object.assign(d.test, {
  next: '次へ',
  finish: '結果を見る',
  strongly_disagree: '全くそう思わない',
  disagree: 'そう思わない',
  neutral: 'どちらでもない',
  agree: 'そう思う',
  strongly_agree: '強くそう思う',
});

writeFileSync(p, JSON.stringify(d, null, 2));
console.log('ja UI patched');
