export default function FormDataNEW(props) {
  const { products, setProducts, onSave } = props;

  return (
    <div className="flex flex-col gap-2 w-5/6">
      <h3 className="text-color-accent text-2xl font-bold">Product</h3>
      <div className="flex flex-col gap-2">
        <form
          className="flex flex-col gap-2 justify-center items-center "
          onSubmit={onSave}
        >
          <div className="flex flex-row justify-around items-start">
            <div className="flex flex-col gap-2 items-start justify-center">
              <div className="flex gap-4 items-center justify-stretch">
                <label className="w-20" htmlFor="brand">
                  Brand:
                </label>
                <input
                  className="border p-1 w-50  border-gray-500 rounded"
                  type="text"
                  name="brand"
                  id="brand"
                  placeholder="Brand"
                  value={products.brand}
                  onChange={(e) =>
                    setProducts({ ...products, brand: e.target.value })
                  }
                />
              </div>
              <div className="flex gap-4 items-center">
                <label className="w-20" htmlFor="name">
                  Name:
                </label>
                <input
                  className="border p-1 w-50 border-gray-500 rounded"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  value={products.name}
                  onChange={(e) =>
                    setProducts({ ...products, name: e.target.value })
                  }
                />
              </div>
              <div className="flex gap-4 items-center">
                <label className="w-20" htmlFor="price">
                  Price:
                </label>
                <input
                  className="border p-1 w-50 border-gray-500 rounded"
                  type="text"
                  name="price"
                  id="price"
                  placeholder="Price"
                  value={products.price}
                  onChange={(e) =>
                    setProducts({ ...products, price: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 items-center ">
              <input
                className="border p-1  border-gray-500 rounded"
                type="text"
                name="srcPic"
                id="srcPic"
                placeholder="Source Pic"
                value={products.srcPic?.[0] ?? ""}
                onChange={(e) =>
                  setProducts({
                    ...products,
                    srcPic: [
                      e.target.value,
                      products.srcPic[1],
                      products.srcPic[2],
                      products.srcPic[3],
                      products.srcPic[4],
                    ],
                  })
                }
              />
              <input
                className="border p-1  border-gray-500 rounded"
                type="text"
                name="srcPic"
                id="srcPic"
                placeholder="Source Pic"
                value={products.srcPic?.[1] ?? ""}
                onChange={(e) =>
                  setProducts({
                    ...products,
                    srcPic: [
                      products.srcPic[0],
                      e.target.value,
                      products.srcPic[2],
                      products.srcPic[3],
                      products.srcPic[4],
                    ],
                  })
                }
              />
              <input
                className="border p-1  border-gray-500 rounded"
                type="text"
                name="srcPic"
                id="srcPic"
                placeholder="Source Pic"
                value={products.srcPic?.[2] ?? ""}
                onChange={(e) =>
                  setProducts({
                    ...products,
                    srcPic: [
                      products.srcPic[0],
                      products.srcPic[1],
                      e.target.value,
                      products.srcPic[3],
                      products.srcPic[4],
                    ],
                  })
                }
              />
              <input
                className="border p-1  border-gray-500 rounded"
                type="text"
                name="srcPic"
                id="srcPic"
                placeholder="Source Pic"
                value={products.srcPic?.[3] ?? ""}
                onChange={(e) =>
                  setProducts({
                    ...products,
                    srcPic: [
                      products.srcPic[0],
                      products.srcPic[1],
                      products.srcPic[2],
                      e.target.value,
                      products.srcPic[4],
                    ],
                  })
                }
              />
              <input
                className="border p-1  border-gray-500 rounded"
                type="text"
                name="srcPic"
                id="srcPic"
                placeholder="Source Pic"
                value={products.srcPic?.[4] ?? ""}
                onChange={(e) =>
                  setProducts({
                    ...products,
                    srcPic: [
                      products.srcPic[0],
                      products.srcPic[1],
                      products.srcPic[2],
                      products.srcPic[3],
                      e.target.value,
                    ],
                  })
                }
              />
              <input
                className="border p-1  border-gray-500 rounded"
                type="text"
                name="link"
                id="link"
                placeholder="Link"
                value={products.link}
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-orange-300 h-11 rounded flex justify-center items-center w-full hover:bg-orange-400 transition"
          >
            Simpan ke Draft
          </button>
        </form>
      </div>
    </div>
  );
}
