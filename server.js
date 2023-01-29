require('./conn/mongo')
const express = require('express')
const app = express()
const port = 3000

const DefectMemo=require('./model/defectmemo');
const bodyParser=require('body-parser');
const Duty_Log=require('./model/duty_log');
const vehicleRoute=require('./routes/vehicles');
const JobCardRoute=require('./routes/job_card');
const driverRoute=require('./routes/drivers');
const dutyLogRoute=require('./routes/duty_log');

app.use(bodyParser.urlencoded({extended:true}));


app.use('/vehicles',vehicleRoute);
app.use('/job_card',JobCardRoute);
app.use('/duty_log',dutyLogRoute);
app.use('/drivers',driverRoute);

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