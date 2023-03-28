const express = require("express");
const oilstockRegister = require("../model/oilstockregister");
const route = express.Router();

route.get("/", async (req, res) => {
  try {
    const oilstockregister = await oilstockRegister.find();
    res.send(oilstockregister);
  } catch (error) {
    console.log(error);
  }
});

route.post("/add", async (req, res) => {
  try {
    const new_oilstockregister = await new oilstockRegister(req.body);
    new_oilstockregister.save();
    if (new_oilstockregister) {
      res.send("Sucessfully addeed");
    } else {
      res.send("Unable to add");
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = route;
