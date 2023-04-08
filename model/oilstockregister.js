const mongoose = require("mongoose");

const oilregister_schema = mongoose.Schema({
  Name_of_store: String,
  Date: Date,
  voucher_no: String,
  from_whom_received_to_whom_issued: String,
  recived: Number,
  issued: Number,
  balance: Number,
  recivedd:Boolean,
  issueed:Boolean,
  signature_of_pol_havaldar: Boolean,
  signature_of_mto: Boolean,
  remarks: String,
  vehicle_id:String,
  last:Boolean,
  slno:Number,
});
const oilregister_Model = mongoose.model(
  "oilstockregister",
  oilregister_schema
);
module.exports = oilregister_Model;
