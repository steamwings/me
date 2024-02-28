import { addLink, deleteLink, getLinks, updateLink } from "lib/db/links";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return handleError(get(req));
}

export async function POST(req: NextRequest) {
  return handleError(create(req));
}

export async function PUT(req: NextRequest) {
  return handleError(update(req));
}

export async function DELETE(req: NextRequest) {
  return handleError(remove(req));
}

async function get(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const data = await getLinks(params.get('path'));
  return NextResponse.json(data);
}

async function create(req: NextRequest) {
  const { path, destination } = await req.json();
  const result = await addLink(path, destination);
  return NextResponse.json(result);
}

async function update(req: NextRequest) {
  const { path, destination } = await req.json();
  const result = await updateLink(path, destination);
  return NextResponse.json(result);
}

async function remove(req: NextRequest) {
  const { path } = await req.json();
  const result = await deleteLink(path);
  return NextResponse.json(result);
}

async function handleError(wrapped: Promise<NextResponse>) {
  try {
    return await wrapped;
  } catch (e) {
    console.error(e);
    // Maybe consider mapping errors to other status codes here
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
