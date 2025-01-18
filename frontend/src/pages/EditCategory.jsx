import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

const EditCategory = () => {
  const { id } = useParams(); // Get category ID from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  // Fetch the category data
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const category = await api.getCategoryById(id);
        setFormData({
          name: category.name,
          description: category.description,
        });
        console.log(category);
      } catch (error) {
        console.error("Error fetching category:", error);
        alert("Failed to fetch category data.");
      }
    };

    fetchCategory();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.updateCategory(id, formData);
      alert("Category updated successfully!");
      navigate("/categories");
    } catch (error) {
      console.error("Error updating category:", error);
      alert("Failed to update the category. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-center">Edit Category</h1>
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

export default EditCategory;
