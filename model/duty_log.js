const mongoose = require("mongoose");

const signatureSchema = new mongoose.Schema({
  name: String,
  designation: String,
  signature: Boolean,
});

const dutyLogSchema = new mongoose.Schema({
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vehicles",
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "drivers",
  },
  creation_date: {
    type: Date,
    default: Date.now,
  },
  date: Date,
  indent_no: String,
  out_datetime: Date,
  in_datetime: Date,
  purpose: String,
  from: String,
  to: String,
  km_run: {
    type: Number,
    default: 0,
  },
  meter_count: {
    type: Number,
    default: 0,
  },
  approved_by_mto: Boolean,
  fuel: Number,
  mission_ended: Boolean,
  sign_indenter: signatureSchema,
  sign_mto: signatureSchema,
  sign_mtic: signatureSchema,
  sign_indentingoffice: signatureSchema,
});

module.exports = mongoose.model("duty_log", dutyLogSchema);
