const express = require('express');
const router = express.Router();
const { createIncome, getAllIncome } = require('../controllers/incomeControllers');
const Income = require('../models/incomeModel'); // Import the income model
const jwtVerify = require('../middlewares/verifyJWT'); // Middleware to verify JWT

// POST route for creating income
router.post('/', jwtVerify, createIncome);

// GET route for retrieving income
router.get('/', jwtVerify, getAllIncome);

// DELETE route for deleting income
router.delete('/:id', jwtVerify, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id; // Extract user ID from the request object

        // Find income by ID and ensure it belongs to the authenticated user
        const deletedIncome = await Income.findOneAndDelete({ _id: id, userId });
        if (!deletedIncome) {
            return res.status(404).json({ message: 'Income not found or does not belong to this user' });
        }

        res.status(200).json({ message: 'Income deleted successfully' });
    } catch (error) {
        console.error('Error deleting income:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;