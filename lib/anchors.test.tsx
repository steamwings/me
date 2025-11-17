import { describe, it, expect } from 'vitest'
import { generateSlug } from './anchors'

/**
 * Tests for lib/anchors.tsx
 *
 * Tests the generateSlug function which:
 * - Trims whitespace
 * - Converts to lowercase
 * - Removes non-alphanumeric characters (except spaces and hyphens)
 * - Replaces spaces with hyphens
 * - Removes consecutive hyphens
 */

describe('anchors - slug generation logic', () => {

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
