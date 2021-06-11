const express = require('express');

const mongoose = require('mongoose');

const passport = require('passport')


const morgan = require('morgan');

const cors = require('cors');

const app = express();

//dev packages

app.use(morgan('dev'));

app.use(cors());

//req data handle

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(passport.initialize())

const customPassport = require('./passport')

customPassport(passport)

//use all routers

app.use('/api/users', require('./routers/userRoute'));

app.use('/api/transactions', require('./routers/transactionRoute'));

app.get('/', (req, res) => {
    res.json({
        message: 'welcome to our application'
    });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    mongoose.connect(
        'mongodb://localhost:27017/money-management',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        () => console.log('Database connected...')
    );
});
