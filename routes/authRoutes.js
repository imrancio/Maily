const passport = require("passport");

// exports function that takes app object
module.exports = app => {
  // kick user to google oauth flow
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  // google redirects back to callback route
  app.get("/auth/google/callback", passport.authenticate("google"));
};
