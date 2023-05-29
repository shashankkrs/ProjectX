const express = require("express");
const oilBalance = require("../model/oilbalance");
const Oil = require("../model/oils");
const route = express.Router();

route.get("/", async (req, res) => {
  try {
    const oilbalance = await Oil.find().sort({ type: 1 });
    res.send(oilbalance);
  } catch (error) {
    console.log(error);
  }
});

route.get("/:id", async (req, res) => {
  try {
    const oilbalance = await Oil.findById(req.params.id);
    res.send(oilbalance);
  } catch (error) {
    console.log(error);
  }
});

route.get("/last", async (req, res) => {
  try {
    const oilbalance = await oilBalance
      .find()
      .populate("balance_id")
      .sort({ Date: -1 })
      .limit(1);
    const [lastoil, others] = oilbalance;
    res.send(lastoil);
  } catch (error) {
    console.log(error);
  }
});

route.post("/add", async (req, res) => {
  try {
    const new_oilbalance = await new oilBalance(req.body);
    new_oilbalance.save();
    if (new_oilbalance) {
      res.send("Sucessfully addeed");
    } else {
      res.send("Unable to add");
    }
  } catch (error) {
    console.log(error);
  }
});

route.post("/add_oil_type", async (req, res) => {
  try {
    const oil = new Oil(req.body);
    oil.save();
    res.send({
      status: 200,
      message: "Oil type added successfully",
      data: oil,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = route;
