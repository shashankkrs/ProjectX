const mongoose = require('mongoose')

const issueSchema=mongoose.Schema({
    sno:Number,
    voucher_no: String,
    station : String,
    date : Date,
    items:[
        {
            item:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"item",
            },
            rate: Number,
            quantity:Number,
            amount:Number,
            description:String
        },
    ],
});

const issueModel=mongoose.model('issue',issueSchema);
module.exports = issueModel;