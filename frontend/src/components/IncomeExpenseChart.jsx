import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

function IncomeExpenseChart() {
  const [transactions, setTransactions] = useState({ income: [], expense: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch income and expense data
  useEffect(() => {
    async function fetchTransactions() {
      try {
        setLoading(true);
        setError(null);

        // Fetch income and expense data
        const incomeResponse = await axios.get('http://localhost:5000/api/income', {
          withCredentials: true, // Ensures cookies (JWT) are sent with the request
        });
        const expenseResponse = await axios.get('http://localhost:5000/api/expenses', {
          withCredentials: true,
        });

        setTransactions({
          income: incomeResponse.data,
          expense: expenseResponse.data,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch transactions. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, []);

  // Process transactions for chart data (group by month)
  const data = transactions.income.reduce((acc, income) => {
    const date = new Date(income.date);
    const yearMonth = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' }); // Format: "YYYY-MMM"

    // Find or create an entry for this month
    let existingEntry = acc.find(entry => entry.date === yearMonth);
    if (!existingEntry) {
      existingEntry = { date: yearMonth, income: 0, expense: 0 };
      acc.push(existingEntry);
    }

    // Add income for the month
    existingEntry.income += income.amount;

    return acc;
  }, []);

  // Add expenses to the data
  transactions.expense.forEach(expense => {
    const date = new Date(expense.date);
    const yearMonth = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });

    // Find or create an entry for this month
    let existingEntry = data.find(entry => entry.date === yearMonth);
    if (!existingEntry) {
      existingEntry = { date: yearMonth, income: 0, expense: 0 };
      data.push(existingEntry);
    }

    // Add expense for the month
    existingEntry.expense += expense.amount;
  });

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Render the chart
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="income" fill="#4ade80" name="Income" />
        <Bar dataKey="expense" fill="#f87171" name="Expense" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default IncomeExpenseChart;








