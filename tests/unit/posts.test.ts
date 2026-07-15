import { describe, expect, it } from 'vitest';
import { readingTime, sortPosts } from '../../src/lib/posts';

describe('post utilities', () => {
  it('sorts newest posts first and breaks ties by id', () => {
    const posts = [
      { id: 'z-post', data: { publishedAt: '2026-07-15' } },
      { id: 'a-post', data: { publishedAt: '2026-07-15' } },
      { id: 'old-post', data: { publishedAt: '2026-07-14' } },
    ];
    expect(sortPosts(posts).map((post) => post.id)).toEqual(['a-post', 'z-post', 'old-post']);
  });

  it('returns at least one minute for empty content', () => {
    expect(readingTime('')).toBe(1);
    expect(readingTime('one '.repeat(221))).toBe(2);
  });
});
