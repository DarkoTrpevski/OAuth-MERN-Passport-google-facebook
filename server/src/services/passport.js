const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose')
const User = mongoose.model('users')
const keys = require('../config/keys');


passport.use(new GoogleStrategy({
    clientID: keys.googleClientId,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    console.log('Profile is: ', profile);
    User.findOne({ userId: profile.id }).then((user) => {
        if (user) {
            done(null, user);
        } else {
            new User({ userId: profile.id, username: profile.displayName, picture: profile._json.picture }).save().then((user) => {
                done(null, user);
            })
        }
    })
}));

passport.use(new FacebookStrategy({
    clientID: keys.FACEBOOK_APP_ID,
    clientSecret: keys.FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback",
    proxy: true,
}, (accessToken, refreshToken, profile, done) => {
    console.log('Profile is: ', profile);
    User.findOne({ userId: profile.id }).then((existingUser) => {
        if (existingUser) {
            done(null, existingUser)
        } else {
            new User({
                userId: profile.id,
                username: profile.displayName,
                picture: profile._json.picture
            }).save().then((user) => { done(null, user) })
        }
    })
}));


passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    })
})