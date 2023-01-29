const express = require('express');
const Driver= require('../model/driver');
const route = express.Router();

// To find drivers
route.get('/', async(req, res) => {
    try {
        const driverList=await Driver.find();
        res.send(driverList);
    } catch (error) {
        console.log(error);
    }
});

// To add drivers
route.post('/add', async(req, res) => {
    try {
        const newDriver=await new Driver(req.body);
        newDriver.save();
        if (newDriver) {
            res.send("New Driver Added");
        }else{
            res.send("No Driver Added");
        }
    } catch (error) {
        console.log(error);
    }
});

// To find drivers
route.get('/:id', async(req, res) => {
    try {
        const driverID=req.params.id;
        const foundDriver=await Driver.findById(driverID);
        res.send(foundDriver);
    } catch (error) {
        console.log(error);
    }
});

module.exports = route;