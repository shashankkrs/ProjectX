const mongoose=require('mongoose')

const jobCardSchema=mongoose.Schema({
    vehicle_id:mongoose.Schema.Types.ObjectId,
    date:String,
    mechanic_name:String,
    particular_work:String,
    parts_used:String,
    sign_of_mt_incharge:String,
    remarks:String,
    issue_voucher_number:Number,
    work_order_no:Number,
    crp_no:String
});
const jobCard_Model=mongoose.model('jobCard',jobCardSchema)
module.exports=jobCard_Model;