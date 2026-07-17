# DEV.LOG 디자인 정리

> 기준일: 2026-07-17

## 1. 디자인 콘셉트

DEV.LOG는 OpenCode의 터미널과 man-page 분위기를 참고하되, 한국어 긴 글을 편하게 읽을 수 있도록 시각적 강도를 낮춘 개발 블로그입니다.

핵심 표현은 다음과 같습니다.

- 크림 또는 밝은 무채색 캔버스와 잉크색 본문
- Home에서 한 번만 사용하는 어두운 `$ whoami` 터미널 hero
- 영문 UI·코드에는 고정폭 글꼴, 한국어 본문에는 산세리프 글꼴
- 그림자와 입체 카드 대신 1px 구분선과 여백으로 계층 표현
- 상태·링크·포커스에만 제한적으로 accent 색상 사용
- ASCII 괄호와 명령어 표현은 구조를 설명할 때만 사용
- 장식 이미지, 그라데이션, glass 효과, 큰 radius를 사용하지 않는 절제된 화면

## 2. 색상 시스템

색상은 `src/styles/tokens.css`의 의미 기반 CSS 변수로 관리합니다.

| 역할 | Light | Dark |
| --- | --- | --- |
| Canvas | `#fdfcfc` | `#201d1d` |
| 주요 글자 | `#201d1d` | `#fdfcfc` |
| 본문 | `#424245` | `#d5d2d2` |
| 보조 글자 | `#646262` | `#aaa6a6` |
| 부드러운 표면 | `#f8f7f7` | `#2a2626` |
| 카드·코드 표면 | `#f1eeee` | `#302c2c` |
| Accent | `#005fcc` | `#6ea8ff` |
| Success | `#18794e` | `#32d583` |
| Warning | `#8a4b00` | `#f5a524` |
| Danger | `#b42318` | `#ff6b6b` |
| Terminal | `#191919` | `#151515` |

상태 색상은 글자나 상태명과 함께 사용해 색만으로 의미를 전달하지 않도록 설계했습니다.

## 3. 타이포그래피

| 용도 | 설계 기준 | 현재 코드의 fallback |
| --- | --- | --- |
| 한국어 제목·본문 | Pretendard | 시스템 산세리프, Segoe UI, Noto Sans KR 계열 |
| 영문 UI·코드 | Berkeley Mono | JetBrains Mono, IBM Plex Mono, `ui-monospace`, Consolas |

현재 저장소에는 별도의 웹폰트 파일과 `@font-face`가 없습니다. 따라서 사용자의 로컬 환경에 해당 글꼴이 없으면 시스템 fallback이 사용됩니다.

본문은 최대 720px 폭을 중심으로 구성하고, 긴 한국어 문장은 넉넉한 line-height와 `word-break` 규칙으로 읽기 흐름을 유지합니다.

## 4. 레이아웃

| 요소 | 기준 |
| --- | --- |
| 전체 콘텐츠 최대 폭 | 1100px |
| 게시글 레이아웃 폭 | 960px |
| 게시글 본문 최대 폭 | 720px |
| 데스크톱 목차 | 약 200px |
| 데스크톱 사이드 내비게이션 | 248px 고정 |
| 기본 모바일 좌우 여백 | 16px |

### 화면별 구성

- Home: 터미널 hero → 소개 → 신호선 장식 → 최신 글과 카테고리 필터
- Logs: 명령어형 kicker → 전체 글과 필터
- Post Detail: 본문 720px + 우측 sticky 목차, 메타데이터와 관련 글
- Categories·Tags: 분류 목록과 개수, 상세 목록, breadcrumb
- Projects: 목록 카드와 `cat project.json` 형태의 상세 명세
- About: 문서형 소개 본문
- 404: 중앙 정렬 오류 문구와 Home 복귀 링크

## 5. 반응형 설계

| 구간 | 현재 동작 |
| --- | --- |
| 851px 이상 | 고정 사이드바, 게시글 본문과 sticky 목차의 2열 구조 |
| 850px 이하 | 사이드바를 숨기고 상단 내비게이션 사용, 목차를 본문 위 단일 열로 이동 |
| 640px 이하 | 모바일 메뉴, 축소된 여백·타입 크기, 프로젝트와 관련 글의 1열 배치 |

표와 코드 블록은 자체 가로 스크롤을 사용해 페이지 전체가 옆으로 밀리지 않도록 구성되어 있습니다. 다만 설계상 요구된 모바일 목차의 접기·펼치기는 아직 구현되지 않았습니다.

## 6. 컴포넌트와 상호작용

- `HomeHero`: `$ whoami` 형식의 브랜드 hero
- `PostNavigation`: 데스크톱 고정 내비게이션과 테마 전환
- `CategoryFilter`: 선택 상태와 0건 안내를 포함한 카테고리 필터
- `PostRow`: 글 제목, 날짜, 카테고리, 유형, 읽기 시간, 태그
- `EmptyState`: 게시글이 없을 때 정상 상태로 보이는 안내
- 게시글 목차: 현재 섹션 강조와 anchor 이동
- 코드 블록: 언어명, Copy 버튼, 성공·실패 상태
- 이전·다음 글 및 관련 글: 실제 대상이 있을 때만 표시
- 프로젝트 명세: 터미널 창과 JSON을 연상시키는 정보 블록
- `Comments`: 읽기 흐름 뒤에 배치한 승인형 댓글 목록·등록 폼과 로딩·빈 상태·오류·성공 피드백

Hover와 focus는 색 또는 1px border 변화 중심입니다. 전역 스타일은 `prefers-reduced-motion`에서 transition과 animation 시간을 사실상 제거합니다.

## 7. 접근성 디자인

현재 코드와 디자인 문서에 반영된 항목은 다음과 같습니다.

- `Skip to content` 링크
- 의미 있는 landmark와 nav label
- 현재 페이지와 현재 목차 항목의 `aria-current`
- 필터의 `aria-pressed`
- 모바일 메뉴의 `aria-expanded`, `Esc` 닫기, 포커스 반환
- 코드 복사 결과의 `role="status"`와 `aria-live`
- `:focus-visible` 포커스 스타일
- 라이트·다크 상태를 색상 토큰으로 분리
- 200% 확대와 좁은 화면을 고려한 줄바꿈 및 overflow 처리
- reduced motion 환경 대응

댓글 영역에는 자동 axe 테스트가 추가됐습니다. 다만 전체 주요 화면의 자동 검사와 최신 전체 화면 키보드 검증은 아직 남아 있어 사이트 전체를 WCAG 2.2 AA 완료 상태로 단정할 수는 없습니다.

## 8. 디자인 산출물 현황

- 설계 문서: `docs/design/development-blog-design-plan-v1.0-en.md`
- 저해상도 화면 구조: `docs/design/development-blog-wireframes-v1.0-en.md`
- 고해상도 핵심 상태: `docs/design/development-blog-high-fidelity-mockups-v1.0-en.md`
- Figma 대상 파일: 기존 디자인 문서에 링크 기록
- 기존 기록상 Figma 고해상도 5개 상태 동기화는 도구 호출 한도로 인해 대기 상태

현재 Astro 화면은 해당 로컬 디자인 문서의 시각 원칙을 상당 부분 반영했지만, Figma와 현재 코드가 완전히 동기화됐다는 검증 기록은 없습니다.
