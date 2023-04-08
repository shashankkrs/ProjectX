const mongoose = require('mongoose');

const receiveVoucherSchema = mongoose.Schema({
    vehicle_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "vehicles",
    },
    items: String,
    vehicle_reg_no: String,
    vehicle_model:Number,
    kilometers_run:Number,
    vehicle_type:String,
    vehicle_make:String,
    vehicle_type: String,
    quantity: Number,
    rate: Number,
    amount: {
        type: Number,
        default: function () {
            return this.rate * this.quantity;
        }
    },
    receive_voucher_no: Number,
    station: String,
    date: Date
});

const receiveVoucherModel = mongoose.model('receivevoucher', receiveVoucherSchema);

module.exports = receiveVoucherModel;