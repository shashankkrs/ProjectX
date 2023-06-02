const mongoose = require("mongoose");

const xRayRegisterSchema =new mongoose.Schema({
  vehicle_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vehicles",
  },
  date: Date,
  registration_no: String,
  vehicle_type: String,
  crp_no: Number,
  duty: String,
  bill_no: Number,
  kilometers: Number,
  amount: Number,
  hc_remarks: Boolean,
  mt_remarks: Boolean,
  mto_remarks: Boolean,
});
const xRayRegister_Model = mongoose.model(
  "xRayRegister",
  xRayRegisterSchema
);
module.exports = xRayRegister_Model;
