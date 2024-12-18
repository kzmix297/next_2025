import { getDraftProduct } from "@/app/actions";
import Product from "@/components/product/Product";

export default async function DrafPage() {
  const product = await getDraftProduct();

  return (
    <div className="flex p-2 flex-col bg-slate-400 items-center">
      <div className="text-center p-2 border rounded w-full font-extrabold text-2xl text-pretty bg-zinc-300">
        Products Draft
      </div>
      <div className="px-2 py-2 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {product ? <Product products={product} /> : null}
      </div>
    </div>
  );
}
