import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-[#14213D] text-white h-screen w-1/5 flex flex-col">
      {/* Top Section with Logo */}
      <div className="flex flex-col items-center py-6">
        <h1 className="text-3xl font-bold mb-6">FashionVault</h1>
        <div className="border-t border-gray-600 w-full"></div>
      </div>

      {/* Navigation Section */}
      <nav className="flex flex-col items-start px-6 space-y-4 mt-6">
        <Link to="/" className="text-lg hover:text-[#FCA311] pb-5 ">
          Home
        </Link>
        <Link to="/statistics" className="text-lg hover:text-[#FCA311] pb-5">
          Statistics
        </Link>
        <Link to="/products" className="text-lg hover:text-[#FCA311] pb-5">
          Products
        </Link>
        <Link to="/categories" className="text-lg hover:text-[#FCA311] pb-5">
          Categories
        </Link>
        <Link to="/transactions" className="text-lg hover:text-[#FCA311] pb-5">
          Transactions
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
