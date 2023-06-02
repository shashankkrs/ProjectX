const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    registration_no:String,
    name:String,
    username:String,
    password :String,
    phone:Number,
    email:String,
    rank:String,
    role:String,
    profile_pic : String
});

module.exports=mongoose.model('users',userSchema);
