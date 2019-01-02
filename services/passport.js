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
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
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
    async (accessToken, refreshToken, profile, done) => {
      // model functions return a Promise!
      const existingUser = await User.findOne({ googleId: profile.id });
      // user record with this id already exists
      if (existingUser) {
        return done(null, existingUser);
      }
      // save new user record
      const user = await new User({
        googleId: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        emails: profile.emails.map(email => email.value),
        photos: profile.photos.map(photo => photo.value)
      }).save();
      done(null, user);
    }
  )
);
