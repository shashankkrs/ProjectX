// including required files

require('./conn/mongo')
const express = require('express')
const app = express()
const port = 3000
const Vehicle=require('./model/vehicle');
const Driver= require('./model/driver');
const bodyParser=require('body-parser');
const Duty_Log=require('./model/duty_log');

app.use(bodyParser.urlencoded({extended:true}));


// To list vehicles
app.get('/vehicles', async(req, res) => {
    try {
        const vehicleList=await Vehicle.find();
        res.send(vehicleList);
    } catch (error) {
        console.log(error);
    }
});

// To add vehicles
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

app.get('/duty_log/vehicle/:vehicle_id', async(req, res) => {
    try {
        const vehicleID=req.params.vehicle_id;
        const foundVehicleDutyLog=await Duty_Log.find({vehicle_id:vehicleID});
        res.send(foundVehicleDutyLog);
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