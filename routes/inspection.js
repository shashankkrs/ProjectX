const express = require('express');
const Inspection = require('../model/inspection/inspection');
const route = express.Router();


route.get('/', async(req, res) => {
    try {
        const inspectionList=await Inspection.find().populate('vehicle');
        res.send(inspectionList);
    } catch (error) {
        console.log(error);
    }
});


route.post('/inspect', async(req, res) => {
    try {
        const newInspection = await new Inspection(req.body);
        newInspection.save();
        if (newInspection ) {
            res.send("Inspection complete!");
        }else{
            res.send("Inspection failed!");
        }
    } catch (error) {
        console.log(error);
    }
});


module.exports = route;