const mongoose = require("mongoose");
const { Schema } = mongoose;
const RecipientSchema = require("./Recipient");

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  // one-many relation to Recipient Model
  recipients: [RecipientSchema],
  from: String,
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  // map one-one relation to User model
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  dateSent: Date,
  lastResponded: Date
});

mongoose.model("surveys", surveySchema);
