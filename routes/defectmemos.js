const express=require('express');
const DefectMemo=require('../model/defectmemo');
const route=express.Router();

// To Search Memo
route.get('/:id', async(req, res) => {
    try {
        const memoID=req.params.id;
        const foundDefect=await DefectMemo.findById(memoID);
        res.send(foundDefect);
    } catch (error) {
        console.log(error);
    }
});

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
route.get('/', async(req, res) => {
    try {
        const newDefectMemo=await DefectMemo.find();
        res.send(newDefectMemo);
    } catch (error) {
        console.log(error);
    }
});

module.exports=route;