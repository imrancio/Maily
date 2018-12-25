const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String
});

// User model passes schema to MongoDB
// creating a mongo collection (if not exists)
mongoose.model("users", userSchema);
