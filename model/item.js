const mongoose =require('mongoose');

const itemSchema=mongoose.Schema({
    name: String,
    quantity:Number,
    rate:Number,
    description:String
})
const itemModel=mongoose.model('item',itemSchema);
module.exports=itemModel;