import { NextRequest } from "next/server";
import { redirect } from "./link";

export async function GET(
  req : NextRequest,
  { params }: { params: { link: string } })
{
  return redirect(req, params.link);
}
