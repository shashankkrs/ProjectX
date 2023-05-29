const mongoose = require("mongoose");

const signatureSchema = new mongoose.Schema({
  name: String,
  designation: String,
  signature: Boolean,
  date: Date,
});

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
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vehicles",
  },
  for: String,
  description: String,
  issued_amount: Number,
  recieved_amount: Number,
  cost: Number,
  recieved: Boolean,
  issued: Boolean,
  recieve_voucher_no: String,
  issue_voucher_no: String,
  remarks: String,
  slno: Number,
  sign_polhavaldar: signatureSchema,
  sign_mtic: signatureSchema,
});

const oilregister_Model = mongoose.model("oilstockregister", oilRegisterSchema);
module.exports = oilregister_Model;
