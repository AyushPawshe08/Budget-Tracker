import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid, DollarSign, FileText, LogOut } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [user, setUser] = useState(null); // Local state to store user data

  // Retrieve user info from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse and set the user
    }
  }, []);

  const toggleSideMenu = () => {
    setIsSideMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user data from localStorage
    setUser(null); // Clear local state
    navigate("/"); // Navigate to login page
  };

  return (
    <div>
      {/* Top Navbar */}
      <div className="bg-gray-100 px-6 py-4 flex items-center justify-between shadow-md">
        <button
          className="text-2xl text-gray-700 lg:hidden"
          onClick={toggleSideMenu}
        >
          ☰
        </button>
        <h1 className="text-2xl font-bold text-blue-600">BudgetPro</h1>
      </div>

      {/* Side Menu */}
      <div
        className={`fixed h-full inset-y-0 left-0 z-50 bg-gray-100 p-6 w-64 transition-transform duration-300 transform ${
          isSideMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static`}
      >
        <button
          className="lg:hidden text-gray-700 mb-4 text-xl self-end"
          onClick={toggleSideMenu}
        >
          ✕
        </button>

        <nav className="flex flex-col space-y-4">
          <Link
            to="/dashboard"
            className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-600 hover:text-white transition"
          >
            <Grid className="w-5 h-5 mr-3" />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/income"
            className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-600 hover:text-white transition"
          >
            <DollarSign className="w-5 h-5 mr-3" />
            <span>Income</span>
          </Link>
          <Link
            to="/expenses"
            className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-600 hover:text-white transition"
          >
            <FileText className="w-5 h-5 mr-3" />
            <span>Expenses</span>
          </Link>
        </nav>

        {/* Display User's Image */}
        <Link to="/profile">
          <button>
            {user && (
              <div className="mt-4 flex items-center space-x-4">
                <img
                  className="h-12 w-12 object-cover rounded-full border border-gray-300"
                  src={user.pic || "/path/to/default-avatar.png"} // Default avatar fallback
                  alt={user.username || "User"}
                />
                <div>
                  <p className="font-semibold text-gray-700">{user.username}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
            )}
          </button>
        </Link>
        <button
          onClick={handleLogout}
          className="mt-6 flex items-center px-4 py-3  bg-red-100 text-red-700 rounded-lg hover:bg-red-600 hover:text-white transition"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>

      {/* Overlay for mobile side menu */}
      {isSideMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSideMenu}
        ></div>
      )}
    </div>
  );
};

export default Navbar;
