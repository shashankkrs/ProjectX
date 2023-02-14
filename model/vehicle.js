const mongoose=require('mongoose');

// * * Vehicle elements
const vehicleSchema=mongoose.Schema({
    registration_no : String,
    vehicle_no:String,
    vehicle_type :String,
    vehicle_serial_no :String,
    chasis_no :Number,
    engine_no:Number,
    crp_no:Number,
    no_of_cylinders:Number,
    horse_power:Number,
    size_of_sparking_plug:String,
    Rank:String,
    date_of_service:Number
});

const vehicleModel=mongoose.model('vehicles',vehicleSchema);

module.exports=vehicleModel;