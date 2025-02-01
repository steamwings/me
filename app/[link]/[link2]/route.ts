import { NextRequest } from "next/server";
import { redirect } from "../link";

export async function GET(
  req : NextRequest,
  props: { params: Promise<{ link: string, link2: string }> }
) {
  const params = await props.params;
  const path = params.link + '/' + params.link2
  return await redirect(req, path);
}
