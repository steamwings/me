import { resolveLink } from "lib/db/links";
import { NextResponse } from "next/server";

export async function redirect(path: string) {
  const linkRecord = await resolveLink(path);

  if (linkRecord == null) {
    return NextResponse.redirect('/404');
  }

  return NextResponse.redirect(linkRecord.destination);
}
