const mongoose=require('mongoose')

const jobs_Card_Schema=mongoose.Schema({
    vehicle_id:mongoose.Schema.Types.ObjectId,
    Date:String,
    Mechanic_name:String,
    Particular_work:String,
    Parts_Used:String,
    Sign_Of_mt_Incharge:String,
    Remarks:String,
    Issue_voucher_number:Number,
    Work_order_No:Number,
    CRP_No:String

});
const job_Card_Model=mongoose.model('job_card',jobs_Card_Schema)
module.exports=job_Card_Model;
