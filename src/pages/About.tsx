import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { useLang } from '../hooks/useLang';

interface Block {
  h: string;
  ps: string[];
  list?: string[];
}

const BODY: Record<string, { title: string; sub: string; desc: string; blocks: Block[]; cta: string }> = {
  en: {
    title: 'About Simple MBTI',
    sub: 'Who we are, how the test works, and why you can trust it.',
    desc: 'Simple MBTI is a free multilingual personality-test service. Learn about our mission, transparent methodology, and editorial standards.',
    cta: 'Take the free test',
    blocks: [
      {
        h: 'Our Story',
        ps: [
          'Simple MBTI started with a simple observation: personality tests were either 10-minute serious exams behind paywalls, or 1-minute memes with no depth. We wanted the middle — a test that takes 2 minutes for a first look and 10 minutes for a deep dive, free, in your language.',
          'Today the service covers a 48-question bank, 16 type reports, 136 compatibility analyses, and practical guides in Korean, English, and Japanese — all without signup.',
        ],
      },
      {
        h: 'Why "Simple"?',
        ps: [
          '"Simple" does not mean simplistic. It means removing barriers to understanding: no signup, no paywall on basic results, plain-language reports, and shareable result cards.',
          'Depth is still there when you want it — cognitive functions, trait profiles, careers, and compatibility — one tap behind the summary.',
        ],
      },
      {
        h: 'How the Test Works (Methodology)',
        ps: [
          'Our bank holds 48 items across the four MBTI dimensions (E/I, S/N, T/F, J/P), each answered on a 5-point scale. Lite (12), Standard (24), and Deep (48) modes draw balanced subsets so every dimension is measured evenly.',
          'Scores are summed per dimension with reverse-item correction; the sign decides your letter, and the margin is shown as a percentage profile. An Assertive/Turbulent-style indicator is included as a rough reference, not a diagnosis.',
          'Limitations, stated plainly: self-report tests reflect how you see yourself today. Mood, context, and growth shift scores. Retake periodically and treat your type as a working hypothesis.',
        ],
      },
      {
        h: 'Editorial Standards',
        ps: [
          'Every type report, compatibility analysis, and guide is written by our research team against the same data tables, then reviewed for consistency across the three languages.',
          'We correct errors reported via Contact, timestamp significant updates, and never present compatibility scores as destiny — they summarize tendencies, and communication skill outweighs any score.',
        ],
        list: [
          'One source of truth: shared question, type, and compatibility datasets.',
          'Reviewed in KO/EN/JA before publishing.',
          'Corrections welcomed at contact@simplembti.com.',
        ],
      },
      {
        h: 'The Team',
        ps: [
          'We are a small independent team covering psychometrics research, trilingual editing, and web engineering. We publish as "MBTI Expert Team" and stand behind every page with a public contact — no anonymous content farms.',
        ],
        list: [
          'Research lead: test design, scoring, compatibility model.',
          'Editors (KO/EN/JA): guides, type reports, localization review.',
          'Engineering: performance, accessibility, privacy-by-design.',
        ],
      },
      {
        h: 'What You Get Here',
        ps: ['16 type deep-dives, 136 pair compatibility reports, a 2-minute quick test and a 48-question deep test, shareable result cards, and practical relationship and career guides.'],
        list: ['16 types · 136 matches · 6 guides · 3 languages', 'Free basic results, forever', 'No account needed'],
      },
    ],
  },
  ko: {
    title: 'Simple MBTI 소개',
    sub: '우리는 누구이며, 검사는 어떻게 만들고, 왜 신뢰할 수 있는가.',
    desc: 'Simple MBTI는 무료 다국어 성격검사 서비스입니다. 미션, 투명한 검사 방법론, 에디토리얼 기준을 소개합니다.',
    cta: '무료 테스트하기',
    blocks: [
      {
        h: '우리의 이야기',
        ps: [
          'Simple MBTI는 단순한 관찰에서 출발했습니다. 성격검사는 유료 장벽 뒤의 10분짜리 진지한 시험이거나, 깊이 없는 1분짜리 밈 둘 중 하나였습니다. 그 중간 — 첫인상은 2분, 심층은 10분, 무료, 내 언어로 — 를 만들고 싶었습니다.',
          '지금은 48문항 뱅크, 16유형 리포트, 136쌍 궁합 분석, 실용 가이드를 한국어·영어·일본어로, 가입 없이 제공합니다.',
        ],
      },
      {
        h: '왜 "Simple"인가',
        ps: [
          '"Simple"은 단순하다는 뜻이 아닙니다. 이해의 장벽을 없앤다는 뜻입니다. 가입 없음, 기본 결과 무료, 쉬운 말의 리포트, 공유 가능한 결과 카드.',
          '깊이는 원할 때 있습니다. 인지 기능, 특성 프로필, 직업, 궁합이 요약 한 번 탭 뒤에 있습니다.',
        ],
      },
      {
        h: '검사 방법론 (투명 공개)',
        ps: [
          '48문항은 MBTI 4지표(E/I, S/N, T/F, J/P)에 5점 척도로 답합니다. 초간단(12)·스탠다드(24)·정밀(48) 모드는 모든 지표가 균등히 측정되도록 균형 추출합니다.',
          '지표별 합산(역문항 보정)으로 부호가 유형을 정하고, 격차는 % 프로필로 보여줍니다. Assertive/Turbulent식 지표는 참고용이며 진단이 아닙니다.',
          '한계도 분명히 밝힙니다. 자기보고 검사는 오늘의 나를 비추며 기분·상황·성장에 따라 점수가 움직입니다. 주기적 재검사를 권장하며 유형은 가설로 다루세요.',
        ],
      },
      {
        h: '에디토리얼 기준',
        ps: [
          '모든 유형 리포트·궁합 분석·가이드는 동일한 데이터 테이블을 기준으로 연구팀이 작성하고 3개 언어 일관성을 검수합니다.',
          '문의로 접수된 오류를 수정하고, 중요한 업데이트는 날짜를 남기며, 궁합 점수를 운명으로 포장하지 않습니다. 점수는 경향의 요약이며 소통 노력이 점수보다 중요합니다.',
        ],
        list: [
          '단일 데이터셋: 문항·유형·궁합 공통 테이블.',
          '발행 전 한/영/일 검수.',
          '오류 제보 환영: contact@simplembti.com.',
        ],
      },
      {
        h: '팀 소개',
        ps: [
          '심리측정 연구, 3개 언어 에디팅, 웹 엔지니어링을 맡은 작은 독립 팀입니다. "MBTI Expert Team" 명의로 발행하며 모든 페이지를 공개 연락처와 함께 책임집니다.',
        ],
        list: [
          '연구 리드: 검사 설계, 채점, 궁합 모델.',
          '에디터(한/영/일): 가이드, 유형 리포트, 현지화 검수.',
          '엔지니어링: 성능, 접근성, 프라이버시 우선 설계.',
        ],
      },
      {
        h: '여기서 얻는 것',
        ps: ['16유형 심층 분석, 136쌍 궁합 리포트, 2분 간단 검사와 48문항 정밀 검사, 공유용 결과 카드, 실용 연애·커리어 가이드.'],
        list: ['16유형 · 136궁합 · 6가이드 · 3언어', '기본 결과 평생 무료', '가입 불필요'],
      },
    ],
  },
  ja: {
    title: 'Simple MBTIについて',
    sub: '私たちについて、診断の仕組み、信頼できる理由。',
    desc: 'Simple MBTIは無料の多言語性格診断サービスです。ミッション、透明な方法論、編集基準を紹介します。',
    cta: '無料診断を受ける',
    blocks: [
      {
        h: 'ストーリー',
        ps: [
          'Simple MBTIは単純な観察から生まれました。性格診断は課金壁の向こうの10分間の真面目な試験か、深みのない1分間のミームかの二択でした。その中間——第一印象は2分、深掘りは10分、無料、自分の言語で——を作りたかったのです。',
          '現在は48問バンク、16タイプレポート、136組の相性分析、実用ガイドを日本語・英語・韓国語で、登録なしに提供しています。',
        ],
      },
      {
        h: 'なぜ「Simple」なのか',
        ps: [
          '「Simple」は単純という意味ではありません。理解への障壁を取り除くことです。登録不要、基本結果は無料、やさしい言葉のレポート、共有できる結果カード。',
          '深さは求めるときにあります。認知機能、特性プロフィール、職業、相性が要約のワンタップ先にあります。',
        ],
      },
      {
        h: '診断の方法論（透明公開）',
        ps: [
          '48問はMBTIの4指標（E/I、S/N、T/F、J/P）に5件法で回答します。超シンプル（12）・スタンダード（24）・精密（48）の各モードは全指標を均等に測るようバランス抽出します。',
          '指標ごとの合計（逆転項目補正）で符号がタイプを決め、差は％プロフィールで表示します。Assertive/Turbulent式の指標は参考であり診断ではありません。',
          '限界も明示します。自己報告式は今日の自分を映し、気分・状況・成長でスコアは動きます。定期的な再診断をおすすめし、タイプは仮説として扱ってください。',
        ],
      },
      {
        h: '編集基準',
        ps: [
          'すべてのタイプレポート・相性分析・ガイドは共通データテーブルに基づき研究チームが執筆し、3言語の一貫性を審査します。',
          'お問い合わせの誤りを修正し、重要な更新には日付を残し、相性スコアを運命のように語りません。スコアは傾向の要約であり、対話の努力がスコアに勝ります。',
        ],
        list: [
          '単一データセット：設問・タイプ・相性の共通テーブル。',
          '公開前に日英韓で審査。',
          '誤りの報告歓迎：contact@simplembti.com。',
        ],
      },
      {
        h: 'チーム',
        ps: [
          '心理測定研究、3言語編集、ウェブエンジニアリングを担う小さな独立チームです。「MBTI Expert Team」名義で発行し、公開連絡先とともに全ページに責任を持ちます。',
        ],
        list: [
          '研究リード：診断設計、採点、相性モデル。',
          '編集（日英韓）：ガイド、タイプレポート、現地化審査。',
          'エンジニアリング：性能、アクセシビリティ、プライバシー優先設計。',
        ],
      },
      {
        h: 'ここで得られるもの',
        ps: ['16タイプの深掘り、136組の相性レポート、2分の簡易診断と48問の精密診断、共有用結果カード、実用的な恋愛・キャリアガイド。'],
        list: ['16タイプ · 136相性 · 6ガイド · 3言語', '基本結果は永久無料', '登録不要'],
      },
    ],
  },
};

const About = () => {
  const lang = useLang();
  const t = BODY[lang] || BODY.en;
  return (
    <div className="legal-page">
      <SEO title={t.title} description={t.desc} path="/about" lang={lang} />
      <div className="legal-container">
        <header className="legal-header">
          <h1 className="legal-title text-gradient">{t.title}</h1>
          <p className="legal-last-updated">{t.sub}</p>
        </header>
        <div className="legal-content">
          {t.blocks.map((b) => (
            <section key={b.h} className="legal-section glass-panel legal-section-card">
              <h2>{b.h}</h2>
              {b.ps.map((p, i) => <p key={i}>{p}</p>)}
              {b.list && (
                <ul>
                  {b.list.map((li) => <li key={li}>{li}</li>)}
                </ul>
              )}
            </section>
          ))}
          <section className="legal-section glass-panel legal-section-card" style={{ textAlign: 'center' }}>
            <Link to={`/${lang}/test`} className="btn btn-primary btn-lg btn-block" style={{ maxWidth: 360, margin: '0 auto' }}>{t.cta}</Link>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
