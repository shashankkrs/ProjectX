const mongoose = require('mongoose');

const issueVoucherSchema = mongoose.Schema({
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

const issueVoucherModel = mongoose.model('issuevoucher',issueVoucherSchema);

module.exports = issueVoucherModel;