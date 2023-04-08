const express=require('express');
const ReceiveVoucher=require('../model/receivevoucher');
const route=express.Router();

// To Search Receive Voucher By Vehicle Id
route.get('/vehicle/:vehicle_id',async(req,res)=>{
    try{
        const vehicleId = req.params.vehicle_id;
        const foundReceiveVoucher = await ReceiveVoucher.find({vehicle_id:vehicleId});
        res.send(foundReceiveVoucher);
    }catch(err){
        console.log(err);
    }
})

// To Add Receive Voucher
route.post('/add', async(req, res) => {
    try {
        console.log(req.body);
        var newReceiveVoucher=await new ReceiveVoucher(req.body);
        console.log(newReceiveVoucher);
        newReceiveVoucher.save();
        if (newReceiveVoucher) {
            res.send("New Receive Voucher Added");
        }else{
            res.send("No Receive Voucher Added");
        }
    } catch (error) {
        console.log(error);
    }
});

// To Show Receive Voucher
route.get('/', async(req, res) => {
    try {
        const newReceiveVoucher=await ReceiveVoucher.find();
        res.send(newReceiveVoucher);
    } catch (error) {
        console.log(error);
    }
});

// To Search Receive Voucher
route.get('/:id', async(req, res) => {
    try {
        const voucherID=req.params.id;
        let foundVoucher=await ReceiveVoucher.findById(voucherID).populate('vehicle_id','vehicle_type');
        res.send(foundVoucher);
    } catch (error) {
        console.log(error);
    }
});

module.exports=route;