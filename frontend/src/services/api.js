import axios from "axios";

// Base URL for the backend API
const API_BASE_URL = "http://localhost:8080/api";

// Create an axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// General error handler
const handleError = (error) => {
  console.error("API Error:", error.response || error.message);
  throw error.response ? error.response.data : error;
};

// **API Endpoints**
const api = {
  // 1. Get all transactions
  getTransactions: async () => {
    try {
      const response = await apiClient.get("/transactions");
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // 2. Add a transaction
  addTransaction: async (transactionData) => {
    try {
      const response = await apiClient.post("/transactions", transactionData);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // 3. Update a transaction
  updateTransaction: async (id, transactionData) => {
    try {
      const response = await apiClient.put(`/transactions/${id}`, transactionData);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // 4. Delete a transaction
  deleteTransaction: async (id) => {
    try {
      const response = await apiClient.delete(`/transactions/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // 5. Get all items
  getItems: async () => {
    try {
      const response = await apiClient.get("/items");
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // 6. Add a new item
  addItem: async (itemData) => {
    try {
      const response = await apiClient.post("/items", itemData);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // 7. Update an item
  updateItem: async (id, itemData) => {
    try {
      const response = await apiClient.put(`/items/${id}`, itemData);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // 8. Delete an item
  deleteItem: async (id) => {
    try {
      const response = await apiClient.delete(`/items/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // 9. Get all categories
  getCategories: async () => {
    try {
      const response = await apiClient.get("/categories");
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // 10. Add a new category
  addCategory: async (categoryData) => {
    try {
      const response = await apiClient.post("/categories", categoryData);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // 11. Update a category
  updateCategory: async (id, categoryData) => {
    try {
      const response = await apiClient.put(`/categories/${id}`, categoryData);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // 12. Delete a category
  deleteCategory: async (id) => {
    try {
      const response = await apiClient.delete(`/categories/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Fetch total number of items (products) in the inventory
  getTotalProducts: async () => {
    try {
      const response = await apiClient.get("/items"); // Use the `/api/items` endpoint
      return response.data.length; // Assuming the response is an array of items
    } catch (error) {
      handleError(error);
    }
  },


};

export default api;
