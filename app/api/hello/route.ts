// Next.js API route support: https://nextjs.org/docs/app/building-your-application/routing/route-handlers

import {NextResponse} from "next/server";

export async function GET(_req : Request) {
  console.log('hello, console')
  return NextResponse.json({message: 'Hi, I\'m Zander'})
}
