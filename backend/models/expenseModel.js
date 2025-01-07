const mongoose = require('mongoose')

const expenseSchema = mongoose.Schema({
    expense : {
        type: String,
        required : true
    },
    amount : {
        type : Number,
        required : true
    },

    date: { // Added date field
        type: Date,
        required: true
    },
     user: { // Reference to the user who created this income
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
})

module.exports = mongoose.model('expense', expenseSchema);