import {NextResponse} from "next/server";
import { redirect } from 'next/navigation'

export async function GET(
  _req : Request,
  { params }: { params: { link: string } })
{
  if (params.link == "error") {
    redirect('/404');
  }

  return NextResponse.json({message: `You've reached ${params.link}!`})
}
