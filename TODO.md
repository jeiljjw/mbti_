# SimpleMBTI 전면개편 TODO

목표: AdSense 월 $4,000~8,000 (JP 50~80만 PV). 순서 KR 검증 → JP 본전 → US 확장.

## Phase 0 — 기반 (완료)
- [x] `/:lang` (ko/en/ja) 라우팅 + 기존 URL 301 + 루트 자동감지
- [x] i18n ja 뼈대 + 저장/감지, lang 링크 훅
- [x] SEO hreflang + lang별 canonical
- [x] Contact/Type/Match/ResultShare/NotFound 페이지
- [x] `||`→`??` 수정, 진행저장, GA4 스텁 + 이벤트
- [x] Privacy 광고/쿠키 문구, ads.txt, robots.txt
- [x] sitemap 534 URL 자동생성 + prerender 빌드 연동
- [x] 빌드 통과 (tsc + vite + prerender)

## Phase 1 — 코어 v2 (완료)
- [x] P1-1 질문뱅크 48문항 ×3언어 (`src/data/questions.{ko,en,ja}.json`)
- [x] P1-2 타입 상세 데이터 (강점/약점/직업/키워드) (`src/data/typeDetails.*.json`)
- [x] P1-3 궁합 생성기 (136쌍 룰기반, `src/utils/compatibility.ts`)
- [x] P1-4 엔진: Lite12/Standard24/Deep48 모드 + % 점수
- [x] P1-5 테스트 UX: 모드선택, 키보드(1~5), 스피너 단축
- [x] P1-6 결과지 v2: 요약+상세 토글, 데이터 연동
- [x] P1-7 공유카드 Canvas PNG 다운로드 + 복사 링크 + OG 메타
- [x] P1-8 AdSlot 컴포넌트 (승인 전 placeholder)
- [x] P1-9 Type/Match 페이지 실데이터 렌더 + prerender 전체 확장
- [x] P1-10 빌드 통과 (104 modules, prerender 534)

## Phase 2 — SEO 매트릭스 (완료)
- [x] P2-1 Match 고유 콘텐츠 강화 (차원별 4칸 비교 + tier별 팁)
- [x] P2-2 Blog 3개 추가 (사랑의언어/직장소통/오해와진실, ko/en) → 총 6개
- [x] P2-3 광고배치 확정 (결과/타입/궁합/블로그 본문, 테스트중 금지) + CLS 홀더
- [x] P2-4 빌드 통과 (sitemap 543, prerender 543)
- [ ] P2-5 (사용자) GSC 등록 + AdSense 신청 — 아래 체크리스트 참고

## Phase 3 — JP 투입 (완료)
- [x] P3-1 JA 전체 적용 (UI + 16타입 이름/설명/키워드 + 타입상세 + 질문뱅크)
- [x] P3-2 라인 공유 버튼 + X 공유 + JP 카피 (결과지)
- [x] P3-3 최종 빌드 + 스모크 테스트 (8/8 통과, sitemap 543)

## Phase 4 — Pop Sticker Lab 디자인 (완료)
- [x] D1 디자인 토큰 (`src/constants/theme.ts` 16타입 테마 + 4그룹 컬러)
- [x] D2 폰트 (Bricolage Grotesque display + Noto KR/JP) + 그레인/오로라/마퀴/스티커 CSS
- [x] D3 히어로 리뉴얼 (eyebrow + 오로라 + 16타입 마퀴 + 스탯 + 궁합 CTA)
- [x] D4 Feature/Showcase 리뉴얼 (스티커 카드 + 그룹 칩)
- [x] D5 결과지/타입/궁합/공유카드 타입 테마 적용
- [x] D6 빌드 통과
- [x] D7 궁합 파인더 (`/:lang/match` 선택+인기+16×16 매트릭스, sitemap 546)

## Phase 5 — JA 전수 감사·수정 (완료)
- [x] J1 감사 스크립트 (`scripts/audit-ja.mjs`) — 이후 0건
- [x] J2 ja 값 패치 (features/showcase/척도라벨)
- [x] J3 About/Privacy/Terms 3언어화
- [x] J4 블로그 6개 JA 번역 (`src/constants/blogPostsJa.ts`)
- [x] J5 Blog/상세/ResultShare/결과버튼 ja 분기
- [x] J6 빌드 통과

## Phase 6 — 푸터 페이지 AdSense급 증보 (완료)
- [x] F1 개인정보 14섹션 3언어 (AdSense/DoubleClick 고지, Analytics, GDPR/CCPA/APPI 권리, 아동, 보유기간)
- [x] F2 이용약관 12섹션 3언어 (연령, 정확도·비진단 고지, 채용사용 금지, IP, 책임제한)
- [x] F3 소개 E-E-A-T 증보 (방법론 투명공개, 에디토리얼 기준, 팀, 한계 명시)
- [x] F4 문의 증보 (용도별 mailto 4종, SLA, 운영자 정보, FAQ 5종)
- [x] F5 빌드 통과

## Phase 13 — 코드리뷰 P1 리팩토링 (완료)
- [x] R4 점수식 단일소스 (`scripts/score.mjs` + vitest parity 136쌍, 13/13 통과)
- [x] R5 이미지 경량화 (display webp 병행: 805→91KB 등, lazy+CLS, OG는 PNG 유지, precache에서 og 제외)
- [x] R6 BLOG_POSTS 불변 구성, `.env.example` 추가
- [x] R7 SEO 청크(helmet 136KB)는 측정 후 보류 — 크롤러는 prerender, 클라 타이틀에 필요. 효과 대비 교체비용 큼
- [x] 테스트·빌드 통과

## Phase 12 — 코드리뷰 P0 수정 (완료)
- [x] R1 연타 문항스킵 (transition lock + e.repeat 무시)
- [x] R2 keywords 무검증 캐스팅 가드 2곳
- [x] R3 SW dev 등록 PROD 가드
- [x] 테스트·빌드 통과

## Phase 11 — 다음 할 일 차근차근 (진행중)
- [x] N1 블로그 메타 주입 상태 확인 → 이미 완료됨 (검증 통과)
- [x] N2 번들 다이어트: 라우트 lazy-load (초기 490KB→195KB, gzip 157→61KB) + 빌드·검증 통과
- [x] N3 회귀 테스트 (vitest 12개: 136쌍 스냅샷·언어오염·문항균형·로케일동등, KO effortless 1건 적발수정, 빌드 통과)
- [x] N4 죽은 코드 정리 (구 20문항 번역배열, INITIAL_QUESTIONS, App.css, 구 CSS ~200줄 제거, 테스트·빌드 통과)
- [x] N5 a11y (radio roles+aria-checked+의미 라벨, progressbar, focus-visible, reduced-motion, 테스트·빌드 통과)

## Phase 10 — OG·PWA·SEO·GEO (완료)
- [x] O1 감사: SW충돌(public/sw.js 삭제, workbox precache에서 경로껍데기 제외), Home SEO 추가, og 절대경로
- [x] O2 OG 실물 17장 (`public/og/`, sharp 1200×630, 타입테마) + 타입/궁합/공유 연결
- [x] O3 프리렌더 경로별 메타주입 (title/desc/canonical/hreflang/OG + 홈 JSON-LD) 546페이지, 검증 4/4
- [x] O4 궁합엔진 동기화 (직관보완 +10, 동일타입 85 조기리턴, 스크립트·llms 동일식)
- [x] O5 llms.txt + robots AI 안내, 매니페스트 수정, 빌드 통과

## Phase 9 — 타입 상세 증보 (완료)
- [x] Y1 타입별 심층 2문단+연애+일 16종×3언어 (`typeOverviews.*.json`, 오염 전수검증)
- [x] Y2 열등기능 그립(8종)·그룹 성장팁·타입FAQ 엔진 (`typeContent.ts`)
- [x] Y3 상세페이지 9섹션 재구성 (심층/성장/그립/연애/일/험난궁합2/FAQ) + 빌드 통과

## Phase 8 — 테스트 UX 판타스틱 (완료)
- [x] T1 지표별 컬러 시스템 (EI그린/SN블루/TF퍼플/JP앰버) + 고스트 넘버 + shimmer 프로그레스
- [x] T2 16P식 그라데이션 스케일 버튼 (선택 pop+glow, 키보드 힌트 1~5)
- [x] T3 앞/뒤 방향 슬라이드 전환, 모드 스티커 카드, 인트로 정리
- [x] T4 빌드 통과

## Phase 7 — 궁합 상세 증보 (완료)
- [x] M1 지표별 심층분석 4축 ×3언어 ×2변형 (`src/utils/matchContent.ts`, 쌍 해시로 중복回避)
- [x] M2 강점4/주의점3~4, 데이트팁4, 총평, FAQ3, 관련궁합4, 점수바
- [x] M3 TOP_MATCHES 공용화, SEO 설명 강화, 빌드 통과

## Phase 14 — Thin-content 보완 (완료)
- [x] U1 궁합 변형 2→4종/축 + 축별 FNV 해시 (2개 전역슬롯→4^4=256조합, `src/utils/matchContent.ts`)
- [x] U2 쌍 내러티브(황금페어 7종 큐레이션+주기능 폴백) + 점수산식 해설 + FAQ 3→5개(점수산식·첫싸움)
- [x] U3 축별 글자 문장(FLAVOR 8선호×3언어) + 주기능 문장으로 패턴쌍둥이 분리
- [x] U4 tier별 OG 4종 (`scripts/generate-og.mjs`, `public/og/match-*.png`) + Match/프리렌더 적용
- [x] U5 FAQPage JSON-LD (Match) + Article JSON-LD (Blog) + match noscript 폴백
- [x] U6 타입 고유화: 그룹팁+타입시그니처 4종(`getGrowthForType`), 스포트라이트 1문단, FAQ 3→4개
- [x] U7 블로그 딥링크(타입/궁합 관련박스) + Article 스키마
- [x] U8 sitemap match 우선순위 tier 차등(0.8/0.7/0.6/0.5)
- [x] U9 중복 게이트: `src/utils/uniqueness.test.ts`(전체텍스트 평균<0.7, 근사중복<10% — en 평균 0.49/5.4%) + `scripts/check-duplicate-content.mjs` + `verify-meta` 확장, `npm run verify`
- [x] 테스트 14/14·빌드(prerender 546)·검증·lint 통과
- [ ] U10 후속(선택): 동일상태-다른글자 풀 분리(EE≠II 등)로 쌍둥이쌍 추가 분리, 블로그 6→12개

## 배포 · 수익화 체크리스트 (사용자)
1. `npm run build` → `dist/`를 호스팅에 업로드 (Netlify/Vercel/Cloudflare Pages, SPA fallback ON)
2. Search Console 등록 + `sitemap.xml` 제출 (GSC 인증코드는 `index.html`에 이미 있음)
3. AdSense 신청 → 승인 후:
   - `public/ads.txt`의 `pub-0000000000000000`을 실제 PUB-ID로 교체
   - 호스팅 환경변수 `VITE_ADSENSE_CLIENT=ca-pub-XXXX` 설정 후 재배포 (placeholder가 실제 광고로 전환)
   - 선택: `VITE_GA_ID=G-XXXX` 설정 시 GA4 자동 수집
4. 지표 주간 확인: 국가별 PV, 테스트 완료율, 공유율, RPM, CLS/LCP

## 진행 로그
- 2026-09-23 Phase 0 완료 (빌드 통과, sitemap 534)
- 2026-09-23 Phase 1 완료 (질문뱅크48×3언어, 결과지v2, 공유카드, 빌드 통과)
- 2026-09-23 Phase 2 완료 (블로그6개, Match 강화, sitemap 543)
- 2026-09-23 Phase 3 완료 (JA 전체, 최종 빌드+스모크 8/8)
- 2026-09-23 Phase 4 완료 (Pop Sticker Lab 디자인)
- 2026-09-23 Phase 5 완료 (JA 전수감사), Phase 6 완료 (푸터 AdSense급 증보)
- 2026-09-23 Phase 7 완료 (궁합 상세 증보)
