import { useState, useEffect } from "react";
import api from "../services/api"; // Ensure the correct path to your API file
import Card from "../components/Card";
import Chart from "../components/Chart";

const Home = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [lowStock, setLowStock] = useState(0);
  const [outOfStock, setOutOfStock] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [monthlySales, setMonthlySales] = useState({}); // State for monthly sales data

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all items for total products, low stock, and out of stock
        const allItems = await api.getItems();
        setTotalProducts(allItems.length);
        setLowStock(allItems.filter((item) => item.quantity > 0 && item.quantity <= 5).length);
        setOutOfStock(allItems.filter((item) => item.quantity === 0).length);

        // Fetch all transactions and process sales data
        const allTransactions = await api.getTransactions();
        const salesTransactions = allTransactions.filter((transaction) => transaction.type === "SALE");
        const totalSalesValue = salesTransactions.reduce((sum, transaction) => sum + transaction.totalValue, 0);
        setTotalSales(totalSalesValue);

        // Calculate monthly sales totals
        const salesByMonth = salesTransactions.reduce((acc, transaction) => {
          const month = transaction.transactionDate.split("/")[1]; // Extract the month (MM) from the date
          acc[month] = (acc[month] || 0) + transaction.totalValue;
          return acc;
        }, {});

        setMonthlySales(salesByMonth); // Set monthly sales data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 h-full">
      <div className="grid grid-cols-4 gap-4 mb-8">
        <Card title="Total Products" value={totalProducts} bgColor="#14213D" textColor="#FFFFFF" />
        <Card title="Low Stock" value={lowStock} bgColor="#14213D" textColor="#FFFFFF" />
        <Card title="Out of Stock" value={outOfStock} bgColor="#14213D" textColor="#FFFFFF" />
        <Card title="Total Sales" value={`$${totalSales.toFixed(2)}`} bgColor="#14213D" textColor="#FFFFFF" />
      </div>
      <Chart salesData={monthlySales} />
    </div>
  );
};

export default Home;
