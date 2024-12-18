"use server";

import { signIn, signOut } from "@/auth";
import { auth } from "@/auth";
import axios from "axios";

import { JSDOM } from "jsdom";
import { formatValue } from "react-currency-input-field";

async function postNoAuth(resource, data) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function postWithAuth(resource, data) {
  const token = (await auth()).user.accessToken;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );
    const json = await res.json();

    return json;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getNoAuth(resource) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}`,
      {
        cache: "no-store",
      }
    );
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getWithAuth(resource) {
  const token = (await auth()).user.accessToken;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function doSocialLogin(formData) {
  const action = formData.get("action");
  await signIn(action, { redirectTo: "/home" });
}

export async function addProduct(data) {
  const formattedPrice = data.price
    ? data.price.replace(/[^\d,]/g, "").trim()
    : null;
  data.price = formattedPrice
    ? parseFloat(formattedPrice.replace(",", "."))
    : null;
  try {
    const response = await postWithAuth(`product`, data);

    if (response.status === "success") {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    console.log("ERROR", error);
    throw error;
  }
}

export async function activateProduct(data) {
  try {
    const response = await postWithAuth(`product/activate`, data);

    if (response.status === "success") {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    console.log("ERROR", error);
    throw error;
  }
}

export async function doLogout() {
  //NOTE - masuk ke dalam fungsi ini untuk backend
  await signOut({ redirectTo: "/" });
}

export async function doCredentialLogin(formData) {
  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    return response;
  } catch (err) {
    throw err;
  }
}

export async function getAuth() {
  const session = await auth();
  return session;
}

export async function getProductByLink(link) {
  try {
    // Fetch HTML content
    const response = await axios.get(link);
    const html = response.data;

    // Parse HTML with jsdom
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Extract brand name
    const brandElement = document.querySelector(
      ".product-details__description__brand a"
    );
    const brandName = brandElement ? brandElement.textContent.trim() : null;

    // Extract product name
    const productNameElement = document.querySelector(
      ".product-details__description__name"
    );
    const productName = productNameElement
      ? productNameElement.textContent.trim()
      : null;

    // Extract price
    const priceElement = document.querySelector(
      ".product-details__description__price--special"
    );
    const price = priceElement ? priceElement.textContent.trim() : null;

    return {
      brand: brandName,
      name: productName,
      price: price,
      link: link,
    };
  } catch (error) {
    console.error("Error scraping data:", error);
    return null;
  }
}

export async function getProductDraft(id) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${id}`
    );

    const product = await response.data;

    return product.data;
  } catch (error) {
    return [];
  }
}

const downloadImage = async () => {
  const fileUrl = product.image;
  const fileName = `${product.name}.jpg`;

  try {
    // Fetch file data sebagai blob
    const response = await fetch(fileUrl);
    if (!response.ok) throw new Error("Network response was not ok");

    const blob = await response.blob();

    // Membuat URL sementara untuk Blob
    const blobUrl = window.URL.createObjectURL(blob);

    // Membuat elemen <a> untuk memulai unduhan
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName;

    // Memicu unduhan
    document.body.appendChild(link);
    link.click();

    // Membersihkan URL Blob sementara
    window.URL.revokeObjectURL(blobUrl);
    document.body.removeChild(link);
  } catch (error) {
    console.error("Failed to download file:", error);
  }
};

export async function formatRupiah(price) {
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

export async function getDraftProductById(id) {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${id}`;

  const res = await fetch(url, {
    cache: "no-store",
  });
  const data = await res.json();
  return data.data;
}

export async function getDraftProduct() {
  const res = await getWithAuth("products/draft");
  const data = res;
  return data.data;
}

export async function getProductsActive() {
  const res = await getNoAuth("products");
  return res;
}
