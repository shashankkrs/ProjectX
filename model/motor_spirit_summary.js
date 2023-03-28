const mongoose=require('mongoose')

const motor_spirit_summmary_Schema=mongoose.Schema({
    vehicle_id:mongoose.Schema.Types.ObjectId,
    motor_spirit_in_tank_on_the_1st_of_month:Number,
    motor_spirit_issued_to_vehicle_during_month:Number,
    motor_spirit_consumed_during_the_month:Number,
    balance_in_tank_at_the_end_of_month:Number,
    total_running_KM_for_month:Number,
    average_KM_per_litre:Number
});
const motor_spirit_summmary_Model=mongoose.model('motor_spirit_summmary',motor_spirit_summmary_Schema)
module.exports=motor_spirit_summmary_Model;