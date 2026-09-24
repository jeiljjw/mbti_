import { Link, useParams } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { useLang } from '../hooks/useLang';
import NotFound from './NotFound';

const KNOWN = ['ISTJ','ISFJ','INFJ','INTJ','ISTP','ISFP','INFP','INTP','ESTP','ESFP','ENFP','ENTP','ESTJ','ESFJ','ENFJ','ENTJ'];

const STR: Record<string, { sub: string; detail: string }> = {
  en: { sub: 'Shared result (share card in Phase 1)', detail: 'View details' },
  ko: { sub: '공유된 결과', detail: '상세 보기' },
  ja: { sub: '共有された結果', detail: '詳細を見る' },
};

const ResultShare = () => {
  const { type = '' } = useParams<{ type: string }>();
  const lang = useLang();
  const s = STR[lang] || STR.en;
  const code = (type || '').toUpperCase();
  if (!KNOWN.includes(code)) return <NotFound />;
  return (
    <div className="legal-page">
      <SEO
        title={`${code} ${lang === 'ko' ? '결과 공유' : lang === 'ja' ? '結果シェア' : 'Result'}`}
        description={`${code} personality result share page.`}
        image={`https://www.simplembti.com/og/${code.toLowerCase()}.png`}
        path={`/r/${code.toLowerCase()}`}
        lang={lang}
      />
      <div className="legal-container">
        <header className="legal-header">
          <h1 className="legal-title text-gradient">{code}</h1>
          <p className="legal-last-updated">{s.sub}</p>
        </header>
        <div className="legal-content">
          <section className="legal-section glass-panel legal-section-card" style={{ textAlign: 'center' }}>
            <Link to={`/${lang}/type/${code.toLowerCase()}`} className="btn btn-primary btn-lg btn-block" style={{ maxWidth: 360, margin: '0 auto' }}>
              {s.detail}
            </Link>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResultShare;
