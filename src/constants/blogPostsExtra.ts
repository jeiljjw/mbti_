import type { BlogPost } from './blogPosts';

const backlink = (text: string, path = '/') =>
  `<a href="https://www.simplembti.com${path}" style="color: var(--accent-green); font-weight: 700;">${text}</a>`;

export const EXTRA_POSTS: BlogPost[] = [
  {
    id: '4',
    slug: 'mbti-love-languages',
    image: '/1.webp',
    alt: 'Two glowing figures reaching toward each other, symbolizing love languages by personality type.',
    category: 'Relationship',
    date: '2026-09-23',
    author: 'MBTI Expert Team',
    translations: {
      ko: {
        title: 'MBTI 유형별 사랑의 언어: 16타입은 어떻게 사랑을 표현할까?',
        excerpt: '어떤 사람은 말로, 어떤 사람은 행동으로 사랑을 전합니다. 유형별 사랑 표현 방식과 오해를 줄이는 법을 정리했습니다.',
        seoTitle: 'MBTI 사랑의 언어 16유형 정리 | 연애 궁합 가이드',
        seoDescription: 'MBTI 유형별 사랑 표현 방식을 분석합니다. 연인과 더 잘 통하는 대화법, 유형별 주의점을 확인하세요.',
        keywords: 'MBTI 연애, 사랑의 언어, MBTI 궁합, 연애 스타일, MBTI 테스트',
        content: `
          <h2>같은 사랑, 다른 언어</h2>
          <p>연애에서 가장 흔한 오해는 "사랑하지 않아서"가 아니라 "사랑을 다르게 표현해서" 생깁니다. MBTI는 이 차이를 읽는 가장 빠른 지도입니다. 아직 자신의 유형을 모른다면 ${backlink('무료 MBTI 테스트')}부터 해보세요.</p>
          <h3>사고형(T): 해결이 곧 사랑</h3>
          <p>INTJ, INTP, ENTJ, ESTJ 같은 사고형은 문제를 해결해주는 것으로 애정을 표현합니다. "고민을 들어주는 대신 해결책을 내놓는다"는 불만이 여기서 나옵니다. 상대가 감정형(F)이라면, 해결책보다 먼저 "그랬구나, 힘들었겠다" 한마디가 필요합니다.</p>
          <h3>감정형(F): 공감이 곧 사랑</h3>
          <p>INFP, ENFJ, ESFJ, ISFJ 같은 감정형은 감정을 알아주는 것을 사랑의 증거로 여깁니다. 기념일, 손편지, "오늘 어땠어?"라는 질문이 이들에게는 연료입니다. 사고형 파트너라면 이벤트를 달력에 적어두는 것만으로 점수를 크게 딸 수 있습니다.</p>
          <h3>외향형(E) vs 내향형(I): 데이트 온도차</h3>
          <p>외향형은 함께 "무언가를 하며" 사랑을 확인하고, 내향형은 "조용히 함께 있으며" 확인합니다. 주말 계획을 짤 때 한 주는 외출, 한 주는 집콕처럼 번갈아 가며 리드권을 나누는 것이 가장 간단한 해법입니다. 둘의 ${backlink('궁합 분석', '/test')}을 함께 보면 대화가 훨씬 쉬워집니다.</p>
          <h3>오늘 바로 써먹는 3가지</h3>
          <ol>
            <li>상대의 유형을 묻고, 사랑 표현 1순위(말/행동/시간/선물/스킨십)를 직접 물어보세요.</li>
            <li>갈등 중에는 T에게는 사실관계, F에게는 감정 인정부터 건네세요.</li>
            <li>서로 다른 점을 고치려 하지 말고, 번역하는 연습을 하세요.</li>
          </ol>
          <p>${backlink('SimpleMBTI', '/')}에서 두 사람의 유형을 확인하고, 차이점을 무기로 바꿔보세요.</p>
        `
      },
      en: {
        title: 'Love Languages by MBTI: How Each of the 16 Types Shows Love',
        excerpt: 'Some say it with words, others with actions. A practical guide to how each type expresses love — and how to fight less.',
        seoTitle: 'MBTI Love Languages: All 16 Types Explained',
        seoDescription: 'How does each MBTI type express love? Learn type-specific communication tips and common misunderstandings.',
        keywords: 'MBTI dating, love languages, MBTI compatibility, relationship tips, free MBTI test',
        content: `
          <h2>Same Love, Different Language</h2>
          <p>Most relationship fights are not about "not loving" but about "loving differently." MBTI is the fastest map for reading that difference. If you don't know your type yet, start with our ${backlink('Free MBTI Test')}.</p>
          <h3>Thinkers (T): Solving Is Loving</h3>
          <p>INTJ, INTP, ENTJ, ESTJ types show affection by fixing problems. The classic complaint — "you give solutions instead of listening" — comes from here. If your partner is a Feeling type, lead with "that sounds hard" before offering the fix.</p>
          <h3>Feelers (F): Empathy Is Loving</h3>
          <p>INFP, ENFJ, ESFJ, ISFJ types treat emotional attunement as proof of love. Anniversaries, handwritten notes, and "how was your day?" are fuel for them. Thinking partners can score big just by putting events on the calendar.</p>
          <h3>Extraverts (E) vs. Introverts (I): Date Temperature Gap</h3>
          <p>Extraverts confirm love by <em>doing things together</em>; introverts by <em>quietly being together</em>. Alternate who leads weekend plans — one week out, one week in. Reading both ${backlink('compatibility profiles', '/test')} together makes the conversation far easier.</p>
          <h3>3 Things to Try Today</h3>
          <ol>
            <li>Ask your partner's type — and directly ask their #1 love language.</li>
            <li>In conflict, give Thinkers facts first and Feelers validation first.</li>
            <li>Don't fix differences; practice translating them.</li>
          </ol>
          <p>Check both types on ${backlink('SimpleMBTI', '/')} and turn differences into strengths.</p>
        `
      }
    }
  },
  {
    id: '5',
    slug: 'mbti-workplace-communication',
    image: '/2.webp',
    alt: 'Diverse team members collaborating around a glowing table, symbolizing workplace communication styles.',
    category: 'Career',
    date: '2026-09-23',
    author: 'MBTI Expert Team',
    translations: {
      ko: {
        title: '직장에서 통하는 MBTI 소통법: 유형별 협업 가이드',
        excerpt: '왜 같은 말도 사람마다 다르게 들릴까? 판단형 상사, 인식형 동료와 일하는 법을 유형별로 정리했습니다.',
        seoTitle: 'MBTI 직장 소통 가이드 | 유형별 협업과 리더십',
        seoDescription: 'MBTI 유형별 직장 소통 스타일을 분석합니다. 상사·동료·후배와 일하는 실전 팁을 확인하세요.',
        keywords: 'MBTI 직업, 직장 소통, 리더십, 협업, MBTI 테스트',
        content: `
          <h2>일은 결국 사람이다</h2>
          <p>성과가 안 나오는 이유의 절반은 능력이 아니라 소통 방식의 충돌입니다. MBTI는 상사·동료의 운영체제를 읽는 설명서입니다. 팀 전체가 ${backlink('MBTI 테스트', '/test')}를 해보면 회의 시간이 절반으로 줍니다.</p>
          <h3>판단형(J) 상사와 일하기</h3>
          <p>ESTJ, ENTJ, ISTJ 상사는 결론·일정·책임을 먼저 듣고 싶어 합니다. 보고는 "결론 → 근거 → 일정" 순서로, 3줄 요약부터 건네세요. 마감을 어기는 것은 신뢰를 깎는 가장 빠른 길입니다.</p>
          <h3>인식형(P) 동료와 일하기</h3>
          <p>ENFP, ENTP, ISFP 동료는 선택지가 닫히는 것을 고통스러워합니다. "금요일까지 A안/B안 중 선택"처럼 마감과 옵션을 함께 주면 최고의 퍼포먼스가 나옵니다. 즉흥적인 아이디어는 회의가 아니라 메모로 받아주세요.</p>
          <h3>내향형(I) 후배 피드백법</h3>
          <p>내향형에게 공개적인 지적은 상처가 됩니다. 1:1에서 먼저 잘한 점을 구체적으로 말하고, 개선점은 질문 형태로 건네세요. "이 부분은 어떻게 생각해?"가 "이건 고쳐"보다 3배 효과적입니다.</p>
          <h3>회의를 바꾸는 3줄 룰</h3>
          <ol>
            <li>안건은 전날 공유한다 (I와 J를 위한 배려).</li>
            <li>결론과 다음 행동을 마지막 5분에 확정한다.</li>
            <li>발언하지 않은 사람의 의견을 지명해서 묻는다.</li>
          </ol>
          <p>${backlink('SimpleMBTI', '/')} 팀 테스트로 우리 팀의 분포를 확인해보세요.</p>
        `
      },
      en: {
        title: 'MBTI at Work: A Communication Guide for Every Type',
        excerpt: 'Why does the same sentence land differently with everyone? Practical tips for working with Judging bosses and Perceiving teammates.',
        seoTitle: 'MBTI Workplace Guide: Communication by Type',
        seoDescription: 'Workplace communication styles by MBTI type. Practical tips for bosses, teammates, and feedback.',
        keywords: 'MBTI career, workplace communication, leadership, teamwork, free MBTI test',
        content: `
          <h2>Work Is Ultimately About People</h2>
          <p>Half of all performance problems are communication mismatches, not skill gaps. MBTI is the manual for reading how your boss and teammates operate. Have the whole team take the ${backlink('MBTI test', '/test')} and watch meetings get shorter.</p>
          <h3>Working for a Judging (J) Boss</h3>
          <p>ESTJ, ENTJ, ISTJ bosses want conclusions, timelines, and ownership first. Report in the order conclusion → evidence → timeline, starting with a 3-line summary. Missing a deadline is the fastest way to lose trust.</p>
          <h3>Working with a Perceiving (P) Teammate</h3>
          <p>ENFP, ENTP, ISFP teammates suffer when options close early. Give deadlines <em>with</em> options — "pick A or B by Friday" — and you'll get their best work. Collect spontaneous ideas as notes, not meeting derailments.</p>
          <h3>Giving Feedback to Introverts (I)</h3>
          <p>Public criticism wounds introverts. In private, name what worked specifically, then offer improvements as questions. "How do you feel about this part?" works three times better than "fix this."</p>
          <h3>The 3-Line Meeting Rule</h3>
          <ol>
            <li>Share the agenda the day before (for I and J types).</li>
            <li>Lock conclusions and next actions in the final 5 minutes.</li>
            <li>Explicitly invite quiet members to speak.</li>
          </ol>
          <p>Check your team's distribution with ${backlink('SimpleMBTI', '/')}.</p>
        `
      }
    }
  },
  {
    id: '6',
    slug: 'mbti-myths-debunked',
    image: '/3.webp',
    alt: 'A magnifying glass over tangled puzzle pieces, symbolizing MBTI myths and facts.',
    category: 'Insights',
    date: '2026-09-23',
    author: 'MBTI Expert Team',
    translations: {
      ko: {
        title: 'MBTI에 대한 오해 5가지: 팩트로 바로잡기',
        excerpt: '"MBTI는 혈액형이랑 같다?" 가장 흔한 오해 5가지를 심리학 근거로 정리했습니다.',
        seoTitle: 'MBTI 오해와 진실 5가지 | 과학적 근거 정리',
        seoDescription: 'MBTI는 정말 과학이 아닐까? 흔한 오해 5가지를 팩트 기반으로 바로잡습니다.',
        keywords: 'MBTI 과학, MBTI 오해, MBTI 정확도, 성격 검사, MBTI 테스트',
        content: `
          <h2>오해 1. "MBTI는 혈액형 같은 미신이다"</h2>
          <p>다릅니다. 혈액형 성격설은 실증 근거가 거의 없지만, MBTI의 기반인 외향성·개방성 같은 차원은 성격심리학(Big Five)과 상당 부분 겹칩니다. 물론 MBTI는 임상 진단 도구가 아니라 <strong>소통용 언어</strong>로 쓰는 것이 맞습니다.</p>
          <h2>오해 2. "한 번 나오면 평생 간다"</h2>
          <p>선호는 비교적 안정적이지만 점수는 상태에 따라 움직입니다. 컨디션·나이·환경에 따라 경계선 문항이 뒤집히는 것은 정상입니다. 그래서 ${backlink('정기적인 재검사', '/test')}를 권합니다. 유형은 낙인이 아니라 스냅샷입니다.</p>
          <h2>오해 3. "궁합이 나쁘면 헤어져야 한다"</h2>
          <p>궁합 점수는 만족도 통계의 요약일 뿐, 개별 커플의 운명이 아닙니다. 어떤 조합도 소통 기술로 극복됩니다. 점수보다 중요한 것은 서로의 언어를 배우려는 노력입니다.</p>
          <h2>오해 4. "T는 차갑고 F는 논리가 없다"</h2>
          <p>T/F는 능력의 차이가 아니라 <strong>의사결정 기준</strong>의 차이입니다. T도 공감하고, F도 논리적입니다. 다만 압박 상황에서 먼저 꺼내는 카드가 다를 뿐입니다.</p>
          <h2>오해 5. "회사에서 MBTI로 뽑으면 된다"</h2>
          <p>채용 탈락 근거로 쓰는 것은 부적절합니다. MBTI는 선발이 아니라 <strong>배치와 협업</strong>에 써야 합니다. 같은 팀이라도 역할 분담에 활용하면 이직률이 내려갑니다.</p>
          <p>제대로 이해하고 쓰면 MBTI는 가장 저렴한 소통 혁신입니다. ${backlink('SimpleMBTI 테스트', '/test')}로 시작해보세요.</p>
        `
      },
      en: {
        title: '5 MBTI Myths Debunked: What the Science Actually Says',
        excerpt: '"MBTI is just astrology?" We fact-check the 5 most common myths with psychology research.',
        seoTitle: '5 MBTI Myths vs Facts | Scientific Accuracy Guide',
        seoDescription: 'Is MBTI scientific? We debunk 5 common myths about MBTI with evidence-based explanations.',
        keywords: 'MBTI science, MBTI myths, MBTI accuracy, personality test, free MBTI test',
        content: `
          <h2>Myth 1. "MBTI is just like blood-type astrology"</h2>
          <p>Not quite. Blood-type personality theory has almost no evidence, while MBTI dimensions like extraversion overlap substantially with established trait psychology (Big Five). That said, MBTI is best used as a <strong>communication language</strong>, not a clinical diagnosis.</p>
          <h2>Myth 2. "Your type is fixed for life"</h2>
          <p>Preferences are fairly stable, but scores move with mood, age, and context. Borderline items flipping is normal — which is why we recommend ${backlink('periodic retesting', '/test')}. A type is a snapshot, not a stamp.</p>
          <h2>Myth 3. "Bad compatibility means breakup"</h2>
          <p>Compatibility scores summarize population-level satisfaction, not your couple's destiny. Any pairing can thrive with communication skills. Effort to learn each other's language beats any score.</p>
          <h2>Myth 4. "Thinkers are cold, Feelers are illogical"</h2>
          <p>T/F is a difference in <strong>decision criteria</strong>, not ability. Thinkers empathize; Feelers reason. They simply lead with different cards under pressure.</p>
          <h2>Myth 5. "Companies should hire by MBTI"</h2>
          <p>Using MBTI as a hiring filter is inappropriate. Its proper use is <strong>placement and collaboration</strong> — assigning roles by strength, which measurably helps retention.</p>
          <p>Used correctly, MBTI is the cheapest communication upgrade available. Start with the ${backlink('SimpleMBTI test', '/test')}.</p>
        `
      }
    }
  }
];
