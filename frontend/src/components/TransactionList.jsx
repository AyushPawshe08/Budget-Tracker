import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [filterMonth, setFilterMonth] = useState('all');

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const incomeResponse = await axios.get('http://localhost:5000/api/income', {
          withCredentials: true, // Ensures cookies (JWT) are sent with the request
        });
        const expenseResponse = await axios.get('http://localhost:5000/api/expenses', {
          withCredentials: true,
        });

        const incomeData = incomeResponse.data.map((item) => ({
          ...item,
          type: 'income',
        }));
        const expenseData = expenseResponse.data.map((item) => ({
          ...item,
          type: 'expense',
        }));

        const combinedData = [...incomeData, ...expenseData].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );

        setTransactions(combinedData);
        setFilteredTransactions(combinedData);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, []);

  useEffect(() => {
    let filteredData = transactions;

    if (filterType !== 'all') {
      filteredData = filteredData.filter((transaction) => transaction.type === filterType);
    }

    if (filterMonth !== 'all') {
      filteredData = filteredData.filter((transaction) => {
        const transactionMonth = new Date(transaction.date).getMonth(); // Month is 0-indexed
        return transactionMonth === parseInt(filterMonth, 10);
      });
    }

    setFilteredTransactions(filteredData);
  }, [filterType, filterMonth, transactions]);

  if (loading) {
    return <div>Loading transactions...</div>;
  }

  return (
    <div className="p-4">
      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <div>
          <label htmlFor="filterType" className="mr-2 font-semibold">
            Filter by Type:
          </label>
          <select
            id="filterType"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div>
          <label htmlFor="filterMonth" className="mr-2 font-semibold">
            Filter by Month:
          </label>
          <select
            id="filterMonth"
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="all">All</option>
            {Array.from({ length: 12 }, (_, index) => (
              <option key={index} value={index}>
                {new Date(0, index).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-y-auto max-h-96 border border-gray-300 rounded shadow-lg scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-3 text-left border border-gray-200 font-semibold uppercase tracking-wide">
                Date
              </th>
              <th className="px-4 py-3 text-left border border-gray-200 font-semibold uppercase tracking-wide">
                Type
              </th>
              <th className="px-4 py-3 text-left border border-gray-200 font-semibold uppercase tracking-wide">
                Category
              </th>
              <th className="px-4 py-3 text-right border border-gray-200 font-semibold uppercase tracking-wide">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="bg-white text-gray-700">
            {filteredTransactions.map((transaction, index) => (
              <tr
                key={transaction.id}
                className={`${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                } hover:bg-blue-100 transition duration-200`}
              >
                <td className="px-4 py-3 border border-gray-300">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 border border-gray-300 capitalize">
                  {transaction.type}
                </td>
                <td className="px-4 py-3 border border-gray-300">
                  {transaction.income || transaction.expense}
                </td>
                <td
                  className={`px-4 py-3 text-right border border-gray-300 ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  ${transaction.amount.toFixed(2)}
                </td>
              </tr>
            ))}
            {filteredTransactions.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="text-center px-4 py-3 text-gray-500 border border-gray-300"
                >
                  No transactions available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionList;
