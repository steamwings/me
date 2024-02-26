// Next.js API route support: https://nextjs.org/docs/app/building-your-application/routing/route-handlers

import {NextResponse} from "next/server";

export async function GET(
  _req : Request,
  { params }: { params: { link: string, link2: string } })
{
  return NextResponse.json({message: `You've reached ${params.link}/${params.link2}!`})
}
