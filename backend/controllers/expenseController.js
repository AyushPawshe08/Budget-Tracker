const Expense = require('../models/expenseModel'); // Import the expense model

// Create Expense Controller
const createExpense = async (req, res) => {
  try {
    const { expense, amount, date } = req.body;

    // Validate required fields
    if (!expense || !amount || !date) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Create a new expense
    const newExpense = new Expense({
      expense,
      amount,
      date,
      user: req.user._id,
    });

    // Save to the database
    const savedExpense = await newExpense.save();

    // Send success response
    res.status(201).json({
      message: 'Expense created successfully.',
      data: savedExpense,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      message: 'Failed to create expense.',
      error: error.message,
    });
  }
};

const getAllExpense = async (req, res) => {
  try {
    const expenseList = await Expense.find({ user: req.user._id }); // Fetch all income records from the database
    res.status(200).json(expenseList); // Respond with the fetched data
  } catch (error) {
    console.error('Error fetching income:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Deleting expense with ID: ${id}`); // Debug log
    const deletedExpense = await Expense.findByIdAndDelete({
      _id: id,
      user: req.user._id,
    });
    if (!deletedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error deleting Expense:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createExpense, getAllExpense, deleteExpense
};