const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./model/User');

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

module.exports = passport => {
    console.log('what is this')
    passport.use(new JwtStrategy(opts, (payload, done) => {
        console.log('i am in passport')
        User.findOne({ _id: payload._id })
            .then(user => {
                console.log('i am in then')
                if (!user) {
                    console.log('not user')
                    return done(null, false)
                } else {
                    console.log('yes it is user')
                    return done(null, user, 'this is info')
                }
            })
            .catch(err => {
                console.log('oh this is error')
                return done(err, false)
            })
    }))
}