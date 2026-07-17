---
title: 블로그 정보 구조를 확장 가능한 형태로 리팩터링하기
description: 기술별로 나뉘어 있던 블로그 탐색 구조를 Logs, Projects, About 섹션과 category, type, tags 기반의 게시물 분류 체계로 재구성한 작업 기록입니다.
publishedAt: '2026-07-17'
type: Project Retrospectives
category: Astro
tags:
  - Astro
  - TypeScript
  - Information Architecture
  - Content Collections
  - Accessibility
draft: false
---

## 작업 배경

기존 블로그의 주요 탐색 메뉴는 AI, Astro, Backend처럼 기술 이름을 직접 사용하고 있었습니다. 초기에는 내용을 빠르게 찾는 데 도움이 되지만, 기술이 늘어나거나 글의 성격이 다양해지면 메뉴가 계속 커지는 문제가 있습니다.

이번 작업에서는 기술을 상위 메뉴에서 분리하고, 사이트의 영역과 게시물의 분류를 각각 독립적으로 관리하도록 구조를 바꿨습니다.

## 섹션 중심의 네비게이션

메인 네비게이션은 다음 네 개의 섹션으로 정리했습니다.

- Home: 블로그 소개와 최신 로그
- Logs: 전체 게시물과 category 필터
- Projects: 블로그와 포트폴리오 프로젝트
- About: 개발 관심사와 소개

이제 새로운 기술이나 태그가 추가되어도 상단 네비게이션을 수정할 필요가 없습니다. 기술과 주제는 게시물의 category와 tags에서 표현됩니다.

## 게시물 분류 체계

게시물에는 서로 다른 역할을 가진 세 가지 분류를 적용했습니다.

- category: 게시물이 다루는 큰 주제
- type: 글의 형식과 작성 목적
- tags: 사용하는 기술이나 세부 키워드

category는 AI, Frontend, Backend, Projects, Devlog를 사용하고, type은 Article, Tutorial, Note, Retrospective로 제한했습니다. 이 값들은 여러 페이지에 따로 하드코딩하지 않고 `src/config/blog.ts`에서 한 번만 정의했습니다.

예를 들어 Astro와 TypeScript를 사용하는 회고 글은 `Projects` category, `Retrospective` type, 그리고 `Astro`, `TypeScript` tags로 표현할 수 있습니다. 주제와 글의 형식이 섞이지 않기 때문에 나중에 분류 기준을 확장하기도 쉽습니다.

## Content Collections 스키마 정리

Astro Content Collections 스키마에 게시물의 기본 필드를 명시했습니다.

- `title`
- `description`
- `publishedAt`
- `updatedAt`
- `category`
- `type`
- `tags`
- `draft`
- `heroImage`
- `readingTime`

날짜 형식, category, type, 태그 중복 여부를 빌드 경계에서 검증하도록 구성했습니다. 잘못된 frontmatter가 들어오면 페이지가 조용히 생성되는 대신 빌드 단계에서 문제를 확인할 수 있습니다.

## Logs 페이지와 표시 순서

Logs 페이지는 공개된 모든 게시물을 발행일 역순으로 표시합니다. 각 게시물에는 다음 정보가 표시됩니다.

1. 제목
2. 설명
3. category와 type
4. tags
5. 발행일과 예상 읽기 시간

category 필터는 브라우저에서 동작하도록 구성했습니다. 페이지를 다시 생성하거나 서버에 요청하지 않고 현재 목록의 게시물을 즉시 숨기고 표시합니다.

## Projects 분리

프로젝트는 게시물과 다른 데이터이므로 `projects` Content Collection으로 계속 분리했습니다. 프로젝트 페이지에는 프로젝트명, 요약, 상태, 역할, 기술 스택을 표시하고, 실제 GitHub나 Demo URL이 있을 때만 외부 링크를 표시합니다.

이 구분 덕분에 프로젝트 소개는 포트폴리오 정보로 관리하고, 프로젝트를 진행하며 얻은 생각과 의사결정은 Logs의 회고 게시물로 관리할 수 있습니다.

## 검증

변경 후 다음 검증을 실행했습니다.

- Astro 타입 및 콘텐츠 진단
- ESLint
- Prettier 형식 검사
- Vitest 단위 테스트
- Astro 정적 프로덕션 빌드
- 코덱스 내부 브라우저에서 Home, 네비게이션, category 필터와 게시물 목록 확인

정적 빌드는 성공했고, 내부 브라우저에서도 새로운 섹션 네비게이션과 분류 정보가 표시되는 것을 확인했습니다.

## 배운 점

사이트가 작을 때는 기술 이름을 메뉴에 직접 넣어도 빠르게 만들 수 있습니다. 하지만 콘텐츠가 늘어날 것을 고려하면, 탐색 구조와 콘텐츠 분류를 분리하는 편이 변경 비용을 낮춥니다.

이번 리팩터링의 핵심은 메뉴를 단순히 바꾸는 것이 아니라, 사이트 섹션, 게시물 형식, 주제, 세부 기술을 각각 독립적인 계층으로 나눈 것입니다. 앞으로 새로운 기술이나 글 형식을 추가하더라도 기존 페이지 구조를 크게 흔들지 않고 확장할 수 있는 기반을 마련했습니다.
