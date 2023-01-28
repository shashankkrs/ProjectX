// including required files

require('./conn/mongo')
const express = require('express')
const app = express()
const port = 3000
const Vehicle=require('./model/vehicle');
const Defectmemo=require('./model/defectmemo');
const bodyParser=require('body-parser');
const Duty_Log=require('./model/duty_log');
const Driver= require('./model/driver');

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

/*
*! Routes For geeting job card
*/


app.post('/job_card/delete/:id', async(req, res)=>{
    try {
        console.log("HHHH");
        const deletedJobCard=await Job_Card.deleteOne({_id: req.params.id});
        console.log(deletedJobCard);
        if (deletedJobCard) {
            res.send("Deleted Job Card");
        } else {
            res.send("Not Found");
        }
    } catch (error) {
        console.log(error);
    }

})

app.get('/Job_Card',async(req,res)=>{
    try{
        const Job_card=await Job_Card.find();
        res.send(Job_card);
    
    }
    catch(error){
        console.log(error);
    }
})
/*
*! Routes For addying a new documment in job card
*/
app.post('/Job_Card', async(req, res) => {
    try {
        const newJob_card=await new Job_Card(req.body);
        newJob_card.save();
        if (newJob_card) {
            res.send("New Job card id Added");
        }else{
            res.send("New Job card cannot be added Added");
        }
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
app.get('/memo/:id', async(req, res) => {
    try {
        const memoID=req.params.id;
        const foundDefect=await Defectmemo.findById(memoID);
        res.send(foundDefect);
    } catch (error) {
        console.log(error);
    }
});
app.get('/memo/vehicle/:vehicle_id',async(req,res)=>{
    try{
        const vehicleId = req.params.vehicle_id;
        const foundvehiclememo = await Memo.find({vehicle_id:vehicleId});
        res.send(foundvehiclememo);
    }catch(err){
        console.log(err);
    }
})

app.post('/memo/add', async(req, res) => {
    try {
        const newdefectmemo=await new Defectmemo(req.body);
        newdefectmemo.save();
        if (newdefectmemo) {
            res.send("New Memo Added");
        }else{
            res.send("No Memo Added");
        }
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