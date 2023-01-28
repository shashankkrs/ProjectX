require('./conn/mongo')
const express = require('express')
const app = express()
const port = 3000
const Vehicle=require('./model/vehicle');
const Job_Card=require('./model/job');
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








app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});