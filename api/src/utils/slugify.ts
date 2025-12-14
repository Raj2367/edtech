/**
 * Generate a clean, SEO-friendly slug from any string.
 * Example: "Introduction to AI" → "introduction-to-ai"
 */
export function generateSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
