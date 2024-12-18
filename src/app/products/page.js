"use client";
import { getProductsActive } from "@/app/actions";
import CarouselApp from "@/components/image/carousel";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Carousel, Image } from "react-bootstrap";
import { formatValue } from "react-currency-input-field";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterProduct, setFilterProduct] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getProductsActive();
      setProducts(res);
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col gap-2 p-16 ">
      <h1 className="text-3xl font-semibold">Products Terbaru</h1>
      <div className="grid w-full gap-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div key={product.id}>
            <Link
              href={`/products/detail/${product.id}`}
              key={product.id}
              className="flex flex-col bg-white  rounded-md border items-center justify-center border-slate-950 hover:shadow-md transition duration-300 hover:scale-105"
            >
              <CarouselApp variant="dark" src={product.image} />
              <h2 className="text-lg w-30 h-7 font-semibold text-center overflow-hidden text-ellipsis">
                {product.name}
              </h2>

              <p className="text-lg">
                {formatValue({
                  value: product.price,
                  groupSeparator: ".",
                  decimalSeparator: ",",
                  prefix: "Rp",
                })}
              </p>
            </Link>
          </div>
        ))}

        {products.length === 0 && <p>No products available</p>}
      </div>
    </div>
  );
}
