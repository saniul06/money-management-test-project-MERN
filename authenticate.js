const passport = require('passport');

module.exports = (req, res, next) => {
    passport.authenticate('jwt', (err, user, info) => {
        if (err) {
            console.log('i am error')
            // return next(err)
            return res.status(500).json({
                message: 'server error'
            })
        }

        if (!user) {
            console.log('failedddd')
            return res.status(400).json({
                message: 'Authenticate failed oh yes'
            })
        }
        console.log('here i ammmm')
        req.user = user;
        return next();
    })(req, res, next)
}