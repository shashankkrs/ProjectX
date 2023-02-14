const express=require('express');
const Duty_Log=require('../model/duty_log');
const route= express.Router();

//To Find Duty Log
route.get('/', async(req, res) => {
    try {
        const dutyLog=await Duty_Log.find().populate('vehicle_id');
        res.send(dutyLog);
    } catch (error) {
        console.log(error);
    }
});

//To Find Duty Log By Id
route.get('/:id', async(req, res) => {
    try {
        const dutyID=req.params.id;
        const foundDuty=await Duty_Log.findById(dutyID);
        res.send(foundDuty);
    } catch (error) {
        console.log(error);
    }
});

// To Find Duty Log By Vehicle ID
route.get('/vehicle/:vehicle_id', async(req, res) => {
    try {
        const vehicleID=req.params.vehicle_id;
        const foundVehicleDutyLog=await Duty_Log.find({vehicle_id:vehicleID});
        res.send(foundVehicleDutyLog);
    } catch (error) {
        console.log(error);
    }
});

//To Add New Duty Log
route.post('/add', async(req, res) =>{
    try {
        const newDutyLog=await new Duty_Log(req.body);
        newDutyLog.save();
        if(newDutyLog){
            res.send("new duty log is added");
        }
        else {
            res.send("not added");
        }
    } catch (error) {
        console.log(error);
    }
})

module.exports=route;