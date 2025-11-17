import { describe, it, expect } from 'vitest'
import { Destination, getUrl } from './nav'

describe('Destination enum', () => {
  it('should have None value', () => {
    expect(Destination.None).toBeDefined()
    expect(Destination.None).toBe(0)
  })

  it('should have Up value', () => {
    expect(Destination.Up).toBeDefined()
    expect(Destination.Up).toBe(1)
  })
})

describe('getUrl', () => {
  it('should return empty string for None destination', () => {
    expect(getUrl(Destination.None)).toBe('')
  })

  it('should return "./" for Up destination', () => {
    expect(getUrl(Destination.Up)).toBe('./')
  })

  it('should handle numeric enum values', () => {
    expect(getUrl(0 as Destination)).toBe('')
    expect(getUrl(1 as Destination)).toBe('./')
  })
})
