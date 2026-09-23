import { FUNCTION_STACK } from '../constants/mbti';

export interface AxisAnalysis {
  axis: 'EI' | 'SN' | 'TF' | 'JP';
  aLetter: string;
  bLetter: string;
  same: boolean;
  title: string;
  body: string;
  tip: string;
}

export interface MatchContent {
  axes: AxisAnalysis[];
  strengths: string[];
  watchouts: string[];
  datingTips: string[];
  verdictLong: string;
  faqs: { q: string; a: string }[];
  /** Pair-specific opening narrative (curated or generated). */
  narrative: string;
  /** Human-readable explanation of how the numeric score was derived. */
  scoreBreakdown: string;
}

type V = { title: string; body: string; tip: string };
type AxisTable = Record<string, Record<string, Record<'same' | 'diff', V[]>>>;

const AXIS: AxisTable = {
  en: {
    EI: {
      same: [
        { title: 'Energy style', body: 'Both partners recharge the same way, so social plans rarely cause fights. Two extroverts generate momentum and fill the calendar; two introverts share comfortable silence and depth.', tip: 'Name your shared pattern out loud — then protect the exception (one quiet night for E–E, one bold outing for I–I) as a ritual.' },
        { title: 'Same battery', body: 'Matching energy means fewer negotiations about going out versus staying in. The shadow side is amplification: E–E pairs can burn out together, I–I pairs can stall in a cozy rut.', tip: 'Alternate who initiates plans so the same person is not always the engine.' },
        { title: 'Social thermostat', body: 'You agree on how much outside stimulation a good week needs. Extrovert pairs say yes first and edit later; introvert pairs edit first and enjoy the few chosen moments more deeply.', tip: 'Set a weekly social budget together — then spend it on purpose instead of by accident.' },
        { title: 'Recovery pact', body: 'Because downtime looks the same to both of you, rest rarely feels like rejection. The risk is assuming the same dose works: one partner may need twice the quiet or twice the crowd.', tip: 'Ask for your number plainly: hours alone or outings per week, no guessing.' },
      ],
      diff: [
        { title: 'The classic energy exchange', body: 'The extrovert brings the introvert into the world; the introvert gives the extrovert depth and calm. Conflict centers on dosage — how much social life is enough, and how much solitude is respectful.', tip: 'Negotiate a number: weekly social nights and sacred solo nights, both non-negotiable.' },
        { title: 'Opposite batteries', body: 'One charges with people, the other alone — neither is wrong. Most E–I fights are really about feeling rejected on one side and crowded on the other.', tip: 'Name the need, not the blame: “I need recharge” instead of “you never/always”.' },
        { title: 'Bridge schedule', body: 'E–I works best with a visible rhythm: shared outings, parallel rest, and solo recovery all on the calendar. Without the rhythm, the extrovert overbooks and the introvert quietly withdraws.', tip: 'Plan three blocks weekly: together-out, together-in, and apart. Honor all three.' },
        { title: 'Translator habit', body: 'The same evening reads as connection to one partner and noise to the other. Naming that gap in the moment prevents most E–I spirals before they start.', tip: 'Use a 1–10 energy check at the door: above 7 stays out, below 4 heads home early.' },
      ],
    },
    SN: {
      same: [
        { title: 'Shared reality', body: 'You notice and value the same things, so everyday conversation flows. Two sensing types build a life that works; two intuitive types live in possibility and rarely get bored.', tip: 'Feed the missing side on purpose: future questions for S–S, concrete next steps for N–N.' },
        { title: 'Same lens', body: 'Seeing the world through the same lens feels like telepathy. The shared blind spot is identical — S–S can starve big-picture dreams, N–N can drop practical details.', tip: 'Assign the neglected territory explicitly: who owns dreams, who owns details.' },
        { title: 'Memory match', body: 'You remember the same kinds of moments, so stories land the first time. Sensing pairs keep receipts and routines; intuitive pairs keep themes and turning points.', tip: 'Keep one shared log: photos for S–S, one-line lessons for N–N.' },
        { title: 'Growth edge', body: 'Comfort is high because neither partner has to translate. Progress comes from borrowing the other lens monthly — one bold what-if for S–S, one finished detail for N–N.', tip: 'Monthly swap: sensors pitch a dream, intuitives close a loop.' },
      ],
      diff: [
        { title: 'The famous communication gap', body: 'Sensing focuses on what is; intuition on what could be. “Just tell me the plan” meets “but imagine the possibilities” — this axis causes the most everyday misunderstandings of all four.', tip: 'Translate before reacting: repeat back what you heard in your own words first.' },
        { title: 'Facts meet meanings', body: 'One partner remembers exactly what happened; the other remembers what it meant. Both memories are real, and thriving S–N couples learn to want both versions.', tip: 'Ask for both: “what happened, and what did it mean to you?”' },
        { title: 'Two-track talks', body: 'S–N fights shrink when each topic gets two passes: concrete pass first, meaning pass second. Skipping the first pass feels careless; skipping the second feels shallow.', tip: 'Agree on order: facts in two minutes, then feelings and futures.' },
        { title: 'Proof and pattern', body: 'Sensors trust what worked before; intuitives trust the pattern they see forming. Big calls need both: one precedent plus one plausible future.', tip: 'For decisions over a week of impact, require one example and one forecast.' },
      ],
    },
    TF: {
      same: [
        { title: 'Same decision language', body: 'You reason on the same terms, so debates stay clean. Two thinkers prize fairness and logic; two feelers prize care and harmony.', tip: 'Import the missing channel deliberately: a feelings round for T–T, a logic check for F–F.' },
        { title: 'No translation needed', body: 'Decisions feel natural because the criteria match. Watch the shared shadow: T–T can shelve emotions until they erupt, F–F can delay hard truths to protect warmth.', tip: 'Schedule the uncomfortable conversation monthly — same day, same kindness.' },
        { title: 'Fairness pact', body: 'Shared criteria make dividing labor and credit feel obvious. Thinker pairs should write the unspoken rules down; feeler pairs should say the kind no early.', tip: 'Review splits quarterly: chores, money, and praise — all three.' },
        { title: 'Repair style', body: 'Apologies land fast because both partners recognize the same currency: corrected logic for T–T, restored warmth for F–F. Use that currency first, explanation second.', tip: 'Fix the channel first, then the facts: warmth or logic, in that order.' },
      ],
      diff: [
        { title: 'The conflict epicenter', body: 'The thinker wants the right answer; the feeler wants the relationship intact. “You are right but I feel hurt” contains the whole dynamic — both statements are true at once.', tip: 'Validate first for 30 seconds, solve second. Order matters more than content.' },
        { title: 'Head meets heart', body: 'Thinking brings clarity, feeling brings humanity — together you are wiser than either alone. The rule that saves T–F couples: criticize the problem, never the person.', tip: 'In fights, ask: “do you want comfort or solutions right now?”' },
        { title: 'Two-question rule', body: 'T–F stalls when one question dominates. Ask both every time: is it true, and is it kind? Skilled couples answer in that order and rarely regret it.', tip: 'Write both answers before replying to hard messages.' },
        { title: 'Feedback format', body: 'Thinkers hear softened feedback as vague; feelers hear blunt feedback as attack. The bridge format is observation plus need: what happened, and what would help next time.', tip: 'Start hard talks with one specific appreciation, then the request.' },
      ],
    },
    JP: {
      same: [
        { title: 'Same pace of life', body: 'Planning friction stays naturally low. Two judgers run life like clockwork; two perceivers keep it fresh and breathing.', tip: 'Guard against your shared extreme: unscheduled joy for J–J, kill dates for open loops for P–P.' },
        { title: 'Matched tempo', body: 'You move through weeks the same way, which removes a whole category of fights. Growth means borrowing a little of the opposite tempo on purpose.', tip: 'J–J: say yes to one unplanned thing weekly. P–P: lock 2–3 non-negotiable rituals.' },
        { title: 'Calendar fit', body: 'Shared tempo means the calendar itself feels fair. Judging pairs should leave white space; perceiving pairs should ink the few things that truly matter.', tip: 'Audit the calendar monthly: one thing to free, one thing to fix.' },
        { title: 'Closure rhythm', body: 'You agree on what done looks like and how fast to get there. Name the exceptions early — which projects stay open, which close on sight.', tip: 'Label every project open or closed at kickoff.' },
      ],
      diff: [
        { title: 'Structure meets spontaneity', body: 'The judger wants the itinerary; the perceiver wants the adventure. Travel planning is the classic flashpoint — minute-by-minute versus “let us see how we feel”.', tip: 'Split the trip: one plans the skeleton (hotel, transport), the other owns the free hours.' },
        { title: 'The deadline dance', body: 'Judging feels safe with closure; perceiving feels alive with openness. Big choices need decide-by dates; small ones can stay gloriously open.', tip: 'Put only big decisions on the calendar — leave the small ones free.' },
        { title: 'Doorway agreement', body: 'J–P peace comes from deciding where plans are firm and where they flex. Front door firm (time, budget), back door open (route, menu, mood).', tip: 'State the firm two and free the rest before each outing.' },
        { title: 'Close-the-loop day', body: 'Perceivers generate options all week; judgers need landings. One weekly session that converts opens into decisions keeps both sides sane.', tip: 'Pick a 30-minute weekly close-out: decide, delegate, delete.' },
      ],
    },
  },
  ko: {
    EI: {
      same: [
        { title: '에너지 스타일', body: '충전 방식이 같아 사교 계획으로 싸울 일이 적습니다. 외향끼리는 추진력이 생기고, 내향끼리는 편안한 침묵과 깊이를 공유합니다.', tip: '공통 패턴을 말로 확인하고, 예외(외향은 조용한 밤, 내향은 과감한 외출)를 의식으로 지키세요.' },
        { title: '같은 배터리', body: '외출과 집콕 협상이 거의 필요 없습니다. 그림자는 증폭입니다. 외향끼리는 함께 번아웃되고, 내향끼리는 아늑한 정체에 빠질 수 있습니다.', tip: '계획 제안자를 번갈아 맡아 한 사람이 항상 엔진이 되지 않게 하세요.' },
        { title: '사교 온도계', body: '한 주에 필요한 바깥 자극량이 비슷합니다. 외향끼리는 일단 나서고 나중에 고르고, 내향끼리는 미리 골라 적게 깊이 즐깁니다.', tip: '한 주 사교량을 함께 정하세요. 흘러가는 대로가 아니라 작정하고 쓰기.' },
        { title: '휴식 약속', body: '쉬는 모습이 비슷해 휴식이 거부로 느껴지지 않습니다. 다만 필요한 양은 다를 수 있습니다. 고요든 북적임이든 두 배 필요한 쪽이 있을 수 있습니다.', tip: '필요량을 숫자로 말하세요. 혼자 시간 몇 시간, 외출 몇 번.' },
      ],
      diff: [
        { title: '클래식한 에너지 교환', body: '외향형은 내향형을 세상으로 데리고 나가고, 내향형은 외향형에게 깊이와 고요를 줍니다. 갈등은 용량 문제입니다. 사교는 얼마나, 혼자 시간은 얼마나 존중할 것인가.', tip: '숫자로 정하세요. 주 몇 회 사교, 몇 회는 신성한 혼자 시간.' },
        { title: '반대 배터리', body: '한쪽은 사람으로, 한쪽은 혼자 충전됩니다. 둘 다 정상입니다. 싸움의 실체는 서운함과 답답함입니다.', tip: '비난이 아니라 욕구를 말하세요. 충전이 필요하다고 먼저 말하기.' },
        { title: '다리 일정', body: '함께 외출, 나란히 휴식, 따로 충전이 달력에 보이면 가장 잘 맞습니다. 리듬이 없으면 외향은 과하게 약속하고 내향은 조용히 물러납니다.', tip: '주 3칸을 정하세요. 함께밖, 함께집, 따로. 셋 다 지키기.' },
        { title: '번역 습관', body: '같은 저녁이 한쪽엔 연결로, 한쪽엔 소음으로 읽힙니다. 그 간극을 그 자리에서 말하면 대부분의 소용돌이를 막을 수 있습니다.', tip: '현관에서 기운을 숫자로 말하세요. 높으면 함께, 낮으면 먼저 귀가.' },
      ],
    },
    SN: {
      same: [
        { title: '공유된 현실', body: '같은 것을 보고 가치 있게 여겨 일상이 잘 흐릅니다. 감각끼리는 돌아가는 삶을 만들고, 직관끼리는 가능성에 살며 지루할 틈이 없습니다.', tip: '없는 쪽을 의식적으로 먹이세요. 감각끼리는 미래 질문을, 직관끼리는 구체적 다음 행동을.' },
        { title: '같은 렌즈', body: '같은 렌즈로 세상을 봐 텔레파시 같습니다. 그림자도 같습니다. 감각끼리는 큰 그림이, 직관끼리는 실무 디테일이 굶주립니다.', tip: '소홀한 영역의 주인을 정하세요. 꿈 담당, 디테일 담당.' },
        { title: '기억의 결', body: '같은 종류의 순간을 기억해 이야기가 한 번에 통합니다. 감각끼리는 기록과 습관을, 직관끼리는 주제와 전환점을 간직합니다.', tip: '함께 기록 하나를 두세요. 감각끼리는 사진, 직관끼리는 한 줄 깨달음.' },
        { title: '성장 모서리', body: '번역이 필요 없어 편합니다. 성장은 반대 렌즈를 매달 조금 빌려오는 데서 옵니다. 감각끼리는 과감한 가정 하나, 직관끼리는 끝낸 디테일 하나.', tip: '매달 바꾸기. 감각은 꿈 제안, 직관은 마무리를.' },
      ],
      diff: [
        { title: '유명한 소통 간극', body: '감각형은 있는 그대로를, 직관형은 가능성을 봅니다. 계획만 말해달라는 쪽과 가능성을 상상하자는 쪽의 충돌은 일상 오해의 단골 원인입니다.', tip: '반응 전에 번역하세요. 들은 말을 내 말로 되돌려 말하기부터.' },
        { title: '사실과 의미의 만남', body: '한쪽은 있었던 일을, 한쪽은 그 의미를 기억합니다. 둘 다 진짜 기억입니다. 잘 맞는 커플은 두 버전을 다 원합니다.', tip: '둘 다 물어보세요. 무슨 일이 있었고 어떤 의미였는지.' },
        { title: '두 갈래 대화', body: '먼저 구체적으로, 다음에 의미로 가면 싸움이 줄어듭니다. 첫 단계를 건너뛰면 성의 없어 보이고, 둘째를 건너뛰면 가벼워 보입니다.', tip: '순서를 정하세요. 사실은 짧게, 다음에 마음과 앞날을.' },
        { title: '근거와 흐름', body: '감각형은 전에 통했던 것을, 직관형은 보이는 흐름을 믿습니다. 큰 결정은 둘 다 필요합니다. 앞선 예 하나와 그럴듯한 앞날 하나.', tip: '파장이 큰 결정은 예시 하나와 전망 하나를 함께 요구하세요.' },
      ],
    },
    TF: {
      same: [
        { title: '같은 결정 언어', body: '기준이 같아 논쟁이 깨끗합니다. 사고끼리는 공정과 논리를, 감정끼리는 돌봄과 화합을 중시합니다.', tip: '없는 채널을 들여오세요. 사고끼리는 감정 라운드, 감정끼리는 논리 점검.' },
        { title: '번역 불필요', body: '기준이 같아 결정이 자연스럽습니다. 그림자를 보세요. 사고끼리는 감정을 쌓아두고 폭발하고, 감정끼리는 온기를 지키려 쓴소리를 미룹니다.', tip: '불편한 대화는 매달 정기편성. 같은 날, 같은 다정함으로.' },
        { title: '공정 약속', body: '기준이 같아 일과 공을 나누는 일이 분명해 보입니다. 사고끼리는 암묵 규칙을 적어두고, 감정끼리는 따뜻한 거절을 일찍 말하세요.', tip: '분기마다 나누기를 점검하세요. 집안일, 돈, 칭찬 셋 다.' },
        { title: '수리 방식', body: '사과가 빨리 통합니다. 사고끼리는 고친 논리에, 감정끼리는 돌아온 온기에 풀리기 때문입니다. 해명보다 그 통화를 먼저 건네세요.', tip: '채널 먼저, 사실 다음. 온기든 논리든 순서대로.' },
      ],
      diff: [
        { title: '갈등의 진앙', body: '사고형은 정답을, 감정형은 관계 유지를 원합니다. 네 말이 맞지만 마음이 상했다는 말에 전부가 담겨 있습니다. 둘 다 동시에 진짜입니다.', tip: '먼저 공감하고 다음에 해결하세요. 순서가 내용보다 중요합니다.' },
        { title: '머리와 가슴의 만남', body: '사고는 명료함을, 감정은 인간미를 줍니다. 함께가 각자보다 현명합니다. 문제를 비판하고 사람을 비판하지 않는 것이 살리는 규칙입니다.', tip: '싸울 땐 물어보세요. 위로가 필요한지 해결이 필요한지.' },
        { title: '두 질문 규칙', body: '한 질문만 밀면 막힙니다. 맞는지와 다정한지를 매번 함께 물어보세요. 그 순서로 답하면 후회가 줄어듭니다.', tip: '어려운 답장은 두 답을 적고 나서 보내세요.' },
        { title: '말하기 틀', body: '둘둘 말하면 사고형엔 흐릿하게, 직설이면 감정형엔 공격으로 들립니다. 다리는 관찰과 바람입니다. 무슨 일이 있었고 다음엔 무엇이 도울지.', tip: '어려운 말은 구체적 칭찬 하나로 시작해 부탁을 이으세요.' },
      ],
    },
    JP: {
      same: [
        { title: '같은 삶의 속도', body: '계획 마찰이 원래 적습니다. 판단끼리는 시계처럼 돌아가고, 인식끼리는 신선하게 호흡합니다.', tip: '공통 극단을 경계하세요. 판단끼리는 예정 없는 기쁨을, 인식끼리는 열린 숙제의 마감일을.' },
        { title: '맞춰진 템포', body: '주간 리듬이 같아 한 범주의 싸움이 사라집니다. 성장은 반대 템포를 조금 빌려오는 것입니다.', tip: '판단끼리라면 주 1회 무계획 허용. 인식끼리라면 철칙 두세 개 고정.' },
        { title: '달력 궁합', body: '속도가 같아 달력 자체가 공정하게 느껴집니다. 판단끼리는 빈칸을 남기고, 인식끼리는 진짜 중요한 몇 개만 잉크로 적으세요.', tip: '매달 달력을 보세요. 비울 것 하나, 고정할 것 하나.' },
        { title: '마무리 리듬', body: '완료의 모습과 속도에 동의합니다. 예외를 일찍 정하세요. 열어둘 일과 보면 닫을 일.', tip: '시작할 때 열어둠과 닫음을 표시하세요.' },
      ],
      diff: [
        { title: '구조와 자발성의 만남', body: '판단형은 일정을, 인식형은 모험을 원합니다. 여행 계획이 단골 충돌 지점입니다. 분 단위와 가서 정하자의 만남입니다.', tip: '여행을 나누세요. 뼈대는 판단형, 자유 시간은 인식형.' },
        { title: '마감의 춤', body: '판단형은 확정에 안심하고, 인식형은 열림에 생기를 느낍니다. 큰 결정만 마감일을 정하고 작은 것은 열어두세요.', tip: '달력에는 큰 결정만. 작은 것은 자유롭게.' },
        { title: '문턱 약속', body: '어디까지는 굳히고 어디부터는 여는지 정하면 평화가 옵니다. 앞문은 굳게, 뒷문은 열리게가 요령입니다.', tip: '나들이 전에 굳힐 두 개를 말하고 나머지는 여세요.' },
        { title: '마무리 시간', body: '인식형은 한 주 내내 선택지를 만들고 판단형은 착륙이 필요합니다. 주 1회 모아 결정으로 바꾸는 시간이 양쪽을 살립니다.', tip: '주 30분 마무리를 정하세요. 결정, 위임, 삭제를.' },
      ],
    },
  },
  ja: {
    EI: {
      same: [
        { title: 'エネルギースタイル', body: '充電方法が同じで社交の揉め事が少ない組み合わせです。外向同士は推進力が生まれ、内向同士は心地よい沈黙と深さを共有します。', tip: '共通パターンを言葉にして、例外（外向は静かな夜、内向は大胆な外出）を儀式として守りましょう。' },
        { title: '同じバッテリー', body: '外出か自宅かの交渉がほぼ不要です。影は増幅です。外向同士は共に燃え尽き、内向同士は心地よい停滞にはまる恐れがあります。', tip: '計画の提案者を交代し、一人が常にエンジンにならないように。' },
        { title: '社交の温度計', body: '良い一週間に必要な外の刺激量が似ています。外向同士は先に動き後で選び、内向同士は先に選び少なく深く楽しみます。', tip: '週の社交量を一緒に決め、流れ任せでなく目的を持って使う。' },
        { title: '休息の約束', body: '休み方が似ていて休息が拒絶に読まれにくい関係です。ただし量は違うこともあります。静けさも賑わいも倍必要な側がいるかもしれません。', tip: '必要量を数字で伝えましょう。一人時間の時間数、外出の回数を。' },
      ],
      diff: [
        { title: '定番のエネルギー交換', body: '外向型は内向型を世界へ連れ出し、内向型は外向型に深さと静けさを与えます。争点は用量です。社交はどれだけ、一人時間はどれだけ尊重するか。', tip: '数字で決めましょう。週の社交回数と聖なる一人時間を両方死守。' },
        { title: '逆のバッテリー', body: '片方は人で、片方は一人で充電します。どちらも正常です。喧嘩の実態は寂しさと窮屈さです。', tip: '非難でなく欲求を言葉に。充電が必要と先に伝える。' },
        { title: '橋の予定', body: '一緒の外出、並んだ休息、別々の充電が予定に見えると最も合います。リズムがないと外向は入れすぎ、内向は静かに引きます。', tip: '週3枠を決めましょう。一緒外、一緒家、別々。三つとも守る。' },
        { title: '翻訳の習慣', body: '同じ夜が片方にはつながりに、片方には雑音に読まれます。その差をその場で言うと渦の多くを止められます。', tip: '玄関で元気を数字で。高ければ一緒に、低ければ先に帰宅。' },
      ],
    },
    SN: {
      same: [
        { title: '共有された現実', body: '同じものを見て価値づけるため日常が流れます。感覚同士は回る生活を作り、直観同士は可能性に生きて飽きません。', tip: 'ない側に意識的に栄養を。感覚同士は未来の問いを、直観同士は具体的な次の一手を。' },
        { title: '同じレンズ', body: '同じレンズで世界を見るためテレパシーのようです。影も同じです。感覚同士は大きな絵が、直観同士は実務の細部が飢えます。', tip: '手薄な領域の担当を決める。夢担当、細部担当。' },
        { title: '記憶の模様', body: '同じ種類の瞬間を覚えるため話が一度で通じます。感覚同士は記録と習慣を、直観同士は主題と転機を大切にします。', tip: '共用の記録を一つ。感覚同士は写真、直観同士は一行の学び。' },
        { title: '成長の角', body: '訳がいらず楽です。成長は逆のレンズを毎月少し借りることです。感覚同士は大胆な仮定一つ、直観同士は終えた細部一つ。', tip: '毎月交代。感覚は夢提案、直観は仕上げを。' },
      ],
      diff: [
        { title: '有名なすれ違い', body: '感覚型はあるがままを、直観型は可能性を見ます。予定だけ教えてほしい側と可能性を想像したい側の衝突は日常の誤解の常連です。', tip: '反応の前に翻訳を。聞いたことを自分の言葉で返してから。' },
        { title: '事実と意味の出会い', body: '片方は出来事を、片方は意味を覚えています。どちらも本物の記憶です。うまくいく組は両方を求めます。', tip: '両方聞きましょう。何があって、どんな意味だったのかを。' },
        { title: '二走の対話', body: '先に具体、次に意味の順で話すと喧嘩が減ります。最初を飛ばすと誠意がなく見え、次を飛ばすと軽く見えます。', tip: '順を決める。事実は短く、次に気持ちと先を。' },
        { title: '根拠と流れ', body: '感覚型は前の成功例を、直観型は見える流れを信じます。大きな決定は両方が必要です。前例一つと筋の通る先見一つ。', tip: '影響の大きい決定は例一つと見通し一つを求める。' },
      ],
    },
    TF: {
      same: [
        { title: '同じ判断言語', body: '基準が同じで議論がきれいです。思考同士は公正と論理を、感情同士は思いやりと調和を重んじます。', tip: 'ない回路を持ち込む。思考同士は感情ラウンド、感情同士は論理チェック。' },
        { title: '翻訳不要', body: '基準が同じで決定が自然です。影を見ましょう。思考同士は感情を溜めて爆発し、感情同士は温かさを守って苦言を延ばします。', tip: '不快な対話は毎月定期開催。同じ日に、同じ優しさで。' },
        { title: '公正の約束', body: '基準が同じで分担がはっきり見えます。思考同士は暗黙の決まりを書き出し、感情同士は温かい拒否を早めに。', tip: '四半期ごとに分担点検。家事とお金と称賛の三つ。' },
        { title: '修復の型', body: '謝りが早く通じます。思考同士は直した論理に、感情同士は戻った温かさにほどけるからです。説明よりその通貨を先に。', tip: '回線を先に、事実を後に。温かさも論理も順番通りに。' },
      ],
      diff: [
        { title: '衝突の震源', body: '思考型は正解を、感情型は関係の維持を求めます。正しいけど傷ついたという言葉に全部詰まっています。どちらも同時に本当です。', tip: '先に共感、解決は後。順番が内容より重要です。' },
        { title: '頭と心の出会い', body: '思考は明晰さを、感情は人間味をくれます。一緒の方が賢い関係です。問題を批判し、人を批判しないことが救いの規則です。', tip: '喧嘩中は聞きましょう。慰めがいいか解決がいいかを。' },
        { title: '二問の規則', body: '一つの問いだけでは止まります。正しいかと優しいかを毎回両方問うことです。その順で答えると後悔が減ります。', tip: '難しい返信は二つの答えを書いてから送る。' },
        { title: '伝え方の型', body: '柔らかすぎると思考型には曖昧に、直球は感情型には攻撃に聞こえます。橋は観察と願いです。何があって次に何が助けになるか。', tip: '難しい話は具体的な称賛一つで始め願いへつなぐ。' },
      ],
    },
    JP: {
      same: [
        { title: '同じ生活速度', body: '計画の摩擦がもともと少なめです。判断同士は時計のように回り、知覚同士は新鮮に呼吸します。', tip: '共通の極端を警戒して。判断同士は予定のない喜びを、知覚同士は開いた宿題の締切を。' },
        { title: '合ったテンポ', body: '週のリズムが同じで一分野の喧嘩が消えます。成長は逆のテンポを少し借りることです。', tip: '判断同士は週1の無計画を許し、知覚同士は鉄則を二三固定する。' },
        { title: '予定の相性', body: '速度が同じで予定自体が公平に感じられます。判断同士は余白を残し、知覚同士は本当に大事な数件だけ墨入れする。', tip: '毎月予定を見る。空けるもの一つ、固めるもの一つ。' },
        { title: '仕上げのリズム', body: '完了の姿と速さに同意できます。例外を早めに決めましょう。開けておく仕事と見たら閉じる仕事を。', tip: '始めるときに開閉を表示する。' },
      ],
      diff: [
        { title: '構造と自発性の出会い', body: '判断型は日程を、知覚型は冒険を求めます。旅行計画が定番の衝突地点です。分刻みと行ってから決めようの出会いです。', tip: '旅行を分担。骨格は判断型、自由時間は知覚型。' },
        { title: '締切のダンス', body: '判断型は確定に安心し、知覚型は開放に生きがいを感じます。大きな決定だけ期限を決め、小さなものは開けておきましょう。', tip: '予定には大きな決定だけ。小さなものは自由に。' },
        { title: '敷居の約束', body: 'どこまで固めどこから開けるか決めると平和が来ます。表は固く裏は開けるがこつです。', tip: '外出前に固める二つを言い残りは開ける。' },
        { title: '仕上げの時間', body: '知覚型は一週間選択肢を作り判断型は着地が必要です。週1回まとめて決定に変える時間が両方を救います。', tip: '週30分の仕上げを定める。決定と委任と削除を。' },
      ],
    },
  },
};

type Line = { s: string; d: string };
type LineTable = Record<string, Record<'EI' | 'SN' | 'TF' | 'JP', Line>>;

const STRENGTH: LineTable = {
  en: {
    EI: { s: 'Same energy rhythm — social plans rarely cause friction.', d: 'Complementary energy — one opens doors, the other adds depth.' },
    SN: { s: 'Shared reality — you notice and value the same things.', d: 'Complete vision — facts plus possibilities cover everything.' },
    TF: { s: 'Same decision language — debates stay clean and fair.', d: 'Balanced judgment — head and heart check each other.' },
    JP: { s: 'Same pace of life — planning friction stays low.', d: 'Stability plus freshness — structure with room to breathe.' },
  },
  ko: {
    EI: { s: '같은 에너지 리듬 — 사교 계획 마찰이 적습니다.', d: '보완적 에너지 — 한쪽은 문을 열고 한쪽은 깊이를 더합니다.' },
    SN: { s: '공유된 현실 — 같은 것을 보고 가치 있게 여깁니다.', d: '완전한 시야 — 사실과 가능성이 모두 커버됩니다.' },
    TF: { s: '같은 결정 언어 — 논쟁이 깨끗하고 공정합니다.', d: '균형 잡힌 판단 — 머리와 가슴이 서로를 견제합니다.' },
    JP: { s: '같은 삶의 속도 — 계획 마찰이 적습니다.', d: '안정과 신선함 — 숨 쉴 틈 있는 구조.' },
  },
  ja: {
    EI: { s: '同じエネルギーリズム — 社交の摩擦が少なめです。', d: '補完的エネルギー — 片方は扉を開け、片方は深さを加えます。' },
    SN: { s: '共有された現実 — 同じものを見て価値づけます。', d: '完全な視野 — 事実と可能性でカバーします。' },
    TF: { s: '同じ判断言語 — 議論がきれいで公正です。', d: 'バランスの取れた判断 — 頭と心が互いを補います。' },
    JP: { s: '同じ生活速度 — 計画の摩擦が少なめです。', d: '安定と新鮮さ — 呼吸できる構造。' },
  },
};

const WATCH: LineTable = {
  en: {
    EI: { s: 'Shared extreme — E–E pairs can burn out together; I–I pairs can stall.', d: 'Recharge mismatch — solo time can read as rejection.' },
    SN: { s: 'Shared blind spot — S–S starve dreams; N–N drop details.', d: 'Translation tax — the same sentence lands differently.' },
    TF: { s: 'Shared shadow — T–T shelve feelings; F–F delay hard truths.', d: 'In-fight language gap — logic reads as cold, feelings as fog.' },
    JP: { s: 'Matched rigidity or drift — J–J lock plans; P–P lose deadlines.', d: 'Planning friction — skeleton versus spontaneity.' },
  },
  ko: {
    EI: { s: '공통 극단 — 외향끼리는 동반 번아웃, 내향끼리는 정체 주의.', d: '충전 방식 차이 — 혼자 시간이 거부로 읽힐 수 있습니다.' },
    SN: { s: '공통 사각 — 감각끼리는 꿈이, 직관끼리는 디테일이 굶주립니다.', d: '번역 비용 — 같은 말이 다르게 들립니다.' },
    TF: { s: '공통 그림자 — 사고끼리는 감정 적체, 감정끼리는 쓴소리 지연.', d: '싸움 언어 차이 — 논리는 차갑게, 감정은 안개처럼 들립니다.' },
    JP: { s: '맞춰진 경직·표류 — 판단끼리는 계획 고착, 인식끼리는 마감 유실.', d: '계획 마찰 — 뼈대와 자발성.' },
  },
  ja: {
    EI: { s: '共通の極端 — 外向同士は共燃え、内向同士は停滞に注意。', d: '充電方法の違い — 一人時間が拒絶に読まれる恐れ。' },
    SN: { s: '共通の盲点 — 感覚同士は夢が、直観同士は細部が飢えます。', d: '翻訳コスト — 同じ言葉が違って届きます。' },
    TF: { s: '共通の影 — 思考同士は感情滞留、感情同士は苦言先延ばし。', d: '喧嘩言語の違い — 論理は冷たく、感情は霧のように。' },
    JP: { s: '合った硬直・漂流 — 判断同士は計画固着、知覚同士は締切喪失。', d: '計画の摩擦 — 骨格と自発性。' },
  },
};

const DATING: LineTable = {
  en: {
    EI: { s: 'Lean into your shared style: group adventures for E–E, a quiet café series for I–I.', d: 'Alternate formats: one social date, one cozy home date — both count equally.' },
    SN: { s: 'Rituals bond you: cook the recipe exactly (S–S) or stargaze and future-talk (N–N).', d: 'Split roles: one plans dinner, the other plans the surprise.' },
    TF: { s: 'Play to the shared channel: debate night with a silly prize (T–T), handwritten notes (F–F).', d: 'Thinkers: ask “how do you feel?” before “what should we do?”' },
    JP: { s: 'Honor the tempo: plan the anniversary early (J–J) or keep one weekend unplanned (P–P).', d: 'One handles bookings, the other handles serendipity.' },
  },
  ko: {
    EI: { s: '공통 스타일에 올인: 외향끼리는 단체 모험, 내향끼리는 단골 카페 시리즈.', d: '형식 교대: 사교 데이트 한 번, 집콕 데이트 한 번 — 둘 다 동점.' },
    SN: { s: '의식이 묶어줍니다. 레시피대로 요리(감각끼리), 별 보며 앞날 토크(직관끼리).', d: '역할 분담: 저녁은 한쪽, 깜짝은 다른 쪽.' },
    TF: { s: '공통 채널로 놀기: 상품 건 토론 밤(사고끼리), 손편지(감정끼리).', d: '사고형은 어떻게 할까 전에 기분이 어떤지부터.' },
    JP: { s: '템포 존중: 기념일은 일찍 계획(판단끼리), 한 주말은 무계획(인식끼리).', d: '예약은 한쪽, 우연은 다른 쪽.' },
  },
  ja: {
    EI: { s: '共通スタイルに全振り：外向同士は団体冒険、内向同士は常連カフェ巡り。', d: '形式を交代：社交デートと自宅デートを同点扱いで。' },
    SN: { s: '儀式が絆に。レシピ通り料理（感覚同士）、星空未来トーク（直観同士）。', d: '役割分担：夕食は片方、サプライズはもう片方。' },
    TF: { s: '共通回路で遊ぶ：賞品付き討論ナイト（思考同士）、手紙（感情同士）。', d: '思考型はどうするの前にどんな気持ちかから。' },
    JP: { s: 'テンポ尊重：記念日は早め計画（判断同士）、1週末は無計画（知覚同士）。', d: '予約は片方、偶然はもう片方。' },
  },
};

const VERDICT: Record<string, string[]> = {
  en: [
    'Overall this pairing works because similarity and difference are distributed where they help most. Shared axes give you effortless understanding; differing axes give you range neither partner has alone. The score above is a starting temperature, not a ceiling — couples who practice the tips on this page consistently outperform their number.',
    'Read the number as context, not verdict. Every shared letter removes one category of fights; every differing letter adds one growth assignment. Pairs like this one do best with explicit rituals — a weekly check-in, a named way of fighting fair, and a shared project that uses both partners’ strengths.',
    'What separates thriving couples here from struggling ones is repair speed, not similarity. Shared letters decide what feels easy in month one; differing letters decide what you will be proud of in year three. Keep the easy parts on autopilot and put your practice hours into the differing axes.',
    'Treat the score as a weather report for your default settings. Defaults can be dressed for: shared axes are the climate you both enjoy, differing axes are the seasons you prepare for. Couples who pack for both enjoy the trip far more than couples who argue with the forecast.',
  ],
  ko: [
    '이 조합이 통하는 이유는 닮은 점과 다른 점이 가장 도움이 되는 자리에 배치되어 있기 때문입니다. 같은 지표는 힘을 들이지 않아도 되는 이해를, 다른 지표는 혼자서는 갖기 힘든 폭을 줍니다. 위 점수는 출발 온도이지 천장이 아닙니다. 이 페이지의 방법을 실천하는 커플은 점수를 뛰어넘습니다.',
    '점수는 맥락이지 판결이 아닙니다. 같은 글자는 싸움 한 범주를 지우고, 다른 글자는 성장 과제 하나를 더합니다. 이런 조합은 분명한 의식으로 가장 좋아집니다. 주간 대화, 공정한 싸움 규칙, 둘의 강점을 쓰는 공동 일정이 그것입니다.',
    '잘 맞는 커플과 힘든 커플을 가르는 것은 닮음이 아니라 회복 속도입니다. 같은 글자는 첫 달의 편함을 정하고, 다른 글자는 3년 차의 자랑을 정합니다. 편한 부분은 자동화에 맡기고 연습 시간은 다른 지표에 쓰세요.',
    '점수는 기본값에 대한 일기예보로 읽으세요. 기본값은 갖춰 입을 수 있습니다. 같은 지표는 함께 좋아하는 기후이고, 다른 지표는 대비하는 계절입니다. 둘 다 챙기는 커플이 예보와 싸우는 커플보다 훨씬 멀리 갑니다.',
  ],
  ja: [
    'この組み合わせが機能する理由は、似ている点と違う点が最も助かる位置にあるからです。同じ指標は自然な理解を、違う指標は一人では持てない幅をくれます。上のスコアは出発点であり上限ではありません。ここでの方法を実践する組は数字を超えます。',
    'スコアは背景であり判決ではありません。同じ文字は喧嘩の一分野を消し、違う文字は成長課題を一つ足します。こうした組み合わせははっきりした習慣で最も伸びます。週の対話、公平な喧嘩の決まり、二人の強みを使う共同予定です。',
    'うまくいく組と苦しむ組を分けるのは似ていることではなく立ち直りの速さです。同じ文字は最初の月の楽さを決め、違う文字は3年目の誇りを決めます。楽な部分は仕組みに任せ、練習時間は違う指標に使いましょう。',
    'スコアは初期設定の天気予報として読みましょう。設定は装えます。同じ指標は共に好む気候であり、違う指標は備える季節です。両方に備える組は予報と争う組よりずっと遠くへ行きます。',
  ],
};

/** Curated pair narratives for high-traffic / archetypal pairs. Key is normalized "A-B". */
const NARRATIVE: Record<string, { en: string; ko: string; ja: string }> = {
  'ENFP-INTJ': {
    en: 'The classic “golden pair”: ENFP curiosity opens INTJ strategy, and INTJ structure turns ENFP sparks into finished work. Expect instant fascination — and the famous S/N translation bill.',
    ko: '대표 황금 조합입니다. 직관형의 호기심이 전략형의 설계를 깨우고, 전략형의 뼈대가 직관형의 불꽃을 완성으로 바꿉니다. 첫 끌림은 강하고, 감각과 직관의 번역 비용이 과제입니다.',
    ja: '代表の黄金の組み合わせです。直観型の好奇心が戦略型の設計を起こし、戦略型の骨格が直観型の火花を完成に変えます。最初の惹かれ合いは強く、感覚と直観の翻訳代が課題です。',
  },
  'ENTP-INFJ': {
    en: 'The debate-meets-depth pair: ENTP pressure-tests ideas while INFJ reads what people actually need. Conversations never run dry; closure and sensitivity need explicit rules.',
    ko: '토론과 깊이의 만남입니다. 한쪽은 생각을 시험하고 한쪽은 사람의 속마음을 읽습니다. 대화는 마르지 않고, 마무리와 예민함에 대한 규칙이 필요합니다.',
    ja: '討論と深さの出会いです。片方は考えを試し、片方は人の本音を読みます。対話は尽きず、締めと繊細さの決まりが必要です。',
  },
  'ENFJ-INFP': {
    en: 'Warmth meets sincerity: ENFJ leadership gives INFP ideals a stage, and INFP authenticity keeps ENFJ honest. Both feel deeply — naming needs early prevents quiet resentment.',
    ko: '따뜻함과 진심의 만남입니다. 이끄는 쪽이 이상에 무대를 주고, 진심 쪽이 이끄는 쪽을 정직하게 붙듭니다. 둘 다 깊이 느끼는 만큼 바라는 바를 일찍 말해야 쌓이지 않습니다.',
    ja: '温かさと真心の出会いです。導く側が理想に舞台を与え、真心側が導く側を誠実につなぎます。共に深く感じる分、願いは早めに言葉にしましょう。',
  },
  'ENTJ-INTP': {
    en: 'Execution meets analysis: ENTJ converts INTP models into results, and INTP keeps ENTJ from optimizing the wrong problem. Respect the different work cadence and both win.',
    ko: '실행과 분석의 만남입니다. 이끄는 쪽이 모형을 결과로 바꾸고, 분석 쪽이 잘못된 문제를 다듬는 일을 막습니다. 일의 속도가 다름을 인정하면 둘 다 얻습니다.',
    ja: '実行と分析の出会いです。導く側が模型を結果に変え、分析側が違う問題の磨き上げを止めます。仕事の速度の違いを認めると両方が得ます。',
  },
  'ISTJ-ESFJ': {
    en: 'The dependable household pair: ISTJ systems plus ESFJ care build a life that runs. Romance needs scheduling here — put play on the calendar or duty crowds it out.',
    ko: '믿음직한 살림 조합입니다. 체계와 돌봄이 만나 돌아가는 삶을 만듭니다. 낭만은 일정에 넣어야 합니다. 넣지 않으면 의무가 먼저 차지합니다.',
    ja: '頼れる暮らしの組み合わせです。仕組みと思いやりで回る生活を作ります。楽しみは予定に入れましょう。入れないと義務が先に埋めます。',
  },
  'INTJ-INTJ': {
    en: 'Two strategists, one blueprint table: plans are superb, feelings get deferred. Name the emotional agenda explicitly or it piles up behind the brilliant roadmap.',
    ko: '두 전략가의 설계 탁자입니다. 계획은 뛰어나고 감정은 뒤로 밀립니다. 마음의 안건을 말로 꺼내지 않으면 빛나는 지도 뒤에 쌓입니다.',
    ja: '二人の戦略家の設計卓です。計画は見事で感情は後回しになります。心の議題を言葉に出さないと輝く地図の裏に積もります。',
  },
  'ENFP-ENFP': {
    en: 'Double spark: endless ideas and warmth, thin follow-through. Pick one shared project and finish it together — completion is the love language here.',
    ko: '두 배의 불꽃입니다. 생각과 온기는 끝없고 마무리는 얇습니다. 함께 끝낼 일 하나를 정하세요. 완성이 이곳의 사랑 표현입니다.',
    ja: '二倍の火花です。考えと温かさは尽きず仕上げは薄めです。共に終える仕事を一つ決めましょう。完成がここの愛情表現です。',
  },
};

const faqScoreQ = {
  en: (a: string, b: string, s: number) => `Why is ${a} × ${b} ${s}?`,
  ko: (a: string, b: string, s: number) => `${a}와 ${b}는 왜 ${s}점인가요?`,
  ja: (a: string, b: string, s: number) => `${a}と${b}はなぜ${s}点ですか?`,
};
const faqFightQ = {
  en: 'What will our first big fight be about?',
  ko: '첫 큰 싸움은 무엇 때문일까요?',
  ja: '最初の大きな喧嘩は何が原因ですか?',
};

const fnv = (s: string): number => {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
};

/** Letter flavors: one clause per preference, composed into every axis block
 *  so pattern-twin pairs (same same/diff shape, different letters) can never
 *  render identical bodies. Keep ko free of 4+ letter Latin (type codes OK). */
const FLAVOR: Record<string, Record<string, { en: string; ko: string; ja: string }>> = {
  EI: {
    E: { en: 'outward spark that thinks aloud', ko: '밖으로 말하며 생각하는 불꽃', ja: '外に声を出して考える火花' },
    I: { en: 'inward depth that thinks before speaking', ko: '말하기 전에 생각하는 깊이', ja: '話す前に考える深さ' },
  },
  SN: {
    S: { en: 'concrete detail you can touch', ko: '손에 잡히는 구체적 디테일', ja: '手で触れる具体の細部' },
    N: { en: 'emerging pattern behind the facts', ko: '사실 뒤에 떠오르는 흐름', ja: '事実の裏に浮かぶ流れ' },
  },
  TF: {
    T: { en: 'impersonal logic that wants the right answer', ko: '정답을 원하는 객관 논리', ja: '正解を求める客観論理' },
    F: { en: 'personal values that protect the bond', ko: '관계를 지키는 주관 가치', ja: '関係を守る主観価値' },
  },
  JP: {
    J: { en: 'decided closure that lands the plan', ko: '계획을 착지시키는 확정', ja: '予定を着地させる確定' },
    P: { en: 'open exploration that keeps options alive', ko: '선택지를 살리는 열린 탐색', ja: '選択肢を生かす開いた探索' },
  },
};

const flavorLine = (axis: 'EI' | 'SN' | 'TF' | 'JP', aLetter: string, bLetter: string, L: 'en' | 'ko' | 'ja'): string => {
  const fa = FLAVOR[axis][aLetter][L];
  const fb = FLAVOR[axis][bLetter][L];
  if (aLetter === bLetter) {
    if (L === 'ko') return `둘 다 ${fa}을 가져옵니다. ${aLetter}끼리라서 같은 장점이 두 배가 됩니다.`;
    if (L === 'ja') return `二人とも${fa}を持ち寄ります。${aLetter}同士なので同じ長所が二倍になります。`;
    return `Both bring ${fa} — double ${aLetter} means the same gift at double strength.`;
  }
  if (L === 'ko') return `${aLetter}의 ${fa}와 ${bLetter}의 ${fb}가 만납니다. 다른 재료라서 합치면 하나씩일 때보다 넓어집니다.`;
  if (L === 'ja') return `${aLetter}の${fa}と${bLetter}の${fb}が出会います。違う材料なので合わせると一つずつのときより広がります。`;
  return `${aLetter}’s ${fa} meets ${bLetter}’s ${fb} — different ingredients that cover more together than alone.`;
};

const breakdownOf = (a: string, b: string, lang: string, score: number): string => {
  let shared = 0;
  const sharedDims: string[] = [];
  const diffDims: string[] = [];
  const names = ['EI', 'SN', 'TF', 'JP'];
  for (let i = 0; i < 4; i++) {
    if (a[i] === b[i]) { shared++; sharedDims.push(names[i]); }
    else diffDims.push(`${a[i]}${b[i]}`);
  }
  const parts: string[] = [`52+${shared}×9=${52 + shared * 9}`];
  if (a[1] === b[1]) parts.push('+4');
  if (a[2] === b[2]) parts.push('+3');
  if (shared === 0) parts.push('−4');
  if (a[1] === 'N' && b[1] === 'N' && a[2] !== b[2] && shared <= 2) parts.push('+10');
  const formula = parts.join(' ');
  if (lang === 'ko') return `${a}×${b} ${score}점은 기본 52점에서 출발합니다. 같은 지표 ${shared}개(${sharedDims.join(', ') || '없음'})가 틀을 올리고, 다른 지표(${diffDims.join(', ') || '없음'})가 과제를 더합니다. 식: ${formula} → ${score}점. 점수는 출발선이지 등급이 아닙니다.`;
  if (lang === 'ja') return `${a}×${b}の${score}点は52点から出発します。同じ指標${shared}個（${sharedDims.join(', ') || 'なし'}）が土台を上げ、違う指標（${diffDims.join(', ') || 'なし'}）が課題を足します。式：${formula} → ${score}点。点数は出発線であり等級ではありません。`;
  return `${a} × ${b} starts at a base of 52. ${shared} shared (${sharedDims.join(', ') || 'none'}) raise the floor; differences (${diffDims.join(', ') || 'none'}) add the assignments. Math: ${formula} → ${score}. The number is a start line, not a grade.`;
};

const narrativeOf = (a: string, b: string, lang: string, score: number, tier: string): string => {
  const L = (['en', 'ko', 'ja'].includes(lang) ? lang : 'en') as 'en' | 'ko' | 'ja';
  const key = [a, b].sort().join('-');
  const hit = NARRATIVE[key];
  if (hit) return hit[L];
  if (a === b) {
    if (L === 'ko') return `${a}끼리의 만남입니다. 서로를 가장 빨리 이해하지만 약점도 겹칩니다. ${score}점은 출발선입니다. 역할 나누기가 이 조합의 전부입니다.`;
    if (L === 'ja') return `${a}同士の出会いです。最も早く分かり合えますが弱点も重なります。${score}点は出発線です。役割分担がこの組み合わせの全てです。`;
    return `Two ${a}s meet: the fastest understanding — and overlapping blind spots. ${score} is a start line. Dividing roles is everything here.`;
  }
  const shared = [0, 1, 2, 3].filter((i) => a[i] === b[i]).length;
  const domA = (FUNCTION_STACK[a] || [])[0] || '';
  const domB = (FUNCTION_STACK[b] || [])[0] || '';
  const domLine = L === 'ko'
    ? ` ${a}는 ${domA} 주도로 밀고 나가고, ${b}는 ${domB} 주도로 받아칩니다. 주도 기능이 달라서 같은 말을 해도 출발점이 다릅니다.`
    : L === 'ja'
      ? ` ${a}は${domA}主導で押し進め、${b}は${domB}主導で受けます。主導機能が違うため同じ言葉でも出発点が違います。`
      : ` ${a} leads with ${domA} while ${b} leads with ${domB} — same words, different starting points.`;
  if (shared === 0) {
    if (L === 'ko') return `${a}와 ${b}는 글자가 모두 다릅니다. 끌림은 강하고 마찰도 정직합니다. ${score}점(${tier})은 서로를 넓히는 값입니다. 번역 규칙만 정하면 가장 크게 성장하는 조합입니다.${domLine}`;
    if (L === 'ja') return `${a}と${b}は文字が全て違います。惹かれ合いは強く摩擦も正直です。${score}点（${tier}）は互いを広げる値です。訳の決まりさえ決めれば最も伸びる組み合わせです。${domLine}`;
    return `${a} and ${b} share no letters: strong pull, honest friction. ${score} (${tier}) measures how much you widen each other. With translation rules, this is the highest-growth pairing.${domLine}`;
  }
  if (L === 'ko') return `${a}와 ${b}의 조합입니다. 같은 지표 ${shared}개가 닮은 일상 리듬을 만들고, 다른 지표가 서로의 폭을 넓힙니다. ${score}점은 그 배치의 요약입니다.${domLine}`;
  if (L === 'ja') return `${a}と${b}の組み合わせです。同じ指標${shared}個が似た日常リズムを作り、違う指標が互いの幅を広げます。${score}点はその配置の要約です。${domLine}`;
  return `The ${a} × ${b} pairing: ${shared} shared letters set a familiar daily rhythm, and the rest widen each other. ${score} summarizes that layout.${domLine}`;
};

const FAQ_BASE: Record<string, { destiny: { q: string; a: string }; sn: { q: string; aSame: string; aDiff: string }; better: { q: string; a: string } }> = {
  en: {
    destiny: { q: 'Is our score destiny?', a: 'No. Scores summarize tendencies across many couples, not your future. Skilled low-score pairs consistently beat unskilled high-score pairs — practice outweighs the number.' },
    sn: { q: 'What should we watch most?', aSame: 'You share the S/N lens, so guard the shared blind spot: schedule what you both neglect (dreams for S–S, details for N–N).', aDiff: 'Your S/N gap is the axis to invest in: confirm meaning before reacting, and explicitly want both the facts and what they meant.' },
    better: { q: 'How do we actually improve?', a: 'Hold a 20-minute weekly check-in with three prompts: one appreciation, one friction named kindly, one plan for next week. Small, scheduled honesty beats rare big talks.' },
  },
  ko: {
    destiny: { q: '점수가 운명인가요?', a: '아닙니다. 점수는 많은 커플의 경향 요약이지 둘의 미래가 아닙니다. 소통 기술을 갖춘 저점 커플이 방심한 고점 커플을 이깁니다. 연습이 숫자를 이깁니다.' },
    sn: { q: '가장 조심할 것은?', aSame: '느낌과 직관의 렌즈를 공유하므로 공통 사각을 지키세요. 둘 다 소홀한 것(감각끼리는 꿈, 직관끼리는 디테일)을 일정에 넣으세요.', aDiff: '감각과 직관의 간극에 투자하세요. 반응 전에 의미를 확인하고, 사실과 그 의미 둘 다 원하세요.' },
    better: { q: '실제로 어떻게 좋아지나요?', a: '주 20분 대화로 지내세요. 칭찬 하나, 다정하게 말하는 마찰 하나, 다음 주 계획 하나. 드문 대담보다 작고 정기적인 솔직함이 이깁니다.' },
  },
  ja: {
    destiny: { q: 'スコアは運命ですか?', a: 'いいえ。スコアは多くの組の傾向要約であり二人の未来ではありません。技術ある低スコア組は油断した高スコア組に勝ちます。練習が数字に勝ります。' },
    sn: { q: '最も注意すべき点は?', aSame: '感覚と直観のレンズを共有するため共通の盲点を守りましょう。二人が疎かにするもの（感覚同士は夢、直観同士は細部）を予定に入れてください。', aDiff: '感覚と直観の差に投資しましょう。反応前に意味を確認し、事実と意味の両方を求めてください。' },
    better: { q: '実際にどう改善しますか?', a: '週20分の対話で過ごしましょう。称賛一つ、優しく言う摩擦一つ、来週の計画一つ。稀な大話より小さく定期的な正直さが勝ちます。' },
  },
};

export const getMatchContent = (aRaw: string, bRaw: string, langRaw: string, scoreHint?: number, tierHint?: string): MatchContent => {
  const L = (['en', 'ko', 'ja'].includes(langRaw) ? langRaw : 'en') as 'en' | 'ko' | 'ja';
  const a = (aRaw || '').toUpperCase();
  const b = (bRaw || '').toUpperCase();
  // Per-axis variant: FNV(pair + axis + lang) % variants — 4^4=256 combos
  // (previously a single global hash%2 picked the same slot on all 4 axes).
  const axes: AxisAnalysis[] = (['EI', 'SN', 'TF', 'JP'] as const).map((axis, i) => {
    const aLetter = a[i];
    const bLetter = b[i];
    const same = aLetter === bLetter;
    const cell = AXIS[L][axis][same ? 'same' : 'diff'];
    const v = fnv(`${a}${b}:${axis}:${L}`) % cell.length;
    const t = cell[v];
    return { axis, aLetter, bLetter, same, title: t.title, body: `${t.body} ${flavorLine(axis, aLetter, bLetter, L)}`, tip: t.tip };
  });
  const key = (same: boolean): 's' | 'd' => (same ? 's' : 'd');
  const strengths = (['EI', 'SN', 'TF', 'JP'] as const).map((axis, i) => STRENGTH[L][axis][key(a[i] === b[i])]);
  const diffs = (['EI', 'SN', 'TF', 'JP'] as const).filter((_, i) => a[i] !== b[i]);
  const sames = (['EI', 'SN', 'TF', 'JP'] as const).filter((_, i) => a[i] === b[i]);
  const watchouts = [
    ...diffs.map((axis) => WATCH[L][axis].d),
    ...sames.map((axis) => WATCH[L][axis].s),
  ].slice(0, Math.max(3, diffs.length));
  const datingTips = (['EI', 'SN', 'TF', 'JP'] as const).map((axis, i) => DATING[L][axis][key(a[i] === b[i])]);
  // Verdict variant also per-pair (was global %2).
  const verdicts = VERDICT[L];
  const verdict = verdicts[fnv(`${a}${b}:verdict:${L}`) % verdicts.length];
  const score = scoreHint ?? 0;
  const tier = tierHint ?? '';
  const narrative = narrativeOf(a, b, L, score, tier);
  const scoreBreakdown = breakdownOf(a, b, L, score);
  const verdictLong = `${narrative} ${verdict}`;
  const faqT = FAQ_BASE[L];
  const snSame = a[1] === b[1];
  // First-fight axis: first differing axis in TF > SN > JP > EI priority.
  const prio: Array<'TF' | 'SN' | 'JP' | 'EI'> = ['TF', 'SN', 'JP', 'EI'];
  const fightAxis = prio.find((ax) => {
    const idx = { EI: 0, SN: 1, TF: 2, JP: 3 }[ax];
    return a[idx] !== b[idx];
  });
  const fightMap = {
    en: { TF: 'Decisions: the Thinker pushes the “right” answer while the Feeler protects the bond. Name comfort-vs-solution first.', SN: 'Daily meaning: one wants the plan, the other wants the possibility. Two passes — facts first, meanings second.', JP: 'Plans: itinerary versus adventure. Fix the firm two (time, budget) and free the rest.', EI: 'Energy: outings versus quiet. Calendar the three blocks — together-out, together-in, apart.', NONE: 'Samenerness: name roles early so shared strengths do not become shared blind spots.' },
    ko: { TF: '결정 문제입니다. 사고형은 정답을 밀고 감정형은 관계를 지킵니다. 위로와 해결 중 무엇을 먼저 원하는지부터 말하세요.', SN: '일상의 의미 문제입니다. 한쪽은 계획을, 한쪽은 가능성을 원합니다. 사실 먼저, 의미 다음의 두 갈래로 가세요.', JP: '계획 문제입니다. 일정과 모험의 만남입니다. 굳힐 두 개를 정하고 나머지는 여세요.', EI: '기운 문제입니다. 외출과 고요의 다툼입니다. 함께밖, 함께집, 따로를 달력에 넣으세요.', NONE: '닮음 문제입니다. 역할을 일찍 나누어 강점이 겹친 사각이 되지 않게 하세요.' },
    ja: { TF: '決定の問題です。思考型は正解を押し感情型は関係を守ります。慰めと解決のどちらを先に求めるか言いましょう。', SN: '日常の意味の問題です。片方は予定を片方は可能性を求めます。事実を先に意味を後に二走で進みましょう。', JP: '予定の問題です。日程と冒険の出会いです。固める二つを決め残りは開けましょう。', EI: '元気の問題です。外出と静けさの争いです。一緒外と一緒家と別々を予定に入れましょう。', NONE: '似ていることの問題です。役割を早めに分けて強みが重なった盲点にならないようにしましょう。' },
  } as Record<string, Record<string, string>>;
  const fightA = fightMap[L][fightAxis ?? 'NONE'];
  const faqs = [
    { q: faqT.destiny.q, a: faqT.destiny.a },
    { q: faqT.sn.q, a: snSame ? faqT.sn.aSame : faqT.sn.aDiff },
    { q: faqScoreQ[L](a, b, score), a: scoreBreakdown },
    { q: faqFightQ[L], a: fightA },
    { q: faqT.better.q, a: faqT.better.a },
  ];
  return { axes, strengths, watchouts, datingTips, verdictLong, faqs, narrative, scoreBreakdown };
};
