const e = require('cors');
const validator = require('validator');

const validate = (user) => {
    let error = {};

    if (!user.name) {
        error.name = 'Please provide your name';
    }

    if (!user.email) {
        error.email = 'Please provide your email';
    } else if (!validator.isEmail(user.email)) {
        error.email = 'Invalid email';
    }

    if (!user.password) {
        error.password = 'Please give a passowr';
    }

    if (!user.confirmPassword) {
        error.confirmPassword = 'please give confirm password';
    }

    if (user.password !== user.confirmPassword) {
        error.confirmPassword = "Password doesn't match";
    }

    return {
        error,
        isValid: !Object.keys(error).length > 0
    };
};

module.exports = validate;
