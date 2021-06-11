const e = require('cors');
const validator = require('validator');

const validate = (user) => {
    let error = {};

    if (!user.password) {
        error.password = 'Please provide your password';
    }

    if (!user.email) {
        error.email = 'Please provide your email';
    }

    if (user.email && !validator.isEmail(user.email)) {
        error.email = 'Invalid email';
    }

    return {
        error,
        isValid: Object.keys(error).length === 0
    };
};

module.exports = validate;
