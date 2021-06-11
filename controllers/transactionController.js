const Transaction = require('../model/Transaction');
const User = require('../model/User');
const { resourceError, serverError } = require('../utils/error')
const { success } = require('../utils/success')

exports.create = (req, res) => {
    let { amount, type, note } = req.body;
    amount = Number(amount)
    let userId = req.user._id;
    let transaction = new Transaction({
        amount, type, note, author: userId
    })
    transaction.save()
        .then(tran => {
            const updatedUser = { ...req.user._doc };
            if (type === 'income') {
                updatedUser.balance = updatedUser.balance + amount;
                updatedUser.income = updatedUser.income + amount
            } else if (type === 'expense') {
                updatedUser.balance = updatedUser.balance - amount;
                updatedUser.expense = updatedUser.expense - amount;
            }
            updatedUser.transactions.unshift(tran._id)
            User.findByIdAndUpdate(updatedUser._id, { $set: updatedUser }, { new: true })
                .then(user => {
                    res.status(201).json({
                        message: 'transaction created successfully',
                        transaction: tran,
                        user

                    })
                })
                .catch(err => {
                    console.log(err)
                })

        })
        .catch(err => {
            return serverError(res, err, { message: 'database error' });
            // return serverError(res, err, { message: 'can not create transaction' });
        })
}

exports.getAll = (req, res) => {
    const { _id } = req.user;
    console.log(_id)
    Transaction.find({ author: _id })
        .then(transactions => {
            if (transactions.length === 0) {
                res.status(200).json({
                    message: 'No transaction found'
                })
            } else {
                res.status(200).json(transactions)
            }
        })
        .catch(err => {
            serverError(res, err, { message: 'can not fetch all transactions from database' });
        })
}

exports.getSingleTransaction = (req, res) => {
    const { transactionId } = req.params

    Transaction.findById(transactionId)
        .then(transaction => {
            if (!transaction) {
                return success(res, 200, { message: "No transaction found" })
            }
            return success(res, 200, transaction)
        })
        .catch(err => {
            serverError(res, err, { message: 'can not fetch single transaction from database' });
        })
}

exports.updateTransaction = (req, res) => {
    const { transactionId } = req.params;
    Transaction.findByIdAndUpdate(transactionId, { $set: req.body }, { new: true })
        .then(result => {
            success(res, 201, { message: "Transaction updated successfully", transaction: result })
        })
        .catch(err => {
            return serverError(res, err, { message: 'can not update transaction' })
        })
}

exports.remove = (req, res) => {
    const { transactionId } = req.params;
    Transaction.findByIdAndDelete(transactionId)
        .then(result => {
            console.log('i am success')
            success(res, 200, { message: 'transaction deleted successfully', transaction: result })
        })
        .catch(err => {
            console.log('i am remove')
            serverError(res, err, { message: "transaction can not  delete transaction" })
        })
}