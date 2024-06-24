const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: {
            values: ['income', 'expense'],
            message: '{VALUE} is not supported'
        },
        required: true
    },
},{
    timestamps: true,
    collection: 'transactions'
})

const transactionModel = mongoose.model('Transaction', transactionSchema)

module.exports = transactionModel