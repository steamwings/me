import { NextRequest } from "next/server";
import { redirect } from "../link";

export async function GET(
  req : NextRequest,
  { params }: { params: { link: string, link2: string } })
{
  const path = params.link + '/' + params.link2
  return redirect(req, path);
}
