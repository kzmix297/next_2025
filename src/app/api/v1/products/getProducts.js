import axios from "axios";
import { JSDOM } from "jsdom";

export async function getProducts() {
  const res = await fetch(
    "https://www.fashionette.de/sale/taschen/sort=discount_desc?price=0-350"
  );
  const data = await res.text();
  const dom = new JSDOM(data, { includeNodeLocations: true });
  const { document } = dom.window;

  const products = [];
  const productElements = document.querySelectorAll(
    "a.product-list__product-container"
  );

  productElements.forEach((element) => {
    const id = element.getAttribute("data-product-id"); // Selector untuk id produk
    const brand = element
      .querySelector("div.product-list__product-brand")
      ?.textContent.trim(); // Selector untuk nama produk
    const name = element
      .querySelector("div.product--list__item__name")
      ?.textContent.trim(); // Selector untuk nama produk

    const price = element.querySelector("p.text__strike")?.textContent.trim(); // Selector untuk harga produk
    const salePrice = element
      .querySelector("span.product__price--special-value")
      .textContent.trim();
    const sourcePic = element.querySelector("img").getAttribute("data-srcset");
    const srcPic = sourcePic.split("?")[0].trim();
    const link = element.getAttribute("href");

    if (brand && name && price && srcPic && link && salePrice) {
      products.push({ id, brand, name, price, srcPic, link, salePrice });
    }
  });

  return products;
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
      ? productNameElement.firstChild.textContent.trim()
      : null;

    // Extract price
    const priceElement = document.querySelector(
      ".product-details__description__price--special"
    );
    const price = priceElement ? priceElement.textContent.trim() : null;
    // Remove the currency symbol and any trailing characters

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
