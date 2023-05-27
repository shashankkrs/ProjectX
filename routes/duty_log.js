const express = require("express");
const Duty_Log = require("../model/duty_log");
const route = express.Router();

//To Find Duty Log
route.get("/", async (req, res) => {
  try {
    const dutyLog = await Duty_Log.find()
      .populate("vehicle_id")
      .sort({ creation_date: -1 });
    res.send(dutyLog);
  } catch (error) {
    console.log(error);
  }
});

route.get("/uncompleted", async (req, res) => {
  try {
    const dutyLog1 = await Duty_Log.find({
      mission_ended: { $eq: false },
    }).populate("vehicle_id");
    res.send(dutyLog1);
  } catch (error) {
    console.log(error);
  }
});

//To Find Duty Log By Id
route.get("/:id", async (req, res) => {
  try {
    const dutyID = req.params.id;
    const foundDuty = await Duty_Log.findById(dutyID).populate("vehicle_id");
    res.send(foundDuty);
  } catch (error) {
    console.log(error);
  }
});

//To Add New Duty Log
route.post("/add", async (req, res) => {
  try {
    const newDutyLog = await new Duty_Log(req.body);
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
    const dutyId = req.params.id;
    const updintime = req.body.in_datetime;
    const updstatus = req.body.mission_ended;
    const foundDuty1 = await Duty_Log.findByIdAndUpdate(dutyId, {
      in_datetime: updintime,
      mission_ended: updstatus,
    });
    res.send(foundDuty1);
  } catch (error) {
    console.log(error);
  }
});

module.exports = route;
