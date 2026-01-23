import { NextRequest, NextResponse } from "next/server";
import { nonceCache } from "lib/auth/nonce-cache";
import { generateToken } from "lib/auth/generate-token";

const TIMESTAMP_WINDOW_SECONDS = parseInt(process.env.TIMESTAMP_WINDOW_SECONDS || '30', 10);

export async function authMiddleware(request: NextRequest) {
  const requestToken = request.headers.get('Authorization')?.split(' ')[1]
  const nonce = request.headers.get('X-Nonce')
  const timestamp = request.headers.get('X-Timestamp')

  if (requestToken == undefined) {
    return NextResponse.json({error: 'No token provided.'}, {status: 401});
  }

  if (nonce == undefined) {
    return NextResponse.json({error: 'No nonce provided.'}, {status: 401});
  }

  if (timestamp == undefined) {
    return NextResponse.json({error: 'No timestamp provided.'}, {status: 401});
  }

  const timestampNum = parseInt(timestamp, 10);
  if (isNaN(timestampNum)) {
    return NextResponse.json({error: 'Invalid timestamp format.'}, {status: 401});
  }

  const currentTime = Math.floor(Date.now() / 1000);
  const timeDiff = Math.abs(currentTime - timestampNum);

  if (timeDiff > TIMESTAMP_WINDOW_SECONDS) {
    return NextResponse.json({error: 'Timestamp outside valid window.'}, {status: 401});
  }

  if (nonceCache.has(nonce)) {
    return NextResponse.json({error: 'Nonce already used.'}, {status: 401});
  }

  if (!(await validToken(requestToken, timestampNum, nonce))) {
    return NextResponse.json({error: 'Access denied. Level 8 clearance required.'}, {status: 401});
  }

  nonceCache.add(nonce);
}

async function validToken(requestToken: string, timestamp: number, nonce: string) {
  try {
    const expectedToken = await generateToken(timestamp, nonce)
    return requestToken === expectedToken
  } catch (error) {
    console.error(error)
    return false
  }
}
