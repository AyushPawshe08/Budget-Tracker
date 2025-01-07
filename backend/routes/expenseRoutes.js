const express = require('express');
const router = express.Router();
const { createExpense } = require('../controllers/expenseController');
const { getAllExpense } = require('../controllers/expenseController');
const Expense = require('../models/expenseModel'); 
const jwtVerify = require('../middlewares/verifyJWT');
// Import the expense model
// POST route for creating an expense
router.post('/',jwtVerify , createExpense);

router.get('/',jwtVerify , getAllExpense);

router.delete('/:id',jwtVerify , async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id; 

        const deletedExpense = await Expense.findByIdAndDelete({_id: id, userId});
        if (!deletedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        console.error('Error deleting expense:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;