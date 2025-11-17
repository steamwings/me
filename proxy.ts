import { authMiddleware } from 'lib/middleware/auth';
import type { NextRequest } from 'next/server'

const PUBLIC_PATHS = [
  '/api/hello'
]

export function proxy(request: NextRequest) {
  if (requiresAuth(request.nextUrl.pathname)) {
    return authMiddleware(request);
  }
}

function requiresAuth(path) {
  return path.startsWith('/api') && !PUBLIC_PATHS.includes(path);
}
