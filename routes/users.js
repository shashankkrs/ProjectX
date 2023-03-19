const express = require('express');
const User= require('../model/user');
const route = express.Router();
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
// To Find Users
route.get('/', async(req, res) => {
    try {
        // console.log(users);
        const userList=await User.find();
        res.send(userList);
    } catch (error) {
        console.log(error);
    }
});

// To Add Users
route.post('/add', async(req, res) => {
    try {
        const {username,password,contact_no,email_id,rank,user_registration_no}=req.body;
        const foundUser=await User.findOne({username:username});
        if (foundUser) {
          res.send("USERNAME ALREADY TAKEN");
        }else{
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(password, salt);
          const newUser=await new User({
            username:username,
            password:hash,
            contact_no:contact_no,
            email_id:email_id,
            rank:rank,
            user_registration_no:user_registration_no
          });
          newUser.save();
          res.send("NEW USER CREATED")
        }
        // const newUser=await new User(req.body);
        // newUser.save();
        // if (newUser) {
        //     res.send("New User Added");
        // }else{
        //     res.send("No User Added");
        // }
    } catch (error) {
        console.log(error);
    }
});

route.post('/change',async(req,res)=>{
    try {
        const {username,password,contact_no,email_id,rank,user_registration_no}=req.body;
        
    } catch (error) {
        console.log(error);
    }
})


route.get('/get_user_details',async(req,res)=>{
    try {
        // console.log(req.cookies.token);
        var decoded=await jwt.verify(req.cookies.token,process.env.JWT_SIGNATURE);
        // console.log(decoded);
        const user=decoded.userID;
        const data=await User.findById(user);
        // console.log(data);
        res.send(data);
    } catch (error) {
        console.log(error);
    }
});

// To Find Users by ID
route.get('/:id', async(req, res) => {
    try {
        const userID=req.params.id;
        const foundUser=await User.findById(userID);
        res.send(foundUser);
    } catch (error) {
        console.log(error);
    }
});

route.put('/update/:id',async(req,res)=>{
    try {
        console.log("ABD");
        const userId=req.params.id;
        const upd_in_name=req.body.username;
        const upd_in_role=req.body.role;
        const upd_in_rank=req.body.rank;
        const upd_in_phone_no=req.body.contact_no;
        const upd_in_email_id=req.body.email_id;

        console.log(userId);
        console.log(req);
        const foundUser=await User.findByIdAndUpdate(userId,{
            username:upd_in_name,
            role:upd_in_role,
            rank:upd_in_rank,
            contact_no:upd_in_phone_no,
            email_id:upd_in_email_id
        });
        res.send(foundUser);
        console.log((foundUser));

    } catch (error) {
        console.log(error);
    }
})


module.exports = route;