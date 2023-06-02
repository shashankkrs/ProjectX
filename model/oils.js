const mongoose = require("mongoose");

const oilSchema =new mongoose.Schema({
  type: String,
  balance: {
    type: Number,
    default: 0,
  },
  last_updated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("oil", oilSchema);
