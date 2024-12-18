"use client";

import { Suspense, useState } from "react";
import FormDataNEW from "./component/addProductForm";

import { Alert } from "react-bootstrap";
import { addProduct } from "@/app/actions";

export default function AddProduct() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState({
    brand: "",
    name: "",
    price: "",
    srcPic: ["", "", "", "", ""],
  });

  async function onSave(event) {
    event.preventDefault();
    try {
      const response = await addProduct(products);
      if (response.status === "success") {
        setProducts({
          brand: "",
          name: "",
          price: "",
          srcPic: ["", "", "", "", ""],
          link: "",
        });
        setError(false);
        setMessage("Product added successfully");
        setShow(true);
      } else {
        setError(true);
        setMessage("Failed to add product");
        setShow(true);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const link = formData.get("link");
      const response = await fetch("/api/v1/products/getProductsByLink", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ link }),
      });
      const data = await response.json();
      if (response.ok) {
        setProducts({ ...products, ...data });
      } else {
        console.log("Failed", data);
      }
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <div className="min-h-screen w-full mx-auto flex justify-center items-start p-2 bg-slate-400">
      <div className="flex flex-col w-full justify-center items-center gap-4 ">
        <div className="flex flex-col gap-2 w-4/5 items-center">
          <Alert
            variant={error ? "danger" : "success"}
            dismissible="true"
            show={show}
            onClose={() => setShow(false)}
          >
            {message}
          </Alert>
          <h3 className="text-color-accent text-4xl font-bold">Add Product</h3>
          <form
            className="flex flex-row gap-2 justify-center items-cente w-full"
            onSubmit={onSubmit}
          >
            <input
              className="border p-1 border-gray-500 rounded"
              type="text"
              name="link"
              id="link"
              placeholder="Link"
            />
            <button
              type="submit"
              className="bg-orange-300  rounded flex justify-center items-center w-36"
            >
              Cari
            </button>
          </form>
        </div>
        <Suspense fallback={<p>Loading feed...</p>}>
          <FormDataNEW
            products={products}
            setProducts={setProducts}
            onSave={onSave}
          />
        </Suspense>
      </div>
    </div>
  );
}
