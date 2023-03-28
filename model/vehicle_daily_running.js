const mongoose = require("mongoose");

const vehicle_daily_running_Schema = mongoose.Schema({
  vehicle_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vehicles",
  },
  date: Date,
  registration_No: String,
  vehicle_type: String,
  crp_no: Number,
  duty_order_no: Number,
  training_kilometers_run: Number,
  regimental_duty_kilometers_run: Number,
  General_Duty_kilometers_Run: Number,
  Final_Kilometer: Number,
  Motor_Spirit_Drawn_Litres: Number,
  No_Litres: Number,
  Remarks: Boolean,
});
const vehicle_daily_running_Model = mongoose.model(
  "vehicle_daily_running",
  vehicle_daily_running_Schema
);
module.exports = vehicle_daily_running_Model;
