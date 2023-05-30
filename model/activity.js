const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  type: String,
  description: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("activity", activitySchema);
