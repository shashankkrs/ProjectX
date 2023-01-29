require('./conn/mongo')
const express = require('express')
const app = express()
const port = 3000

const DefectMemo=require('./model/defectmemo');
const bodyParser=require('body-parser');
const Duty_Log=require('./model/duty_log');
const vehicleRoute=require('./routes/vehicles');
const driverRoute=require('./routes/drivers');
const dutyLogRoute=require('./routes/duty_log');

app.use(bodyParser.urlencoded({extended:true}));


app.use('/vehicles',vehicleRoute);
app.use('/duty_log',dutyLogRoute);

app.use('/drivers',driverRoute);

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
});

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

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});