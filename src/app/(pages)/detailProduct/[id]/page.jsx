"use client";
import { activateProduct, getProductDraft } from "@/app/actions";
import FloatingLabelApp from "@/components/FloatingLabel";
import CarouselApp from "@/components/image/carousel";

import { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";

import CurrencyInput from "react-currency-input-field";

export default function DetailProduct({ params }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getProductDraft(params.id);
      setProduct(data);
      console.log("data", data);
    }
    fetchData();
  }, [params.id]);

  async function handleSubmit(product) {
    console.log(product);
    const response = await activateProduct(product);
    if (response.status === "success") {
      alert("Product has been activated");
    } else {
      Alert("Failed to activate product");
    }
  }

  if (!product) return <div>Loading...</div>;

  return (
    <div className="flex flex-row h-screen p-5 bg-slate-500 text-black justify-around">
      <div className="w-1/4 h-20 bg-slate-400 border rounded-md">
        <CarouselApp variant="dark" src={product.image} />
      </div>
      <div className="flex flex-col gap-2 w-1/2">
        <Form>
          <Form.Check // prettier-ignore
            type="switch"
            id="custom-switch"
            label="Discount"
            checked={product.is_discount}
            onChange={(e) =>
              setProduct({ ...product, is_discount: e.target.checked })
            }
          />
        </Form>
        <FloatingLabelApp
          id="Brand"
          label="BRAND"
          value={product.brand}
          onChange={(e) => setProduct({ ...product, brand: e.target.value })}
        />
        <FloatingLabelApp
          id="name"
          label="Product Name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />
        <FloatingLabelApp
          id="berat"
          label="Berat (gram)"
          value={product.weight}
          onChange={(e) => setProduct({ ...product, weight: e.target.value })}
        />
        <FloatingLabelApp
          id="size"
          label="size (cm)"
          value={product.size}
          onChange={(e) => setProduct({ ...product, size: e.target.value })}
        />
        <div className="flex flex-row items-center gap-2">
          <label className="text-white">HARGA BELI</label>
          <CurrencyInput
            className="p-1 border rounded-md"
            id="input-example"
            name="price"
            prefix="Rp."
            placeholder="Please enter a number"
            defaultValue={product.buy_price}
            decimalsLimit={2}
            onValueChange={(value, name, values) =>
              setProduct({ ...product, buy_price: value })
            }
          />
        </div>

        <div className="flex flex-row items-center ">
          <label className="text-white">HARGA JUAL</label>
          <CurrencyInput
            className="p-1 border rounded-md"
            id="input-example"
            name="price"
            prefix="Rp."
            placeholder="Please enter a number"
            defaultValue={product.price}
            decimalsLimit={2}
            onValueChange={(value, name, values) =>
              setProduct({ ...product, price: value })
            }
          />
        </div>
        <FloatingLabelApp
          id="description"
          label="Description"
          type="textarea"
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
        />
        <Button
          type="submit"
          onClick={() => handleSubmit(product)}
          className="bg-fuchsia-950 text-cyan-500"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
