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
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/surveys");
    }
  );

  // logout route handler
  app.get("/api/logout", (req, res) => {
    // automatically added to request by passport
    req.logout();
    res.redirect("/");
  });

  // route handler for current user
  app.get("/api/current_user", (req, res) => {
    // req.user added to request by passport after deserialize to User model
    res.send(req.user);
  });
};
