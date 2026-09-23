import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { useLang } from '../hooks/useLang';

interface Faq {
  q: string;
  a: string;
}

const BODY: Record<string, {
  title: string; sub: string; desc: string;
  emailLabel: string; emailNote: string;
  categoriesLabel: string; categories: { label: string; subject: string; desc: string }[];
  sla: string; operatorLabel: string; operator: string[];
  faqLabel: string; faqs: Faq[];
}> = {
  en: {
    title: 'Contact Us', sub: 'contact@simplembti.com — replies within 3 business days.',
    desc: 'Contact the Simple MBTI team: advertising, partnerships, content corrections, bug reports, and privacy requests.',
    emailLabel: 'Email', emailNote: 'For all inquiries including ads, partnerships, corrections, bugs, and privacy requests. English, Korean, or Japanese welcome.',
    categoriesLabel: 'What is it about?',
    categories: [
      { label: 'Advertising & Partnerships', subject: '[Ads] Partnership inquiry', desc: 'Media kit, sponsored placements, team/education licensing.' },
      { label: 'Content Correction', subject: '[Correction] Page or translation error', desc: 'Tell us the URL and what is wrong; screenshots help.' },
      { label: 'Bug Report', subject: '[Bug] What broke', desc: 'Device, browser, language, and steps to reproduce.' },
      { label: 'Privacy Request', subject: 'Privacy Request', desc: 'Access, correction, or deletion requests (see Privacy Policy §11).' },
    ],
    sla: 'We reply within 3 business days. For urgent display issues affecting many users, we prioritize same-day triage.',
    operatorLabel: 'Operator', operator: ['Service: Simple MBTI (simplembti.com)', 'Email: contact@simplembti.com', 'Languages: Korean / English / Japanese'],
    faqLabel: 'Quick answers',
    faqs: [
      { q: 'Is the test really free?', a: 'Yes. All three lengths (12/24/48) and basic results are free with no account. There is no paywalled result.' },
      { q: 'Where are my answers stored?', a: 'Only in your browser. Finishing or restarting a test deletes the in-progress data; nothing is sent to our servers.' },
      { q: 'How accurate is it?', a: 'It reflects how you see yourself today; mood and context shift scores. Retake periodically and treat your type as a working hypothesis, not a diagnosis.' },
      { q: 'Can our school/team use it?', a: 'Yes for non-commercial classroom or workshop use with attribution to Simple MBTI. Contact us for anything larger.' },
      { q: 'Which languages are supported?', a: 'Korean, English, and Japanese across tests, reports, compatibility pages, and guides.' },
    ],
  },
  ko: {
    title: '문의하기', sub: 'contact@simplembti.com — 영업일 기준 3일 이내 답변.',
    desc: 'Simple MBTI 팀에 문의하세요. 광고·제휴, 콘텐츠 오류, 버그 신고, 개인정보 요청을 받습니다.',
    emailLabel: '이메일', emailNote: '광고·제휴·오류·버그·개인정보 요청 모두 이 주소로. 한국어·영어·일본어 모두 가능합니다.',
    categoriesLabel: '어떤 내용인가요?',
    categories: [
      { label: '광고 및 제휴', subject: '[광고] 제휴 문의', desc: '매체 소개, 협찬 게재, 팀·교육용 라이선스.' },
      { label: '콘텐츠 오류 신고', subject: '[오류] 페이지·번역 수정 요청', desc: 'URL과 틀린 내용을 알려주세요. 스크린샷이 있으면 좋습니다.' },
      { label: '버그 신고', subject: '[버그] 오류 내용', desc: '기기, 브라우저, 언어, 재현 순서를 적어주세요.' },
      { label: '개인정보 요청', subject: 'Privacy Request', desc: '접근·정정·삭제 요청 (개인정보처리방침 §11 참고).' },
    ],
    sla: '영업일 기준 3일 이내 답변합니다. 다수에게 영향을 주는 긴급 장애는 당일 우선 대응합니다.',
    operatorLabel: '운영자 정보', operator: ['서비스: Simple MBTI (simplembti.com)', '이메일: contact@simplembti.com', '대응 언어: 한국어 / 영어 / 일본어'],
    faqLabel: '빠른 답변',
    faqs: [
      { q: '정말 무료인가요?', a: '네. 3가지 길이(12/24/48)와 기본 결과 모두 무료이며 가입이 필요 없습니다. 유료로 잠긴 결과가 없습니다.' },
      { q: '답변은 어디에 저장되나요?', a: '브라우저에만 저장됩니다. 완료·재시작 시 진행 정보가 삭제되며 서버로 전송되지 않습니다.' },
      { q: '정확도가 어느 정도인가요?', a: '오늘의 나를 비추는 검사로 기분·상황에 따라 점수가 움직입니다. 주기적으로 재검사하고 가설로 다루세요.' },
      { q: '학교·팀에서 써도 되나요?', a: '출처를 밝히면 수업·워크숍 등 비상업적 이용이 가능합니다. 그 이상은 문의주세요.' },
      { q: '어떤 언어를 지원하나요?', a: '검사·리포트·궁합·가이드 전반에 한국어·영어·일본어를 지원합니다.' },
    ],
  },
  ja: {
    title: 'お問い合わせ', sub: 'contact@simplembti.com — 3営業日以内に返信。',
    desc: 'Simple MBTIチームへのお問い合わせ。広告・提携、コンテンツ修正、バグ報告、プライバシー請求を受け付けます。',
    emailLabel: 'メール', emailNote: '広告・提携・誤り・バグ・プライバシー請求はすべてこちらへ。日本語・英語・韓国語に対応します。',
    categoriesLabel: '内容を選ぶ',
    categories: [
      { label: '広告・提携', subject: '【広告】提携の相談', desc: '媒体資料、スポンサー掲載、チーム・教育利用ライセンス。' },
      { label: 'コンテンツの誤り報告', subject: '【誤り】ページ・翻訳の修正依頼', desc: 'URLと誤りの内容をお知らせください。スクリーンショット歓迎。' },
      { label: 'バグ報告', subject: '【バグ】不具合内容', desc: '端末、ブラウザ、言語、再現手順をお書きください。' },
      { label: 'プライバシー請求', subject: 'Privacy Request', desc: '開示・訂正・削除の請求（プライバシーポリシー§11参照）。' },
    ],
    sla: '3営業日以内に返信します。多数に影響する緊急障害は当日優先対応します。',
    operatorLabel: '運営者情報', operator: ['サービス：Simple MBTI（simplembti.com）', 'メール：contact@simplembti.com', '対応言語：日本語 / 英語 / 韓国語'],
    faqLabel: 'よくある質問',
    faqs: [
      { q: '本当に無料ですか？', a: 'はい。3つの長さ（12/24/48）と基本結果はすべて無料で登録不要です。課金でロックされた結果はありません。' },
      { q: '回答はどこに保存されますか？', a: 'ブラウザにのみ保存されます。完了・再開時に進捗は削除され、サーバーには送信されません。' },
      { q: '精度はどれくらいですか？', a: '今日の自分を映す診断で、気分・状況によりスコアは動きます。定期的に受け直し、仮説として扱ってください。' },
      { q: '学校・チームで使えますか？', a: '出典を明示すれば授業・ワークショップ等の非商用利用が可能です。それ以上はご相談ください。' },
      { q: '対応言語は？', a: '診断・レポート・相性・ガイド全体で日本語・英語・韓国語に対応しています。' },
    ],
  },
};

const Contact = () => {
  const lang = useLang();
  const b = BODY[lang] || BODY.en;
  return (
    <div className="legal-page">
      <SEO title={b.title} description={b.desc} path="/contact" lang={lang} />
      <div className="legal-container">
        <header className="legal-header">
          <h1 className="legal-title text-gradient">{b.title}</h1>
          <p className="legal-last-updated">{b.sub}</p>
        </header>
        <div className="legal-content">
          <section className="legal-section glass-panel legal-section-card">
            <h2>{b.emailLabel}</h2>
            <p>
              <a href="mailto:contact@simplembti.com" style={{ color: 'var(--accent-green)', fontWeight: 700, fontSize: '1.2rem' }}>
                contact@simplembti.com
              </a>
            </p>
            <p>{b.emailNote}</p>
            <p>{b.sla}</p>
          </section>

          <section className="legal-section glass-panel legal-section-card">
            <h2>{b.categoriesLabel}</h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {b.categories.map((c) => (
                <a
                  key={c.label}
                  href={`mailto:contact@simplembti.com?subject=${encodeURIComponent(c.subject)}`}
                  style={{ display: 'block', padding: '1.25rem 1.5rem', borderRadius: '1rem', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.02)', textDecoration: 'none' }}
                >
                  <strong style={{ color: 'var(--text-primary)' }}>{c.label} →</strong>
                  <span style={{ display: 'block', color: 'var(--text-secondary)', marginTop: '0.4rem', fontSize: '0.9rem' }}>{c.desc}</span>
                </a>
              ))}
            </div>
          </section>

          <section className="legal-section glass-panel legal-section-card">
            <h2>{b.operatorLabel}</h2>
            <ul>
              {b.operator.map((o) => <li key={o}>{o}</li>)}
            </ul>
          </section>

          <section className="legal-section glass-panel legal-section-card">
            <h2>{b.faqLabel}</h2>
            {b.faqs.map((f) => (
              <div key={f.q} style={{ marginBottom: '1.5rem' }}>
                <p><strong>Q. {f.q}</strong></p>
                <p>A. {f.a}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
