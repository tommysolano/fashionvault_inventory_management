import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Statistics from "../pages/Statistics";
import Products from "../pages/Products";
import Categories from "../pages/Categories";
import Transactions from "../pages/Transactions";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/statistics" element={<Statistics />} />
      <Route path="/products" element={<Products />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/transactions" element={<Transactions />} />
    </Routes>
  );
};

export default AppRoutes;
