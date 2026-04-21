import { useParams, Link, Navigate } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { BLOG_POSTS } from '../constants/blogPosts';
import { SEO } from '../components/SEO';
import { HiArrowLeft, HiCalendar } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const BlogPostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { i18n } = useTranslation();
  const currentLang = (i18n.language === 'ko' ? 'ko' : 'en') as 'ko' | 'en';
  
  const post = BLOG_POSTS.find(p => p.slug === slug);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / scrollHeight) * 100;
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const data = post.translations[currentLang];

  return (
    <div className="blog-detail-wrapper">
      <SEO 
        title={data.seoTitle}
        description={data.seoDescription}
        keywords={data.keywords}
        image={post.image}
        url={`https://www.simplembti.com/blog/${post.slug}`}
        type="article"
      />

      <div className="reading-progress-container">
        <div className="reading-progress-bar" style={{ width: `${readingProgress}%` }}></div>
      </div>

      <div className="legal-container">
        <nav className="blog-breadcrumb">
          <Link to="/blog" className="back-link">
            <HiArrowLeft /> {currentLang === 'ko' ? '블로그 목록으로' : 'Back to Insights'}
          </Link>
        </nav>

        <article className="blog-post-full">
          <header className="blog-post-header">
            <div className="blog-post-meta-top">
              <span className="blog-category-tag">{post.category}</span>
              <span className="blog-date-info"><HiCalendar /> {post.date}</span>
            </div>
            
            <h1 className="blog-post-title text-gradient">{data.title}</h1>
            
            <div className="blog-post-author-box">
              <div className="author-avatar">{post.author.charAt(0)}</div>
              <div className="author-info">
                <span className="author-name">{currentLang === 'ko' ? '전문가 팀' : 'Expert Team'}</span>
                <span className="author-role">{currentLang === 'ko' ? 'MBTI 연구 리드' : 'MBTI Research Lead'}</span>
              </div>
            </div>
          </header>

          <div className="blog-post-hero-image-container glass-panel">
            <img src={post.image} alt={post.alt} className="blog-post-hero-img" />
          </div>

          <div className="blog-post-content-body" dangerouslySetInnerHTML={{ __html: data.content }} />

          <footer className="blog-post-footer-cta">
            <div className="cta-mini-card glass-panel premium-glass">
              <h3>{currentLang === 'ko' ? '성격 유형에 대해 더 알아보고 싶으신가요?' : 'Want to learn more about your personality?'}</h3>
              <p>{currentLang === 'ko' 
                ? '과학적이고 정밀한 알고리즘을 통해 설계된 최고의 MBTI 테스트를 무료로 체험해 보세요.' 
                : 'Experience the most precise MBTI test designed with scientific algorithms for free.'}</p>
              <Link to="/test" className="btn btn-primary">{currentLang === 'ko' ? '지금 바로 테스트 시작하기' : 'Start Test Now'}</Link>
            </div>
            
            <div className="blog-post-tags">
              {data.keywords.split(',').map(tag => (
                <span key={tag} className="char-tag">#{tag.trim()}</span>
              ))}
            </div>
          </footer>
        </article>
      </div>

      <Footer />

      <style dangerouslySetInnerHTML={{ __html: `
        .blog-detail-wrapper {
          padding-top: 100px;
          min-height: 100vh;
          background: var(--bg-dark);
        }

        .reading-progress-container {
          position: fixed;
          top: 80px;
          left: 0;
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.05);
          z-index: 1000;
        }

        .reading-progress-bar {
          height: 100%;
          background: var(--gradient-main);
          transition: width 0.1s ease-out;
          box-shadow: 0 0 10px var(--accent-green-glow);
        }

        .blog-breadcrumb {
          margin-bottom: 3rem;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .back-link:hover {
          color: var(--accent-green);
          transform: translateX(-5px);
        }

        .blog-post-full {
          max-width: 850px;
          margin: 0 auto;
        }

        .blog-post-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .blog-post-meta-top {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .blog-category-tag {
          color: var(--accent-green);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .blog-date-info {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .blog-post-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          line-height: 1.2;
          margin-bottom: 2.5rem;
          font-weight: 900;
        }

        .blog-post-author-box {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .author-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--gradient-purple);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          color: white;
        }

        .author-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          font-size: 0.9rem;
        }

        .author-name {
          font-weight: 700;
          color: var(--text-primary);
        }

        .author-role {
          color: var(--text-secondary);
          font-size: 0.8rem;
        }

        .blog-post-hero-image-container {
          width: 100%;
          border-radius: 2rem;
          overflow: hidden;
          margin-bottom: 5rem;
          box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.6);
        }

        .blog-post-hero-img {
          width: 100%;
          height: auto;
          display: block;
        }

        .blog-post-content-body {
          line-height: 2;
          font-size: 1.15rem;
          color: var(--text-primary);
        }

        .blog-post-content-body h2 {
          font-size: 2rem;
          margin: 4rem 0 2rem;
          color: var(--accent-green);
        }

        .blog-post-content-body h3 {
          font-size: 1.6rem;
          margin: 3rem 0 1.5rem;
          color: var(--accent-purple);
        }

        .blog-post-content-body p {
          margin-bottom: 2rem;
          color: rgba(240, 240, 245, 0.85);
        }

        .blog-post-content-body ul, .blog-post-content-body ol {
          margin-bottom: 2.5rem;
          padding-left: 1.5rem;
        }

        .blog-post-content-body li {
          margin-bottom: 1rem;
        }

        .blog-post-content-body strong {
          color: var(--text-primary);
          font-weight: 700;
        }

        .blog-post-footer-cta {
          margin: 6rem 0;
          padding-top: 4rem;
          border-top: 1px solid var(--glass-border);
        }

        .cta-mini-card {
          padding: 4rem;
          text-align: center;
          margin-bottom: 3rem;
          border-radius: 2rem;
        }

        .cta-mini-card h3 {
          font-size: 1.8rem;
          margin-bottom: 1rem;
        }

        .cta-mini-card p {
          margin-bottom: 2.5rem;
          color: var(--text-secondary);
        }

        .blog-post-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .blog-post-content-body {
            font-size: 1.05rem;
          }
          .cta-mini-card {
            padding: 2.5rem 1.5rem;
          }
        }
      ` }} />
    </div>
  );
};

export default BlogPostDetail;
