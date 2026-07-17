import { expect, test, type Page, type Route } from '@playwright/test';

const POST_PATH = '/posts/technology-stack-for-a-static-development-blog/';
const API_PATTERN = 'https://comments.example.test/functions/v1/comments**';
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'http://127.0.0.1:4321',
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Content-Type': 'application/json',
};

async function fulfillPreflight(route: Route) {
  await route.fulfill({ status: 204, headers: CORS_HEADERS, body: '' });
}

async function routeEmptyComments(page: Page) {
  await page.route(API_PATTERN, async (route) => {
    if (route.request().method() === 'OPTIONS') return fulfillPreflight(route);
    await route.fulfill({ status: 200, headers: CORS_HEADERS, json: [] });
  });
}

test('loads approved comments and submits a pending comment', async ({ page }) => {
  let submittedBody: unknown;
  await page.route(API_PATTERN, async (route) => {
    const method = route.request().method();
    if (method === 'OPTIONS') return fulfillPreflight(route);
    if (method === 'POST') {
      submittedBody = route.request().postDataJSON();
      await route.fulfill({
        status: 202,
        headers: CORS_HEADERS,
        json: { status: 'pending' },
      });
      return;
    }
    await route.fulfill({
      status: 200,
      headers: CORS_HEADERS,
      json: [
        {
          id: '6af3b862-0740-4140-8c80-68ed46d52577',
          post_slug: 'technology-stack-for-a-static-development-blog',
          author_name: '첫 독자',
          content: '정적 콘텐츠와 운영 데이터의 분리가 이해하기 좋았습니다.',
          created_at: '2026-07-17T12:00:00.000Z',
        },
      ],
    });
  });

  await page.goto(POST_PATH);
  await expect(page.getByRole('heading', { name: '댓글' })).toBeVisible();
  await expect(page.getByText('첫 독자')).toBeVisible();
  await expect(
    page.getByText('정적 콘텐츠와 운영 데이터의 분리가 이해하기 좋았습니다.'),
  ).toBeVisible();

  await page.getByLabel('이름').fill('새 독자');
  await page
    .getByRole('textbox', { name: '댓글', exact: true })
    .fill('댓글 등록 흐름도 확인했습니다.');
  await page.getByRole('button', { name: '댓글 등록' }).click();

  await expect(page.getByText('댓글이 접수되었습니다. 검토 후 공개됩니다.')).toBeVisible();
  expect(submittedBody).toEqual({
    postSlug: 'technology-stack-for-a-static-development-blog',
    authorName: '새 독자',
    content: '댓글 등록 흐름도 확인했습니다.',
    website: '',
  });
});

test('shows an empty state and keeps the comment form usable on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await routeEmptyComments(page);

  await page.goto(POST_PATH);
  await expect(page.getByText('아직 공개된 댓글이 없습니다.')).toBeVisible();
  await expect(page.getByRole('button', { name: '댓글 등록' })).toBeVisible();

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);
});

test('offers a retry when loading comments fails', async ({ page }) => {
  let requestCount = 0;
  await page.route(API_PATTERN, async (route) => {
    if (route.request().method() === 'OPTIONS') return fulfillPreflight(route);
    requestCount += 1;
    if (requestCount === 1) {
      await route.fulfill({
        status: 503,
        headers: CORS_HEADERS,
        json: { error: '댓글 서비스를 사용할 수 없습니다.' },
      });
      return;
    }
    await route.fulfill({ status: 200, headers: CORS_HEADERS, json: [] });
  });

  await page.goto(POST_PATH);
  await expect(page.getByText('댓글 서비스를 사용할 수 없습니다.')).toBeVisible();
  await page.getByRole('button', { name: '다시 불러오기' }).click();
  await expect(page.getByText('아직 공개된 댓글이 없습니다.')).toBeVisible();
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('explains the requirement and hides the inactive form', async ({ page }) => {
    await page.goto(POST_PATH);

    await expect(page.getByText('댓글을 보거나 등록하려면 JavaScript가 필요합니다.')).toBeVisible();
    await expect(page.getByRole('button', { name: '댓글 등록' })).toBeHidden();
  });
});
