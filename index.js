const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
// just config - doesn't export anything; need to consider order
require("./models/User");
require("./services/passport");
// connect to MongoDB instance
mongoose.connect(keys.mongoURI);

const app = express();

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
