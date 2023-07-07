const mongoose = require("mongoose");

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
  description: String,
  total_cost: {
    type: Number,
    default: 0,
  },
});
const itemModel = mongoose.model("item", itemSchema);
module.exports = itemModel;
