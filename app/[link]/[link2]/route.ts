import { redirect } from "../link";

export async function GET(
  _req : Request,
  { params }: { params: { link: string, link2: string } })
{
  const path = params.link + '/' + params.link2
  return redirect(path);
}
