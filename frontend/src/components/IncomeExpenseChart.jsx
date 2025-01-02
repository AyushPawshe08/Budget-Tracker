import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

function IncomeExpenseChart() {
  const [transactions, setTransactions] = useState({ income: [], expense: [] });
  const [loading, setLoading] = useState(true);

  // Fetch income and expense data
  useEffect(() => {
    async function fetchTransactions() {
      try {
        // Replace with your actual API endpoint
        const incomeResponse = await axios.get('http://localhost:5000/api/income');
        const expenseResponse = await axios.get('http://localhost:5000/api/expenses');

        setTransactions({
          income: incomeResponse.data,
          expense: expenseResponse.data,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
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

    // Check if there's any expense for the month
    const correspondingExpense = transactions.expense.find(
      expense => new Date(expense.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) === yearMonth
    );

    // If there's an expense for the same month, add it
    if (correspondingExpense) {
      existingEntry.expense += correspondingExpense.amount;
    }

    return acc;
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display a loading message while data is being fetched
  }

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



