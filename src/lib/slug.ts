export function toSlug(value: string) {
  return value.trim().toLowerCase().replace(/\s+/gu, '-');
}

export function toHeadingId(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/gu, '-')
    .replace(/[^\p{L}\p{N}-]/gu, '');
}
