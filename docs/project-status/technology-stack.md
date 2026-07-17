# DEV.LOG 기술 스택

> 기준일: 2026-07-17

## 1. 핵심 애플리케이션 스택

| 영역 | 사용 기술 | 현재 역할 |
| --- | --- | --- |
| 프레임워크 | Astro 5 | 파일 기반 라우팅, 정적 페이지 생성, 콘텐츠 렌더링 |
| 출력 방식 | Astro static output | 서버 런타임 없이 `dist/`에 정적 HTML·CSS·JS 생성 |
| 언어 | TypeScript | 콘텐츠 타입, 유틸리티, 설정 및 Astro 컴포넌트 로직 |
| 타입 설정 | `astro/tsconfigs/strict` | 엄격한 TypeScript 검사 |
| 콘텐츠 | Markdown 및 MDX | 게시글과 프로젝트 본문 작성 |
| 콘텐츠 모델 | Astro Content Collections | `posts`, `projects` 컬렉션 로딩과 스키마 검증 |
| 스키마 | Astro의 Zod 기반 스키마 API | 날짜, URL, enum, 배열, slug, 필수값 검증 |
| UI | Astro 컴포넌트 | 서버 렌더링 중심의 화면·레이아웃 구성 |
| 브라우저 기능 | Vanilla JavaScript 및 Web API | 테마, 모바일 메뉴, 필터, 목차 상태, 코드 복사 |
| 스타일 | 일반 CSS 및 CSS Custom Properties | 디자인 토큰, 반응형 화면, 라이트·다크 테마 |
| 런타임 데이터 | Supabase Postgres | 승인 대기·공개·거절·스팸 댓글과 요청 제한 상태 저장 |
| 백엔드 | Supabase Edge Functions | 댓글 조회·검증·요청 제한·승인 대기 등록 API |
| 데이터 보안 | PostgreSQL RLS | 익명 사용자는 승인된 댓글만 읽고 직접 쓰기는 차단 |

프로덕션 의존성은 `astro`와 `@astrojs/mdx` 두 개로 제한되어 있습니다. React, Vue, Svelte 같은 UI 프레임워크나 상태 관리 라이브러리, CSS 프레임워크는 사용하지 않습니다.

## 2. 현재 설치 버전

아래 값은 2026-07-17에 로컬 `node_modules`에서 확인한 버전입니다. `package.json`의 버전 범위와 실제 설치 버전은 다를 수 있습니다.

| 패키지 | 설치 버전 |
| --- | ---: |
| Astro | 5.18.2 |
| `@astrojs/mdx` | 4.3.14 |
| TypeScript | 5.9.3 |
| Vitest | 3.2.7 |
| Playwright Test | 1.61.1 |
| `@axe-core/playwright` | 4.12.1 |
| Supabase CLI | 2.109.1 |
| ESLint | 9.39.5 |
| Prettier | 3.9.5 |

Node.js 요구 버전은 `package.json` 기준 `20.0.0` 이상이며, 패키지 관리는 npm과 `package-lock.json`을 사용합니다.

## 3. 콘텐츠 및 데이터 구조

### 게시글

- 위치: `src/content/posts/`
- 형식: Markdown 또는 MDX
- 현재 주요 필드: `title`, `description`, `pubDate`, `type`, `category`, `tags`, `draft`
- 선택 필드: `updatedDate`, `heroImage`, `readingTime`, `status`, `slug`
- 공개 조건: `draft: false`
- 현재 분류:
  - 카테고리: `AI`, `Frontend`, `Backend`, `Projects`, `Devlog`
  - 유형: `Article`, `Tutorial`, `Note`, `Retrospective`

### 프로젝트

- 위치: `src/content/projects/`
- 형식: Markdown 또는 MDX
- 주요 필드: `title`, `summary`, `status`, `startedAt`, `role`, `stack`
- 선택 필드: `endedAt`, `repoUrl`, `demoUrl`, `relatedPosts`
- 현재 프로젝트: `Personal Development Blog` 1개

콘텐츠 스키마에 맞지 않는 날짜·URL·상태·slug는 빌드 단계에서 오류가 발생하도록 구성되어 있습니다.

## 4. 개발 및 품질 도구

| 도구 | 용도 | 현재 상태 |
| --- | --- | --- |
| Astro Check | Astro 및 TypeScript 진단 | 스크립트 구성됨 |
| ESLint 9 | JavaScript·TypeScript·Astro 정적 분석 | Astro 권장 규칙 포함 |
| Prettier 3 | 코드와 문서 포맷 검사 | Astro 플러그인 사용 |
| Vitest | 정렬, 읽기 시간, 이전·다음 글, heading ID 단위 테스트 | 테스트 파일 존재 |
| Playwright | 브라우저 E2E 테스트 | 댓글 흐름을 Chromium, Firefox, WebKit에서 검사 |
| axe 기반 접근성 테스트 | 자동 접근성 검사 | 댓글 영역의 WCAG A·AA 심각/치명 위반 검사 |
| Supabase CLI | DB 마이그레이션과 Edge Function 관리 | 개발 프로젝트 인증과 비밀값 관리 완료, 원격 적용은 프로젝트 ref를 명시해 수행 |

현재 `npm run qa`는 check, lint, format check, unit test, E2E, 접근성 테스트, 최종 정적 빌드를 순서대로 실행합니다.

## 5. 빌드와 배포 구성

- `astro.config.mjs`에서 정적 출력이 명시되어 있습니다.
- 기본 사이트 URL은 `https://jihoney19.github.io`로 설정되어 있습니다.
- GitHub Actions 환경에서는 base path로 `/personal_blog`를 사용합니다.
- `.github/workflows/deploy-pages.yml`에 `main` 브랜치 push 시 GitHub Pages를 빌드·배포하는 워크플로가 있습니다.
- 댓글은 `PUBLIC_COMMENTS_ENABLED`, `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_PUBLISHABLE_KEY`가 설정된 빌드에서만 노출됩니다.
- 개발 Edge Function은 `xnttxukulsbqyapzirkw`에 배포되어 있으며 현재 허용 Origin은 `http://localhost:4321`입니다.
- `.openai/hosting.json`에 Sites 프로젝트 식별자가 있습니다.
- 현재 문서 작성 시점에는 실제 원격 배포 성공 여부나 라이브 URL 상태를 다시 확인하지 않았습니다.

## 6. 사용하지 않는 기술

현재 구현에는 다음 요소가 없습니다.

- 서버 어댑터와 서버 사이드 런타임
- CMS와 별도 관리자 화면
- 인증과 사용자 계정
- 댓글 외의 외부 API 런타임 데이터
- React·Vue·Svelte 등의 클라이언트 프레임워크
- Tailwind CSS 등의 CSS 프레임워크
- 분석 도구, 검색 백엔드
