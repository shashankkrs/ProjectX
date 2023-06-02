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

const issueSchema = mongoose.Schema({
  sno: {
    type: Number,
    default: 0,
  },
  voucher_no: String,
  station: String,
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
      new_quantity: Number,
      rate: Number,
      quantity: Number,
      amount: Number,
      description: String,
    },
  ],
  sign_mtic: signatureSchema,
  sign_polhavaldar: signatureSchema,
});

const issueModel = mongoose.model("issue", issueSchema);
module.exports = issueModel;
