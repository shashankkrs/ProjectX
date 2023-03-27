const mongoose=require('mongoose')

const x_ray_register_Schema=mongoose.Schema({
    vehicle_id:mongoose.Schema.Types.ObjectId,
    Date:Date,
    Registration_No:String,
    vehicle_type:String,
    CRP_No:Number,
    Duty:String,
    Bill_No:Number,
    Kilometers:Number,
    Amount:Number,
    HC_Remarks:Boolean,
    MT_Remarks:Boolean,
    MTO_Remarks:Boolean
});
const x_ray_register_Model=mongoose.model('x_ray_register',x_ray_register_Schema)
module.exports=x_ray_register_Model;