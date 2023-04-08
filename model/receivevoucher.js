const mongoose = require('mongoose');

const receiveVoucherSchema = mongoose.Schema({
    receiveVoucherNo: String,
    station : String,
    date : Date,
    items:[
        {
            name :String,
            rate: Number,
            quantity:Number,
            amount:Number,
            description:String
        }
    ]
    
});

const receiveVoucherModel = mongoose.model('receivevoucher',receiveVoucherSchema);

module.exports = receiveVoucherModel;