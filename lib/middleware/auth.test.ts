import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'
import { randomUUID } from 'crypto'
import { generateToken } from 'lib/auth/generate-token'
import { nonceCache } from 'lib/auth/nonce-cache'

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
  beforeEach(async () => {
    vi.clearAllMocks()
    // Set API_KEY environment variable for tests
    process.env.API_KEY = 'test-secret-key'
    // Clear nonce cache between tests
    nonceCache.clear()
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

    it('should return 401 when no nonce is provided', async () => {
      const { authMiddleware } = await import('./auth')
      const request = new NextRequest('http://localhost:3000/api/link', {
        headers: {
          'Authorization': 'Bearer some-token',
          'X-Timestamp': Math.floor(Date.now() / 1000).toString()
        }
      })

      const response = await authMiddleware(request)

      expect(response).toBeDefined()
      expect(response?.status).toBe(401)
      expect(response?.body).toEqual({ error: 'No nonce provided.' })
    })

    it('should return 401 when no timestamp is provided', async () => {
      const { authMiddleware } = await import('./auth')
      const nonce = randomUUID()
      const request = new NextRequest('http://localhost:3000/api/link', {
        headers: {
          'Authorization': 'Bearer some-token',
          'X-Nonce': nonce
        }
      })

      const response = await authMiddleware(request)

      expect(response).toBeDefined()
      expect(response?.status).toBe(401)
      expect(response?.body).toEqual({ error: 'No timestamp provided.' })
    })

    it('should return 401 when timestamp format is invalid', async () => {
      const { authMiddleware } = await import('./auth')
      const nonce = randomUUID()
      const request = new NextRequest('http://localhost:3000/api/link', {
        headers: {
          'Authorization': 'Bearer some-token',
          'X-Nonce': nonce,
          'X-Timestamp': 'not-a-number'
        }
      })

      const response = await authMiddleware(request)

      expect(response).toBeDefined()
      expect(response?.status).toBe(401)
      expect(response?.body).toEqual({ error: 'Invalid timestamp format.' })
    })

    it('should return 401 when Authorization header is malformed', async () => {
      const { authMiddleware } = await import('./auth')
      const nonce = randomUUID()
      const timestamp = Math.floor(Date.now() / 1000)
      const request = new NextRequest('http://localhost:3000/api/link', {
        headers: {
          'Authorization': 'invalid-format',
          'X-Nonce': nonce,
          'X-Timestamp': timestamp.toString()
        }
      })

      const response = await authMiddleware(request)

      expect(response).toBeDefined()
      expect(response?.status).toBe(401)
    })

    it('should return 401 for invalid token', async () => {
      const { authMiddleware } = await import('./auth')
      const nonce = randomUUID()
      const timestamp = Math.floor(Date.now() / 1000)
      const request = new NextRequest('http://localhost:3000/api/link', {
        headers: {
          'Authorization': 'Bearer invalid-token-123',
          'X-Nonce': nonce,
          'X-Timestamp': timestamp.toString()
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
      const nonce = randomUUID()
      const validToken = await generateToken(timestamp, nonce)

      const { authMiddleware } = await import('./auth')
      const request = new NextRequest('http://localhost:3000/api/link', {
        headers: {
          'Authorization': `Bearer ${validToken}`,
          'X-Nonce': nonce,
          'X-Timestamp': timestamp.toString()
        }
      })

      const response = await authMiddleware(request)

      // When authentication succeeds, middleware returns undefined
      expect(response).toBeUndefined()
    })

    it('should accept timestamp within valid window', async () => {
      // Generate a valid token for a timestamp 10 seconds in the past
      const timestamp = Math.floor(Date.now() / 1000) - 10
      const nonce = randomUUID()
      const validToken = await generateToken(timestamp, nonce)

      const { authMiddleware } = await import('./auth')
      const request = new NextRequest('http://localhost:3000/api/link', {
        headers: {
          'Authorization': `Bearer ${validToken}`,
          'X-Nonce': nonce,
          'X-Timestamp': timestamp.toString()
        }
      })

      const response = await authMiddleware(request)

      expect(response).toBeUndefined()
    })

    it('should reject timestamp outside valid window', async () => {
      // Generate a token for a timestamp 60 seconds in the past (outside 30s window)
      const timestamp = Math.floor(Date.now() / 1000) - 60
      const nonce = randomUUID()
      const validToken = await generateToken(timestamp, nonce)

      const { authMiddleware } = await import('./auth')
      const request = new NextRequest('http://localhost:3000/api/link', {
        headers: {
          'Authorization': `Bearer ${validToken}`,
          'X-Nonce': nonce,
          'X-Timestamp': timestamp.toString()
        }
      })

      const response = await authMiddleware(request)

      expect(response).toBeDefined()
      expect(response?.status).toBe(401)
      expect(response?.body).toEqual({ error: 'Timestamp outside valid window.' })
    })

    it('should reject replay attack (same nonce used twice)', async () => {
      const timestamp = Math.floor(Date.now() / 1000)
      const nonce = randomUUID()
      const validToken = await generateToken(timestamp, nonce)

      const { authMiddleware } = await import('./auth')

      // First request should succeed
      const request1 = new NextRequest('http://localhost:3000/api/link', {
        headers: {
          'Authorization': `Bearer ${validToken}`,
          'X-Nonce': nonce,
          'X-Timestamp': timestamp.toString()
        }
      })
      const response1 = await authMiddleware(request1)
      expect(response1).toBeUndefined()

      // Second request with same nonce should fail (replay attack)
      const request2 = new NextRequest('http://localhost:3000/api/link', {
        headers: {
          'Authorization': `Bearer ${validToken}`,
          'X-Nonce': nonce,
          'X-Timestamp': timestamp.toString()
        }
      })
      const response2 = await authMiddleware(request2)
      expect(response2).toBeDefined()
      expect(response2?.status).toBe(401)
      expect(response2?.body).toEqual({ error: 'Nonce already used.' })
    })

    it('should handle missing API_KEY environment variable', async () => {
      delete process.env.API_KEY

      const { authMiddleware } = await import('./auth')
      const nonce = randomUUID()
      const timestamp = Math.floor(Date.now() / 1000)
      const request = new NextRequest('http://localhost:3000/api/link', {
        headers: {
          'Authorization': 'Bearer some-token',
          'X-Nonce': nonce,
          'X-Timestamp': timestamp.toString()
        }
      })

      const response = await authMiddleware(request)

      expect(response).toBeDefined()
      expect(response?.status).toBe(401)
    })
  })

  describe('token generation', () => {
    it('should generate consistent tokens for same timestamp and nonce', async () => {
      const timestamp = 1234567890
      const nonce = randomUUID()

      // Generate token twice with same timestamp and nonce
      const token1 = await generateToken(timestamp, nonce)
      const token2 = await generateToken(timestamp, nonce)

      expect(token1).toBe(token2)
    })

    it('should generate different tokens for different timestamps', async () => {
      const nonce = randomUUID()

      const token1 = await generateToken(1234567890, nonce)
      const token2 = await generateToken(1234567891, nonce)

      expect(token1).not.toBe(token2)
    })

    it('should generate different tokens for different nonces', async () => {
      const timestamp = 1234567890

      const nonce1 = randomUUID()
      const token1 = await generateToken(timestamp, nonce1)

      const nonce2 = randomUUID()
      const token2 = await generateToken(timestamp, nonce2)

      expect(token1).not.toBe(token2)
    })

    it('should use HMAC-SHA-512', async () => {
      const timestamp = 1234567890
      const nonce = randomUUID()

      const token = await generateToken(timestamp, nonce)

      // HMAC-SHA-512 produces 64-byte signature, base64 encoded is 88 characters
      expect(token.length).toBe(88)
    })
  })
})
