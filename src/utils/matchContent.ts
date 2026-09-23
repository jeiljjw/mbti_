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
}

type V = { title: string; body: string; tip: string };
type AxisTable = Record<string, Record<string, Record<'same' | 'diff', [V, V]>>>;

const AXIS: AxisTable = {
  en: {
    EI: {
      same: [
        { title: 'Energy style', body: 'Both partners recharge the same way, so social plans rarely cause fights. Two extroverts generate momentum and fill the calendar; two introverts share comfortable silence and depth.', tip: 'Name your shared pattern out loud — then protect the exception (one quiet night for E–E, one bold outing for I–I) as a ritual.' },
        { title: 'Same battery', body: 'Matching energy means fewer negotiations about going out versus staying in. The shadow side is amplification: E–E pairs can burn out together, I–I pairs can stall in a cozy rut.', tip: 'Alternate who initiates plans so the same person is not always the engine.' },
      ],
      diff: [
        { title: 'The classic energy exchange', body: 'The extrovert brings the introvert into the world; the introvert gives the extrovert depth and calm. Conflict centers on dosage — how much social life is enough, and how much solitude is respectful.', tip: 'Negotiate a number: weekly social nights and sacred solo nights, both non-negotiable.' },
        { title: 'Opposite batteries', body: 'One charges with people, the other alone — neither is wrong. Most E–I fights are really about feeling rejected on one side and crowded on the other.', tip: 'Name the need, not the blame: “I need recharge” instead of “you never/always”.' },
      ],
    },
    SN: {
      same: [
        { title: 'Shared reality', body: 'You notice and value the same things, so everyday conversation flows. Two sensing types build a life that works; two intuitive types live in possibility and rarely get bored.', tip: 'Feed the missing side on purpose: future questions for S–S, concrete next steps for N–N.' },
        { title: 'Same lens', body: 'Seeing the world through the same lens feels like telepathy. The shared blind spot is identical — S–S can starve big-picture dreams, N–N can drop practical details.', tip: 'Assign the neglected territory explicitly: who owns dreams, who owns details.' },
      ],
      diff: [
        { title: 'The famous communication gap', body: 'Sensing focuses on what is; intuition on what could be. “Just tell me the plan” meets “but imagine the possibilities” — this axis causes the most everyday misunderstandings of all four.', tip: 'Translate before reacting: repeat back what you heard in your own words first.' },
        { title: 'Facts meet meanings', body: 'One partner remembers exactly what happened; the other remembers what it meant. Both memories are real, and thriving S–N couples learn to want both versions.', tip: 'Ask for both: “what happened, and what did it mean to you?”' },
      ],
    },
    TF: {
      same: [
        { title: 'Same decision language', body: 'You reason on the same terms, so debates stay clean. Two thinkers prize fairness and logic; two feelers prize care and harmony.', tip: 'Import the missing channel deliberately: a feelings round for T–T, a logic check for F–F.' },
        { title: 'No translation needed', body: 'Decisions feel natural because the criteria match. Watch the shared shadow: T–T can shelve emotions until they erupt, F–F can delay hard truths to protect warmth.', tip: 'Schedule the uncomfortable conversation monthly — same day, same kindness.' },
      ],
      diff: [
        { title: 'The conflict epicenter', body: 'The thinker wants the right answer; the feeler wants the relationship intact. “You are right but I feel hurt” contains the whole dynamic — both statements are true at once.', tip: 'Validate first for 30 seconds, solve second. Order matters more than content.' },
        { title: 'Head meets heart', body: 'Thinking brings clarity, feeling brings humanity — together you are wiser than either alone. The rule that saves T–F couples: criticize the problem, never the person.', tip: 'In fights, ask: “do you want comfort or solutions right now?”' },
      ],
    },
    JP: {
      same: [
        { title: 'Same pace of life', body: 'Planning friction stays naturally low. Two judgers run life like clockwork; two perceivers keep it fresh and breathing.', tip: 'Guard against your shared extreme: unscheduled joy for J–J, kill dates for open loops for P–P.' },
        { title: 'Matched tempo', body: 'You move through weeks the same way, which removes a whole category of fights. Growth means borrowing a little of the opposite tempo on purpose.', tip: 'J–J: say yes to one unplanned thing weekly. P–P: lock 2–3 non-negotiable rituals.' },
      ],
      diff: [
        { title: 'Structure meets spontaneity', body: 'The judger wants the itinerary; the perceiver wants the adventure. Travel planning is the classic flashpoint — minute-by-minute versus “let us see how we feel”.', tip: 'Split the trip: one plans the skeleton (hotel, transport), the other owns the free hours.' },
        { title: 'The deadline dance', body: 'Judging feels safe with closure; perceiving feels alive with openness. Big choices need decide-by dates; small ones can stay gloriously open.', tip: 'Put only big decisions on the calendar — leave the small ones free.' },
      ],
    },
  },
  ko: {
    EI: {
      same: [
        { title: '에너지 스타일', body: '충전 방식이 같아 사교 계획으로 싸울 일이 적습니다. 외향끼리는 추진력이 생기고, 내향끼리는 편안한 침묵과 깊이를 공유합니다.', tip: '공통 패턴을 말로 확인하고, 예외(외향은 조용한 밤, 내향은 과감한 외출)를 의식으로 지키세요.' },
        { title: '같은 배터리', body: '외출 vs 집콕 협상이 거의 필요 없습니다. 그림자는 증폭입니다. 외향끼리는 함께 번아웃되고, 내향끼리는 아늑한 정체에 빠질 수 있습니다.', tip: '계획 제안자를 번갈아 맡아 한 사람이 항상 엔진이 되지 않게 하세요.' },
      ],
      diff: [
        { title: '클래식한 에너지 교환', body: '외향형은 내향형을 세상으로 데리고 나가고, 내향형은 외향형에게 깊이와 고요를 줍니다. 갈등은 용량 문제입니다. 사교는 얼마나, 혼자 시간은 얼마나 존중할 것인가.', tip: '숫자로 정하세요. 주 몇 회 사교, 몇 회는 신성한 혼자 시간.' },
        { title: '반대 배터리', body: '한쪽은 사람으로, 한쪽은 혼자 충전됩니다. 둘 다 정상입니다. E–I 싸움의 실체는 서운함(외향)과 답답함(내향)입니다.', tip: '비난이 아니라 욕구를 말하세요. “넌 항상” 대신 “충전이 필요해”.' },
      ],
    },
    SN: {
      same: [
        { title: '공유된 현실', body: '같은 것을 보고 가치 있게 여겨 일상이 잘 흐릅니다. 감각끼리는 돌아가는 삶을 만들고, 직관끼리는 가능성에 살며 지루할 틈이 없습니다.', tip: '없는 쪽을 의식적으로 먹이세요. 감각끼리는 미래 질문을, 직관끼리는 구체적 다음 행동을.' },
        { title: '같은 렌즈', body: '같은 렌즈로 세상을 봐 텔레파시 같습니다. 그림자도 같습니다. 감각끼리는 큰 그림이, 직관끼리는 실무 디테일이 굶주립니다.', tip: '소홀한 영역의 주인을 정하세요. 꿈 담당, 디테일 담당.' },
      ],
      diff: [
        { title: '유명한 소통 간극', body: '감각형은 있는 그대로를, 직관형은 가능성을 봅니다. “계획만 말해”와 “가능성을 상상해봐”의 충돌 — 4지표 중 일상 오해 1위입니다.', tip: '반응 전에 번역하세요. 들은 말을 내 말로 되돌려 말하기부터.' },
        { title: '사실과 의미의 만남', body: '한쪽은 있었던 일을, 한쪽은 그 의미를 기억합니다. 둘 다 진짜 기억입니다. 잘 맞는 S–N 커플은 두 버전을 다 원합니다.', tip: '둘 다 물어보세요. “무슨 일이 있었고, 너에겐 어떤 의미였어?”' },
      ],
    },
    TF: {
      same: [
        { title: '같은 결정 언어', body: '기준이 같아 논쟁이 깨끗합니다. 사고끼리는 공정과 논리를, 감정끼리는 돌봄과 화합을 중시합니다.', tip: '없는 채널을 들여오세요. 사고끼리는 감정 라운드, 감정끼리는 논리 체크.' },
        { title: '번역 불필요', body: '기준이 같아 결정이 자연스럽습니다. 그림자를 보세요. 사고끼리는 감정을 쌓아두고 폭발하고, 감정끼리는 온기를 지키려 쓴소리를 미룹니다.', tip: '불편한 대화는 매월 정기편성. 같은 날, 같은 친절로.' },
      ],
      diff: [
        { title: '갈등의 진앙', body: '사고형은 정답을, 감정형은 관계 유지를 원합니다. “네 말이 맞지만 기분이 상했어”에 전부 담겨 있습니다. 둘 다 동시에 진짜입니다.', tip: '30초 공감 먼저, 해결은 다음. 순서가 내용보다 중요합니다.' },
        { title: '머리와 가슴의 만남', body: '사고는 명료함을, 감정은 인간미를 줍니다. 함께가 각자보다 현명합니다. T–F를 살리는 규칙: 문제를 비판하고 사람을 비판하지 않기.', tip: '싸울 땐 물어보세요. “위로가 필요해, 해결책이 필요해?”' },
      ],
    },
    JP: {
      same: [
        { title: '같은 삶의 속도', body: '계획 마찰이 원래 적습니다. 판단끼리는 시계처럼 돌아가고, 인식끼리는 신선하게 호흡합니다.', tip: '공통 극단을 경계하세요. 판단끼리는 예정 없는 기쁨을, 인식끼리는 열린 숙제의 마감일을.' },
        { title: '맞춰진 템포', body: '주간 리듬이 같아 한 범주의 싸움이 사라집니다. 성장은 반대 템포를 조금 빌려오는 것입니다.', tip: '판단끼리: 주 1회 무계획 OK. 인식끼리: 2~3개 철칙 의식 고정.' },
      ],
      diff: [
        { title: '구조와 자발성의 만남', body: '판단형은 일정을, 인식형은 모험을 원합니다. 여행 계획이 단골 충돌 지점입니다. 분 단위 vs “가서 정하자”.', tip: '여행을 나누세요. 뼈대(숙소·이동)는 판단형, 자유 시간은 인식형.' },
        { title: '마감의 춤', body: '판단형은 확정에 안심하고, 인식형은 열림에 생기를 느낍니다. 큰 결정만 마감일을 정하고 작은 것은 열어두세요.', tip: '달력에는 큰 결정만. 작은 것은 자유롭게.' },
      ],
    },
  },
  ja: {
    EI: {
      same: [
        { title: 'エネルギースタイル', body: '充電方法が同じで社交の揉め事が少ない組み合わせです。外向同士は推進力が生まれ、内向同士は心地よい沈黙と深さを共有します。', tip: '共通パターンを言葉にして、例外（外向は静かな夜、内向は大胆な外出）を儀式として守りましょう。' },
        { title: '同じバッテリー', body: '外出か自宅かの交渉がほぼ不要です。影は増幅です。外向同士は共に燃え尽き、内向同士は心地よい停滞にはまる恐れがあります。', tip: '計画の提案者を交代し、一人が常にエンジンにならないように。' },
      ],
      diff: [
        { title: '定番のエネルギー交換', body: '外向型は内向型を世界へ連れ出し、内向型は外向型に深さと静けさを与えます。争点は用量です。社交はどれだけ、一人時間はどれだけ尊重するか。', tip: '数字で決めましょう。週の社交回数と聖なる一人時間を両方死守。' },
        { title: '逆のバッテリー', body: '片方は人で、片方は一人で充電します。どちらも正常です。E–Iの喧嘩の実態は寂しさ（外向）と窮屈さ（内向）です。', tip: '非難でなく欲求を言葉に。「充電が必要」と伝える。' },
      ],
    },
    SN: {
      same: [
        { title: '共有された現実', body: '同じものを見て価値づけるため日常が流れます。感覚同士は回る生活を作り、直観同士は可能性に生きて飽きません。', tip: 'ない側に意識的に栄養を。感覚同士は未来の問いを、直観同士は具体的な次の一手を。' },
        { title: '同じレンズ', body: '同じレンズで世界を見るためテレパシーのようです。影も同じです。感覚同士は大きな絵が、直観同士は実務の細部が飢えます。', tip: '手薄な領域の担当を決める。夢担当、細部担当。' },
      ],
      diff: [
        { title: '有名なすれ違い', body: '感覚型はあるがままを、直観型は可能性を見ます。「予定だけ教えて」と「可能性を想像して」の衝突——4指標で日常の誤解No.1です。', tip: '反応の前に翻訳を。聞いたことを自分の言葉で返してから。' },
        { title: '事実と意味の出会い', body: '片方は出来事を、片方は意味を覚えています。どちらも本物の記憶です。うまくいくS–Nカップルは両方を求めます。', tip: '両方聞きましょう。「何があって、どんな意味だった？」' },
      ],
    },
    TF: {
      same: [
        { title: '同じ判断言語', body: '基準が同じで議論がきれいです。思考同士は公正と論理を、感情同士は思いやりと調和を重んじます。', tip: 'ない回路を持ち込む。思考同士は感情ラウンド、感情同士は論理チェック。' },
        { title: '翻訳不要', body: '基準が同じで決定が自然です。影を見ましょう。思考同士は感情を溜めて爆発し、感情同士は温かさを守って苦言を延ばします。', tip: '不快な対話は毎月定期開催。同じ日に、同じ優しさで。' },
      ],
      diff: [
        { title: '衝突の震源', body: '思考型は正解を、感情型は関係の維持を求めます。「正しいけど傷ついた」に全部詰まっています。どちらも同時に本当です。', tip: '30秒の共感が先、解決は後。順番が内容より重要です。' },
        { title: '頭と心の出会い', body: '思考は明晰さを、感情は人間味をくれます。一緒の方が賢い関係です。T–Fを救うルール：問題を批判し、人を批判しない。', tip: '喧嘩中は聞きましょう。「慰めがいい？解決策がいい？」' },
      ],
    },
    JP: {
      same: [
        { title: '同じ生活速度', body: '計画の摩擦がもともと少なめです。判断同士は時計のように回り、知覚同士は新鮮に呼吸します。', tip: '共通の極端を警戒して。判断同士は予定のない喜びを、知覚同士は開いた宿題の締切を。' },
        { title: '合ったテンポ', body: '週のリズムが同じで一分野の喧嘩が消えます。成長は逆のテンポを少し借りることです。', tip: '判断同士：週1の無計画OK。知覚同士：2〜3の鉄則を固定。' },
      ],
      diff: [
        { title: '構造と自発性の出会い', body: '判断型は日程を、知覚型は冒険を求めます。旅行計画が定番の衝突地点です。分刻み対「行ってから決めよう」。', tip: '旅行を分担。骨格（宿・移動）は判断型、自由時間は知覚型。' },
        { title: '締切のダンス', body: '判断型は確定に安心し、知覚型は開放に生きがいを感じます。大きな決定だけ期限を決め、小さなものは開けておきましょう。', tip: 'カレンダーには大きな決定だけ。小さなものは自由に。' },
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
    JP: { s: '맞춰진 경직·표류 — 판단끼리는 계획 고착, 인식끼리는 마감 유실.', d: '계획 마찰 — 뼈대 대 자발성.' },
  },
  ja: {
    EI: { s: '共通の極端 — 外向同士は共燃え、内向同士は停滞に注意。', d: '充電方法の違い — 一人時間が拒絶に読まれる恐れ。' },
    SN: { s: '共通の盲点 — 感覚同士は夢が、直観同士は細部が飢えます。', d: '翻訳コスト — 同じ言葉が違って届きます。' },
    TF: { s: '共通の影 — 思考同士は感情滞留、感情同士は苦言先延ばし。', d: '喧嘩言語の違い — 論理は冷たく、感情は霧のように。' },
    JP: { s: '合った硬直・漂流 — 判断同士は計画固着、知覚同士は締切喪失。', d: '計画の摩擦 — 骨格対自発性。' },
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
    SN: { s: '의식이 묶어줍니다. 레시피대로 요리(감각끼리), 별 보며 미래 토크(직관끼리).', d: '역할 분담: 저녁은 한쪽, 서프라이즈는 다른 쪽.' },
    TF: { s: '공통 채널로 놀기: 상품 건 토론 밤(사고끼리), 손편지(감정끼리).', d: '사고형은 “어떻게 할까?” 전에 “기분이 어때?”부터.' },
    JP: { s: '템포 존중: 기념일은 일찍 계획(판단끼리), 한 주말은 무계획(인식끼리).', d: '예약은 한쪽, 우연은 다른 쪽.' },
  },
  ja: {
    EI: { s: '共通スタイルに全振り：外向同士は団体冒険、内向同士は常連カフェ巡り。', d: '形式を交代：社交デートと自宅デートを同点扱いで。' },
    SN: { s: '儀式が絆に。レシピ通り料理（感覚同士）、星空未来トーク（直観同士）。', d: '役割分担：夕食は片方、サプライズはもう片方。' },
    TF: { s: '共通回路で遊ぶ：賞品付き討論ナイト（思考同士）、手紙（感情同士）。', d: '思考型は「どうする？」の前に「どんな気持ち？」から。' },
    JP: { s: 'テンポ尊重：記念日は早め計画（判断同士）、1週末は無計画（知覚同士）。', d: '予約は片方、偶然はもう片方。' },
  },
};

const VERDICT: Record<string, [string, string]> = {
  en: [
    'Overall this pairing works because similarity and difference are distributed where they help most. Shared axes give you effortless understanding; differing axes give you range neither partner has alone. The score above is a starting temperature, not a ceiling — couples who practice the tips on this page consistently outperform their number.',
    'Read the number as context, not verdict. Every shared letter removes one category of fights; every differing letter adds one growth assignment. Pairs like this one do best with explicit rituals — a weekly check-in, a named way of fighting fair, and a shared project that uses both partners’ strengths.',
  ],
  ko: [
    '이 조합이 통하는 이유는 닮은 점과 다른 점이 가장 도움이 되는 자리에 배치되어 있기 때문입니다. 같은 지표는 힘을 들이지 않아도 되는 이해를, 다른 지표는 혼자서는 갖기 힘든 폭을 줍니다. 위 점수는 출발 온도이지 천장이 아닙니다. 이 페이지의 팁을 실천하는 커플은 점수를 뛰어넘습니다.',
    '점수는 맥락이지 판결이 아닙니다. 같은 글자는 싸움 한 범주를 지우고, 다른 글자는 성장 과제 하나를 더합니다. 이런 조합은 명시적 의식으로 가장 좋아집니다. 주간 체크인, 공정한 싸움 규칙, 둘의 강점을 쓰는 공동 프로젝트.',
  ],
  ja: [
    'この組み合わせが機能する理由は、似ている点と違う点が最も助かる位置にあるからです。同じ指標は effortless な理解を、違う指標は一人では持てない幅をくれます。上のスコアは出発温度であり天井ではありません。このページのヒントを実践するカップルは数字を超えます。',
    'スコアは文脈であり判決ではありません。同じ文字は喧嘩の一分野を消し、違う文字は成長課題を一つ足します。こうした組み合わせは明示的な儀式で最も伸びます。週次チェックイン、フェアな喧嘩ルール、二人の強みを使う共同プロジェクト。',
  ],
};

const FAQ_T: Record<string, { sn: { q: string; aSame: string; aDiff: string }; destiny: { q: string; a: string }; better: { q: string; a: string } }> = {
  en: {
    destiny: { q: 'Is our score destiny?', a: 'No. Scores summarize tendencies across many couples, not your future. Skilled low-score pairs consistently beat unskilled high-score pairs — practice outweighs the number.' },
    sn: { q: 'What should we watch most?', aSame: 'You share the S/N lens, so guard the shared blind spot: schedule what you both neglect (dreams for S–S, details for N–N).', aDiff: 'Your S/N gap is the axis to invest in: confirm meaning before reacting, and explicitly want both the facts and what they meant.' },
    better: { q: 'How do we actually improve?', a: 'Hold a 20-minute weekly check-in with three prompts: one appreciation, one friction named kindly, one plan for next week. Small, scheduled honesty beats rare big talks.' },
  },
  ko: {
    destiny: { q: '점수가 운명인가요?', a: '아닙니다. 점수는 많은 커플의 경향 요약이지 둘의 미래가 아닙니다. 소통 기술을 갖춘 저점 커플이 방심한 고점 커플을 이깁니다. 연습이 숫자를 이깁니다.' },
    sn: { q: '가장 조심할 것은?', aSame: 'S/N 렌즈를 공유하므로 공통 사각을 지키세요. 둘 다 소홀한 것(감각끼리는 꿈, 직관끼리는 디테일)을 일정에 넣으세요.', aDiff: 'S/N 간극에 투자하세요. 반응 전에 의미를 확인하고, 사실과 그 의미 둘 다 원하세요.' },
    better: { q: '실제로 어떻게 좋아지나요?', a: '주 20분 체크인: 칭찬 하나, 친절하게 말하는 마찰 하나, 다음 주 계획 하나. 드문 대담보다 작고 정기적인 솔직함이 이깁니다.' },
  },
  ja: {
    destiny: { q: 'スコアは運命ですか？', a: 'いいえ。スコアは多くのカップルの傾向要約であり二人の未来ではありません。技術ある低スコア組は油断した高スコア組に勝ちます。練習が数字に勝ります。' },
    sn: { q: '最も注意すべき点は？', aSame: 'S/Nレンズを共有するため共通の盲点を守りましょう。二人が疎かにするもの（感覚同士は夢、直観同士は細部）を予定に入れてください。', aDiff: 'S/Nギャップに投資しましょう。反応前に意味を確認し、事実と意味の両方を求めてください。' },
    better: { q: '実際にどう改善しますか？', a: '週20分のチェックイン：称賛一つ、優しく言う摩擦一つ、来週の計画一つ。稀な大話より小さく定期的な正直さが勝ちます。' },
  },
};

const hash = (a: string, b: string): number => {
  let n = 0;
  for (const c of (a + b)) n += c.charCodeAt(0);
  return n % 2;
};

export const getMatchContent = (a: string, b: string, lang: string): MatchContent => {
  const L = ['en', 'ko', 'ja'].includes(lang) ? lang : 'en';
  const v = hash(a, b);
  const axes: AxisAnalysis[] = (['EI', 'SN', 'TF', 'JP'] as const).map((axis, i) => {
    const aLetter = a[i];
    const bLetter = b[i];
    const same = aLetter === bLetter;
    const t = AXIS[L][axis][same ? 'same' : 'diff'][v];
    return { axis, aLetter, bLetter, same, title: t.title, body: t.body, tip: t.tip };
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
  const faqT = FAQ_T[L];
  const snSame = a[1] === b[1];
  const faqs = [
    { q: faqT.destiny.q, a: faqT.destiny.a },
    { q: faqT.sn.q, a: snSame ? faqT.sn.aSame : faqT.sn.aDiff },
    { q: faqT.better.q, a: faqT.better.a },
  ];
  return { axes, strengths, watchouts, datingTips, verdictLong: VERDICT[L][v], faqs };
};
