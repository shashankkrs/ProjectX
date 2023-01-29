const express=require('express');
const Duty_Log=require('../model/duty_log');
const route= express.Router();

//To find duty log
route.get('/', async(req, res) => {
    try {
        const dutyLog=await Duty_Log.find();
        res.send(dutyLog);
    } catch (error) {
        console.log(error);
    }
});

//To find duty log by id
route.get('/:id', async(req, res) => {
    try {
        const dutyID=req.params.id;
        const foundDuty=await Duty_Log.findById(dutyID);
        res.send(foundDuty);
    } catch (error) {
        console.log(error);
    }
});

// to find duty log by vehicle id
route.get('/vehicle/:vehicle_id', async(req, res) => {
    try {
        const vehicleID=req.params.vehicle_id;
        const foundVehicleDutyLog=await Duty_Log.find({vehicle_id:vehicleID});
        res.send(foundVehicleDutyLog);
    } catch (error) {
        console.log(error);
    }
});

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