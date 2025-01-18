import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handleViewProducts = () => {
    navigate(`/products?category=${category.id}`); // Pass the category ID as a query parameter
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-md flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold">{category.name}</h2>
        <p className="text-gray-600 mb-2">Products: {category.items.length}</p>
        <p className="text-gray-500">{category.description}</p>
      </div>
      <div className="flex justify-between items-center mt-4">
        {/* Left: View Products Button */}
        <button
          className="text-green-500 hover:underline"
          onClick={handleViewProducts}
        >
          View Products
        </button>
        {/* Right: Edit and Delete Buttons */}
        <div className="flex space-x-4">
          <button
            className="text-blue-500 hover:underline"
            onClick={() => onEdit(category.id)}
          >
            Edit
          </button>
          <button
            className="text-red-500 hover:underline"
            onClick={() => onDelete(category.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
