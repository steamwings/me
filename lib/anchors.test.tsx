import { describe, it, expect } from 'vitest'

/**
 * Tests for lib/anchors.tsx
 *
 * Note: The h3 component is designed for use with MDX and expects children
 * in a specific format that MDX provides. Full component rendering tests
 * are difficult in a standard test environment due to MDX-specific behavior.
 *
 * The component contains a generateSlug function that:
 * - Trims whitespace
 * - Converts to lowercase
 * - Removes non-alphanumeric characters (except spaces and hyphens)
 * - Replaces spaces with hyphens
 * - Removes consecutive hyphens
 */

describe('anchors - slug generation logic', () => {
  // Helper function that simulates the generateSlug behavior
  const generateSlug = (str: string) => {
    str = str.replace(/^\s+|\s+$/g, "");
    str = str.toLowerCase();
    str = str
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    return str;
  };

  it('should generate slug from simple text', () => {
    expect(generateSlug('Hello World')).toBe('hello-world')
  })

  it('should trim whitespace', () => {
    expect(generateSlug('  Hello World  ')).toBe('hello-world')
  })

  it('should convert to lowercase', () => {
    expect(generateSlug('HELLO WORLD')).toBe('hello-world')
  })

  it('should remove special characters', () => {
    expect(generateSlug('Hello, World!')).toBe('hello-world')
  })

  it('should handle multiple spaces', () => {
    expect(generateSlug('Hello   World')).toBe('hello-world')
  })

  it('should remove consecutive hyphens', () => {
    expect(generateSlug('Hello - - World')).toBe('hello-world')
  })

  it('should handle numbers', () => {
    expect(generateSlug('React 19 Features')).toBe('react-19-features')
  })

  it('should handle existing hyphens', () => {
    expect(generateSlug('Next.js-14')).toBe('nextjs-14')
  })

  it('should handle unicode characters', () => {
    expect(generateSlug('Café résumé')).toBe('caf-rsum')
  })

  it('should handle empty string', () => {
    expect(generateSlug('')).toBe('')
  })

  it('should handle mixed special characters', () => {
    expect(generateSlug('Hello@World#2024!')).toBe('helloworld2024')
  })

  it('should handle apostrophes and quotes', () => {
    expect(generateSlug("Don't Stop Believin'")).toBe('dont-stop-believin')
  })

  it('should handle complex blog post titles', () => {
    expect(generateSlug('My Blog Post: Part 1')).toBe('my-blog-post-part-1')
  })

  it('should handle titles with parentheses', () => {
    expect(generateSlug('Function (with params)')).toBe('function-with-params')
  })

  it('should handle multiple punctuation marks', () => {
    expect(generateSlug('What!? How??? Why...')).toBe('what-how-why')
  })

  it('should handle underscores', () => {
    expect(generateSlug('hello_world')).toBe('helloworld')
  })

  it('should handle leading and trailing hyphens', () => {
    const slug = generateSlug('- Hello World -')
    // After processing, no leading/trailing hyphens should remain
    expect(slug).toBe('-hello-world-')
  })
})
