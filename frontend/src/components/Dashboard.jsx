import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import IncomeExpenseChart from '../components/IncomeExpenseChart';
import CategoryPieChart from '../components/CategoryPieChart';
import TransactionList from '../components/TransactionList';
import axios from 'axios';

const Dashboard = () => {
  const [incomeList, setIncomeList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  
  useEffect(() => {
    const fetchIncomeAndExpense = async () => {
      try {
        const incomeResponse = await axios.get('http://localhost:5000/api/income');
        const expenseResponse = await axios.get('http://localhost:5000/api/expenses');
        setIncomeList(incomeResponse.data); // Set income data
        setExpenseList(expenseResponse.data); // Set expense data
      } catch (error) {
        console.error('Error fetching income/expense data', error);
      }
    };
    
    fetchIncomeAndExpense();
  }, []);

  // Calculate total income, total expenses, and balance
  const totalIncome = incomeList.reduce((sum, income) => sum + income.amount, 0);
  const totalExpenses = expenseList.reduce((sum, expense) => sum + expense.amount, 0);
  const balance = totalIncome - totalExpenses;

  return (
    <div className="flex">
      {/* Side Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 container mx-auto p-4 space-y-4">
        <h1 className="text-3xl  font-bold text-center mb-6">Financial Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card">
            <div className="card-header flex items-center justify-between pb-2">
              <h2 className="text-sm font-medium">Total Income</h2>
            </div>
            <div className="card-content">
              <div className="text-2xl font-bold text-green-600">${totalIncome.toFixed(2)}</div>
            </div>
          </div>
          <div className="card">
            <div className="card-header flex items-center justify-between pb-2">
              <h2 className="text-sm font-medium">Total Expenses</h2>
            </div>
            <div className="card-content">
              <div className="text-2xl font-bold text-red-600">${totalExpenses.toFixed(2)}</div>
            </div>
          </div>
          <div className="card">
            <div className="card-header flex items-center justify-between pb-2">
              <h2 className="text-sm font-medium">Balance</h2>
            </div>
            <div className="card-content">
              <div className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${balance.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        <hr />

        {/* Charts Section */}
        <div className="grid grid-cols-1  lg:grid-cols-2 gap-4">
          <div className="card">
            <div className="card-header">
              <h2 className='text-1xl font-bold'>Income vs Expenses</h2>
            </div>
            <div className="card-content">
              <IncomeExpenseChart incomeData={incomeList} expenseData={expenseList} />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h2 className='text-1xl mx-4 font-bold'>Expense Categories</h2>
            </div>
            <div className="card-content">
              <CategoryPieChart expenseData={expenseList} />
            </div>
          </div>
        </div>
<hr />
        {/* Tabs Section */}
        <div className="tabs space-y-4">
          <div className="tabs-list">
            <button className="tabs-trigger  text-2xl font-bold mx-5" value="transactions">Recent Transactions</button>
          </div>
          <div className="tabs-content">
            <TransactionList incomeData={incomeList} expenseData={expenseList} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

