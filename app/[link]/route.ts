import { redirect } from "./link";

export async function GET(
  _req : Request,
  { params }: { params: { link: string } })
{
  return redirect(params.link);
}
