const mongoose = require('mongoose');

const oilregister_schema=mongoose.Schema({
    Name_of_store:String,
    Date:Date,
    Voucher_no:String,
    from_whom_received_to_whom_issued:String,
    recived:Number,
    issued:Number,
    balance:Number,
    signature_of_pol_havaldar:Boolean,
    signature_of_mto:Boolean,
    Remarks:String


})
const oilregister_Model=mongoose.model('oilstockregister',oilregister_schema)
module.exports=oilregister_Model;