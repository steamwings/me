import { describe, it, expect } from 'vitest'
import {
  dehumanize,
  escapeHtml,
  titelize,
  humanize,
  toLongDate,
  toLocaleDate,
} from './format'

describe('dehumanize', () => {
  it('should convert string to lowercase with underscores', () => {
    expect(dehumanize('Hello World')).toBe('hello_world')
  })

  it('should remove non-word characters except underscores', () => {
    expect(dehumanize('Hello, World!')).toBe('hello_world')
  })

  it('should handle multiple spaces', () => {
    expect(dehumanize('Hello   World')).toBe('hello___world')
  })

  it('should handle already dehumanized strings', () => {
    expect(dehumanize('hello_world')).toBe('hello_world')
  })

  it('should handle special characters', () => {
    expect(dehumanize('Hello@World#2024')).toBe('helloworld2024')
  })

  it('should handle empty string', () => {
    expect(dehumanize('')).toBe('')
  })
})

describe('escapeHtml', () => {
  it('should escape HTML special characters', () => {
    expect(escapeHtml('<div>')).toBe('&#0060;div&#0062;')
  })

  it('should escape ampersand', () => {
    expect(escapeHtml('&')).toBe('&#0038;')
  })

  it('should escape quotes', () => {
    expect(escapeHtml('"')).toBe('&#0034;')
  })

  it('should escape multiple special characters', () => {
    expect(escapeHtml('<script>alert("XSS")</script>')).toContain('&#0060;')
  })

  it('should not modify alphanumeric characters', () => {
    expect(escapeHtml('abc123')).toBe('abc123')
  })

  it('should handle empty string', () => {
    expect(escapeHtml('')).toBe('')
  })
})

describe('humanize', () => {
  it('should replace underscores with spaces', () => {
    expect(humanize('hello_world')).toBe('hello world')
  })

  it('should handle multiple underscores', () => {
    expect(humanize('hello_world_test')).toBe('hello world test')
  })

  it('should handle strings without underscores', () => {
    expect(humanize('helloworld')).toBe('helloworld')
  })

  it('should handle empty string', () => {
    expect(humanize('')).toBe('')
  })

  it('should handle consecutive underscores', () => {
    expect(humanize('hello__world')).toBe('hello  world')
  })
})

describe('titelize', () => {
  it('should capitalize first letter of each word', () => {
    expect(titelize('hello world')).toBe('Hello World')
  })

  it('should work with underscored strings', () => {
    expect(titelize('hello_world')).toBe('Hello World')
  })

  it('should handle single word', () => {
    expect(titelize('hello')).toBe('Hello')
  })

  it('should handle already titleized string', () => {
    expect(titelize('Hello World')).toBe('Hello World')
  })

  it('should not capitalize after apostrophe', () => {
    expect(titelize("don't")).toBe("Don't")
  })

  it('should handle empty string', () => {
    expect(titelize('')).toBe('')
  })

  it('should handle mixed case input', () => {
    expect(titelize('hELLo_wORLD')).toBe('HELLo WORLD')
  })
})

describe('toLocaleDate', () => {
  it('should format date to locale string', () => {
    const date = new Date('2024-01-15T12:00:00Z')
    const result = toLocaleDate(date)
    expect(result).toBe('January 15, 2024')
  })

  it('should use UTC timezone by default', () => {
    const date = new Date('2024-12-25T00:00:00Z')
    const result = toLocaleDate(date)
    expect(result).toBe('December 25, 2024')
  })

  it('should accept custom timezone', () => {
    const date = new Date('2024-06-01T00:00:00Z')
    const result = toLocaleDate(date, 'America/New_York')
    // Result depends on system locale, but should be a valid date string
    expect(result).toMatch(/\d{4}/)
  })
})

describe('toLongDate', () => {
  it('should convert date string ID to long date format', () => {
    const result = toLongDate('20240115')
    expect(result).toBe('January 15, 2024')
  })

  it('should handle different months', () => {
    expect(toLongDate('20240301')).toBe('March 1, 2024')
    expect(toLongDate('20241225')).toBe('December 25, 2024')
  })

  it('should handle single digit days', () => {
    expect(toLongDate('20240105')).toBe('January 5, 2024')
  })

  it('should handle end of month dates', () => {
    expect(toLongDate('20240131')).toBe('January 31, 2024')
    expect(toLongDate('20240229')).toBe('February 29, 2024') // Leap year
  })

  it('should handle different years', () => {
    expect(toLongDate('20230615')).toBe('June 15, 2023')
    expect(toLongDate('20250401')).toBe('April 1, 2025')
  })
})
