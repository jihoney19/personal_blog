export const COMMENT_LIMITS = {
  authorNameMin: 2,
  authorNameMax: 40,
  contentMin: 2,
  contentMax: 2000,
} as const;

const POST_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;
const DISALLOWED_CONTROL_PATTERN = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u;

export interface CommentSubmission {
  postSlug: string;
  authorName: string;
  content: string;
}

export type CommentValidationResult =
  | { isValid: true; value: CommentSubmission }
  | {
      isValid: false;
      code: 'invalid-payload' | 'invalid-slug' | 'invalid-author' | 'invalid-content' | 'honeypot';
      message: string;
    };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function normalizeText(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  return value.replace(/\r\n?/gu, '\n').trim();
}

export function validateCommentSubmission(payload: unknown): CommentValidationResult {
  if (!isRecord(payload)) {
    return { isValid: false, code: 'invalid-payload', message: '요청 형식이 올바르지 않습니다.' };
  }

  const website = normalizeText(payload.website);
  if (website) {
    return { isValid: false, code: 'honeypot', message: '요청을 처리할 수 없습니다.' };
  }

  const postSlug = normalizeText(payload.postSlug);
  if (!postSlug || !POST_SLUG_PATTERN.test(postSlug)) {
    return { isValid: false, code: 'invalid-slug', message: '게시글 경로가 올바르지 않습니다.' };
  }

  const authorName = normalizeText(payload.authorName);
  if (
    !authorName ||
    authorName.length < COMMENT_LIMITS.authorNameMin ||
    authorName.length > COMMENT_LIMITS.authorNameMax ||
    DISALLOWED_CONTROL_PATTERN.test(authorName)
  ) {
    return {
      isValid: false,
      code: 'invalid-author',
      message: `이름은 ${COMMENT_LIMITS.authorNameMin}~${COMMENT_LIMITS.authorNameMax}자로 입력해 주세요.`,
    };
  }

  const content = normalizeText(payload.content);
  if (
    !content ||
    content.length < COMMENT_LIMITS.contentMin ||
    content.length > COMMENT_LIMITS.contentMax ||
    DISALLOWED_CONTROL_PATTERN.test(content)
  ) {
    return {
      isValid: false,
      code: 'invalid-content',
      message: `댓글은 ${COMMENT_LIMITS.contentMin}~${COMMENT_LIMITS.contentMax}자로 입력해 주세요.`,
    };
  }

  return { isValid: true, value: { postSlug, authorName, content } };
}
