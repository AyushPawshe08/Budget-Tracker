const mongoose = require('mongoose');

const IncomeSchema = mongoose.Schema({
    income: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    user: { // Reference to the user who created this income
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Income', IncomeSchema);