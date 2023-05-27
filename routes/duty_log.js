const express = require("express");
const Duty_Log = require("../model/duty_log");
const Vehicle = require("../model/vehicle");
const route = express.Router();

//To Find Duty Log
route.get("/", async (req, res) => {
  try {
    const dutyLog = await Duty_Log.find()
      .populate("vehicle")
      .sort({ creation_date: -1 });
    res.send(dutyLog);
  } catch (error) {
    console.log(error);
  }
});

route.get("/last_indent_no", async (req, res) => {
  try {
    const dutyLog = await Duty_Log.find().sort({ creation_date: -1 }).limit(1);
    res.send(dutyLog[0].indent_no);
  } catch (error) {
    console.log(error);
  }
});

route.get("/uncompleted", async (req, res) => {
  try {
    const dutyLog1 = await Duty_Log.find({
      mission_ended: { $eq: false },
    }).populate("vehicle");
    res.send(dutyLog1);
  } catch (error) {
    console.log(error);
  }
});

//To Find Duty Log By Id
route.get("/:id", async (req, res) => {
  try {
    const dutyID = req.params.id;
    const foundDuty = await Duty_Log.findById(dutyID).populate("vehicle");
    res.send(foundDuty);
  } catch (error) {
    console.log(error);
  }
});

//To Add New Duty Log
route.post("/add", async (req, res) => {
  try {
    const newDutyLog = await new Duty_Log(req.body);
    const foundVehicle = await Vehicle.findById(req.body.vehicle);
    if (foundVehicle) {
      if (req.body.mission_ended === "false") {
        foundVehicle.available = false;
        foundVehicle.save();
      } else {
        foundVehicle.available = true;
        foundVehicle.save();
      }
    }
    newDutyLog.save();
    if (newDutyLog) {
      res.send("new duty log is added");
    } else {
      res.send("not added");
    }
  } catch (error) {
    console.log(error);
  }
});

// update fields
route.put("/update/:id", async (req, res) => {
  try {
    const { km_run, meter_count, fuel, mission_ended, in_datetime } = req.body;
    const foundDuty = await Duty_Log.findByIdAndUpdate(req.params.id, {
      in_datetime: in_datetime,
      mission_ended: mission_ended,
      km_run: km_run,
      meter_count: meter_count,
      fuel: fuel,
    });
    res.send(foundDuty);
  } catch (error) {
    console.log(error);
  }
});

module.exports = route;
