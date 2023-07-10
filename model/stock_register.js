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

const conversionSchema = new mongoose.Schema({
  to_unit: String,
  conversion_factor: String,
});

const unitSchema = new mongoose.Schema({
  name: String,
  conversions: [conversionSchema],
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
      last_balance: Number,
      quantity_in_unit: Number,
      conversion_rate_to_smallest_unit: Number,
      quantity_in_smallest_unit: Number,
      rate_per_unit: Number,
      current_unit: String,
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
