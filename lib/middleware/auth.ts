import { NextRequest, NextResponse } from "next/server";
import { nonceCache } from "lib/auth/nonce-cache";
import { generateToken } from "lib/auth/generate-token";

export async function authMiddleware(request: NextRequest) {
  const requestToken = request.headers.get('Authorization')?.split(' ')[1]
  const nonce = request.headers.get('X-Nonce')

  if (requestToken == undefined) {
    return NextResponse.json({error: 'No token provided.'}, {status: 401});
  }

  if (nonce == undefined) {
    return NextResponse.json({error: 'No nonce provided.'}, {status: 401});
  }

  if (nonceCache.has(nonce)) {
    return NextResponse.json({error: 'Nonce already used.'}, {status: 401});
  }

  if (!(await validToken(requestToken, nonce))) {
    return NextResponse.json({error: 'Access denied. Level 8 clearance required.'}, {status: 401});
  }

  nonceCache.add(nonce);
}

async function validToken(requestToken: string, nonce: string) {
  try {
    const lastSecondToken = await generateToken(Math.floor(Date.now()/1000), nonce)
    const nextSecondToken = await generateToken(Math.ceil(Date.now()/1000), nonce)
    return requestToken === lastSecondToken ||
      requestToken === nextSecondToken
  } catch (error) {
    console.error(error)
    return false
  }
}
