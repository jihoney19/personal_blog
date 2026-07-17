---
title: 정적 사이트 댓글에서 브라우저 API 키 제거하기
description: 배포된 정적 사이트에서 댓글 UI가 사라진 원인을 추적하고, 브라우저에 Supabase API 키를 전달하지 않는 Edge Function 구조로 개선한 과정을 정리합니다.
publishedAt: '2026-07-18'
type: Project Retrospectives
category: Backend
tags:
  - Supabase
  - Astro
  - Edge Functions
  - CORS
  - Security
draft: false
status: Published
---

[승인형 Supabase 댓글 연결하기](/posts/building-moderated-supabase-comments/)에서는 정적 콘텐츠와 댓글 런타임 데이터를 분리하고, RLS와 Edge Function으로 댓글 쓰기 경계를 구성했습니다. 배포 후에는 브라우저에 publishable key를 전달하지 않는 형태로 보안 경계를 한 단계 더 좁혔습니다.

## 배포에서 댓글이 사라진 원인

GitHub Pages 빌드가 성공했는데도 게시글에서 댓글 영역이 보이지 않는 문제가 있었습니다. 배포 HTML을 확인하고 Actions 변수와 컴포넌트 조건을 대조한 결과, 댓글 활성화 플래그와 Supabase 설정 변수가 배포 환경에 없었습니다. 워크플로의 기본값은 `PUBLIC_COMMENTS_ENABLED=false`였기 때문에 댓글 마크업 자체가 생성되지 않았습니다.

이 문제는 데이터베이스 장애나 RLS 오류가 아니라 정적 빌드 시점의 기능 플래그 문제였습니다. 배포 성공과 기능 활성화는 별도로 확인해야 한다는 점을 보여주는 사례였습니다.

## 브라우저 키 전달 제거

기존 브라우저 코드는 Edge Function 호출에 publishable key를 `apikey`와 `Authorization` 헤더로 전달했습니다. publishable key는 공개 클라이언트에서 사용할 수 있는 키지만, 이번 요구사항에서는 브라우저 번들과 GitHub Pages 결과물에 API 키를 남기지 않도록 설계를 바꿨습니다.

변경 후 브라우저가 전달하는 정보는 다음뿐입니다.

```text
Origin
Accept: application/json
게시글 slug와 댓글 입력값
```

Supabase URL은 Edge Function 주소를 만들기 위해 필요하지만 API 인증 키는 브라우저에 전달하지 않습니다. 데이터베이스 접근에 필요한 `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, 해시 비밀값은 Edge Function 환경에서만 읽습니다.

## 공개 엔드포인트의 보안 경계

키를 제거한다고 해서 함수를 무제한 공개하지는 않았습니다. 함수는 다음 경계를 계속 적용합니다.

- `verify_jwt=false`인 공개 함수로 동작하되 허용된 Origin만 CORS 응답
- 게시글 slug와 댓글 입력값 검증
- honeypot 필드 검사
- HMAC 기반 요청 식별자와 원자적 rate-limit RPC
- 쓰기 요청은 `pending` 상태로만 저장
- 읽기 결과는 RLS가 적용된 승인 댓글만 반환

Supabase의 공개 함수 모델을 사용하더라도 함수 내부에서 출처, 입력, 요청량을 별도로 검증해야 합니다. 특히 GitHub Pages처럼 정적 호스팅되는 브라우저 호출에는 `https://jihoney19.github.io` Origin을 명시적으로 허용하고 로컬 개발 Origin과 구분했습니다.

## 배포 설정도 최소화

GitHub Actions에는 댓글 활성화 플래그와 프로젝트 URL만 저장합니다. publishable key 변수는 제거했고, 서비스 역할 키와 해시 비밀값은 GitHub나 정적 빌드에 넣지 않습니다.

이 구성은 공개 사이트가 개발 Supabase 프로젝트를 사용한다는 운영상의 제약이 있습니다. 별도 프로덕션 프로젝트로 분리할 때는 URL과 Edge Function Secrets를 교체하고, 동일한 스키마·RLS·Origin 검증을 다시 확인해야 합니다.

## 검증

수정 후 다음을 실제로 확인했습니다.

- 브라우저 요청에 API 키 헤더가 없음
- GitHub Pages Origin에서 승인 댓글 GET 요청이 `200` 응답
- 잘못된 POST 요청이 `400`으로 거부됨
- CORS 응답이 허용된 Origin에만 반환됨
- Astro 진단, ESLint, Prettier 통과
- Vitest 8개, Chromium·Firefox·WebKit E2E 15개 통과
- 접근성 시나리오 3개 통과
- 정적 프로덕션 빌드 38페이지 성공

이번 변경으로 댓글 기능은 정적 사이트에 남는 API 키 없이도 동작하지만, 실제 데이터 접근 권한은 Edge Function과 Supabase 정책 안에 남아 있습니다.
