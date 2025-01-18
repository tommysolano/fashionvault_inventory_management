import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Statistics from "../pages/Statistics";
import Products from "../pages/Products";
import Categories from "../pages/Categories";
import Transactions from "../pages/Transactions";
import AddProduct from "../pages/AddProduct";
import EditProduct from "../pages/EditProduct";
import AddCategory from "../pages/AddCategory";
import EditCategory from "../pages/EditCategory";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/statistics" element={<Statistics />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/add" element={<AddProduct />} />
      <Route path="/products/edit/:id" element={<EditProduct />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/categories/add" element={<AddCategory />} />
      <Route path="/categories/edit/:id" element={<EditCategory />} />;
      <Route path="/transactions" element={<Transactions />} />
    </Routes>
  );
};

export default AppRoutes;
