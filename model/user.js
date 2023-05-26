const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    user_registration_no:String,
    name:String,
    username:String,
    password :String,
    contact_no:Number,
    email_id:String,
    rank:String,
    role:String,
    profile_pic : String
});

module.exports=mongoose.model('users',userSchema);
