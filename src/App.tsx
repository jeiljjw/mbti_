import { useEffect, Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useParams,
  useLocation,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeatureSection } from './components/FeatureSection';
import { ShowcaseSection } from './components/ShowcaseSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { isSupportedLang, detectInitialLang } from './i18n';
import { initAnalytics, trackPageview } from './utils/analytics';
import { SEO } from './components/SEO';
import { useLang } from './hooks/useLang';

// Route-split: each page ships in its own chunk (LCP/AdSense RPM).
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const About = lazy(() => import('./pages/About'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPostDetail = lazy(() => import('./pages/BlogPostDetail'));
const Test = lazy(() => import('./pages/Test'));
const Contact = lazy(() => import('./pages/Contact'));
const TypeDetail = lazy(() => import('./pages/TypeDetail'));
const MatchIndex = lazy(() => import('./pages/MatchIndex'));
const MatchDetail = lazy(() => import('./pages/MatchDetail'));
const ResultShare = lazy(() => import('./pages/ResultShare'));
const NotFound = lazy(() => import('./pages/NotFound'));

const PageFallback = () => (
  <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div className="spinner" aria-label="loading" />
  </div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AnalyticsTracker = () => {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();
  useEffect(() => {
    initAnalytics();
    trackPageview(pathname, i18n.language);
  }, [pathname, i18n.language]);
  return null;
};

const RootRedirect = () => {
  const lang = detectInitialLang();
  return <Navigate to={`/${lang}`} replace />;
};

/** Validates :lang param, syncs i18n, renders Navbar + child route. */
const LangLayout = () => {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (lang && isSupportedLang(lang) && i18n.language !== lang) {
      void i18n.changeLanguage(lang);
      try {
        localStorage.setItem('simplembti-lang', lang);
      } catch {
        // ignore
      }
    }
    document.documentElement.lang = lang || 'en';
  }, [lang, i18n]);

  if (!isSupportedLang(lang)) {
    return <Navigate to="/en" replace />;
  }

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

function Home() {
  const lang = useLang();
  return (
    <>
      <SEO path="/" lang={lang} />
      <HeroSection />
      <FeatureSection />
      <ShowcaseSection />
      <CTASection />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AnalyticsTracker />
      <Routes>
        <Route path="/" element={<RootRedirect />} />

        {/* Legacy non-prefixed URLs → en canonical (preserves existing backlinks) */}
        <Route path="/test" element={<Navigate to="/en/test" replace />} />
        <Route path="/blog" element={<Navigate to="/en/blog" replace />} />
        <Route path="/blog/:slug" element={<LegacyBlogRedirect />} />
        <Route path="/about" element={<Navigate to="/en/about" replace />} />
        <Route path="/privacy" element={<Navigate to="/en/privacy" replace />} />
        <Route path="/terms" element={<Navigate to="/en/terms" replace />} />

        <Route path="/:lang" element={<LangLayout />}>
          <Route index element={<Home />} />
          <Route path="test" element={<Suspense fallback={<PageFallback />}><Test /></Suspense>} />
          <Route path="blog" element={<Suspense fallback={<PageFallback />}><Blog /></Suspense>} />
          <Route path="blog/:slug" element={<Suspense fallback={<PageFallback />}><BlogPostDetail /></Suspense>} />
          <Route path="about" element={<Suspense fallback={<PageFallback />}><About /></Suspense>} />
          <Route path="privacy" element={<Suspense fallback={<PageFallback />}><PrivacyPolicy /></Suspense>} />
          <Route path="terms" element={<Suspense fallback={<PageFallback />}><TermsOfService /></Suspense>} />
          <Route path="contact" element={<Suspense fallback={<PageFallback />}><Contact /></Suspense>} />
          <Route path="type/:type" element={<Suspense fallback={<PageFallback />}><TypeDetail /></Suspense>} />
          <Route path="match" element={<Suspense fallback={<PageFallback />}><MatchIndex /></Suspense>} />
          <Route path="match/:pair" element={<Suspense fallback={<PageFallback />}><MatchDetail /></Suspense>} />
          <Route path="r/:type" element={<Suspense fallback={<PageFallback />}><ResultShare /></Suspense>} />
          <Route path="*" element={<Suspense fallback={<PageFallback />}><NotFound /></Suspense>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

const LegacyBlogRedirect = () => {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={`/en/blog/${slug || ''}`} replace />;
};

export default App;
