import React, { useState, useEffect } from "react";
import CategoryCard from "../components/CategoryCard";
import api from "../services/api"; // Ensure this points to your API service
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  // Fetch categories from the database
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await api.getCategories();

        // Filter out deleted items in each category
        const categoriesWithActiveItems = fetchedCategories.map((category) => ({
          ...category,
          items: category.items.filter((item) => !item.deleted),
        }));

        setCategories(categoriesWithActiveItems);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleDeleteCategory = async (categoryId) => {
    try {
      await api.deleteCategory(categoryId);
      setCategories(categories.filter((category) => category.id !== categoryId));
      alert("Category deleted successfully!");
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete category. Please try again.");
    }
  };

  const handleEditCategory = (categoryId) => {
    navigate(`/categories/edit/${categoryId}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Categories</h1>
      {/* Add Product Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/categories/add")}
          className="bg-[#14213D] text-white px-4 py-2 rounded shadow-md hover:bg-[#FCA311] transition duration-200"
        >
          Add Category
        </button>
      </div>
      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onDelete={handleDeleteCategory}
            onEdit={handleEditCategory}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
