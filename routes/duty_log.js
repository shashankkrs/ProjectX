const express=require('express');
const Duty_Log=require('../model/duty_log');
const route= express.Router();

//To Find Duty Log
route.get('/', async(req, res) => {
    try {
        const dutyLog=await Duty_Log.find().populate('vehicle_id');
        // console.log(dutyLog);
        res.send(dutyLog);
    } catch (error) {
        console.log(error);
    }
});

//To Find Duty Log By Id
route.get('/:id', async(req, res) => {
    try {
        const dutyID=req.params.id;
        const foundDuty=await Duty_Log.findById(dutyID).populate('vehicle_id');
        res.send(foundDuty);
    } catch (error) {
        console.log(error);
    }
});

//To Add New Duty Log
route.post('/add', async(req, res) =>{
    try {
        console.log(req.body);
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
route.put('/update/:id',async(req,res)=>{
    try {
     const dutyId=req.params.id;
     const updintime=req.body.in_time;
     const updstatus=req.body.mission_ended;
     console.log(dutyId);
     console.log(updintime);
     const foundDuty1=await Duty_Log.findByIdAndUpdate({dutyId}, { $set:{ in_time: updintime} })
       // res.send(foundDuty1);
       console.log((foundDuty1));
    } catch (error) {
        console.log(error);
    }
    
    
    
    }
)

module.exports=route;