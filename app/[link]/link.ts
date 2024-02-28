import { resolveLink } from "lib/db/links";
import { NextRequest, NextResponse } from "next/server";

export async function redirect(req: NextRequest, path: string) {
  const linkRecord = await resolveLink(path);

  if (linkRecord == null) {
    const url = req.nextUrl.clone()
    url.pathname = '/404'
    return NextResponse.redirect(url);
  }

  return NextResponse.redirect(linkRecord.destination);
}
