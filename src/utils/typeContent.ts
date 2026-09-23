import { FUNCTION_STACK } from '../constants/mbti';
import { TOP_MATCHES } from './compatibility';
import { getTypeDetail } from '../data/typeDetails';

export interface GripInfo {
  inferior: string;
  trigger: string;
  grip: string;
  recovery: string;
}

type GripTable = Record<string, Record<string, { trigger: string; grip: string; recovery: string }>>;

const GRIP: GripTable = {
  en: {
    Ni: { trigger: 'An uncertain future with no good options in sight.', grip: 'Catastrophizing about what is coming, then impulsive leaps to escape the feeling.', recovery: 'Shrink the horizon: one small concrete plan for this week, executed today.' },
    Ne: { trigger: 'Too many unknowns piling up at once.', grip: 'Worst-case loops and suspicion — every unknown becomes a threat.', recovery: 'Two columns on paper: known facts versus fears. Act only on the facts column.' },
    Si: { trigger: 'Crushing routine, endless details, zero novelty.', grip: 'Nostalgia spirals or health anxiety; normal standards collapse.', recovery: 'Restore one small order: clean a desk, revisit one comfort routine.' },
    Se: { trigger: 'Sensory overload or pressure to perform live.', grip: 'Overindulgence (food, spending, scrolling) or a reckless thrill-seeking snap.', recovery: 'Get physical but gentle: a walk, stretching, one hands-on simple task.' },
    Ti: { trigger: 'Criticism of competence or illogical chaos.', grip: 'Relentless self-analysis and harsh inner criticism, usually late at night.', recovery: 'Break the problem into the tiniest logical steps and solve just the first.' },
    Te: { trigger: 'Criticism in front of others or imposed rigid structure.', grip: 'Uncharacteristic sharp outbursts, then controlling behavior to feel safe.', recovery: 'Externalize it: write the plan down, state the boundary once, clearly.' },
    Fi: { trigger: 'Value conflicts or accusations of being cold.', grip: 'Emotional flooding and hypersensitivity to slights.', recovery: 'Name the feeling privately first, then discuss it with one trusted person.' },
    Fe: { trigger: 'Social rejection or heavy emotional demands.', grip: 'Withdrawal followed by an outburst, or a people-pleasing spiral.', recovery: 'Low-stakes contact: one easy hangout, one small kindness given freely.' },
  },
  ko: {
    Ni: { trigger: '좋은 선택지가 안 보이는 불확실한 미래.', grip: '다가올 일을 파국으로 상상하다 충동적으로 뛰쳐나감.', recovery: '지평을 좁히기: 이번 주 작은 구체적 계획 하나, 오늘 실행.' },
    Ne: { trigger: '한꺼번에 쌓이는 미지의 것들.', grip: '최악 상상 루프와 의심 — 모든 미지가 위협이 됨.', recovery: '종이에 두 칸: 아는 사실 vs 두려움. 사실 칸만 행동.' },
    Si: { trigger: '짓누르는 루틴, 끝없는 디테일, 새로움 제로.', grip: '향수 소용돌이·건강 불안, 평소 기준 붕괴.', recovery: '작은 질서 하나 복구: 책상 정리, 익숙한 위안 루틴 하나.' },
    Se: { trigger: '감각 과부하·실시간 수행 압박.', grip: '과식·과소비·스크롤 과몰입 또는 무모한 스릴 돌진.', recovery: '부드럽게 몸 움직이기: 산책, 스트레칭, 손으로 하는 단순 작업 하나.' },
    Ti: { trigger: '능력 비판·비논리적 혼돈.', grip: '밤마다 되풀이되는 자기분석과 가혹한 자기비판.', recovery: '문제를 최소 논리 단계로 쪼개 첫 단계만 해결.' },
    Te: { trigger: '면전 비판·강요된 경직 구조.', grip: '답지 않은 날카로운 폭발 후 안전을 위한 통제 행동.', recovery: '밖으로 꺼내기: 계획을 적고 경계를 한 번 명확히 말하기.' },
    Fi: { trigger: '가치 충돌·차갑다는 비난.', grip: '감정 홍수와 사소한 일에 과민 반응.', recovery: '혼자 감정 이름 붙이기 먼저, 그 다음 믿는 한 사람과 대화.' },
    Fe: { trigger: '사회적 거절·무거운 감정 요구.', grip: '철수 후 폭발, 또는 비위 맞추기 소용돌이.', recovery: '부담 없는 접촉: 편한 만남 하나, 대가 없는 작은 친절 하나.' },
  },
  ja: {
    Ni: { trigger: '良い選択肢の見えない不確かな未来。', grip: '来ることを破局的に想像し、衝動的に飛び出す。', recovery: '視野を狭める：今週の小さな具体策一つを今日実行。' },
    Ne: { trigger: '一度に積もる未知の山。', grip: '最悪想像ループと疑心——未知のすべてが脅威になる。', recovery: '紙に二欄：既知の事実対不安。事実欄だけ行動。' },
    Si: { trigger: '押しつぶす習慣、果てない細部、新しさゼロ。', grip: '郷愁渦・健康不安、普段の基準崩壊。', recovery: '小さな秩序一つ回復：机整理、慣れた癒し習慣一つ。' },
    Se: { trigger: '感覚過負荷・人前での実演プレッシャー。', grip: '過食・浪費・スクロール没入か無謀なスリル突進。', recovery: '優しく体を動かす：散歩、ストレッチ、手を使う単純作業一つ。' },
    Ti: { trigger: '能力批判・非論理的混沌。', grip: '夜ごと繰り返す自己分析と過酷な自己批判。', recovery: '問題を最小論理段階に割り最初だけ解決。' },
    Te: { trigger: '人前での批判・強いられた硬直構造。', grip: 'らしくない鋭い爆発後、安全のための統制行動。', recovery: '外に出す：計画を書き、境界を一度明確に言う。' },
    Fi: { trigger: '価値衝突・冷たいとの非難。', grip: '感情洪水と些事への過敏反応。', recovery: '一人で感情名づけが先、次に信じる一人と対話。' },
    Fe: { trigger: '社会的拒絶・重い感情要求。', grip: '撤退後の爆発か、ご機嫌取り渦。', recovery: '負担のない接触：気楽な集まり一つ、見返りない小さな親切一つ。' },
  },
};

const GROWTH: Record<string, Record<string, string[]>> = {
  en: {
    NT: ['Translate vision into steps others can follow — brilliance nobody understands changes nothing.', 'Schedule feelings like data: a weekly 10-minute review of what you felt and why.', 'Ask one naive question per week; performed curiosity keeps you learning.'],
    NF: ['Ship before it feels perfect — done and kind beats perfect and late.', 'Say no early and warmly; resentment is just a delayed no.', 'Turn one ideal into a dated plan each month.'],
    SJ: ['Entertain one unproven idea per month without judging it first.', 'Praise specifically and first; critique second.', 'Leave one hour weekly unplanned — protect it like a meeting.'],
    SP: ['Finish the boring middle: define “done” before starting.', 'Put one recurring task on autopilot (calendar, auto-pay, checklist).', 'Say the feeling before the joke deflects it.'],
  },
  ko: {
    NT: ['비전을 남이 따라올 단계로 번역하기 — 이해 못 받는 탁월함은 아무것도 안 바꾼다.', '감정도 데이터처럼 정기 점검: 주 10분, 무엇을 왜 느꼈나.', '주 1회 순진한 질문하기. 보여주는 호기심이 배움을 지킨다.'],
    NF: ['완벽해지기 전에 내놓기 — 늦은 완벽보다 끝낸 친절.', '일찍 따뜻하게 거절하기. 서운은 늦은 거절이다.', '매월 이상 하나를 날짜 있는 계획으로.'],
    SJ: ['매월 검증 안 된 아이디어 하나, 판단 없이 받아들이기.', '칭찬은 구체적으로 먼저, 비판은 다음.', '주 1시간 무계획 비우기 — 회의처럼 지키기.'],
    SP: ['지루한 중반 끝내기: 시작 전 done 정의하기.', '반복 일 하나 자동화(달력·자동이체·체크리스트).', '농담으로 돌리기 전에 감정 말하기.'],
  },
  ja: {
    NT: ['ビジョンを他者が追える手順に訳す——理解されない卓越は何も変えない。', '感情もデータとして定期点検：週10分、何をなぜ感じたか。', '週1の素朴な質問を。見せる好奇心が学びを守る。'],
    NF: ['完全になる前に出す——遅い完全より終えた親切。', '早く温かく断る。恨みは遅れた拒否だ。', '毎月理想一つを日付ある計画に。'],
    SJ: ['毎月未検証の案一つを、裁かず受け入れる。', '称賛は具体的に先に、批判は後に。', '週1時間の無計画を空ける——会議のように守る。'],
    SP: ['退屈な中盤を終える：始める前に完了を定義。', '繰り返し仕事一つを自動化（予定・自動払・点検表）。', '冗談で逸らす前に感情を言う。'],
  },
};

export const getGrip = (type: string, lang: string): GripInfo => {
  const L = ['en', 'ko', 'ja'].includes(lang) ? lang : 'en';
  const stack = FUNCTION_STACK[(type || '').toUpperCase()] || [];
  const inferior = stack[3] || '—';
  const g = GRIP[L][inferior] || GRIP.en[inferior] || { trigger: '', grip: '', recovery: '' };
  return { inferior, ...g };
};

export const getGrowth = (group: string, lang: string): string[] => {
  const L = ['en', 'ko', 'ja'].includes(lang) ? lang : 'en';
  return (GROWTH[L][group] || GROWTH.en[group] || []) as string[];
};

export const getTypeFaqs = (code: string, lang: string): { q: string; a: string }[] => {
  const L = (['en', 'ko', 'ja'].includes(lang) ? lang : 'en') as 'en' | 'ko' | 'ja';
  const tops = (TOP_MATCHES[code] || []).join(', ');
  const careers = (getTypeDetail(code, L).careers || []).join(', ');
  const recovery = getGrip(code, L).recovery;
  const T = {
    en: [
      { q: `Which types match ${code} best?`, a: `${tops} rank highest — open their pair analyses from the matches section.` },
      { q: `What careers suit ${code}?`, a: `${careers}. See the careers section above for the full picture.` },
      { q: `How does ${code} recover from stress?`, a: recovery },
    ],
    ko: [
      { q: `${code}와 잘 맞는 유형은?`, a: `${tops}가 최상위 — 아래 궁합 섹션에서 쌍 분석을 열어보세요.` },
      { q: `${code}에 맞는 직업은?`, a: `${careers}. 위 직업 섹션에서 전체 모습을 확인하세요.` },
      { q: `${code}의 스트레스 해소법은?`, a: recovery },
    ],
    ja: [
      { q: `${code}と相性の良いタイプは?`, a: `${tops}が最上位 — 下の相性欄から組分析を開いてください。` },
      { q: `${code}に向く職業は?`, a: `${careers}。上の職業欄で全体像を確認してください。` },
      { q: `${code}のストレス解消法は?`, a: recovery },
    ],
  };
  return T[L];
};
