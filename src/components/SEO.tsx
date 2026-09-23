import { Helmet } from 'react-helmet-async';
import { SITE_ORIGIN } from '../utils/locale';
import { SUPPORTED_LANGS } from '../i18n';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  /** path without lang prefix, e.g. "/test" or "/blog/foo" */
  path?: string;
  lang?: string;
  type?: string;
}

export const SEO = ({
  title = 'Simple MBTI - Fast & Accurate Personality Test',
  description = 'Discover your personality type with Simple MBTI. A modern, fast, and high-fidelity personality test.',
  keywords = 'MBTI, personality test, 16 personalities, psychology, self-discovery',
  image = 'https://www.simplembti.com/mbti_dashboard_mockup.png',
  path = '/',
  lang = 'en',
  type = 'website',
}: SEOProps) => {
  const siteTitle = title.includes('Simple MBTI') ? title : `${title} | Simple MBTI`;
  const canonical = `${SITE_ORIGIN}/${lang}${path === '/' ? '' : path}`;

  return (
    <Helmet>
      <html lang={lang} />
      <title>{siteTitle}</title>
      <meta name="title" content={siteTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonical} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      <link rel="canonical" href={canonical} />
      {SUPPORTED_LANGS.map((l) => (
        <link
          key={l}
          rel="alternate"
          hrefLang={l}
          href={`${SITE_ORIGIN}/${l}${path === '/' ? '' : path}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${SITE_ORIGIN}/en${path === '/' ? '' : path}`} />
    </Helmet>
  );
};
