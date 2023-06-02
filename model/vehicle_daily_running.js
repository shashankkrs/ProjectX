const mongoose = require("mongoose");

const vehicleDailyRunningSchema =new mongoose.Schema({
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
  general_duty_kilometers_run: Number,
  final_kilometer: Number,
  motor_spirit_drawn_litres: Number,
  no_litres: Number,
  remarks: Boolean,
});
const vehicleDailyRunning_Model = mongoose.model(
  "vehicleDailyRunning",
  vehicleDailyRunningSchema
);
module.exports = vehicleDailyRunning_Model;
