const express = require('express');
const User= require('../model/user');
const route = express.Router();
const bcrypt=require('bcrypt')

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

module.exports = route;