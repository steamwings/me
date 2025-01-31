import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest, _props: { params: Promise<{ link: string }> }) {
  const url = req.nextUrl.clone()
  url.pathname = '/sets/20250201'
  return NextResponse.redirect(url);
}

