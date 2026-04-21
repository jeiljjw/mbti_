import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { BLOG_POSTS } from '../constants/blogPosts';
import { SEO } from '../components/SEO';
import { HiArrowRight, HiCalendar, HiUser } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';

const Blog = () => {
  const { i18n } = useTranslation();
  const currentLang = (i18n.language === 'ko' ? 'ko' : 'en') as 'ko' | 'en';

  return (
    <div className="legal-page">
      <SEO 
        title={currentLang === 'ko' ? 'MBTI 블로그 - 성격 유형에 대한 모든 통찰' : 'MBTI Blog - Insights into Personality Types'} 
        description={currentLang === 'ko' 
          ? 'MBTI 유형별 궁합, 적합한 직업, 스트레스 관리법 등 성격 유형에 대한 깊이 있는 통찰과 가이드를 만나보세요.' 
          : 'Discover deep insights into MBTI types, compatibility guides, career advice, and stress management strategies.'}
        keywords="MBTI, personality blog, MBTI compatibility, MBTI career, MBTI test"
        url={`https://www.simplembti.com/blog`}
      />
      
      <div className="legal-container">
        <header className="legal-header animate-fadeInUp">
          <h1 className="legal-title text-gradient">MBTI Insights Blog</h1>
          <p className="legal-last-updated">{currentLang === 'ko' ? '최신 성격 유형 가이드 및 깊이 있는 통찰' : 'Latest stories, traits, and scientific personality guides.'}</p>
        </header>

        <div className="blog-listing-grid">
          {BLOG_POSTS.map((post, index) => {
            const data = post.translations[currentLang];
            return (
              <article key={post.id} className={`blog-card glass-panel animate-fadeInUp delay-${(index + 1) * 100}`}>
                <Link to={`/blog/${post.slug}`} className="blog-card-image-link">
                  <div className="blog-card-image-container">
                    <img src={post.image} alt={post.alt} className="blog-card-img" />
                    <div className="blog-card-category-badge">{post.category}</div>
                  </div>
                </Link>
                
                <div className="blog-card-body">
                  <div className="blog-card-meta">
                    <span className="meta-item"><HiCalendar /> {post.date}</span>
                    <span className="meta-item"><HiUser /> {currentLang === 'ko' ? '전문가 팀' : 'Expert Team'}</span>
                  </div>
                  
                  <h2 className="blog-card-title">
                    <Link to={`/blog/${post.slug}`}>{data.title}</Link>
                  </h2>
                  
                  <p className="blog-card-excerpt">{data.excerpt}</p>
                  
                  <Link to={`/blog/${post.slug}`} className="blog-card-link">
                    {currentLang === 'ko' ? '자세히 보기' : 'Read Article'} <HiArrowRight />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
      <Footer />

      <style dangerouslySetInnerHTML={{ __html: `
        .blog-listing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 2.5rem;
          margin-top: 2rem;
        }

        .blog-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          border-radius: 1.5rem;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 1px solid var(--glass-border);
        }

        .blog-card:hover {
          transform: translateY(-10px) scale(1.02);
          border-color: var(--accent-green);
          box-shadow: 0 20px 40px -20px var(--accent-green-glow);
        }

        .blog-card-image-container {
          position: relative;
          height: 220px;
          overflow: hidden;
        }

        .blog-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .blog-card:hover .blog-card-img {
          transform: scale(1.1);
        }

        .blog-card-category-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: var(--glass-bg);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          padding: 0.4rem 1rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--accent-green);
          border: 1px solid var(--glass-border);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .blog-card-body {
          padding: 2rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .blog-card-meta {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1rem;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .blog-card-title {
          font-size: 1.4rem;
          margin-bottom: 1rem;
          line-height: 1.4;
          font-weight: 700;
        }

        .blog-card-title a {
          color: var(--text-primary);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .blog-card-title a:hover {
          color: var(--accent-green);
        }

        .blog-card-excerpt {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 2rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex: 1;
        }

        .blog-card-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--accent-green);
          text-decoration: none;
          font-weight: 700;
          font-size: 1rem;
          transition: all 0.2s ease;
        }

        .blog-card-link:hover {
          gap: 0.8rem;
          filter: brightness(1.2);
        }

        @media (max-width: 768px) {
          .blog-listing-grid {
            grid-template-columns: 1fr;
          }
        }
      ` }} />
    </div>
  );
};



export default Blog;
