const Expense = require('../models/expenseModel'); // Import the expense model

// Create Expense Controller
const createExpense = async (req, res) => {
  try {
    const { name, amount, category } = req.body;

    // Validate required fields
    if (!name || !amount || !category) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Create a new expense
    const newExpense = new Expense({
      name,
      amount,
      category,
    });

    // Save to the database
    const savedExpense = await newExpense.save();

    // Send success response
    res.status(201).json({
      message: 'Expense created successfully.',
      expense: savedExpense,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      message: 'Failed to create expense.',
      error: error.message,
    });
  }
};

module.exports = {
  createExpense,
};
