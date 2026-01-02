export async function generateToken(timestamp: number, nonce: string) {
  const key = process.env.API_KEY
  if (key === undefined) {
    throw new Error('API_KEY not defined')
  }

  // Import the API key as an HMAC key
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(key),
    { name: 'HMAC', hash: 'SHA-512' },
    false,
    ['sign']
  )

  // Create the message to sign (timestamp:nonce)
  const message = timestamp.toString() + ':' + nonce
  const signature = await crypto.subtle.sign(
    'HMAC',
    cryptoKey,
    new TextEncoder().encode(message)
  )

  return Buffer.from(signature).toString('base64');
}
