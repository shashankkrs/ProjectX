const mongoose=require('mongoose');

const vehicleSchema=mongoose.Schema({
    vehicle_no : String,
    vehicle_type :String,
    chasis_no :Number
});

const vehicleModel=mongoose.model('vehicles',vehicleSchema);

module.exports=vehicleModel;