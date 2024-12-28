const Income = require('../models/incomeModel'); // Import the income model

// Create Income Controller
const createIncome = async (req, res) => {
  try {
    const { name, amount, category } = req.body;

    // Validate required fields
    if (!name || !amount || !category) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Create a new income entry
    const newIncome = new Income({
      name,
      amount,
      category,
    });

    // Save to the database
    const savedIncome = await newIncome.save();

    // Send success response
    res.status(201).json({
      message: 'Income created successfully.',
      income: savedIncome,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      message: 'Failed to create income.',
      error: error.message,
    });
  }
};

module.exports = {
  createIncome,
};
