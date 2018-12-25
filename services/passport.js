const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

// access data from mongoose users model
const User = mongoose.model("users");

// turns user model into cookie (passing set-cookie HTTP header)
passport.serializeUser((user, done) => {
  // pass error and identifying info for user
  // unique id is assigned to record by MongoDB
  done(null, user.id);
});

// turns user id (cookie) back into user model
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      // console.google.developers.com
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      // needed for https traffic through heroku proxy
      proxy: true
    },
    // callback called when google returns user back to oauth flow
    (accessToken, refreshToken, profile, done) => {
      // model functions return a Promise!
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // user record with this id already exists
          done(null, existingUser);
        } else {
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
