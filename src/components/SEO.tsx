import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const SEO = ({ 
  title = 'Simple MBTI - Fast & Accurate Personality Test', 
  description = 'Discover your personality type with Simple MBTI. A modern, fast, and high-fidelity personality test.', 
  keywords = 'MBTI, personality test, 16 personalities, psychology, self-discovery',
  image = 'https://www.simplembti.com/mbti_dashboard_mockup.png',
  url = 'https://www.simplembti.com/',
  type = 'website'
}: SEOProps) => {
  const siteTitle = title.includes('Simple MBTI') ? title : `${title} | Simple MBTI`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="title" content={siteTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};
