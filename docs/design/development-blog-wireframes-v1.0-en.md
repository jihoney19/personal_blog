# Personal Development Blog Wireframes v1.0

## 0. Deliverable Information

| Item | Details |
|---|---|
| Status | Low-fidelity wireframes prepared for user review |
| Date | 2026-07-15 |
| Scope | Ten screens required by the approved design plan |
| Source | `development-blog-design-plan-v1.0-en.md` |
| Production content | No production posts; no unverified personal facts or links |

These wireframes approve information hierarchy, conditional display, and responsive structure only. They do not approve final colors, typography rendering, personal information, project contribution claims, or production post content.

Text marked `TEST FIXTURE ONLY` represents isolated QA data and must never be loaded by a normal production build. Text inside angle brackets, such as `<verified role>`, is a design annotation rather than public UI copy.

## 1. Shared Frame

### Desktop shell

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ Skip to content (visible on focus)                                           │
│ DEV.LOG          Home  Categories  Tags  Projects  About        Theme        │ 56px
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                         page content, max 1100px                              │
│                                                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│ DEV.LOG  one-line introduction                  Projects  About  [GitHub]*    │
│ copyright year · <verified real name>                                       │
└──────────────────────────────────────────────────────────────────────────────┘

* Render GitHub only when an actual URL has been provided.
```

### Mobile shell

```text
┌──────────────────────────────┐
│ DEV.LOG       Theme    Menu  │ 56px
├──────────────────────────────┤
│                              │
│ page content · 16px gutters  │
│                              │
├──────────────────────────────┤
│ DEV.LOG                      │
│ Projects                     │
│ About                        │
│ [GitHub]*                    │
└──────────────────────────────┘
```

Shared rules:

- Keep exactly one `h1` on each page and preserve logical heading order.
- Reserve space below the fixed navigation so content is never covered.
- Use one primary link for a fully clickable card; do not nest links.
- Keep `44×44px` minimum targets for theme, menu, filters, TOC, and copy controls.
- Hide absent optional data together with its separators, rows, and empty wrappers.
- Do not render an email address, contact form, inactive external link, or fake image.

## 2. Screen 01 — Home, Empty Production State

Target: desktop light, with mobile reflow using the shared shell.

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ shared navigation                                                            │
├──────────────────────────────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────────────────────────────────────┐ │
│ │ $ whoami                                                                │ │
│ │ <verified display identity>                                             │ │
│ │ 아이디어를 실제 서비스로 만드는 AI 에이전트 활용 풀스택 개발자          │ │
│ └──────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│ [+] DEV.LOG                                                                  │
│ 학습 과정과 문제 해결, 프로젝트의 기술적 판단을 기록합니다.                │
│                                                                              │
│ [+] 새 글 준비 중                                                            │
│ 아직 게시된 글이 없습니다.                                                  │
│ 새로운 학습 기록을 준비하고 있습니다.                                      │
│                                                                              │
│                         category filter hidden                               │
├──────────────────────────────────────────────────────────────────────────────┤
│ shared footer                                                                │
└──────────────────────────────────────────────────────────────────────────────┘
```

Acceptance notes:

- The terminal hero remains complete without post data.
- Do not render the category filter, an empty post list, inactive tabs, or sample posts.
- The empty state is normal guidance, not an error alert.
- If the verified identity is unavailable, use an approved neutral identity line rather than inventing a name.

## 3. Screen 02 — Home, Posts and Category Filter

Target: desktop light. All visible post content below is `TEST FIXTURE ONLY`.

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ shared navigation                                                            │
├──────────────────────────────────────────────────────────────────────────────┤
│ terminal hero · same structure as Screen 01                                  │
│                                                                              │
│ [+] DEV.LOG                                                                  │
│ introduction                                                                 │
│                                                                              │
│ 카테고리  [전체 selected] [AI Agents] [Frontend] [Backend] [Astro]           │
│                                                                              │
│ [+] 최신 글                                                                  │
│ ──────────────────────────────────────────────────────────────────────────── │
│ [학습 기록] TEST FIXTURE ONLY — 최근 게시글                                  │
│ 2026-07-15 · AI Agents · 4분                                                 │
│ 분류와 정렬, 두 줄 말줄임을 확인하는 테스트 설명입니다.                     │
│ ──────────────────────────────────────────────────────────────────────────── │
│ [문제 해결] TEST FIXTURE ONLY — 같은 날짜의 두 번째 게시글                   │
│ 2026-07-15 · Astro · 6분                                                     │
│ 동일 날짜에서는 영문 ID 오름차순으로 순서를 고정합니다.                     │
│ ──────────────────────────────────────────────────────────────────────────── │
│ [기술 글] TEST FIXTURE ONLY — 이전 게시글                                    │
│ 2026-07-14 · Frontend · 8분                                                  │
├──────────────────────────────────────────────────────────────────────────────┤
│ shared footer                                                                │
└──────────────────────────────────────────────────────────────────────────────┘
```

Acceptance notes:

- The filter appears only when at least one public post exists.
- Selection is conveyed through text/border and `aria-pressed`, not color alone.
- Filtering keeps stable focus, announces no-result states, and never changes publication ordering.
- Title and description clamp visually to two lines while accessible names preserve full text.

## 4. Screen 03 — Post Detail, Desktop Light

Target: `1024px+`, light mode. Article text is `TEST FIXTURE ONLY`.

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ shared navigation                                                            │
├──────────────────────────────────────────────────────────────────────────────┤
│ [학습 기록] · AI Agents                                                      │
│ TEST FIXTURE ONLY — 게시글 상세 구조 검증                                    │ h1
│ 2026-07-15 · 수정 2026-07-16* · 5분                                          │
│                                                                              │
│ ┌──────────────────────┐  ┌────────────────────────────────────────────────┐ │
│ │ [+] 목차             │  │ 도입                                           │ │
│ │ ┃ 도입 current       │  │ 본문 단락                                      │ │
│ │   설계 규칙          │  │                                                │ │
│ │   결론               │  │ 설계 규칙                                      │ │
│ │                      │  │ 본문 단락                                      │ │
│ │ sticky · about 200px │  │ ┌────────────────────────────────────────────┐ │ │
│ │                      │  │ │ typescript                         복사    │ │ │
│ │                      │  │ │ const fixture = true;                      │ │ │
│ └──────────────────────┘  │ └────────────────────────────────────────────┘ │ │
│                           │ 결론                                           │ │
│                           │ 본문 단락                                      │ │
│                           │                                                │ │
│                           │ 태그  Codex · TypeScript                       │ │
│                           │ 이전 글                         다음 글         │ │
│                           │ 관련 글, when available                        │ │
│                           └────────────────────────────────────────────────┘ │
├──────────────────────────────────────────────────────────────────────────────┤
│ shared footer                                                                │
└──────────────────────────────────────────────────────────────────────────────┘

* Hide the update item and its separator when `updatedAt` is absent.
```

Acceptance notes:

- Always render the TOC container. With no generated items, show `목차 항목이 없습니다.`
- Highlight the current section through weight and a left border.
- Keep the article body at `720px` maximum and code/table overflow local.
- Copy feedback changes to `복사됨` for two seconds or `복사할 수 없습니다` on failure and is announced through a live region.
- Hide tags, previous/next cards, or related-post sections independently when their data is absent.

## 5. Screen 04 — Post Detail, Mobile Dark

Target: `360px`, dark mode. Article text is `TEST FIXTURE ONLY`.

```text
┌──────────────────────────────┐
│ DEV.LOG       Theme    Menu  │
├──────────────────────────────┤
│ [학습 기록] · AI Agents      │
│ TEST FIXTURE ONLY —          │
│ 모바일 게시글 상세           │ h1
│ 2026-07-15 · 5분             │
│                              │
│ [+] 목차              toggle │ collapsed by default
│                              │
│ 도입                         │ h2
│ 본문 단락                    │
│                              │
│ 설계 규칙                    │ h2
│ ┌──────────────────────────┐ │
│ │ typescript        복사   │ │
│ │ const longLine = ...  →  │ │ horizontal code scroll only
│ └──────────────────────────┘ │
│                              │
│ 태그                         │
│ Codex · Accessibility        │
│                              │
│ 이전 글                      │ conditional single card
├──────────────────────────────┤
│ mobile footer                │
└──────────────────────────────┘
```

Acceptance notes:

- The TOC moves below the article header at `850px` and below and starts collapsed.
- The TOC toggle exposes `aria-expanded` and its icon/text change together.
- Metadata wraps without horizontal page overflow.
- Long code scrolls inside its own region; body text and navigation do not scroll horizontally.
- Dark-mode status, links, focus rings, and dividers meet WCAG 2.2 AA contrast.

## 6. Screen 05 — Category and Tag Indexes

Target: desktop light, stacking to one column on narrow screens. Counts use `TEST FIXTURE ONLY`.

```text
┌─────────────────────────────────────┬─────────────────────────────────────┐
│ 카테고리                            │ 태그                                │
│ 기술 주제별 게시글을 탐색합니다.    │ 세부 기술과 키워드별로 탐색합니다.  │
│                                     │                                     │
│ AI Agents                         2 │ TypeScript                        3 │
│ Astro                             2 │ Codex                             2 │
│ Backend                           1 │ Accessibility                     1 │
│ Frontend                          1 │ Astro                             1 │
│                                     │                                     │
│ alphabetical by category            │ count descending, then alphabetical │
└─────────────────────────────────────┴─────────────────────────────────────┘

Selected detail route:
┌──────────────────────────────────────────────────────────────────────────────┐
│ 카테고리: AI Agents                                                    2개  │ h1
│ ──────────────────────────────────────────────────────────────────────────── │
│ TEST FIXTURE ONLY — recent matching post                                    │
│ TEST FIXTURE ONLY — older matching post                                     │
└──────────────────────────────────────────────────────────────────────────────┘
```

Acceptance notes:

- Index pages show a factual empty state when no public classifications exist.
- Do not generate category/tag detail routes with zero public posts.
- Counts and detail lists exclude drafts and use the same eligibility rules as Home.
- Use links for navigation; no redundant sorting or filtering controls are included.

## 7. Screen 06 — Project List

Target: desktop light, single-column list at every width.

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ 프로젝트                                                                    │ h1
│ 아이디어를 실제 서비스로 구현하며 내린 판단과 과정을 정리합니다.            │
│                                                                              │
│ ──────────────────────────────────────────────────────────────────────────── │
│ Personal Development Blog                                  진행 중 [status] │
│ 개인 학습 기록과 개발 포트폴리오를 위한 정적 블로그                         │
│ 역할  <verified role>                                                        │
│ 기술  Astro · TypeScript · Markdown                                         │
│ ──────────────────────────────────────────────────────────────────────────── │
└──────────────────────────────────────────────────────────────────────────────┘
```

Acceptance notes:

- Register only the factual `Personal Development Blog` project in the initial production site.
- The project title is the one primary link covering the card without nested links.
- Status uses visible text as well as a status color.
- Do not invent the role, dates, results, repository URL, demo URL, or screenshots.

## 8. Screen 07 — Project Detail

Target: desktop light, specification sheet becomes one column on mobile.

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ cat project.json                                                             │
│ Personal Development Blog                                                    │ h1
│ 개인 학습 기록과 개발 포트폴리오를 위한 정적 블로그                         │
│                                                                              │
│ ┌───────────────────────────────┬──────────────────────────────────────────┐ │
│ │ status                        │ 진행 중                                  │ │
│ │ period                        │ <verified start date> — 진행 중          │ │
│ │ role                          │ <verified role>                          │ │
│ │ stack                         │ Astro · TypeScript · Markdown            │ │
│ │ github*                       │ actual URL only                          │ │
│ │ demo*                         │ actual URL only                          │ │
│ └───────────────────────────────┴──────────────────────────────────────────┘ │
│                                                                              │
│ [+] 배경                                                                     │
│ [+] 목표                                                                     │
│ [+] 역할                                                                     │
│ [+] 주요 기능                                                                │
│ [+] 문제 해결                                                                │
│ [+] QA 결과                                                                  │
│ [+] 회고                                                                     │
└──────────────────────────────────────────────────────────────────────────────┘
```

Acceptance notes:

- Hide the GitHub and demo rows and buttons completely when values are absent.
- Narrative sections contain only user-verified facts and verified implementation results.
- Screenshots are optional; show only actual images with alt text and captions.
- Related posts appear only when references resolve to public posts.

## 9. Screen 08 — About

Target: desktop light, two columns above `641px`, one column on mobile.

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ About                                                                        │ h1
│                                                                              │
│ ┌──────────────────────┐  <verified real name>                              │
│ │ actual profile image │  아이디어를 실제 서비스로 만드는                  │
│ │ only; otherwise omit │  AI 에이전트 활용 풀스택 개발자                   │
│ └──────────────────────┘  <verified introduction>                           │
│                                                                              │
│ [+] 관심 영역                                                                │
│ verified narrative                                                           │
│                                                                              │
│ [+] 기술을 사용하는 방식                                                     │
│ verified narrative linked to projects/posts                                  │
│                                                                              │
│ [+] AI 에이전트 협업                                                         │
│ verified narrative                                                           │
│                                                                              │
│ 주요 프로젝트                  주요 글, hidden while no public posts         │
│ [GitHub]*                                                                    │
└──────────────────────────────────────────────────────────────────────────────┘
```

Acceptance notes:

- When no actual profile image exists, remove the image region and use a complete one-column introduction.
- GitHub is the only external contact method and is hidden without an actual URL.
- Do not render email, a contact button, proficiency gauges, temporary experience, metrics, or claims.
- Featured posts are hidden while there are no public posts.

## 10. Screen 09 — Mobile Menu, Open State

Target: `360px`, both themes.

```text
┌──────────────────────────────┐
│ DEV.LOG       Theme   닫기   │ menu button: aria-expanded="true"
├──────────────────────────────┤
│ Home                         │ current page also indicated by text/underline
│ Categories                   │
│ Tags                         │
│ Projects                     │
│ About                        │
├──────────────────────────────┤
│ underlying page begins here  │
│ after menu region            │
└──────────────────────────────┘
```

Interaction sequence:

1. Activating `메뉴 열기` sets `aria-expanded="true"` and reveals the navigation links.
2. Keyboard focus moves through the revealed links in visual order.
3. `Esc`, the close control, or selecting a route closes the menu.
4. When closed without navigation, focus returns to the menu button.
5. At `769px` and above, the expanded mobile region is removed and desktop navigation is restored.

Acceptance notes:

- The closed state does not leave hidden links focusable.
- Opening the menu does not duplicate global event listeners.
- State is communicated through label, icon, and ARIA state rather than color alone.
- Reduced-motion users receive no nonessential menu animation.

## 11. Screen 10 — 404

Target: responsive, both themes.

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ shared navigation                                                            │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│ [x] 페이지를 찾을 수 없습니다                                                │ h1
│ 요청한 주소가 없거나 이동되었습니다.                                        │
│                                                                              │
│ [홈으로 돌아가기]                                                            │
│                                                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│ shared footer                                                                │
└──────────────────────────────────────────────────────────────────────────────┘
```

Acceptance notes:

- The Home action is a real link and is keyboard accessible.
- The page uses the same navigation, theme behavior, focus style, and footer rules as other pages.
- Do not add search, automatic redirects, decorative illustrations, or fabricated support links.

## 12. Responsive and Boundary Review Matrix

| Width | Required checks |
|---:|---|
| `360px` | Single-column content, mobile navigation, wrapped metadata, no page overflow |
| `640px` | Final mobile layout values |
| `641px` | Tablet-narrow spacing; mobile navigation remains active |
| `768px` | Final tablet-narrow navigation state |
| `769px` | Desktop navigation returns; post TOC remains collapsible |
| `850px` | Final collapsible-TOC state |
| `851px` | Sticky desktop TOC returns |
| `1023px` | Final tablet spacing |
| `1024px` | Desktop structure |
| `1279px` | Final standard desktop frame |
| `1280px` | Desktop-large maximum-width frame |

For every affected screen, also verify light/dark themes, keyboard-only use, 200% zoom, reduced motion, long Korean titles, long URLs, code, tables, missing optional values, and image failure behavior.

## 13. Approval Checklist

- [ ] Screen 01 makes the no-post production state feel complete.
- [ ] Screen 02 keeps all sample content explicitly test-only.
- [ ] Screens 03 and 04 preserve TOC visibility and responsive placement.
- [ ] Screen 05 distinguishes content type, technical category, and tags.
- [ ] Screens 06 and 07 avoid unverified project facts and conditional links.
- [ ] Screen 08 uses GitHub only and remains complete without an image or public posts.
- [ ] Screen 09 defines keyboard, `Esc`, focus-return, and ARIA behavior.
- [ ] Screen 10 provides a clear Home recovery route.
- [ ] All screens preserve one `h1`, logical focus order, and WCAG 2.2 AA intent.
- [ ] The structures are approved as the basis for high-fidelity mockups.
