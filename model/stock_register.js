const mongoose = require("mongoose");

const signatureSchema = new mongoose.Schema({
  name: String,
  designation: String,
  signature: Boolean,
  date: {
    type: Date,
    default: Date.now,
  },
});

const orderSchema = mongoose.Schema({
  sno: {
    type: Number,
    default: 0,
  },
  isIssue: {
    type: Boolean,
    default: false,
  },
  isRecieve: {
    type: Boolean,
    default: false,
  },
  voucher_no: String,
  station: String,
  total_amount: Number,
  date: {
    type: Date,
    default: Date.now,
  },
  items: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "item",
      },
      new_balance: Number,
      rate: Number,
      quantity: Number,
      cost: Number,
    },
  ],
  remarks: String,
  sign_mtic: signatureSchema,
  sign_polhavaldar: signatureSchema,
});
const orderModel = mongoose.model("stock_register", orderSchema);
module.exports = orderModel;
