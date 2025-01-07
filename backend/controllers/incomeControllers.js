const Income = require('../models/incomeModel');

// Create Income Controller
const createIncome = async (req, res) => {
  try {
    const { income, amount, date } = req.body;

    // Validate required fields
    if (!income || !amount || !date) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Create a new income entry with the user's ID
    const newIncome = new Income({
      income,
      amount,
      date,
      user: req.user._id, // Associate with the logged-in user
    });

    // Save to the database
    const savedIncome = await newIncome.save();

    // Send success response
    res.status(201).json({
      message: 'Income created successfully.',
      data: savedIncome,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      message: 'Failed to create income.',
      error: error.message,
    });
  }
};

// Get All Income Controller (user-specific)
const getAllIncome = async (req, res) => {
  try {
    // Fetch only income records for the logged-in user
    const incomeList = await Income.find({ user: req.user._id });
    res.status(200).json(incomeList); // Respond with the fetched data
  } catch (error) {
    console.error('Error fetching income:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete Income Controller (user-specific)
const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the income entry for the logged-in user
    const deletedIncome = await Income.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!deletedIncome) {
      return res.status(404).json({ message: 'Income not found or unauthorized.' });
    }

    res.status(200).json({ message: 'Income deleted successfully.' });
  } catch (error) {
    console.error('Error deleting income:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createIncome,
  getAllIncome,
  deleteIncome,
};