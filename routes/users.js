const express = require('express');
const User= require('../model/user');
const route = express.Router();

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
        const newUser=await new User(req.body);
        newUser.save();
        if (newUser) {
            res.send("New User Added");
        }else{
            res.send("No User Added");
        }
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