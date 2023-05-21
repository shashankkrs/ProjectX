const mongoose = require('mongoose')

const orderSchema=mongoose.Schema({
    orderVoucherNo: String,
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
const orderModel=mongoose.model('order',orderSchema);
module.exports = orderModel;