import { useTranslation } from 'react-i18next';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { Footer } from '../components/Footer';
import { ResultDashboard } from '../components/ResultDashboard';
import { useMBTITest } from '../hooks/useMBTITest';

const Test = () => {
  const { t } = useTranslation();
  const {
    currentIndex,
    shuffledQuestions,
    answers,
    result,
    assertiveScore,
    dimensionScores,
    showSpinner,
    progress,
    handleStart,
    handleAnswer,
    handlePrevious,
  } = useMBTITest();

  return (
    <div className="test-page-wrapper">
      <section 
        className="hero" 
        style={{ 
          minHeight: '100vh', 
          height: currentIndex === 20 ? 'auto' : '100vh', 
          overflow: 'hidden',
          zIndex: 0,
          display: 'flex',
          alignItems: currentIndex === 20 ? 'flex-start' : 'center',
          paddingTop: currentIndex === 20 ? '140px' : '80px',
          paddingBottom: currentIndex === 20 ? '100px' : '0'
        }}
      >
        <div className="hero-background">
          <div className="hero-background-image"></div>
        </div>
        <div className="bg-glow"></div>
        
        <div className={currentIndex === 20 ? "animate-fadeInUp" : "container animate-fadeInUp"} style={{ width: '100%', maxWidth: currentIndex === 20 ? '1200px' : '900px', margin: '0 auto', padding: currentIndex === 20 ? '1rem' : '2rem' }}>
          <div 
            className="test-container-card" 
            style={{ 
              width: currentIndex === 20 ? '100%' : undefined,
              maxWidth: '100%',
              padding: currentIndex === 20 ? '0' : '4rem 2rem',
              background: currentIndex === 20 ? 'transparent' : 'var(--glass-bg)',
              border: currentIndex === 20 ? 'none' : '1px solid var(--glass-border)',
              backdropFilter: currentIndex === 20 ? 'none' : 'blur(16px)',
              boxShadow: currentIndex === 20 ? 'none' : '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
              height: 'auto',
              minHeight: currentIndex === 20 ? 'auto' : '600px'
            }}
          >
            
            {/* Intro Screen */}
            {currentIndex === -1 && (
              <div className="test-welcome animate-fadeInUp">
                <h1 style={{ marginBottom: '1.5rem', fontSize: '3rem' }}>{t('test.title')}</h1>
                <p style={{ color: 'var(--accent-purple)', fontWeight: 600, marginBottom: '2rem' }}>{t('test.welcome_subtitle')}</p>
                <div className="glass-panel" style={{ padding: '2rem', marginBottom: '3rem', background: 'rgba(255,255,255,0.02)' }}>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>{t('test.intro_text')}</p>
                </div>
                <button className="btn btn-primary" onClick={handleStart} style={{ padding: '1.25rem 3rem', fontSize: '1.1rem' }}>
                  {t('test.start_button')} <FiArrowRight style={{ marginLeft: '10px' }} />
                </button>
              </div>
            )}

            {/* Question Screen */}
            {currentIndex >= 0 && currentIndex < 20 && shuffledQuestions.length > 0 && (
              <div className="test-active animate-fadeInUp">
                <div className="test-progress-container">
                  <div className="test-progress-bar" style={{ width: `${progress}%` }}></div>
                </div>
                
                <div className="question-number">{currentIndex + 1} / 20</div>
                <h2 className="question-text">
                  {t(`test.questions.${shuffledQuestions[currentIndex].originalIndex}`)}
                </h2>

                <div className="options-container">
                  <div className="option-group">
                    <span className="option-label disagree">{t('test.strongly_disagree')}</span>
                    <div className="choice-buttons">
                      <button className={`choice-btn large ${answers[currentIndex] === -2 ? 'selected disagree' : ''}`} onClick={() => handleAnswer(-2)}></button>
                      <button className={`choice-btn medium ${answers[currentIndex] === -1 ? 'selected disagree' : ''}`} onClick={() => handleAnswer(-1)}></button>
                      <button className={`choice-btn small ${answers[currentIndex] === 0 ? 'selected neutral' : ''}`} onClick={() => handleAnswer(0)}></button>
                      <button className={`choice-btn medium ${answers[currentIndex] === 1 ? 'selected agree' : ''}`} onClick={() => handleAnswer(1)}></button>
                      <button className={`choice-btn large ${answers[currentIndex] === 2 ? 'selected agree' : ''}`} onClick={() => handleAnswer(2)}></button>
                    </div>
                    <span className="option-label agree">{t('test.strongly_agree')}</span>
                  </div>
                </div>

                <div className="test-nav-buttons">
                  <button className="btn btn-glass" onClick={handlePrevious} disabled={currentIndex === 0} style={{ opacity: currentIndex === 0 ? 0.3 : 1 }}>
                    <FiArrowLeft style={{ marginRight: '8px' }} /> {t('test.prev')}
                  </button>
                </div>
              </div>
            )}

            {/* Dashboard Results Screen */}
            {currentIndex === 20 && result && dimensionScores && (
              <>
                {showSpinner ? (
                  <div className="test-loading animate-fadeInUp" style={{ padding: '6rem 0' }}>
                    <div className="spinner"></div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginTop: '2rem' }}>{t('test.calculating')}</p>
                  </div>
                ) : (
                  <ResultDashboard
                    result={result}
                    assertiveScore={assertiveScore}
                    dimensionScores={dimensionScores}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Test;
