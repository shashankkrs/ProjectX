const mongoose=require('mongoose');

const dutyLogSchema=mongoose.Schema({
    vehicle_id: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'vehicles'
    },
    date :Date,
    indent_no : String,
    out_time : Date,
    in_time :Date,
    purpose : String,
    from : String,
    to :String,
    km_run : Number,
    meter_count : Number,
    approved_by_mto :Boolean,
    fuel : Number
});

module.exports=mongoose.model('duty_log',dutyLogSchema);