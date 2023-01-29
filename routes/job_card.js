const express=require('express');
const Job_Card=require('../model/job');
const route=express.Router();

/*
*! Routes For geeting job card
*/


route.post('delete/:id', async(req, res)=>{
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

route.get('/',async(req,res)=>{
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
route.post('/', async(req, res) => {
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
module.exports=route;

