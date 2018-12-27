const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
// doesn't export anything; need to consider order
require("./models/User");
require("./models/Survey");
require("./services/passport");

// connect to MongoDB instance
mongoose.connect(keys.mongoURI);

const app = express();

// middlewares do some pre-processing on the request / modify them
// before passing off to route handlers

// parses json payloads from POST/PUT/PATCH requests
// and adds it to the request.body of incoming request
app.use(bodyParser.json());

// cookie-session encrypts / decrypts cookies
app.use(
  cookieSession({
    // milliseconds till cookie expires
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
// passport simplifies oauth flow
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

if (process.env.NODE_ENV === "production") {
  // first Express will serve prod assets like main.js/css
  app.use(express.static("client/build"));
  // then Express will serve index.html if route unrecognised
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
