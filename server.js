require('./conn/mongo')
const express = require('express')
const app = express()
const port = 3000
const Vehicle=require('./model/vehicle');
const Defectmemo=require('./model/defectmemo');
const bodyParser=require('body-parser');

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


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});