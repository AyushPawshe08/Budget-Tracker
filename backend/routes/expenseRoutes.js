const express = require('express');
const router = express.Router();
const { createExpense } = require('../controllers/expenseController');

// POST route for creating an expense
router.post('/', createExpense);

module.exports = router;
