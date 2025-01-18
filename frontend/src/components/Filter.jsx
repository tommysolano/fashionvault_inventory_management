import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api"; // Ensure this is the correct path to your API services

const Filter = ({ onFilterChange }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    category: "category",
    stock: "Stock",
    price: "price",
  });

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await api.getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    // Reset the other filter if stock or price is being changed
    const updatedFilters = {
      ...filters,
      [name]: value,
      ...(name === "stock" ? { price: "price" } : {}), // Reset price if stock is selected
      ...(name === "price" ? { stock: "Stock" } : {}), // Reset stock if price is selected
    };

    setFilters(updatedFilters);
    onFilterChange(updatedFilters); // Pass filters to parent component
  };

  // Handle clear filter button
  const handleClearFilters = () => {
    const defaultFilters = {
      category: "category",
      stock: "Stock",
      price: "price",
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters); // Reset filters in parent component
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex space-x-4">
        {/* Filter Options */}
        <div className="flex items-center space-x-2">
          <p>Filters</p>
        </div>
        {/* Category Filter */}
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FCA311]"
        >
          <option value="category">Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        {/* Stock Filter */}
        <select
          name="stock"
          value={filters.stock}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FCA311]"
        >
          <option value="Stock">Stock</option>
          <option value="Low Stock">Low Stock</option>
          <option value="High Stock">High Stock</option>
        </select>
        {/* Combined Price Filter */}
        <select
          name="price"
          value={filters.price}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FCA311]"
        >
          <option value="price">Price</option>
          <option value="Purchase High Price">Purchase High Price</option>
          <option value="Purchase Low Price">Purchase Low Price</option>
          <option value="Sale High Price">Sale High Price</option>
          <option value="Sale Low Price">Sale Low Price</option>
        </select>
      </div>
      {/* Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={handleClearFilters}
          className="bg-gray-300 text-black px-4 py-2 rounded shadow-md hover:bg-gray-400 transition duration-200"
        >
          Clear Filters
        </button>
        <button
          onClick={() => navigate("/products/add")}
          className="bg-[#14213D] text-white px-4 py-2 rounded shadow-md hover:bg-[#FCA311] transition duration-200"
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default Filter;
