import { NextRequest, NextResponse } from "next/server";

export async function authMiddleware(request: NextRequest) {
  const requestToken = request.headers.get('Authorization')?.split(' ')[1]
  if (requestToken == undefined) {
    return NextResponse.json({error: 'No token provided.'}, {status: 401});
  }
  else if (!(await validToken(requestToken))) {
    return NextResponse.json({error: 'Access denied. Level 8 clearance required.'}, {status: 401});
  }
}

async function validToken(requestToken: string) {
  try {
    const lastSecondToken = await generateToken(Math.floor(Date.now()/1000))
    const nextSecondToken = await generateToken(Math.ceil(Date.now()/1000))
    return requestToken === lastSecondToken ||
      requestToken === nextSecondToken
  } catch (error) {
    console.error(error)
    return false
  }
}

async function generateToken(timestamp: number) {
  const key = process.env.API_KEY
  if (key === undefined) {
    throw new Error('API_KEY not defined')
  }
  const data = key + timestamp.toString()
  const hash = await crypto.subtle.digest('SHA-512', new TextEncoder().encode(data))
  return Buffer.from(hash).toString('base64');
}
