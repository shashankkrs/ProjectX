const mongoose = require('mongoose');

const issueVoucherSchema = mongoose.Schema({
    sl_no : Number,
    items : String,
    vehicle_reg_no : String,
    vehicle_type : String,
    quantity : Number,
    rate : Number,
    amount : {
        type: Number,
        default: function(){
            return this.rate * this.quantity;
        }
    },
    issueVoucherNo: Number,
    station : String,
    date : Date
});

const issueVoucherModel = mongoose.model('issuevoucher',issueVoucherSchema);

module.exports = issueVoucherModel;