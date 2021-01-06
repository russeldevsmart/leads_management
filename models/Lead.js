const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const LeadSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  client_type: {
    type: String,
  },
  comments: [{
    type: { type: String },
    created_on: { type: Date, defualt: Date.now },
    created_by: { type: Schema.Types.ObjectId, ref: "users" },
    content: { type: String }
  }],
  created_on: {
    type: Date,
    default: Date.now
  },
  edited_on: {
    type: Date,
    default: Date.now
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  edited_by: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  listing_link: {
    type: String,
  },
  make: [{
    type: Schema.Types.ObjectId,
    ref: "car_make",
  }],
  model: [{
    type: Schema.Types.ObjectId,
    ref: "car_model",
  }],
  year: {
    type: Number,
  },
  mileage: {
    type: Number,
  },
  offered_price: {
    type: Number,
  },
  budget: {
    type: Number
  },
  desired_price: {
    type: Number,
  },
  offered_price: {
    type: Number,
  },
  reprise: {
    type: String
  },
  wanted_part: {
    type: String,
  },
  service: [
    {type: String}
  ],
  request_details: {
    type: String,
  },
  date_maintenance: {
    type: Date,
  },
  inspection_date: {
    type: Date,
  },
  source: {
    type: String
  },
  status: {
    type: String,
  },
  deleted: {
    type: Boolean,
    default: false,
  }
});

module.exports = Lead = mongoose.model("leads", LeadSchema);
