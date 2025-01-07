import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Plus, Trash } from "lucide-react";
import TopNav from "./Topnav"
import axios from "axios";

const Expense = () => {
  const [formData, setFormData] = useState({
    expense: "",
    amount: "",
    date: "",
  });

  const [expenseList, setExpenseList] = useState([]);
  const [message, setMessage] = useState("");
  const [totalExpense, setTotalExpense] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpenseList = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/expenses", {
          withCredentials: true,
        });
        const expenseData = response.data;
        setExpenseList(expenseData);
        calculateTotalExpense(expenseData);
      } catch (error) {
        console.error("Error fetching expense list", error);
      }
    };

    fetchExpenseList();
  }, []);

  const calculateTotalExpense = (expenseData) => {
    const total = expenseData.reduce((sum, expense) => {
      if (expense && expense.amount) {
        return sum + expense.amount;
      }
      return sum;
    }, 0);
    setTotalExpense(total);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`, {
        withCredentials: true,
      });
      const updatedList = expenseList.filter((expense) => expense._id !== id);
      setExpenseList(updatedList);
      calculateTotalExpense(updatedList);
    } catch (error) {
      console.error("Error deleting expense", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.amount || isNaN(formData.amount) || formData.amount <= 0) {
      setMessage("Please enter a valid amount.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/expenses",
        formData,
        {
          withCredentials: true,
        }
      );
      setMessage(response.data.message);

      const newExpense = response.data.data; // Newly created expense
      const updatedList = [newExpense, ...expenseList]; // Add new expense to the top
      setExpenseList(updatedList);

      calculateTotalExpense(updatedList); // Recalculate total expense
      setFormData({ expense: "", amount: "", date: "" }); // Reset form fields
    } catch (error) {
      setMessage("Error saving expense.");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <TopNav />
      <div className="p-6 w-full">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Expense Tracker
        </h1>

        <div className="bg-white shadow-lg p-4 rounded-md mb-6">
          <h2 className="text-2xl font-bold text-center my-3 text-gray-800">
            Expense List
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-3 md:px-6 md:py-4">Description</th>
                  <th className="px-4 py-3 md:px-6 md:py-4">Amount</th>
                  <th className="px-4 py-3 md:px-6 md:py-4">Date</th>
                  <th className="px-4 py-3 md:px-6 md:py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenseList.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-500">
                      No expense records found.
                    </td>
                  </tr>
                ) : (
                  expenseList.map((expenseInfo) => {
                    if (!expenseInfo || !expenseInfo.amount) return null;
                    return (
                      <tr key={expenseInfo._id} className="bg-white border-b">
                        <td className="px-4 py-4 md:px-6 md:py-4">
                          {expenseInfo.expense}
                        </td>
                        <td className="px-4 py-4 md:px-6 md:py-4">
                          ${expenseInfo.amount.toFixed(2)}
                        </td>
                        <td className="px-4 py-4 md:px-6 md:py-4">
                          {new Date(expenseInfo.date).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-4 md:px-6 md:py-4">
                          <button
                            onClick={() => handleDelete(expenseInfo._id)}
                            className="text-red-500 hover:underline"
                          >
                            <Trash />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className="text-xl font-semibold text-gray-800 mt-4">
            Total Expense: ${totalExpense.toFixed(2)}
          </div>
        </div>

        <form
          className="bg-white shadow-md rounded-md p-6 space-y-4"
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Add Expense
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="expense"
              value={formData.expense}
              onChange={handleChange}
              placeholder="Expense Title"
              className="p-3 border border-gray-300 rounded-md focus:ring focus:ring-red-300"
            />
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Amount"
              className="p-3 border border-gray-300 rounded-md focus:ring focus:ring-red-300"
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md focus:ring focus:ring-red-300"
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition"
          >
            <Plus className="mr-2" /> Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default Expense;
