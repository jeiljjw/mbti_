import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { useLang } from '../hooks/useLang';

interface Section {
  h: string;
  ps: string[];
}

const BODY: Record<string, { title: string; updated: string; intro: string; sections: Section[] }> = {
  en: {
    title: 'Privacy Policy',
    updated: 'Last Updated: September 23, 2026',
    intro: 'Simple MBTI ("we", "our") respects your privacy. This policy explains what data our personality-test service collects, how Google advertising and analytics cookies work on this site, and what rights you have. Our test answers are computed locally in your browser and are never transmitted to our servers.',
    sections: [
      {
        h: '1. Who We Are',
        ps: [
          'Simple MBTI is a free online personality-test service available in Korean, English, and Japanese at simplembti.com.',
          'For privacy inquiries, contact us at contact@simplembti.com. We respond within 3 business days.',
        ],
      },
      {
        h: '2. Data We Collect',
        ps: [
          'Test answers and results: processed entirely in your browser (localStorage is used only to resume an unfinished test on the same device). We do not receive, store, or sell your answers.',
          'Technical data: when you visit, standard hosting logs record your IP address, browser type, device information, pages visited, timestamps, and referring pages for security and aggregate analytics.',
          'Contact data: if you email us, we receive your email address and message content solely to respond.',
        ],
      },
      {
        h: '3. Cookies We Use',
        ps: [
          'Essential cookies: required for basic functions such as remembering your language preference.',
          'Preference storage: your in-progress test is saved in your browser local storage, not in cookies sent to us.',
          'Analytics cookies: Google Analytics measures aggregate usage (e.g., which pages are popular) to improve the service.',
          'Advertising cookies: Google AdSense may set cookies, including the DoubleClick cookie, to show personalized or non-personalized ads.',
          'You can delete or block cookies in your browser settings at any time; some features (such as resuming a test) may then work less conveniently.',
        ],
      },
      {
        h: '4. Google AdSense & Advertising Cookies',
        ps: [
          'We plan to show ads served by Google AdSense. Google uses cookies to serve ads based on your prior visits to this and other websites.',
          "Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet.",
          'You may opt out of personalized advertising by visiting Google Ads Settings (https://www.google.com/settings/ads). Learn more in Google’s Advertising Privacy page (https://policies.google.com/technologies/ads).',
        ],
      },
      {
        h: '5. Google Analytics',
        ps: [
          'We use Google Analytics to understand aggregate, non-identifying usage trends. IP anonymization is enabled where supported.',
          'You can opt out of Analytics tracking with the Google Analytics Opt-out Browser Add-on (https://tools.google.com/dlpage/gaoptout).',
        ],
      },
      {
        h: '6. How We Use Data',
        ps: [
          'To operate and secure the service, remember your settings, measure aggregate performance, respond to inquiries, and comply with legal obligations.',
          'We do not use test answers for advertising profiling, and we do not sell personal information.',
        ],
      },
      {
        h: '7. Data Sharing',
        ps: [
          'We share limited technical data only with infrastructure and measurement providers (hosting, Google Analytics, Google AdSense) as needed to run the site.',
          'We do not sell your personal information to data brokers or advertisers.',
        ],
      },
      {
        h: '8. Data Retention',
        ps: [
          'Browser-side test progress is deleted automatically when you finish or restart a test, and you can clear it anytime in your browser.',
          'Emails you send us are retained only as long as needed to handle your request, then deleted.',
          'Server logs are retained for a short security window and then aggregated or deleted.',
        ],
      },
      {
        h: '9. Security',
        ps: [
          'We use HTTPS encryption and minimize server-side data collection by design. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.',
        ],
      },
      {
        h: '10. Children’s Privacy',
        ps: [
          'Simple MBTI is a general-audience service and is not directed at children under 13 (or the minimum age in your country). We do not knowingly collect data from children. Parents who believe a child has contacted us may email contact@simplembti.com for deletion.',
        ],
      },
      {
        h: '11. Your Rights',
        ps: [
          'EU/UK (GDPR): you have rights of access, rectification, erasure, restriction, portability, and objection.',
          'California (CCPA/CPRA): you have rights to know, delete, and opt out of sale/sharing of personal information. We do not sell personal information.',
          'Japan (APPI): you may request disclosure, correction, and cessation of use of retained personal data.',
          'To exercise any right, email contact@simplembti.com with the subject “Privacy Request”.',
        ],
      },
      {
        h: '12. Third-Party Links',
        ps: [
          'Our pages link to external sites (e.g., Google’s policy pages, social share endpoints). Their privacy practices are governed by their own policies.',
        ],
      },
      {
        h: '13. Changes to This Policy',
        ps: [
          'We may update this policy as the service or advertising setup changes. Material changes will be reflected in the “Last Updated” date above, and continued use of the site means you accept the updated policy.',
        ],
      },
      {
        h: '14. Contact',
        ps: [
          'Privacy questions, rights requests, or complaints: contact@simplembti.com. If unresolved, you may contact your local data protection authority.',
        ],
      },
    ],
  },
  ko: {
    title: '개인정보처리방침',
    updated: '최종 업데이트: 2026년 9월 23일',
    intro: 'Simple MBTI(이하 "당사")는 이용자의 개인정보를 소중히 여깁니다. 본 방침은 성격검사 서비스가 수집하는 정보, Google 광고·분석 쿠키의 동작 방식, 이용자의 권리를 설명합니다. 테스트 답변은 이용자의 브라우저에서만 계산되며 당사 서버로 전송되지 않습니다.',
    sections: [
      {
        h: '1. 운영자 정보',
        ps: [
          'Simple MBTI는 한국어·영어·일본어로 제공되는 무료 온라인 성격검사 서비스(simplembti.com)입니다.',
          '개인정보 문의: contact@simplembti.com (영업일 기준 3일 이내 답변).',
        ],
      },
      {
        h: '2. 수집하는 정보',
        ps: [
          '테스트 답변 및 결과: 브라우저에서만 처리됩니다. 미완료 검사를 같은 기기에서 이어하기 위해 로컬 저장소(localStorage)를 사용하며, 답변을 수신·저장·판매하지 않습니다.',
          '기술 정보: 접속 시 IP 주소, 브라우저 종류, 기기 정보, 방문 페이지, 접속 시간, 유입 경로가 표준 호스팅 로그로 기록되어 보안 및 집계 분석에 사용됩니다.',
          '문의 정보: 이메일 문의 시 주소와 내용을 답변 목적으로만 보관합니다.',
        ],
      },
      {
        h: '3. 사용하는 쿠키',
        ps: [
          '필수 쿠키: 언어 설정 기억 등 기본 기능에 필요합니다.',
          '환경설정 저장: 진행 중인 검사는 서버로 전송되는 쿠키가 아닌 브라우저 로컬 저장소에 보관됩니다.',
          '분석 쿠키: Google Analytics로 인기 페이지 등 집계 통계를 측정해 서비스를 개선합니다.',
          '광고 쿠키: Google AdSense가 맞춤·비맞춤 광고 제공을 위해 DoubleClick 쿠키 등을 설정할 수 있습니다.',
          '브라우저 설정에서 언제든 쿠키를 삭제·차단할 수 있으며, 이 경우 이어하기 등 일부 기능이 불편해질 수 있습니다.',
        ],
      },
      {
        h: '4. Google AdSense 및 광고 쿠키',
        ps: [
          '당사는 Google AdSense 광고를 게재할 예정입니다. Google은 본 사이트 및 다른 사이트 방문 기록을 기반으로 광고를 제공하기 위해 쿠키를 사용합니다.',
          'Google 광고 설정(https://www.google.com/settings/ads)에서 맞춤 광고를 거부할 수 있습니다. 자세한 내용은 Google 광고 개인정보처리(https://policies.google.com/technologies/ads)를 참고하세요.',
        ],
      },
      {
        h: '5. Google Analytics',
        ps: [
          '개인 식별이 불가능한 집계 이용 통계를 파악하기 위해 Google Analytics를 사용하며, 지원되는 경우 IP 익명화를 적용합니다.',
          'Google Analytics 옵트아웃 브라우저 부가기능(https://tools.google.com/dlpage/gaoptout)으로 추적을 거부할 수 있습니다.',
        ],
      },
      {
        h: '6. 정보의 이용 목적',
        ps: [
          '서비스 운영·보안, 설정 기억, 집계 성능 측정, 문의 대응, 법적 의무 준수에 사용합니다.',
          '테스트 답변을 광고 프로파일링에 사용하지 않으며 개인정보를 판매하지 않습니다.',
        ],
      },
      {
        h: '7. 정보의 공유',
        ps: [
          '사이트 운영에 필요한 범위에서 호스팅, Google Analytics, Google AdSense 등 인프라·측정 제공업체와 기술 정보를 공유합니다.',
          '데이터 브로커나 광고주에게 개인정보를 판매하지 않습니다.',
        ],
      },
      {
        h: '8. 보유 기간',
        ps: [
          '브라우저의 검사 진행 정보는 완료·재시작 시 자동 삭제되며 언제든 브라우저에서 지울 수 있습니다.',
          '문의 이메일은 처리 완료 후 필요한 기간만 보관하고 파기합니다.',
          '서버 로그는 단기간 보안 보관 후 집계·삭제합니다.',
        ],
      },
      {
        h: '9. 보안',
        ps: [
          'HTTPS 암호화를 적용하고 설계 단계에서 서버 수집을 최소화합니다. 다만 완전한 보안을 보장할 수는 없습니다.',
        ],
      },
      {
        h: '10. 아동의 개인정보',
        ps: [
          '본 서비스는 만 13세 미만(또는 각국 법정 연령 미만) 아동을 대상으로 하지 않으며 고의로 수집하지 않습니다. 보호자는 contact@simplembti.com으로 삭제를 요청할 수 있습니다.',
        ],
      },
      {
        h: '11. 이용자의 권리',
        ps: [
          'EU·영국(GDPR): 접근·정정·삭제·처리제한·이동·반대 권리가 있습니다.',
          '캘리포니아(CCPA/CPRA): 정보 고지·삭제·판매/공유 거부 권리가 있으며, 당사는 개인정보를 판매하지 않습니다.',
          '일본(APPI): 보유 개인정보의 개시·정정·이용정지를 청구할 수 있습니다.',
          '권리 행사는 제목을 “Privacy Request”로 하여 contact@simplembti.com으로 요청하세요.',
        ],
      },
      {
        h: '12. 외부 링크',
        ps: [
          'Google 정책 페이지, 소셜 공유 등 외부 사이트로 연결되며 해당 사이트의 방침이 적용됩니다.',
        ],
      },
      {
        h: '13. 방침 변경',
        ps: [
          '서비스·광고 구성 변경 시 본 방침을 개정하며, 상단 “최종 업데이트” 날짜에 반영합니다. 계속 이용 시 개정 방침에 동의한 것으로 봅니다.',
        ],
      },
      {
        h: '14. 문의처',
        ps: [
          '개인정보 문의·권리 행사·불만: contact@simplembti.com. 해결되지 않으면 관할 개인정보 감독기구에 신고할 수 있습니다.',
        ],
      },
    ],
  },
  ja: {
    title: 'プライバシーポリシー',
    updated: '最終更新：2026年9月23日',
    intro: 'Simple MBTI（以下「当方」）は利用者のプライバシーを尊重します。本ポリシーは性格診断サービスが収集する情報、Google広告・分析Cookieの仕組み、利用者の権利を説明します。診断の回答はブラウザ内でのみ計算され、当方サーバーには送信されません。',
    sections: [
      {
        h: '1. 運営者情報',
        ps: [
          'Simple MBTIは日本語・英語・韓国語対応の無料オンライン性格診断（simplembti.com）です。',
          'プライバシーに関するお問い合わせ：contact@simplembti.com（3営業日以内に返信）。',
        ],
      },
      {
        h: '2. 収集する情報',
        ps: [
          '診断の回答と結果：ブラウザ内でのみ処理されます。未完了の診断を同端末で続けるためローカルストレージを使用しますが、回答を受信・保存・販売することはありません。',
          '技術情報：IPアドレス、ブラウザ種別、端末情報、閲覧ページ、時刻、流入元が標準ホスティングログに記録され、セキュリティと集計分析に使用されます。',
          'お問い合わせ情報：メール相談時は返信目的でのみアドレスと内容を保管します。',
        ],
      },
      {
        h: '3. 使用するCookie',
        ps: [
          '必須Cookie：言語設定の記憶など基本機能に必要です。',
          '設定の保存：診断の進捗は当方に送信されるCookieではなくブラウザのローカルストレージに保存されます。',
          '分析Cookie：Google Analyticsで人気ページ等の集計統計を測定し改善に活かします。',
          '広告Cookie：Google AdSenseがパーソナライズ広告等のためDoubleClick Cookie等を設定する場合があります。',
          'ブラウザ設定でいつでも削除・無効化できますが、診断の再開等が不便になる場合があります。',
        ],
      },
      {
        h: '4. Google AdSenseと広告Cookie',
        ps: [
          '当方はGoogle AdSense広告を掲載予定です。Googleは本サイトや他サイトの訪問履歴に基づき広告を配信するためCookieを使用します。',
          'Google広告設定（https://www.google.com/settings/ads）でパーソナライズ広告をオプトアウトできます。詳細はGoogle広告のプライバシー（https://policies.google.com/technologies/ads）をご覧ください。',
        ],
      },
      {
        h: '5. Google Analytics',
        ps: [
          '個人を特定しない集計利用傾向の把握にGoogle Analyticsを使用し、対応範囲でIP匿名化を有効化しています。',
          'Google Analyticsオプトアウトアドオン（https://tools.google.com/dlpage/gaoptout）で計測を拒否できます。',
        ],
      },
      {
        h: '6. 情報の利用目的',
        ps: [
          'サービス運営・安全確保、設定の記憶、集計性能の測定、お問い合わせ対応、法令遵守に使用します。',
          '診断回答を広告プロファイリングに使用せず、個人情報を販売しません。',
        ],
      },
      {
        h: '7. 情報の共有',
        ps: [
          'サイト運営に必要な範囲でホスティング、Google Analytics、Google AdSense等の基盤・計測事業者と技術情報を共有します。',
          'データブローカーや広告主に個人情報を販売しません。',
        ],
      },
      {
        h: '8. 保有期間',
        ps: [
          'ブラウザの診断進捗は完了・再開時に自動削除され、いつでもブラウザから消去できます。',
          'お問い合わせメールは対応に必要な期間のみ保管し削除します。',
          'サーバーログは短期間のセキュリティ保管後に集計・削除します。',
        ],
      },
      {
        h: '9. セキュリティ',
        ps: [
          'HTTPS暗号化を適用し、設計段階でサーバー収集を最小化しています。ただし完全な安全は保証できません。',
        ],
      },
      {
        h: '10. 子どものプライバシー',
        ps: [
          '本サービスは13歳未満（または各国の法定年齢未満）の子どもを対象とせず、故意に収集しません。保護者はcontact@simplembti.comへ削除を請求できます。',
        ],
      },
      {
        h: '11. 利用者の権利',
        ps: [
          'EU・英国（GDPR）：アクセス・訂正・削除・制限・移転・異議の権利があります。',
          'カリフォルニア（CCPA/CPRA）：開示・削除・販売/共有のオプトアウト権があり、当方は個人情報を販売しません。',
          '日本（APPI）：保有個人データの開示・訂正・利用停止を請求できます。',
          '権利行使は件名「Privacy Request」でcontact@simplembti.comへご連絡ください。',
        ],
      },
      {
        h: '12. 外部リンク',
        ps: [
          'GoogleポリシーページやSNS共有等、外部サイトへ遷移します。各サイトのポリシーが適用されます。',
        ],
      },
      {
        h: '13. ポリシーの変更',
        ps: [
          'サービス・広告構成の変更時に改定し、上部の「最終更新」日に反映します。継続利用により改定版への同意とみなします。',
        ],
      },
      {
        h: '14. お問い合わせ',
        ps: [
          'プライバシーのご質問・権利行使・苦情：contact@simplembti.com。解決しない場合は各国の監督機関へ申告できます。',
        ],
      },
    ],
  },
};

const PrivacyPolicy = () => {
  const lang = useLang();
  const b = BODY[lang] || BODY.en;
  return (
    <div className="legal-page">
      <SEO title={b.title} description={b.intro} path="/privacy" lang={lang} />
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

export default PrivacyPolicy;
