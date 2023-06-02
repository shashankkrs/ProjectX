const mongoose = require('mongoose');

const expenseVoucherSchema =new mongoose.Schema({
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
    expenseVoucherNo: String,
    station : String,
    date : Date
});

const expenseVoucherModel = mongoose.model('expensevoucher',expenseVoucherSchema);

module.exports = expenseVoucherModel;