require('./conn/mongo')
const express = require('express')
const app = express()
const port = 3000

const Driver= require('./model/driver');
const DefectMemo=require('./model/defectmemo');
const bodyParser=require('body-parser');
const Duty_Log=require('./model/duty_log');
const vehicleRoute=require('./routes/vehicles');
const JobCard=require('./routes/job_card');

app.use(bodyParser.urlencoded({extended:true}));


app.use('/vehicles',vehicleRoute);
app.use('/job_card',JobCard);






// To find drivers
app.get('/drivers', async(req, res) => {
    try {
        const driverList=await Driver.find();
        res.send(driverList);
    } catch (error) {
        console.log(error);
    }
});

// To add drivers
app.post('/drivers/add', async(req, res) => {
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

//To find duty log
app.get('/duty_log', async(req, res) => {
    try {
        const dutyLog=await Duty_Log.find();
        res.send(dutyLog);
    } catch (error) {
        console.log(error);
    }
});

//To find duty log by id
app.get('/duty_log/:id', async(req, res) => {
    try {
        const dutyID=req.params.id;
        const foundDuty=await Duty_Log.findById(dutyID);
        res.send(foundDuty);
    } catch (error) {
        console.log(error);
    }
});

// to find duty log by vehicle id
app.get('/duty_log/vehicle/:vehicle_id', async(req, res) => {
    try {
        const vehicleID=req.params.vehicle_id;
        const foundVehicleDutyLog=await Duty_Log.find({vehicle_id:vehicleID});
        res.send(foundVehicleDutyLog);
    } catch (error) {
        console.log(error);
    }
});

// To Search Memo


app.get('/memo/:id', async(req, res) => {
    try {
        const memoID=req.params.id;
        const foundDefect=await DefectMemo.findById(memoID);
        res.send(foundDefect);
    } catch (error) {
        console.log(error);
    }
});

// To Search Memo By Vehicle Id

app.get('/memo/vehicle/:vehicle_id',async(req,res)=>{
    try{
        const vehicleId = req.params.vehicle_id;
        const foundVehicleMemo = await Memo.find({vehicle_id:vehicleId});
        res.send(foundVehicleMemo);
    }catch(err){
        console.log(err);
    }
})

// To Add Memo
app.post('/memo/add', async(req, res) => {
    try {
        const newDefectMemo=await new DefectMemo(req.body);
        newDefectMemo.save();
        if (newDefectMemo) {
            res.send("New Memo Added");
        }else{
            res.send("No Memo Added");
        }
    } catch (error) {
        console.log(error);
    }
});

// To Show Memo
app.get('/memo', async(req, res) => {
    try {
        const newDefectMemo=await DefectMemo.find();
        res.send(newDefectMemo);
    } catch (error) {
        console.log(error);
    }
});

// To find drivers
app.get('/drivers/:id', async(req, res) => {
    try {
        const driverID=req.params.id;
        const foundDriver=await Driver.findById(driverID);
        res.send(foundDriver);
    } catch (error) {
        console.log(error);
    }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});