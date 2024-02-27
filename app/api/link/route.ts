import { getLinks } from "lib/db/links";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const data = await getLinks(params.get('path'));
  return NextResponse.json(data);
}
