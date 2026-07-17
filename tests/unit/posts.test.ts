import { describe, expect, it } from 'vitest';
import { getAdjacentPosts, readingTime, sortPosts } from '../../src/lib/posts';
import { toHeadingId } from '../../src/lib/slug';

describe('post utilities', () => {
  it('sorts newest posts first and breaks ties by id', () => {
    const posts = [
      { id: 'z-post', data: { pubDate: '2026-07-15' } },
      { id: 'a-post', data: { pubDate: '2026-07-15' } },
      { id: 'old-post', data: { pubDate: '2026-07-14' } },
    ];
    expect(sortPosts(posts).map((post) => post.id)).toEqual(['a-post', 'z-post', 'old-post']);
  });

  it('returns at least one minute for empty content', () => {
    expect(readingTime('')).toBe(1);
    expect(readingTime('one '.repeat(221))).toBe(2);
  });

  it('keeps previous and next posts within the current log type', () => {
    const posts = [
      { id: 'learning-new', data: { pubDate: '2026-07-16', type: 'Note' } },
      { id: 'article-new', data: { pubDate: '2026-07-16', type: 'Article' } },
      { id: 'learning-current', data: { pubDate: '2026-07-15', type: 'Note' } },
      { id: 'article-old', data: { pubDate: '2026-07-14', type: 'Article' } },
      { id: 'learning-old', data: { pubDate: '2026-07-14', type: 'Note' } },
    ];

    const adjacent = getAdjacentPosts(posts, 'learning-current', 'Note');

    expect(adjacent.previous?.id).toBe('learning-old');
    expect(adjacent.next?.id).toBe('learning-new');
  });

  it('matches the rendered heading ID rule for punctuation', () => {
    expect(toHeadingId('Astro: 콘텐츠 중심 사이트에 맞는 프레임워크')).toBe(
      'astro-콘텐츠-중심-사이트에-맞는-프레임워크',
    );
  });
});
