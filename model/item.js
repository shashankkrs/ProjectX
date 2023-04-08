const mongoose =require('mongoose');

const itemSchema=mongoose.Schema({
    
    name: String,
    quantity:Number,
    rate:Number,
    amount : {
        type: Number,
        default: function(){
            return this.rate * this.quantity;
        }
    },
    description:String
})
const itemModel=mongoose.model('item',itemSchema);
module.exports=itemModel;