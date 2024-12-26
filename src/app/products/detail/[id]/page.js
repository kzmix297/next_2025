"use client";
import { activateProduct, getProductDraft } from "@/app/actions";
import DownloadImages from "@/components/ButtonDownloadImage";
import WhatsAppButton from "@/components/ButtonWhatsapp";
import CarouselApp from "@/components/image/carousel";

import { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";

import CurrencyInput, { formatValue } from "react-currency-input-field";

export default function DetailProduct({ params }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getProductDraft(params.id);
      console.log(data);
      setProduct(data);
    }
    fetchData();
  }, [params.id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="flex bg-appaqua flex-row h-screen p-5  text-black justify-around">
      <div className="bg-appcoral w-96 max-h-96 rounded ">
        <CarouselApp variant="dark" src={product.image} />
      </div>

      <div className="flex flex-col w-1/2">
        <h1 className="text-3xl font-semibold text-black">{product.name}</h1>
        <p>{product.brand}</p>
        <p>
          {formatValue({
            value: product.price,
            prefix: "Rp. ",
            groupSeparator: ".",
            decimalSeparator: ".",
            decimalScale: 0,
            fixedDecimalScale: true,
          })}
        </p>
        <p className="text-lg text-black">{product.description}</p>
        <DownloadImages imageUrls={product.image} />
        <WhatsAppButton phoneNumber="6287814657055" />
      </div>
    </div>
  );
}
