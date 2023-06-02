const mongoose = require("mongoose");

const motorSpiritSummmarySchema =new mongoose.Schema({
  vehicle_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vehicles",
  },
  motor_spirit_in_tank_on_the_1st_of_month: Number,
  motor_spirit_issued_to_vehicle_during_month: Number,
  motor_spirit_consumed_during_the_month: Number,
  balance_in_tank_at_the_end_of_month: Number,
  total_running_KM_for_month: Number,
  average_KM_per_litre: Number,
});
const motorSpiritSummmary_Model = mongoose.model(
  "motorSpiritSummmary",
  motorSpiritSummmarySchema
);
module.exports = motorSpiritSummmary_Model;
