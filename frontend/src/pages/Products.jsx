import React, { useState, useEffect } from "react";
import Filter from "../components/Filter";
import Table from "../components/Table";
import api from "../services/api"; // Ensure the correct path to your API file

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch items and categories
  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const items = await api.getItems();
        const categories = await api.getCategories();

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
        setFilteredProducts(productsWithCategories);
      } catch (error) {
        console.error("Error fetching products and categories:", error);
      }
    };

    fetchProductsAndCategories();
  }, []);

  const handleFilterChange = (filters) => {
    let filtered = [...products];

    if (filters.category !== "category") {
      filtered = filtered.filter((product) => product.category === filters.category);
    }

    if (filters.stock === "Low Stock") {
      filtered.sort((a, b) => a.quantity - b.quantity);
    } else if (filters.stock === "High Stock") {
      filtered.sort((a, b) => b.quantity - a.quantity);
    }

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
