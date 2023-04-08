const express = require("express");
const oilstockRegister = require("../model/oilstockregister");
const route = express.Router();

route.get("/", async (req, res) => {
  try {
    const oilstockregister = await oilstockRegister.find().sort({slno: -1});
    res.send(oilstockregister);
  } catch (error) {
    console.log(error);
  }
});

route.get("/last1", async (req, res) => {
  try {
    const oilstockregister = await oilstockRegister.find({last:{$eq:true}});
   
    const [lastoil,others]=oilstockregister;
    res.send(lastoil);
  } catch (error) {
    console.log(error);
  }
});
route.get('/:id', async(req, res) => {
  try {
      const oilID=req.params.id;
      const oilstockregister=await oilstockRegister.findById(oilID);
      res.send(oilstockregister);
  } catch (error) {
      console.log(error);
  }
});
route.post("/add", async (req, res) => {
  try {
    const new_oilstockregister = await new oilstockRegister(req.body);
    new_oilstockregister.save();
    console.log(req.body);
    console.log(new_oilstockregister);
    if (new_oilstockregister) {
      res.send(new_oilstockregister._id);
      console.log(new_oilstockregister._id)
    } else {
      res.send("Unable to add");
    }
  } catch (error) {
    console.log(error);
  }
});
route.put('/update/:id',async(req,res)=>{
  try {
   const dutyId=req.params.id;
   const upde=req.body.last;
   //const updstatus=req.body.mission_ended;
   console.log(dutyId);
   //console.log(updintime);
   const foundDuty1=await oilstockRegister.findByIdAndUpdate(dutyId, {last:upde});
     res.send(foundDuty1);
     console.log((foundDuty1));
  } catch (error) {
      console.log(error);
  }
  
  
  
  });

module.exports = route;
