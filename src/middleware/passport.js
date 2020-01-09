const User = require('../models').user;
const JSONResponse = require('../config/jsonResponse');
const HTTPStatusCode = require('../config/httpStatusCode');
const ErrorMessage = require('../config/errorMessage');
// const SecretKeys = require('../config/keys');

const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;
require('dotenv').config();

passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
}, (email, password, done) => {
    User.findOne({
        where: {email}
    }).then(async user => {
        if (!user)
            return done(null, false, new JSONResponse(new HTTPStatusCode()._404, 404, new ErrorMessage('user').ERR_104, null));
        if (!await user.isValidPassword(password))
            return done(null, false, new JSONResponse(new HTTPStatusCode()._401, 401, 'Wrong password', null));
        return done(null, user);
    }).catch(error => {
        return done(error);
    });
}));

passport.use('register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
}, (email, password, done) => {
    User.findOne({
        where: {email}
    }).then(user => {
        if (user)
            return done(null, false, new JSONResponse(new HTTPStatusCode()._409, 409, new ErrorMessage('user').ERR_105, null));
        return done(null, {email, password});
    }).catch(error => {
        return done(error);
    });
}));


passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: String(process.env.JWT_SECRET)
}, (jwtPayload, cb) => {
    return User.findByPk(jwtPayload.user.id)
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

// passport.deserializeUser((id, done) => {
//     User.findByPk(id).then(user => {
//         done(null, user);
//     }).catch(error => {
//         done(error, null);
//     });
// });
