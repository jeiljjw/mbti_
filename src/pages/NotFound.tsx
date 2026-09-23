import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { useLang } from '../hooks/useLang';
import { splitLangPath } from '../utils/locale';

const COPY: Record<string, { msg: string; home: string; back: string }> = {
  ko: { msg: '페이지를 찾을 수 없습니다.', home: '홈으로', back: '뒤로 가기' },
  ja: { msg: 'ページが見つかりません。', home: 'ホームへ', back: '戻る' },
  en: { msg: 'Page not found.', home: 'Home', back: 'Go back' },
};

const NotFound = () => {
  const lang = useLang();
  const { pathname } = useLocation();
  const { rest } = splitLangPath(pathname);
  const c = COPY[lang] || COPY.en;
  return (
    <div className="legal-page">
      <SEO
        title="404"
        description={c.msg}
        path={rest === '/' ? '/' : rest}
        lang={lang}
      />
      {/* 404 must never be indexed */}
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="prerender-status-code" content="404" />
      </Helmet>
      <div className="legal-container">
        <header className="legal-header">
          <h1 className="legal-title text-gradient">404</h1>
          <p className="legal-last-updated">{c.msg}</p>
          <div style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to={`/${lang}`} className="btn btn-primary" style={{ display: 'inline-block' }}>
              {c.home}
            </Link>
            <button type="button" className="btn btn-glass" onClick={() => window.history.back()}>
              {c.back}
            </button>
          </div>
        </header>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
