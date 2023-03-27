const mongoose=require('mongoose')

const vehicle_daily_running_Schema=mongoose.Schema({
    vehicle_id:mongoose.Schema.Types.ObjectId,
    Date:Date,
    Registration_No:String,
    vehicle_type:String,
    CRP_No:Number,
    Duty_Order_No:Number,
    Training_Kilometers_Run:Number,
    Regimental_Duty_Kilometers_Run:Number,
    General_Duty_kilometers_Run:Number,
    Final_Kilometer:Number,
    Motor_Spirit_Drawn_Litres:Number,
    No_Litres:Number,
    Remarks:Boolean
});
const vehicle_daily_running_Model=mongoose.model('vehicle_daily_running',vehicle_daily_running_Schema)
module.exports=vehicle_daily_running_Model;