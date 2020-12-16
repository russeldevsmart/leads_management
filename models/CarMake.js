const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CarMakeSchema = new Schema({
  id_car_make: {
    type: Number,
  },
  name: {
    type: String,
  },
  date_create: {
    type: Number,
  },
  date_update: {
    type: Number
  },
  id_car_type: {
    type: Number,
  },
});

module.exports = CarMake = mongoose.model("car_make", CarMakeSchema);
