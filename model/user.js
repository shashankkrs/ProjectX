const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    user_registration_no:String,
    username:String,
    password :String,
    contact_no:Number,
    email_id:String,
    rank:String
});

module.exports=mongoose.model('users',userSchema);
