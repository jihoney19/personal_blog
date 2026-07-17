---
title: TypeScript 타입 좁히기 기초
description: 여러 타입이 될 수 있는 값을 안전하게 다루는 TypeScript의 타입 좁히기 방법을 정리합니다.
pubDate: '2026-07-16'
type: Note
category: Backend
tags:
  - TypeScript
  - Type Safety
  - JavaScript
draft: false
status: Published
---

TypeScript에서는 하나의 값이 여러 타입 중 하나일 수 있음을 타입으로 표현할 수 있습니다. 이런 값을 사용하기 전에 실제 타입을 확인해 가능한 범위를 좁히는 과정을 타입 좁히기라고 합니다.

## 유니언 타입

문자열 또는 숫자를 받을 수 있는 함수는 유니언 타입으로 표현할 수 있습니다.

```ts
function formatId(id: string | number) {
  if (typeof id === 'number') {
    return id.toString();
  }

  return id.toUpperCase();
}
```

`typeof` 조건문 안에서는 `id`가 숫자라는 사실을 TypeScript가 알 수 있습니다. 조건문 밖에서는 다시 `string | number`로 취급되므로 공통으로 사용할 수 있는 기능만 안전하게 호출할 수 있습니다.

## 객체의 형태 확인하기

객체 유니언은 특정 속성이 존재하는지 확인해 타입을 좁힐 수 있습니다.

```ts
type Success = { data: string };
type Failure = { error: string };

function readResult(result: Success | Failure) {
  if ('data' in result) {
    return result.data;
  }

  return result.error;
}
```

이 방식은 API 응답처럼 성공과 실패가 서로 다른 형태를 가질 때 유용합니다. 각 형태를 구분할 수 있는 공통 속성을 별도로 두면 더 명확한 타입 가드를 만들 수 있습니다.

## 타입 좁히기의 장점

타입을 확인한 뒤 값을 사용하면 존재하지 않는 속성에 접근하는 실수를 줄일 수 있습니다. 또한 코드만 읽어도 각 분기에서 어떤 데이터가 보장되는지 알 수 있어 유지보수가 쉬워집니다.

다만 타입 단언으로 검사를 무조건 우회하면 실제 값과 타입 선언이 달라질 수 있습니다. 가능한 경우 런타임 조건문이나 검증 함수를 사용해 입력 경계에서 확인하는 편이 안전합니다.

## 정리

타입 좁히기는 유니언 타입을 안전하게 사용하는 기본 방법입니다. `typeof`, `in`, 판별 속성 같은 조건을 활용하면 TypeScript의 정적 검사를 실제 코드 흐름과 연결할 수 있습니다.
