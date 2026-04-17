import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeatureSection } from './components/FeatureSection';
import { ShowcaseSection } from './components/ShowcaseSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';

// Pages
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import About from './pages/About';
import Blog from './pages/Blog';
import Test from './pages/Test';

// Helper component to scroll to top on navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function Home() {
  return (
    <>
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
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/test" element={<Test />} />
          {/* Fallback to home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
