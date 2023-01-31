const mongoose=require('mongoose');

const defectMemoSchema=mongoose.Schema({
    vehicle_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'vehicles'
    },
    sl_no:Number,
    defect:String,
    defect_reason:String,
    suggestion:String,
    required_parts:String,
    availability_of_parts:Boolean,
    execution_report:String,
    remarks:String
});

const defectMemoModel=mongoose.model('memos',defectMemoSchema);

module.exports=defectMemoModel;