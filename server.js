require('./conn/mongo')
const express = require('express')
const app = express()
const port = 3000
const Vehicle=require('./model/vehicle');
const bodyParser=require('body-parser');
const Duty_Log=require('./model/duty_log');

app.use(bodyParser.urlencoded({extended:true}));


app.get('/vehicles', async(req, res) => {
    try {
        const vehicleList=await Vehicle.find();
        res.send(vehicleList);
    } catch (error) {
        console.log(error);
    }
});

app.post('/vehicles/add', async(req, res) => {
    try {
        const newVehicle=await new Vehicle(req.body);
        newVehicle.save();
        if (newVehicle) {
            res.send("New Vehicle id Added");
        }else{
            res.send("No Vehicle Added");
        }
    } catch (error) {
        console.log(error);
    }
});


app.get('/vehicles/:id', async(req, res) => {
    try {
        const vehicleID=req.params.id;
        const foundVehicle=await Vehicle.findById(vehicleID);
        res.send(foundVehicle);
    } catch (error) {
        console.log(error);
    }
});


app.get('/duty_log', async(req, res) => {
    try {
        const dutyLog=await Duty_Log.find();
        res.send(dutyLog);
    } catch (error) {
        console.log(error);
    }
});

app.get('/duty_log/:id', async(req, res) => {
    try {
        const dutyID=req.params.id;
        const foundDuty=await Duty_Log.findById(dutyID);
        res.send(foundDuty);
    } catch (error) {
        console.log(error);
    }
});

app.get('/duty_log/:vehicle_id', async(req, res) => {
    try {
        const vehicleID=req.params.vehicle_id;
        const foundVehicleDutyLog=await Duty_Log.find({});
        res.send(foundDuty);
    } catch (error) {
        console.log(error);
    }
});


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});