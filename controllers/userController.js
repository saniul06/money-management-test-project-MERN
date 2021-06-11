const registerValidator = require('../validator/registerValidator');

const loginValidator = require('../validator/loginValidator');

const User = require('../model/User');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken')

const { resourceError, serverError } = require('../utils/error');

const { success } = require('../utils/success');

exports.login = (req, res) => {
    const { email, password } = req.body;
    const validator = loginValidator(req.body);

    if (validator.isValid) {
        User.findOne({ email })
            .then((user) => {
                if (!user) {
                    return resourceError(res, { email: 'User not found' });
                }
                bcrypt.compare(String(password), user.password, (err, result) => {
                    if (err) {
                        return serverError(res, err, { message: 'bcrypt compare error' });
                    }
                    if (!result) {
                        return resourceError(res, { password: "Password doesn't match" });
                    }
                    const token = jwt.sign({
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        amount: user.amount,
                        income: user.income,
                        expense: user.expense,
                        transactions: user.transactions
                    }, 'secret', { expiresIn: 60 * 60 })

                    success(res, 200, { message: 'login successful', token: `Bearer ${token}` })

                });
            })
            .catch(err => serverError(res, err, { message: 'Error in fetch email in login controller' }))
    } else {
        return res.status(400).json(validator.error);
    }
};

exports.register = (req, res) => {
    let { name, email, password } = req.body;
    const validator = registerValidator(req.body);
    if (validator.isValid) {
        User.findOne({ email })
            .then((user) => {
                if (user) {
                    return resourceError(res, { email: 'Email already exists' });
                }
                bcrypt.hash(String(password), 11, (err, hash) => {
                    if (err) {
                        return serverError(res, err, { message: 'cannot bcrypt password' });
                    }
                    let user = new User({
                        name,
                        email,
                        password: hash,
                        amount: 0,
                        income: 0,
                        expense: 0,
                        transactions: []
                    });
                    user.save()
                        .then((user) => {
                            return success(res, 201, { message: 'User created successfully' });
                        })
                        .catch((err) => {
                            return serverError(res, err, { message: 'Can not create user' });
                        });
                });
            })
            .catch((err) => {
                return serverError(res, err, { message: 'server error' });
            });
    } else {
        res.status(400).json(validator.error);
    }
};

exports.getAll = (req, res) => {
    User.find()
        .then(user => {
            if (!user) {
                return success(res, 200, 'No user found')
            }
            return success(res, 200, user)
        })
        .catch(err => {
            console.log(err)
            return serverError(res, err, { message: 'Can not fetch all user' })
        })
}
