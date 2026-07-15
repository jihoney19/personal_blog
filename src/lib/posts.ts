export type SortablePost = { id: string; data: { publishedAt: string } };

export function sortPosts(posts: SortablePost[]) {
  return [...posts].sort(
    (a, b) => b.data.publishedAt.localeCompare(a.data.publishedAt) || a.id.localeCompare(b.id),
  );
}

export function readingTime(text: string, wordsPerMinute = 220) {
  const words = text.trim() ? text.trim().split(/\s+/u).length : 0;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}
