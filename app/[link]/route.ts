import { NextRequest } from "next/server";
import { redirect } from "./link";

export async function GET(req : NextRequest, props: { params: Promise<{ link: string }> }) {
  const params = await props.params;
  return await redirect(req, params.link);
}
