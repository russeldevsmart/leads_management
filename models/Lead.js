const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const LeadSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category_type: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
  },
  created_on: {
    type: Date,
    default: Date.now
  },
  edited_on: {
    type: Date,
    default: Date.now
  },
  created_by: {
    type: String
  },
  edited_by: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  client_type: {
    type: String,
  },
  listing_link: {
    type: String,
  },
  make: {
    type: String,
  },
  model: {
    type: String,
  },
  year: {
    type: String,
  },
  mileage: {
    type: Number,
  },
  requested_price: {
    type: Number,
  },
  budget: {
    type: String
  },
  trade_in_budget: {
    type: String,
  },
  status: {
    type: String,
  },
  request_type: {
    type: String
  },
  request: {
    type: String,
  },
  source: {
    type: String
  },
  service: {
    type: String,
  },
  service_date: {
    type: Date,
  },
  spare_part_requested: {
    type: String,
  },
  details: {
    type: String,
  },
  verification_date: {
    type: Date,
  },
  inspection_date: {
    type: Date,
  },
});

module.exports = Lead = mongoose.model("leads", LeadSchema);