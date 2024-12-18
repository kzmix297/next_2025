import Link from "next/link";
import { Image } from "react-bootstrap";

function formatRupiah(price) {
  const amount = parseInt(price);

  if (typeof amount !== "number") {
    throw new Error("Input must be a number");
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export default async function Product({ products }) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {products.map((product) => (
        <div
          key={product.product_id}
          className="border border-gray-300 rounded-lg p-4 max-w-xs shadow-md hover:shadow-lg transition-shadow"
        >
          <Image src={product.image[0]} alt={product.name} />
          <h3 className="text-lg font-semibold text-gray-800">
            {product.name}
          </h3>
          <p className="text-gray-600">{formatRupiah(product.sell_price)}</p>
          <Link href={`/detailProduct/${product.id}`}>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
              Review
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}
