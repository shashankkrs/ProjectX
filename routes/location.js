const express=require('express');
const route= express.Router();

route.post('/', async(req, res) => {
    try {
        // console.log(req.body);
        res.send("OK")
    } catch (error) {
        console.log(error);
    }
});

module.exports=route;