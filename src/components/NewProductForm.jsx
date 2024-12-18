function NewProductForm(product) {
    return (
        <div>
            <form className="flex flex-row gap-2 justify-center items-center" onSubmit={onSubmit}>
                <label htmlFor="link">Link</label>
                <input
                    className="border p-1  border-gray-500 rounded"
                    type="text"
                    name="link"
                    id="link"
                    
                    placeholder="Link"
                />
                <label htmlFor="name">Name</label>
                <input
                    className="border p-1  border-gray-500 rounded"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                />
                <label htmlFor="price">Price</label>
                <input
                    className="border p-1  border-gray-500 rounded"
                    type="number"
                    name="price"
                    id="price"
                    placeholder="Price"
                />
                <label htmlFor="description">Description</label>
                <input
                    className="border p-1  border-gray-500 rounded"
                    type="text"
                    name="description"
                    id="description"
                    placeholder="Description"
                />
                <label htmlFor="image">Image</label>
                <input
                    className="border p-1  border-gray-500 rounded"
                    type="text"
                    name="image"
                    id="image"
                    placeholder="Image"
                />
                <label htmlFor="category">Category</label>
                <input
                    className="border p-1  border-gray-500 rounded"
                    type="text"
                    name="category"
                    id="category"
                    placeholder="Category"
                />
                <button type="submit" className="bg-orange-300  rounded flex justify-center items-center w-36">
                    Add
                </button>
            </form>
        </div>
    );
}

export default NewProductForm;