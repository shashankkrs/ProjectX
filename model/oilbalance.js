const mongoose = require("mongoose");

const oilbalance_schema =new mongoose.Schema({
  Date: Date,
  recived: Boolean,
  issued: Boolean,
  balance: Number,
  balance_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "oilstockregister",
  },
});
const oilbalance_Model = mongoose.model("oilbalance", oilbalance_schema);
module.exports = oilbalance_Model;
