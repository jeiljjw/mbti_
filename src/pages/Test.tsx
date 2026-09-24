import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiArrowRight, FiArrowLeft, FiZap, FiClock, FiLayers, FiHeart, FiSmile } from 'react-icons/fi';
import { Footer } from '../components/Footer';
import { ResultDashboard } from '../components/ResultDashboard';
import { SEO } from '../components/SEO';
import { useMBTITest } from '../hooks/useMBTITest';
import { useLang } from '../hooks/useLang';
import { MODE_COUNTS, MODE_MINUTES, type TestMode } from '../data/questions';
import type { DimensionScores } from '../types/mbti';

const DIM_META: Record<keyof DimensionScores, { color: string; label: Record<string, string> }> = {
  EI: { color: '#4ade80', label: { en: 'Energy', ko: '에너지', ja: 'エネルギー' } },
  SN: { color: '#38bdf8', label: { en: 'Perception', ko: '인식', ja: '認識' } },
  TF: { color: '#c084fc', label: { en: 'Judgment', ko: '판단', ja: '判断' } },
  JP: { color: '#fbbf24', label: { en: 'Lifestyle', ko: '생활', ja: '生活様式' } },
};

const CHOICES = [
  { v: -2, size: 'choice-xl', tone: '#c084fc' },
  { v: -1, size: 'choice-lg', tone: '#c084fc' },
  { v: 0, size: 'choice-md', tone: '#a0a0b0' },
  { v: 1, size: 'choice-lg', tone: '#4ade80' },
  { v: 2, size: 'choice-xl', tone: '#4ade80' },
] as const;

const STR: Record<string, Record<string, string>> = {
  en: {
    modes_title: 'Choose your test length',
    modes_sub: 'Same engine, different depth. No signup needed.',
    lite: 'Super Simple', standard: 'Standard', deep: 'Deep Dive',
    min: 'min', questions: 'questions',
    back_modes: 'Change length',
  },
  ko: {
    modes_title: '검사 길이 선택',
    modes_sub: '같은 엔진, 다른 깊이. 가입 없이 바로 시작.',
    lite: '초간단', standard: '스탠다드', deep: '정밀',
    min: '분', questions: '문항',
    back_modes: '길이 변경',
  },
  ja: {
    modes_title: '診断の長さを選択',
    modes_sub: '同じエンジン、異なる深さ。登録不要。',
    lite: '超シンプル', standard: 'スタンダード', deep: '精密',
    min: '分', questions: '問',
    back_modes: '長さを変更',
  },
};

const MODES: { id: TestMode; icon: typeof FiZap }[] = [
  { id: 'lite', icon: FiZap },
  { id: 'standard', icon: FiClock },
  { id: 'deep', icon: FiLayers },
];

const Test = () => {
  const { t } = useTranslation();
  const lang = useLang();
  const s = STR[lang] || STR.en;
  const {
    currentIndex,
    total,
    mode,
    questions,
    answers,
    result,
    assertiveScore,
    dimensionScores,
    showSpinner,
    progress,
    handleSelectMode,
    handleStart,
    handleAnswer,
    handlePrevious,
    handleBackToModes,
  } = useMBTITest(lang);
  const [dir, setDir] = useState<1 | -1>(1);

  const answer = (v: number) => {
    setDir(1);
    handleAnswer(v);
  };
  const prev = () => {
    setDir(-1);
    handlePrevious();
  };
  const pickMode = (m: TestMode) => {
    setDir(1);
    handleSelectMode(m);
  };

  // Keyboard 1-5 answering
  useEffect(() => {
    if (currentIndex < 0 || currentIndex >= total) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const map: Record<string, number> = { '1': -2, '2': -1, '3': 0, '4': 1, '5': 2 };
      if (e.key in map) {
        e.preventDefault();
        setDir(1);
        handleAnswer(map[e.key]);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [currentIndex, total, handleAnswer]);

  const isResult = mode && currentIndex === total;

  return (
    <div className="test-page-wrapper">
      <SEO
        title={t('test.title')}
        description={t('test.intro_text')}
        keywords="MBTI test, MBTI診断, MBTI 테스트, personality test"
        path="/test"
        lang={lang}
      />
      <section
        className="hero"
        style={{
          minHeight: '100svh',
          height: 'auto',
          overflow: 'visible',
          zIndex: 0,
          display: 'flex',
          alignItems: isResult ? 'flex-start' : 'center',
          paddingTop: isResult ? 'calc(120px + env(safe-area-inset-top, 0px))' : 'calc(88px + env(safe-area-inset-top, 0px))',
          paddingBottom: isResult ? 'calc(100px + env(safe-area-inset-bottom, 0px))' : 'calc(48px + env(safe-area-inset-bottom, 0px))'
        }}
      >
        <div className="hero-background">
          <div className="hero-background-image"></div>
        </div>
        <div className="bg-glow"></div>

        <div className={isResult ? "animate-fadeInUp" : "container animate-fadeInUp"} style={{ width: '100%', maxWidth: isResult ? '1200px' : '900px', margin: '0 auto', padding: isResult ? '1rem' : '2rem' }}>
          <div
            className="test-container-card"
            style={{
              width: isResult ? '100%' : undefined,
              maxWidth: '100%',
              padding: isResult ? '0' : '4rem 2rem',
              background: isResult ? 'transparent' : 'var(--glass-bg)',
              border: isResult ? 'none' : '1px solid var(--glass-border)',
              backdropFilter: isResult ? 'none' : 'blur(16px)',
              boxShadow: isResult ? 'none' : '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
              height: 'auto',
              minHeight: isResult ? 'auto' : '600px'
            }}
          >

            {/* Mode Select Screen */}
            {currentIndex === -2 && (
              <div className="test-welcome animate-fadeInUp" style={{ textAlign: 'center' }}>
                <div className="eyebrow" style={{ marginBottom: '1.25rem' }}>
                  <span className="dot"></span> SimpleMBTI Lab
                </div>
                <h1 className="font-display test-modes-title" style={{ marginBottom: '0.75rem', fontSize: 'clamp(1.8rem, 6vw, 2.6rem)', fontWeight: 800, wordBreak: lang === 'ko' ? 'keep-all' : 'normal' }}>{s.modes_title}</h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>{s.modes_sub}</p>
                <div className="mode-grid">
                  {MODES.map(({ id, icon: Icon }, i) => {
                    const accent = ['#4ade80', '#38bdf8', '#c084fc'][i];
                    return (
                      <button
                        key={id}
                        className="glass-panel sticker mode-card"
                        onClick={() => pickMode(id)}
                        style={{ boxShadow: `0 10px 0 -4px ${accent}44`, color: 'var(--text-primary)', fontFamily: 'inherit' }}
                      >
                        <Icon style={{ fontSize: '1.6rem', color: accent, marginBottom: '1rem' }} />
                        <div className="big-num">{MODE_COUNTS[id]}<span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>{s.questions}</span></div>
                        <strong style={{ fontSize: '1.15rem', display: 'block', margin: '0.4rem 0' }}>{s[id]}</strong>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>≈ {MODE_MINUTES[id]}{s.min}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Intro Screen */}
            {currentIndex === -1 && mode && (
              <div className="test-welcome animate-fadeInUp" style={{ textAlign: 'center' }}>
                <div className="dim-chip" style={{ borderColor: '#4ade8066', color: '#4ade80' }}>
                  <span className="dot" style={{ background: '#4ade80' }}></span>
                  {s[mode]} · {MODE_COUNTS[mode]}{s.questions} · ≈{MODE_MINUTES[mode]}{s.min}
                </div>
                <h1 className="font-display" style={{ marginBottom: '1rem', fontSize: 'clamp(1.9rem, 7vw, 2.8rem)', fontWeight: 800, wordBreak: lang === 'ko' ? 'keep-all' : 'normal', overflowWrap: 'break-word' }}>{t('test.title')}</h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.75rem' }}>{t('test.welcome_subtitle')}</p>
                <ul className="intro-tips" aria-label={t('test.tips_label')}>
                  <li>
                    <span className="tip-ic" style={{ color: '#38bdf8' }}><FiClock /></span>
                    <span>{t('test.tip_time', { min: MODE_MINUTES[mode], count: MODE_COUNTS[mode] })}</span>
                  </li>
                  <li>
                    <span className="tip-ic" style={{ color: '#4ade80' }}><FiHeart /></span>
                    <span>{t('test.tip_honest')}</span>
                  </li>
                  <li>
                    <span className="tip-ic" style={{ color: '#c084fc' }}><FiSmile /></span>
                    <span>{t('test.tip_easy')}</span>
                  </li>
                </ul>
                <div className="action-stack action-stack-mobile action-stack-center" style={{ justifyContent: 'center' }}>
                  <button className="btn btn-primary btn-lg" onClick={handleStart}>
                    {t('test.start_button')} <FiArrowRight style={{ marginLeft: '2px' }} />
                  </button>
                  <button className="btn btn-glass btn-lg" onClick={handleBackToModes}>
                    {s.back_modes}
                  </button>
                </div>
              </div>
            )}

            {/* Question Screen */}
            {mode && currentIndex >= 0 && currentIndex < total && questions.length > 0 && (() => {
              const q = questions[currentIndex];
              const meta = DIM_META[q.dimension];
              const dimLabel = meta.label[lang] || meta.label.en;
              const barBg = `linear-gradient(90deg, ${meta.color}, ${meta.color}88)`;
              const scaleLabels = [t('test.strongly_disagree'), t('test.disagree'), t('test.neutral'), t('test.agree'), t('test.strongly_agree')];
              return (
                <div key={currentIndex} className={`test-stage ${dir === 1 ? 'q-anim-f' : 'q-anim-b'}`}>
                  <div className="test-ghost-num" aria-hidden="true">{String(currentIndex + 1).padStart(2, '0')}</div>
                  <div className="test-active">
                    <div className="test-progress-container" role="progressbar" aria-valuenow={currentIndex + 1} aria-valuemin={1} aria-valuemax={total} aria-label={`${currentIndex + 1} / ${total}`}>
                      <div className="test-progress-bar" style={{ width: `${progress}%`, background: barBg, boxShadow: `0 0 16px ${meta.color}66` }}></div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 800, letterSpacing: '0.2em' }}>
                        Q{currentIndex + 1} <span style={{ opacity: 0.5 }}>/ {total}</span>
                      </span>
                      <span className="dim-chip" style={{ borderColor: `${meta.color}66`, color: meta.color, marginBottom: 0 }}>
                        <span className="dot" style={{ background: meta.color, boxShadow: `0 0 10px ${meta.color}` }}></span>
                        {dimLabel}
                      </span>
                    </div>

                    <h2 className="q-text" id={`q-text-${currentIndex}`}>
                      {q.text}
                    </h2>

                    <div className="scale-wrap">
                      <div className="choice-scale" role="radiogroup" aria-labelledby={`q-text-${currentIndex}`}>
                        {CHOICES.map((ch, ki) => {
                          const sel = answers[currentIndex] === ch.v;
                          return (
                            <div key={ch.v}>
                              <button
                                className={`choice ${ch.size} ${sel ? 'sel' : ''}`}
                                role="radio"
                                aria-checked={sel}
                                aria-label={`${ki + 1}: ${scaleLabels[ki]}`}
                                onClick={() => answer(ch.v)}
                                style={{
                                  borderColor: sel ? ch.tone : `${ch.tone}55`,
                                  background: sel ? `radial-gradient(circle at 35% 30%, ${ch.tone}, ${ch.tone}99)` : 'rgba(255,255,255,0.02)',
                                  boxShadow: sel ? `0 0 28px ${ch.tone}88, 0 0 8px ${ch.tone}` : 'none',
                                }}
                              />
                              <span className="choice-key" aria-hidden="true"><kbd>{ki + 1}</kbd></span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="scale-captions" aria-hidden="true">
                        <span className="cap-dis">{t('test.disagree')}</span>
                        <span className="cap-agr">{t('test.agree')}</span>
                      </div>
                    </div>

                    <div className="test-nav-buttons" style={{ justifyContent: 'flex-start' }}>
                      <button className="btn btn-glass" onClick={prev} style={{ opacity: 0.9 }}>
                        <FiArrowLeft style={{ marginRight: '2px' }} /> {t('test.prev')}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Dashboard Results Screen */}
            {isResult && result && dimensionScores && (
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
