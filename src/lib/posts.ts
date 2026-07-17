export type SortablePost = { id: string; data: { publishedAt: string } };
export type TypedPost = SortablePost & { data: { type: string } };

export function sortPosts<T extends SortablePost>(posts: T[]): T[] {
  return [...posts].sort(
    (a, b) => b.data.publishedAt.localeCompare(a.data.publishedAt) || a.id.localeCompare(b.id),
  );
}

export function getAdjacentPosts<T extends TypedPost>(
  posts: T[],
  currentId: string,
  currentType: string,
) {
  const ordered = sortPosts(posts.filter((post) => post.data.type === currentType));
  const index = ordered.findIndex((post) => post.id === currentId);

  return {
    previous: index === -1 ? undefined : ordered[index + 1],
    next: index === -1 ? undefined : ordered[index - 1],
  };
}

export function readingTime(text: string) {
  const codeBlocks = [...text.matchAll(/```[\s\S]*?```/gu)];
  const prose = text.replace(/```[\s\S]*?```/gu, '').trim();
  const proseMinutes = prose ? prose.length / 500 : 0;
  const codeMinutes = (codeBlocks.length * 15) / 60;
  return Math.max(1, Math.ceil(proseMinutes + codeMinutes));
}
