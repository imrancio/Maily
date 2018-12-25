const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

// access data from mongoose users model
const User = mongoose.model("users");

passport.use(
  new GoogleStrategy(
    {
      // console.google.developers.com
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    // callback called when google returns user back to oauth flow
    (accessToken, refreshToken, profile, done) => {
      // model functions return a Promise!
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // user record with this id already exists
        } else {
          new User({ googleId: profile.id }).save();
        }
      });
    }
  )
);
