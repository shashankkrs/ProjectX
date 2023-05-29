const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  sno: Number,
  voucher_no: String,
  station: String,
  date: Date,
  items: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "item",
      },
      rate: Number,
      quantity: Number,
      amount: Number,
      description: String,
    },
  ],
});
const orderModel = mongoose.model("order", orderSchema);
module.exports = orderModel;
