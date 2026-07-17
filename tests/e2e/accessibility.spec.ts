import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('comment region has no serious or critical axe violations', async ({ page }) => {
  await page.route('https://comments.example.test/functions/v1/comments**', async (route) => {
    const headers = {
      'Access-Control-Allow-Origin': 'http://127.0.0.1:4321',
      'Access-Control-Allow-Headers': 'authorization, apikey, content-type',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Content-Type': 'application/json',
    };
    if (route.request().method() === 'OPTIONS') {
      await route.fulfill({ status: 204, headers, body: '' });
      return;
    }
    await route.fulfill({ status: 200, headers, json: [] });
  });

  await page.goto('/posts/technology-stack-for-a-static-development-blog/');
  await expect(page.getByRole('heading', { name: '댓글' })).toBeVisible();

  const results = await new AxeBuilder({ page })
    .include('[data-comments-root]')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  const seriousOrCritical = results.violations.filter(
    (violation) => violation.impact === 'serious' || violation.impact === 'critical',
  );

  expect(seriousOrCritical).toEqual([]);
});
