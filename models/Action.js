const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ActionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
  lead: {
    type: Schema.Types.ObjectId,
    ref: "leads",
    required: true,
  },
  content: {
    type: String, 
  },
  action_type: {
    type: String,
    requried: true
  },
});

module.exports = Action = mongoose.model("actions", ActionSchema);
