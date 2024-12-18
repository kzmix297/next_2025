import { getProductByLink } from "@/app/actions";

export async function POST(req) {
  const data = await req.json();

  const { link } = data;

  if (!link) {
    return res.status(400).json({ error: "Link is required" });
  }

  const products = await getProductByLink(link);

  return Response.json(products);
}
