import { describe, expect, it } from 'vitest';
import {
  COMMENT_LIMITS,
  validateCommentSubmission,
} from '../../supabase/functions/_shared/comments';

describe('comment submission validation', () => {
  const validSubmission = {
    postSlug: 'building-the-development-blog-mvp',
    authorName: '독자',
    content: '좋은 글 감사합니다.',
    website: '',
  };

  it('normalizes and accepts a valid submission', () => {
    expect(
      validateCommentSubmission({
        ...validSubmission,
        authorName: '  독자  ',
        content: '  첫 줄\r\n둘째 줄  ',
      }),
    ).toEqual({
      isValid: true,
      value: {
        postSlug: validSubmission.postSlug,
        authorName: '독자',
        content: '첫 줄\n둘째 줄',
      },
    });
  });

  it('rejects invalid post slugs', () => {
    const result = validateCommentSubmission({ ...validSubmission, postSlug: '../admin' });
    expect(result).toMatchObject({ isValid: false, code: 'invalid-slug' });
  });

  it('rejects overlong content', () => {
    const result = validateCommentSubmission({
      ...validSubmission,
      content: '가'.repeat(COMMENT_LIMITS.contentMax + 1),
    });
    expect(result).toMatchObject({ isValid: false, code: 'invalid-content' });
  });

  it('classifies a filled honeypot as spam', () => {
    const result = validateCommentSubmission({ ...validSubmission, website: 'https://spam.test' });
    expect(result).toMatchObject({ isValid: false, code: 'honeypot' });
  });
});
