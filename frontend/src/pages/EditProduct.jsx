import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

const EditProduct = () => {
  const { id } = useParams(); // Get the product ID from the route parameters
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    purchasePrice: "",
    salePrice: "",
    quantity: "",
    category: "",
    size: "",
    color: "",
  });

  useEffect(() => {
    const fetchProductAndCategories = async () => {
      try {
        // Fetch categories
        const categoriesData = await api.getCategories();
        setCategories(categoriesData);

        // Fetch product by ID
        const product = await api.getItemById(id);

        // Find the category for the product
        const productCategory = categoriesData.find((category) =>
          category.items.some((item) => item.id === product.id)
        );

        // Set form data with product info and category ID
        setFormData({
          ...product,
          category: productCategory ? productCategory.id : "",
        });
      } catch (error) {
        console.error("Error fetching product or categories:", error);
      }
    };

    fetchProductAndCategories();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update product
      await api.updateItem(id, {
        ...formData,
        category: { id: formData.category }, // Ensure category is sent as an object with ID
      });
      alert("Product updated successfully!");
      navigate("/products");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update the product. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-center">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name and Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FCA311]"
              placeholder="Enter product name"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FCA311]"
              placeholder="Enter product description"
            ></textarea>
          </div>
        </div>

        {/* Prices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium">Purchase Price</label>
            <input
              type="number"
              name="purchasePrice"
              value={formData.purchasePrice}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FCA311]"
              placeholder="Enter purchase price"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Sale Price</label>
            <input
              type="number"
              name="salePrice"
              value={formData.salePrice}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FCA311]"
              placeholder="Enter sale price"
            />
          </div>
        </div>

        {/* Quantity, Size, and Color */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-2 font-medium">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FCA311]"
              placeholder="Enter quantity"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Size</label>
            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FCA311]"
              placeholder="Enter size"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Color</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FCA311]"
              placeholder="Enter color"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FCA311]"
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#14213D] text-white px-4 py-2 rounded shadow-md hover:bg-[#FCA311] transition duration-200 w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
