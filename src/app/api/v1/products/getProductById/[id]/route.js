import { getDraftProductById } from "@/app/actions";

export async function GET(req, { params }) {
  const slug = params.slug;
  const product = await getDraftProductById(slug);
}
