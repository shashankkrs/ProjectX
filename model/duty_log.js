const mongoose = require("mongoose");

const dutyLogSchema = mongoose.Schema({
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vehicles",
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
  km_run: Number,
  meter_count: Number,
  approved_by_mto: Boolean,
  fuel: Number,
  mission_ended: Boolean,
});

module.exports = mongoose.model("duty_log", dutyLogSchema);
