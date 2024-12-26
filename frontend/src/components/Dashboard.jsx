import React from 'react';
import { Link , useNavigate } from 'react-router-dom';
import { Grid, DollarSign, FileText, LogOut } from 'lucide-react'; // Import icons from lucide-react

const Dashboard = ({ totalIncome, totalExpenses }) => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogout = () => {
    // Perform any necessary cleanup actions (e.g., clearing tokens)
    navigate('/'); // Redirect to the '/' route
}
  return (
    <>
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col w-64">
      {/* Header */}
      <h1 className="text-3xl font-bold text-blue-600 mb-8">Budget Tracker</h1>

      {/* Navigation */}
      <nav className="flex flex-col space-y-2">
        <Link
          to="/dashboard"
          className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-600 hover:text-white transition"
        >
          <Grid className="w-5 h-5 mr-3" /> {/* Icon */}
          Dashboard
        </Link>
        <Link
          to="/income"
          className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-600 hover:text-white transition"
        >
          <DollarSign className="w-5 h-5 mr-3" /> {/* Icon */}
          Income
        </Link>
        <Link
          to="/expenses"
          className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-600 hover:text-white transition"
        >
          <FileText className="w-5 h-5 mr-3" /> {/* Icon */}
          Expenses
        </Link>
      </nav>

      {/* Total Income and Expenses */}
      

      {/* Logout Button */}
      <button
       
        onClick={handleLogout}
       
        className="mt-auto flex items-center px-4 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-600 hover:text-white transition"
      >
        <LogOut className="w-5 h-5 mr-3" /> {/* Icon */}
        Logout
      </button>
    </div>
    
  </>
  );
};

export default Dashboard;

