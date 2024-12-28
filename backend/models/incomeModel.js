const mongoose = require('mongoose')

const IncomeSchema = mongoose.Schema({
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

module.exports = mongoose.model('income', IncomeSchema);
