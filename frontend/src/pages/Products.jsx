import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; // Import for handling query parameters
import Filter from "../components/Filter";
import Table from "../components/Table";
import api from "../services/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchParams] = useSearchParams(); // Hook to get query parameters

  // Fetch items and categories
  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const items = await api.getItems();
        const categories = await api.getCategories();

        // Map items to categories
        const productsWithCategories = items.map((item) => {
          const category = categories.find((cat) =>
            cat.items.some((catItem) => catItem.id === item.id)
          );
          return {
            ...item,
            category: category ? category.name : "Uncategorized",
          };
        });

        setProducts(productsWithCategories);

        // Check for category filter in query parameters
        const categoryId = searchParams.get("category");
        if (categoryId) {
          const filtered = productsWithCategories.filter((product) =>
            categories
              .find((cat) => cat.id === parseInt(categoryId, 10))
              ?.items.some((catItem) => catItem.id === product.id)
          );
          setFilteredProducts(filtered);
        } else {
          setFilteredProducts(productsWithCategories);
        }
      } catch (error) {
        console.error("Error fetching products and categories:", error);
      }
    };

    fetchProductsAndCategories();
  }, [searchParams]); // Re-run when query parameters change

  // Handle filter changes
  const handleFilterChange = (filters) => {
    let filtered = [...products];

    // Filter by category
    if (filters.category !== "category") {
      filtered = filtered.filter((product) => product.category === filters.category);
    }

    // Sort by stock
    if (filters.stock === "Low Stock") {
      filtered.sort((a, b) => a.quantity - b.quantity);
    } else if (filters.stock === "High Stock") {
      filtered.sort((a, b) => b.quantity - a.quantity);
    }

    // Sort by price
    if (filters.price === "Purchase High Price") {
      filtered.sort((a, b) => b.purchasePrice - a.purchasePrice);
    } else if (filters.price === "Purchase Low Price") {
      filtered.sort((a, b) => a.purchasePrice - b.purchasePrice);
    } else if (filters.price === "Sale High Price") {
      filtered.sort((a, b) => b.salePrice - a.salePrice);
    } else if (filters.price === "Sale Low Price") {
      filtered.sort((a, b) => a.salePrice - b.salePrice);
    }

    setFilteredProducts(filtered);
  };

  // Handle product deletion
  const handleDeleteProduct = async (productId) => {
    try {
      await api.deleteItem(productId);
      setProducts(products.filter((product) => product.id !== productId));
      setFilteredProducts(filteredProducts.filter((product) => product.id !== productId));
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete the product. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Products</h1>
      <Filter onFilterChange={handleFilterChange} />
      <Table products={filteredProducts} onDelete={handleDeleteProduct} />
    </div>
  );
};

export default Products;
