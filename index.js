const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
// doesn't export anything; need to consider order
require("./models/User");
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

const PORT = process.env.PORT || 5000;
app.listen(PORT);
