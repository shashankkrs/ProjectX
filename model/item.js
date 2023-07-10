const mongoose = require("mongoose");

const conversionSchema = new mongoose.Schema({
  to_unit: String,
  conversion_factor: String,
});

const unitSchema = new mongoose.Schema({
  name: String,
  conversions: [conversionSchema],
});

const itemSchema = new mongoose.Schema({
  name: String,
  current_rate: {
    type: Number,
    default: 0,
  },
  balance: {
    type: Number,
    default: 0,
  },
  last_balance: {
    type: Number,
    default: 0,
  },
  change_in_balance: {
    type: Number,
    default: 0,
  },
  description: String,
  total_cost: {
    type: Number,
    default: 0,
  },
  smallest_unit: unitSchema,
  units: [unitSchema],
  last_updated: {
    type: Date,
    default: Date.now,
  },
});
const itemModel = mongoose.model("item", itemSchema);
module.exports = itemModel;
