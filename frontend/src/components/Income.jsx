import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Plus, Trash, Pencil } from 'lucide-react';
import TopNav from "./Topnav"
import axios from 'axios';

const Income = () => {
  const [formData, setFormData] = useState({
    income: '',
    amount: '',
    date: '', 
  });

  const [incomeList, setIncomeList] = useState([]);
  const [message, setMessage] = useState('');
  const [totalIncome, setTotalIncome] = useState(0);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchIncomeList = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/income', {
          withCredentials: true,
        });
        const incomeData = response.data;
        setIncomeList(incomeData);
        calculateTotalIncome(incomeData);
      } catch (error) {
        console.error('Error fetching income list', error);
        setMessage('Failed to fetch income list.');
      }
    };

    fetchIncomeList();
  }, []);

  const calculateTotalIncome = (incomeData) => {
    const total = incomeData.reduce((sum, income) => {
      if (income && income.amount) {
        return sum + income.amount;
      }
      return sum;
    }, 0);
    setTotalIncome(total);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/income/${id}`, {
        withCredentials: true,
      });
      const updatedList = incomeList.filter((income) => income._id !== id);
      setIncomeList(updatedList);
      calculateTotalIncome(updatedList);
    } catch (error) {
      console.error('Error deleting income:', error);
      setMessage('Failed to delete income.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.amount || isNaN(formData.amount) || formData.amount <= 0) {
      setMessage('Please enter a valid amount.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/income', formData, {
        withCredentials: true,
      });
      setMessage(response.data.message);

      const newIncome = response.data.data; // This is the newly created income
      const updatedList = [newIncome, ...incomeList]; // Add new income at the top of the list
      setIncomeList(updatedList);

      // Recalculate total income immediately
      calculateTotalIncome(updatedList);

      setFormData({ income: '', amount: '', date: '' });
    } catch (error) {
      setMessage('Error saving income.');
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <TopNav />
     
      <div className="p-6 w-full">
        <h1 className="text-4xl font-bold text-green-600 mb-4">Income Tracker</h1>

        <div className="bg-white shadow-lg p-4 rounded-md mb-6">
          <h2 className="text-2xl font-bold text-center my-3 text-gray-800">Income List</h2>
          <div className="overflow-x-auto overflow-y-auto max-h-96">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">Description</th>
                  <th scope="col" className="px-6 py-3">Amount</th>
                  <th scope="col" className="px-6 py-3">Date</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {incomeList.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-500">
                      No income records found.
                    </td>
                  </tr>
                ) : (
                  incomeList.map((incomeInfo) => {
                    if (!incomeInfo || !incomeInfo.amount) return null;
                    return (
                      <tr key={incomeInfo._id} className="bg-white border-b">
                        <td className="px-6 py-4">{incomeInfo.income}</td>
                        <td className="px-6 py-4">${incomeInfo.amount.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          {new Date(incomeInfo.date).toLocaleDateString()}
                        </td>
                        <td>
                          <button
                            onClick={() => handleDelete(incomeInfo._id)}
                            className="text-red-500 mx-3 hover:underline"
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
            Total Income: ${totalIncome.toFixed(2)}
          </div>
        </div>

        <form
          className="bg-white shadow-md rounded-md p-6 space-y-4"
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Add Income</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="income"
              value={formData.income}
              onChange={handleChange}
              placeholder="Income Title"
              className="p-3 border border-gray-300 rounded-md focus:ring focus:ring-green-300"
            />
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Amount"
              className="p-3 border border-gray-300 rounded-md focus:ring focus:ring-green-300"
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
            className="flex items-center justify-center w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition"
          >
            <Plus className="mr-2" /> Add Income
          </button>
        </form>
      </div>
    </div>
  );
};

export default Income;
