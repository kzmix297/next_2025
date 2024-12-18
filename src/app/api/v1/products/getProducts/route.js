import { getProducts } from "../getProducts";

export async function GET() {
  const products = await getProducts();
  return Response.json(products);
}
