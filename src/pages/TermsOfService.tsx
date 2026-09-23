import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { useLang } from '../hooks/useLang';

interface Section {
  h: string;
  ps: string[];
}

const BODY: Record<string, { title: string; updated: string; intro: string; sections: Section[] }> = {
  en: {
    title: 'Terms of Service',
    updated: 'Last Updated: September 23, 2026',
    intro: 'These terms govern your use of Simple MBTI, a free personality-test service. By using the site you agree to these terms. Our results are educational and entertainment content — not medical, psychological-diagnostic, or hiring advice.',
    sections: [
      {
        h: '1. The Service',
        ps: [
          'Simple MBTI provides free MBTI-style assessments (12/24/48 questions), 16 type reports, 136 compatibility analyses, and editorial guides in Korean, English, and Japanese.',
          'Accounts are not required. Features may change or be discontinued as the service evolves.',
        ],
      },
      {
        h: '2. Eligibility',
        ps: [
          'You must be at least 13 years old (or the minimum age in your country) to use the service. Children should use it with a parent or guardian.',
        ],
      },
      {
        h: '3. Permitted Use',
        ps: [
          'You may use the site for personal, non-commercial purposes: taking tests, reading reports, and sharing result links or downloaded result cards with credit.',
          'Schools and teams may use the free test in classrooms or workshops with attribution to Simple MBTI.',
        ],
      },
      {
        h: '4. Prohibited Conduct',
        ps: [
          'Do not: copy or republish substantial content without permission; use the service for commercial resale; attempt to disrupt, scrape aggressively, or reverse engineer the site; remove copyright notices; upload unlawful or harmful material; or misrepresent results as certified diagnoses.',
        ],
      },
      {
        h: '5. About Test Accuracy',
        ps: [
          'Personality preferences are relatively stable, but scores shift with mood, context, and life stage. Borderline answers can flip between sittings — this is normal and not a defect.',
          'Treat your type as a working hypothesis and a communication tool, not a fixed label. Retaking the test periodically is encouraged.',
        ],
      },
      {
        h: '6. Not Professional Advice',
        ps: [
          'Content on this site is not medical, mental-health, or employment advice. Do not use types or compatibility scores for hiring, admissions, or clinical decisions.',
          'If you experience mental-health difficulties, consult a qualified professional.',
        ],
      },
      {
        h: '7. Intellectual Property',
        ps: [
          'Test questions, reports, compatibility analyses, guides, design, and code are owned by Simple MBTI and protected by copyright. MBTI® terminology concepts referenced here build on public psychological type theory; this is an independent, unofficial interpretation.',
          'You retain rights to your own messages sent to us; by contacting us you grant permission to use them to respond.',
        ],
      },
      {
        h: '8. Advertising & Third Parties',
        ps: [
          'The site plans to display Google AdSense ads and links to third-party sites. We are not responsible for third-party content, products, or privacy practices.',
        ],
      },
      {
        h: '9. Disclaimer',
        ps: [
          'The service is provided "as is" without warranties of any kind, including merchantability, fitness for a particular purpose, accuracy, or uninterrupted availability.',
        ],
      },
      {
        h: '10. Limitation of Liability',
        ps: [
          'To the maximum extent permitted by law, Simple MBTI is not liable for indirect, incidental, or consequential damages, including loss of data or profit, arising from use of the site.',
        ],
      },
      {
        h: '11. Changes to Terms',
        ps: [
          'We may revise these terms as features change. Continued use after the “Last Updated” date means you accept the revised terms.',
        ],
      },
      {
        h: '12. Contact & Governing Law',
        ps: [
          'Questions: contact@simplembti.com. These terms are governed by the laws of the operator’s jurisdiction, without regard to conflict-of-law rules.',
        ],
      },
    ],
  },
  ko: {
    title: '이용약관',
    updated: '최종 업데이트: 2026년 9월 23일',
    intro: '본 약관은 무료 성격검사 서비스 Simple MBTI의 이용을 규율합니다. 결과는 교육·오락 목적의 콘텐츠이며 의료·심리진단·채용 자문이 아닙니다.',
    sections: [
      {
        h: '1. 서비스 내용',
        ps: [
          'Simple MBTI는 무료 MBTI식 검사(12/24/48문항), 16유형 리포트, 136쌍 궁합 분석, 에디토리얼 가이드를 한국어·영어·일본어로 제공합니다.',
          '가입이 필요 없으며, 서비스 발전에 따라 기능이 변경·중단될 수 있습니다.',
        ],
      },
      {
        h: '2. 이용 연령',
        ps: [
          '만 13세 이상(또는 각국 법정 연령 이상)이 이용해야 하며, 아동은 보호자와 함께 이용하세요.',
        ],
      },
      {
        h: '3. 허용되는 이용',
        ps: [
          '검사 응시, 리포트 열람, 출처를 밝힌 결과 링크·카드 공유 등 개인적·비상업적 이용이 가능합니다.',
          '학교·팀은 Simple MBTI 출처를 밝히고 수업·워크숍에 무료 검사를 활용할 수 있습니다.',
        ],
      },
      {
        h: '4. 금지 행위',
        ps: [
          '다음을 금지합니다: 허락 없는 대량 복제·재게시, 상업적 재판매 목적 이용, 과도한 스크래핑·서비스 방해·리버스엔지니어링, 저작권 표시 제거, 불법·유해물 게시, 결과를 공인 진단처럼 허위 표시.',
        ],
      },
      {
        h: '5. 검사 정확도에 대하여',
        ps: [
          '성격 선호는 비교적 안정적이지만 점수는 기분·상황·생애주기에 따라 움직입니다. 경계선 문항이 뒤집히는 것은 정상이며 결함이 아닙니다.',
          '유형은 고정된 낙인이 아니라 소통 도구·가설로 다루고, 주기적 재검사를 권장합니다.',
        ],
      },
      {
        h: '6. 전문 자문이 아님',
        ps: [
          '사이트 콘텐츠는 의료·정신건강·채용 자문이 아닙니다. 유형·궁합 점수를 채용·입시·임상 판단에 사용하지 마세요.',
          '정신건강의 어려움이 있으면 자격 있는 전문가와 상담하세요.',
        ],
      },
      {
        h: '7. 지식재산권',
        ps: [
          '문항, 리포트, 궁합 분석, 가이드, 디자인, 코드는 Simple MBTI의 자산으로 저작권 보호를 받습니다. 참조하는 성격유형 이론은 공개 심리학에 기반한 독자적·비공식 해석입니다.',
          '문의 메시지의 권리는 이용자에게 있으며, 답변을 위한 활용에 동의한 것으로 봅니다.',
        ],
      },
      {
        h: '8. 광고 및 제3자',
        ps: [
          'Google AdSense 광고 게재 및 외부 사이트 연결을 예정하고 있습니다. 제3자 콘텐츠·상품·개인정보 처리에 대해서는 책임지지 않습니다.',
        ],
      },
      {
        h: '9. 면책',
        ps: [
          '서비스는 "있는 그대로" 제공되며 상품성·특정 목적 적합성·정확성·무중단을 보증하지 않습니다.',
        ],
      },
      {
        h: '10. 책임 제한',
        ps: [
          '법이 허용하는 최대 범위에서 데이터·수익 손실 등 간접·부수적 손해에 대해 책임지지 않습니다.',
        ],
      },
      {
        h: '11. 약관 변경',
        ps: [
          '기능 변경에 따라 약관을 개정할 수 있으며, “최종 업데이트”일 이후 계속 이용 시 개정 약관에 동의한 것으로 봅니다.',
        ],
      },
      {
        h: '12. 문의 및 준거법',
        ps: [
          '문의: contact@simplembti.com. 운영자 소재지 관계 법령이 적용됩니다.',
        ],
      },
    ],
  },
  ja: {
    title: '利用規約',
    updated: '最終更新：2026年9月23日',
    intro: '本規約は無料性格診断サービスSimple MBTIの利用を定めます。結果は教育・娯楽目的のコンテンツであり、医療・心理診断・採用助言ではありません。',
    sections: [
      {
        h: '1. サービス内容',
        ps: [
          'Simple MBTIは無料のMBTI式診断（12/24/48問）、16タイプレポート、136組の相性分析、解説ガイドを日本語・英語・韓国語で提供します。',
          '登録は不要です。サービス進化に伴い機能が変更・終了する場合があります。',
        ],
      },
      {
        h: '2. 利用年齢',
        ps: [
          '13歳以上（または各国の法定年齢以上）が利用できます。子どもは保護者と一緒に利用してください。',
        ],
      },
      {
        h: '3. 許可される利用',
        ps: [
          '診断の受検、レポート閲覧、出典を明示した結果リンク・カードの共有など個人的・非商用利用が可能です。',
          '学校・チームはSimple MBTIの出典を明示して授業・ワークショップに無料診断を活用できます。',
        ],
      },
      {
        h: '4. 禁止行為',
        ps: [
          '以下を禁止します：許可なき大量複製・再掲載、商用転売目的の利用、過度なスクレイピング・妨害・リバースエンジニアリング、著作権表示の削除、違法・有害物の投稿、結果を公認診断のように偽る行為。',
        ],
      },
      {
        h: '5. 診断の精度について',
        ps: [
          '性格の好みは比較的安定しますが、スコアは気分・状況・ライフステージで動きます。境界線の項目が反転するのは正常であり欠陥ではありません。',
          'タイプは固定の烙印ではなく対話の道具・仮説として扱い、定期的な再診断をおすすめします。',
        ],
      },
      {
        h: '6. 専門的助言ではない',
        ps: [
          'サイトの内容は医療・メンタルヘルス・採用の助言ではありません。タイプ・相性スコアを採用・入試・臨床判断に使用しないでください。',
          '心の不調がある場合は資格を持つ専門家に相談してください。',
        ],
      },
      {
        h: '7. 知的財産権',
        ps: [
          '設問、レポート、相性分析、ガイド、デザイン、コードはSimple MBTIの資産であり著作権で保護されます。参照する性格タイプ理論は公開心理学に基づく独自・非公式の解釈です。',
          'お問い合わせ文の権利は利用者にあり、返信のための利用に同意したものとみなします。',
        ],
      },
      {
        h: '8. 広告と第三者',
        ps: [
          'Google AdSense広告の掲載や外部サイトへのリンクを予定しています。第三者の内容・商品・プライバシー対応について責任を負いません。',
        ],
      },
      {
        h: '9. 免責',
        ps: [
          'サービスは「現状有姿」で提供され、商品性・特定目的適合性・正確性・継続性を保証しません。',
        ],
      },
      {
        h: '10. 責任制限',
        ps: [
          '法令が許す最大範囲で、データ・利益の損失等の間接・付随的損害について責任を負いません。',
        ],
      },
      {
        h: '11. 規約の変更',
        ps: [
          '機能変更に伴い規約を改定する場合があり、「最終更新」日以降の継続利用により改定版への同意とみなします。',
        ],
      },
      {
        h: '12. お問い合わせと準拠法',
        ps: [
          '連絡先：contact@simplembti.com。運営者の所在地法が適用されます。',
        ],
      },
    ],
  },
};

const TermsOfService = () => {
  const lang = useLang();
  const b = BODY[lang] || BODY.en;
  return (
    <div className="legal-page">
      <SEO title={b.title} description={b.intro} path="/terms" lang={lang} />
      <div className="legal-container">
        <header className="legal-header">
          <h1 className="legal-title text-gradient">{b.title}</h1>
          <p className="legal-last-updated">{b.updated}</p>
          <p style={{ color: 'var(--text-secondary)', marginTop: '1.5rem', lineHeight: 1.8 }}>{b.intro}</p>
        </header>
        <div className="legal-content">
          {b.sections.map((s) => (
            <section key={s.h} className="legal-section glass-panel legal-section-card">
              <h2>{s.h}</h2>
              {s.ps.map((p, i) => <p key={i}>{p}</p>)}
            </section>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfService;
