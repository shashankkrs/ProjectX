const express = require("express");
const oilBalance = require("../model/oilbalance");
const route = express.Router();

route.get("/", async (req, res) => {
  try {
    const oilbalance = await oilBalance.find().populate('balance_id');
    res.send(oilbalance);
  } catch (error) {
    console.log(error);
  }
});

route.post("/add", async (req, res) => {
  try {
    const new_oilbalance = await new oilBalance(req.body);
    new_oilbalance.save();
    console.log(req.body);
    if (new_oilbalance) {
      res.send("Sucessfully addeed");
    } else {
      res.send("Unable to add");
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = route;
