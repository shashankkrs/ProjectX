const mongoose = require('mongoose')

const issueSchema=mongoose.Schema({
    issueVoucherNo: String,
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

const issueModel=mongoose.model('issue',issueSchema);
module.exports = issueModel;