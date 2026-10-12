import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { isSupportedLang } from '../i18n';

export const Footer = () => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const cur = isSupportedLang(lang) ? lang : (isSupportedLang(i18n.language) ? i18n.language : 'en');
  const navLabel = cur === 'ko' ? '하단 메뉴' : cur === 'ja' ? 'フッターナビ' : 'Footer';

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-bar">
          <Link to={`/${cur}`} className="footer-brand">
            <img src="/favicon.svg" alt="Simple MBTI Logo" className="footer-logo" />
            <span className="footer-title">Simple MBTI</span>
          </Link>

          <nav className="footer-links" aria-label={navLabel}>
            <Link to={`/${cur}/privacy`} className="footer-link">{t('footer.privacy')}</Link>
            <Link to={`/${cur}/terms`} className="footer-link">{t('footer.terms')}</Link>
            <Link to={`/${cur}/about`} className="footer-link">{t('footer.about')}</Link>
            <Link to={`/${cur}/contact`} className="footer-link">
              {cur === 'ko' ? '문의' : cur === 'ja' ? 'お問い合わせ' : 'Contact'}
            </Link>
            <Link to={`/${cur}/blog`} className="footer-link">Blog</Link>
          </nav>
        </div>

        <p className="footer-copyright">{t('footer.copyright')}</p>
      </div>
    </footer>
  );
};
