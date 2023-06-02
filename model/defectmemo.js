const mongoose=require('mongoose');

const defectMemoSchema=new mongoose.Schema({
    vehicle_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'vehicles'
    },
    vehicle_no:String,
    vehicle_model:Number,
    vehicle_make:String,
    vehicle_type:String,
    date:Date,
    kilometers_run:Number,
    condition_of_engine:String,
    signature:Boolean,
    designation:String,
    defect:String,
    defect_reason:String,
    suggestion:String,
    required_parts:String,
    availability_of_parts:Boolean,
    execution_report:String,
    remarks:String
});

const defectMemoModel=mongoose.model('defectmemos',defectMemoSchema);

module.exports=defectMemoModel;