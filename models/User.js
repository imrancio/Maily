const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 }
});

// User model passes schema to MongoDB
// creating a mongo collection (if not exists)
mongoose.model("users", userSchema);
