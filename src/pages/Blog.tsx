import { Footer } from '../components/Footer';

const Blog = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <header className="legal-header">
          <h1 className="legal-title text-gradient">Blog</h1>
          <p className="legal-last-updated">Latest Insights & MBTI Stories</p>
        </header>

        <div className="legal-content">
          <section className="legal-section glass-panel legal-section-card" style={{ textAlign: 'center', padding: '5rem 2rem' }}>
            <h2 style={{ display: 'block', borderBottom: 'none' }}>Coming Soon!</h2>
            <p>
              We're currently preparing high-quality content to help you understand personality types better. 
              Our first set of blog posts will be available very soon. Stay tuned!
            </p>
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
               <div className="glass-panel" style={{ width: '100px', height: '100px', opacity: 0.3 }}></div>
               <div className="glass-panel" style={{ width: '100px', height: '100px', opacity: 0.3 }}></div>
               <div className="glass-panel" style={{ width: '100px', height: '100px', opacity: 0.3 }}></div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
