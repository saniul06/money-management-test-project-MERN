const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    amount: Number,
    income: Number,
    expense: Number,
    transactions: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Transaction'
            }
        ]
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
