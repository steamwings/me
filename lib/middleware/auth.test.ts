import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

// Mock the auth module to expose internal functions for testing
vi.mock('next/server', async () => {
  const actual = await vi.importActual('next/server')
  return {
    ...actual,
    NextResponse: {
      json: vi.fn((body, init) => ({ body, status: init?.status })),
    },
  }
})

describe('auth middleware', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Set API_KEY environment variable for tests
    process.env.API_KEY = 'test-secret-key'
  })

  describe('authMiddleware', () => {
    it('should return 401 when no token is provided', async () => {
      const { authMiddleware } = await import('./auth')
      const request = new NextRequest('http://localhost:3000/api/link')

      const response = await authMiddleware(request)

      expect(response).toBeDefined()
      expect(response?.status).toBe(401)
      expect(response?.body).toEqual({ error: 'No token provided.' })
    })

    it('should return 401 when Authorization header is malformed', async () => {
      const { authMiddleware } = await import('./auth')
      const request = new NextRequest('http://localhost:3000/api/link', {
        headers: {
          'Authorization': 'invalid-format'
        }
      })

      const response = await authMiddleware(request)

      expect(response).toBeDefined()
      expect(response?.status).toBe(401)
    })

    it('should return 401 for invalid token', async () => {
      const { authMiddleware } = await import('./auth')
      const request = new NextRequest('http://localhost:3000/api/link', {
        headers: {
          'Authorization': 'Bearer invalid-token-123'
        }
      })

      const response = await authMiddleware(request)

      expect(response).toBeDefined()
      expect(response?.status).toBe(401)
      expect(response?.body).toEqual({
        error: 'Access denied. Level 8 clearance required.'
      })
    })

    it('should return undefined for valid token (allow access)', async () => {
      // Generate a valid token for the current timestamp
      const timestamp = Math.floor(Date.now() / 1000)
      const key = 'test-secret-key'
      const data = key + timestamp.toString()
      const hash = await crypto.subtle.digest('SHA-512', new TextEncoder().encode(data))
      const validToken = Buffer.from(hash).toString('base64')

      const { authMiddleware } = await import('./auth')
      const request = new NextRequest('http://localhost:3000/api/link', {
        headers: {
          'Authorization': `Bearer ${validToken}`
        }
      })

      const response = await authMiddleware(request)

      // When authentication succeeds, middleware returns undefined
      expect(response).toBeUndefined()
    })

    it('should accept token from next second', async () => {
      // Generate a valid token for the next second
      const timestamp = Math.ceil(Date.now() / 1000)
      const key = 'test-secret-key'
      const data = key + timestamp.toString()
      const hash = await crypto.subtle.digest('SHA-512', new TextEncoder().encode(data))
      const validToken = Buffer.from(hash).toString('base64')

      const { authMiddleware } = await import('./auth')
      const request = new NextRequest('http://localhost:3000/api/link', {
        headers: {
          'Authorization': `Bearer ${validToken}`
        }
      })

      const response = await authMiddleware(request)

      expect(response).toBeUndefined()
    })

    it('should handle missing API_KEY environment variable', async () => {
      delete process.env.API_KEY

      const { authMiddleware } = await import('./auth')
      const request = new NextRequest('http://localhost:3000/api/link', {
        headers: {
          'Authorization': 'Bearer some-token'
        }
      })

      const response = await authMiddleware(request)

      expect(response).toBeDefined()
      expect(response?.status).toBe(401)
    })
  })

  describe('token generation', () => {
    it('should generate consistent tokens for same timestamp', async () => {
      const timestamp = 1234567890
      const key = 'test-secret-key'

      // Generate token twice with same timestamp
      const data = key + timestamp.toString()
      const hash1 = await crypto.subtle.digest('SHA-512', new TextEncoder().encode(data))
      const token1 = Buffer.from(hash1).toString('base64')

      const hash2 = await crypto.subtle.digest('SHA-512', new TextEncoder().encode(data))
      const token2 = Buffer.from(hash2).toString('base64')

      expect(token1).toBe(token2)
    })

    it('should generate different tokens for different timestamps', async () => {
      const key = 'test-secret-key'

      const timestamp1 = 1234567890
      const data1 = key + timestamp1.toString()
      const hash1 = await crypto.subtle.digest('SHA-512', new TextEncoder().encode(data1))
      const token1 = Buffer.from(hash1).toString('base64')

      const timestamp2 = 1234567891
      const data2 = key + timestamp2.toString()
      const hash2 = await crypto.subtle.digest('SHA-512', new TextEncoder().encode(data2))
      const token2 = Buffer.from(hash2).toString('base64')

      expect(token1).not.toBe(token2)
    })

    it('should use SHA-512 hashing', async () => {
      const timestamp = 1234567890
      const key = 'test-secret-key'
      const data = key + timestamp.toString()

      const hash = await crypto.subtle.digest('SHA-512', new TextEncoder().encode(data))
      const token = Buffer.from(hash).toString('base64')

      // SHA-512 produces 64-byte hash, base64 encoded is 88 characters
      expect(token.length).toBe(88)
    })
  })
})
