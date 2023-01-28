const mongoose = require('mongoose');

const driverSchema = mongoose.Schema({
    sl_no : Number,
    name : String,
    rank : String,
    license_no : String,
    date_from : String,
    date_to : String,
    approval_mto : Boolean
});

const driverModel = mongoose.model('drivers',driverSchema);

module.exports = driverModel;