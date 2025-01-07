import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import axios from 'axios';

// Function to generate random colors
const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

function CategoryPieChart() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch income and expense data
  useEffect(() => {
    async function fetchTransactions() {
      try {
        // Replace with your actual API endpoints
        const expenseResponse = await axios.get('http://localhost:5000/api/expenses', {
          withCredentials: true,
        });

        // Add 'expense' type to each transaction to make it easier to filter
        const expenseData = expenseResponse.data.map(item => ({ ...item, type: 'expense' }));
        
        setTransactions(expenseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, []);

  // Process transactions for chart data
  const data = transactions.reduce((acc, transaction) => {
    // Group by expense name
    const existingCategory = acc.find(item => item.name === transaction.expense);
    if (existingCategory) {
      existingCategory.value += transaction.amount;
    } else {
      acc.push({ name: transaction.expense, value: transaction.amount });
    }
    return acc;
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display a loading message while data is being fetched
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={generateRandomColor()} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default CategoryPieChart;
