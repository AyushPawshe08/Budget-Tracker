const express = require('express');
const router = express.Router();
const { createIncome } = require('../controllers/incomeControllers');

// POST route for creating income
router.post('/', createIncome);

module.exports = router;
