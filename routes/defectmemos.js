const express=require('express');
const DefectMemo=require('../model/defectmemo');
const route=express.Router();

// To Search Memo By Vehicle Id
route.get('/vehicle/:vehicle_id',async(req,res)=>{
    try{
        const vehicleId = req.params.vehicle_id;
        const foundVehicleMemo = await DefectMemo.find({vehicle_id:vehicleId});
        res.send(foundVehicleMemo);
    }catch(err){
        console.log(err);
    }
})

// To Add Memo
route.post('/add', async(req, res) => {
    try {
        console.log(req.body);
        var newDefectMemo=await new DefectMemo(req.body);
        console.log(newDefectMemo);
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
route.get('/', async(req, res) => {
    try {
        const newDefectMemo=await DefectMemo.find();
        res.send(newDefectMemo);
    } catch (error) {
        console.log(error);
    }
});

// To Search Memo
route.get('/:id', async(req, res) => {
    try {
        const memoID=req.params.id;
        let foundDefect=await DefectMemo.findById(memoID).populate('vehicle_id','vehicle_type');
        res.send(foundDefect);
    } catch (error) {
        console.log(error);
    }
});

module.exports=route;