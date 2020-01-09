const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const passport = require('passport');
const models = require('../models');
require('dotenv').config();

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(new GoogleStrategy({
    clientID: String(process.env.GOOGLE_CLIENT_ID),
    clientSecret: String(process.env.GOOGLE_CIENT_SECRET),
    callbackURL: String(process.env.GOOGLE_CALLBACK_URL)
}, (accessToken, refreshToken, profile, done) => {
    const user = {
        id_gg: profile.id,
        displayName: profile.displayName,
        image: profile.photos[0].value,
        provider: profile.provider,
        locale: profile.vi
    };
    models.UserGGAuth.findOrCreate({where: {id_gg: profile.id}, defaults: user})
        .then(([user, created]) => {
            return done(null, user);
        });
}));

router.post('/user/register', userController.register);
router.post('/user/login', userController.login);
router.get('/user/profile', passport.authenticate('jwt', {session: false}), userController.profile);
router.get('/user/logout', userController.logout);
router.post('/user/upload/avatar', userController.uploadAvatar);
router.get('/user/auth/google', passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login']}));

router.get('/user/auth/google/callback', passport.authenticate('google',
    {
        failureRedirect: String(`${process.env.SHOPEE_FRONTEND_FREFIX}/login`)
    }), userController.GoogleCallback);

module.exports = router;
