const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  pic: {
    tpe: String,
  },
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  website: {
    type: String,
  },
  phone: {
    type: String,
  },
  companyName: {
    type: String,
  },
  timeZone: {
    type: String,
  },
  language: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);
