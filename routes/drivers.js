const express = require("express");
const Driver = require("../model/driver");
const route = express.Router();

// To Find drivers
route.get("/", async (req, res) => {
  try {
    const driverList = await Driver.find().sort({ name: 1 });
    res.send(driverList);
  } catch (error) {
    console.log(error);
  }
});

// To Add Drivers
route.post("/add", async (req, res) => {
  try {
    const newDriver = await new Driver(req.body);
    newDriver.save();
    if (newDriver) {
      res.send({
        status: 200,
        message: "Driver Added Successfully",
        data: newDriver,
      });
    } else {
      res.send("No Driver Added");
    }
  } catch (error) {
    console.log(error);
  }
});

// To Find Drivers by ID
route.get("/:id", async (req, res) => {
  try {
    const driverID = req.params.id;
    const foundDriver = await Driver.findById(driverID);
    res.send(foundDriver);
  } catch (error) {
    console.log(error);
  }
});

module.exports = route;
