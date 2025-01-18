import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // Adjust the path to your API service if necessary

const AddCategory = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // API call to add a new category
      await api.addCategory(formData);

      // Success message and redirect
      alert("Category added successfully!");
      navigate("/categories");
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add the category. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-center">Add Category</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Input */}
        <div>
          <label className="block mb-2 font-medium">Category Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FCA311]"
            placeholder="Enter category name"
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FCA311]"
            placeholder="Enter category description"
          ></textarea>
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

export default AddCategory;
