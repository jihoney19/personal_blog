import { describe, expect, it } from 'vitest';
import { getAdjacentPosts, readingTime, sortPosts } from '../../src/lib/posts';
import { toHeadingId } from '../../src/lib/slug';

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

  it('keeps previous and next posts within the current log type', () => {
    const posts = [
      { id: 'learning-new', data: { publishedAt: '2026-07-16', type: 'Learning Notes' } },
      { id: 'article-new', data: { publishedAt: '2026-07-16', type: 'Technical Articles' } },
      { id: 'learning-current', data: { publishedAt: '2026-07-15', type: 'Learning Notes' } },
      { id: 'article-old', data: { publishedAt: '2026-07-14', type: 'Technical Articles' } },
      { id: 'learning-old', data: { publishedAt: '2026-07-14', type: 'Learning Notes' } },
    ];

    const adjacent = getAdjacentPosts(posts, 'learning-current', 'Learning Notes');

    expect(adjacent.previous?.id).toBe('learning-old');
    expect(adjacent.next?.id).toBe('learning-new');
  });

  it('matches the rendered heading ID rule for punctuation', () => {
    expect(toHeadingId('Astro: 콘텐츠 중심 사이트에 맞는 프레임워크')).toBe(
      'astro-콘텐츠-중심-사이트에-맞는-프레임워크',
    );
  });
});
