const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    require: true
  },
  name: {
    type: String,
    require: true
  },
  phone: { type: String },
  email: {
    type: String
  },
  type: { type: String, default: "personal" },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("contact", ContactSchema);
