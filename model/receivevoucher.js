const mongoose = require('mongoose');

const receiveVoucherSchema = mongoose.Schema({
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
    receiveVoucherNo: String,
    station : String,
    date : Date
});

const receiveVoucherModel = mongoose.model('receivevoucher',receiveVoucherSchema);

module.exports = receiveVoucherModel;