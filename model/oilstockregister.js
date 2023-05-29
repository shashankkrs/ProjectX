const mongoose = require("mongoose");

const oilRegisterSchema = mongoose.Schema({
  from: String,
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "oil",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  current_balance: {
    type: Number,
    default: 0,
  },
  previous_balance: {
    type: Number,
    default: 0,
  },
  issued_amount: Number,
  recieved_amount: Number,
  cost: Number,
  recieved: Boolean,
  issued: Boolean,
  recieve_voucher_no: String,
  issue_voucher_no: String,
  remarks: String,
  slno: Number,
});

const oilregister_Model = mongoose.model("oilstockregister", oilRegisterSchema);
module.exports = oilregister_Model;
