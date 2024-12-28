const mongoose = require('mongoose')

const expenseSchema = mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    amount : {
        type : Number,
        required : true
    },

    category : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('expense', expenseSchema);