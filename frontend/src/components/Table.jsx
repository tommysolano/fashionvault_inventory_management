import React from "react";
import { useNavigate } from "react-router-dom";

const Table = ({ products, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = (productId) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this product? This action is not reversible."
    );

    if (confirmation) {
      onDelete(productId); // Delegate deletion to the parent component
    }
  };

  const handleEdit = (productId) => {
    navigate(`/products/edit/${productId}`); // Navigate to the edit page with the product ID
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left py-2 px-4 border-b border-gray-300">Name</th>
            <th className="text-left py-2 px-4 border-b border-gray-300">Category</th>
            <th className="text-left py-2 px-4 border-b border-gray-300">Stock</th>
            <th className="text-left py-2 px-4 border-b border-gray-300">Purchase Price</th>
            <th className="text-left py-2 px-4 border-b border-gray-300">Sale Price</th>
            <th className="text-left py-2 px-4 border-b border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="py-2 px-4 border-b border-gray-300">{product.name}</td>
              <td className="py-2 px-4 border-b border-gray-300">{product.category}</td>
              <td className="py-2 px-4 border-b border-gray-300">{product.quantity}</td>
              <td className="py-2 px-4 border-b border-gray-300">${product.purchasePrice}</td>
              <td className="py-2 px-4 border-b border-gray-300">${product.salePrice}</td>
              <td className="py-2 px-4 border-b border-gray-300 flex space-x-2">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => handleEdit(product.id)} // Redirect to the edit page
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDelete(product.id)} // Handle deletion
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
