export function toSlug(value: string) {
  return value.trim().toLowerCase().replace(/\s+/gu, '-');
}
