const express = require("express");
const Duty_Log = require("../model/duty_log");
const Vehicle = require("../model/vehicle");
const Driver = require("../model/driver");
const bcrypt = require("bcrypt");

const route = express.Router();

//To Find Duty Log
route.get("/", async (req, res) => {
  try {
    const dutyLog = await Duty_Log.find()
      .populate("vehicle")
      .populate("driver");
    res.send(dutyLog);
  } catch (error) {
    console.log(error);
  }
});

route.get("/duties/:from/:to", async (req, res) => {
  try {
    let from = new Date(req.params.from);
    let to = new Date(req.params.to);
    const dutyLog = await Duty_Log.find({
      date: {
        $gte: from,
        $lte: to,
      },
    })
      .limit(100)
      .populate("vehicle")
      .populate("driver");
    res.send(dutyLog);
  } catch (error) {
    console.log(error);
  }
});

route.get("/desc", async (req, res) => {
  try {
    const dutyLog = await Duty_Log.find()
      .populate({
        path: "vehicle",
        select: "vehicle_crp_no name registration_no",
      })
      .sort({ creation_date: -1 });
    res.send(dutyLog);
  } catch (error) {
    console.log(error);
  }
});

route.get("/last_indent_no", async (req, res) => {
  try {
    const dutyLog = await Duty_Log.find().sort({ creation_date: -1 }).limit(1);
    if (dutyLog[0]) {
      res.send(dutyLog[0].indent_no);
    } else {
      res.send("0");
    }
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

route.post("/sign/add/:as", async (req, res) => {
  try {
    let sign = req.params.as;
    let password = req.body.password;
    const isvalidUser = bcrypt.compareSync(password, req.loggedUser.password);
    if (isvalidUser) {
      const update = {
        $set: {},
      };
      update.$set[sign] = {
        name: req.loggedUser.name,
        designation: req.loggedUser.role,
        signature: true,
      };
      const dutyLog = await Duty_Log.findByIdAndUpdate(req.body.dutyID, update);
      res.send("ok");
    } else {
      res.send("WRONG PASSWORD");
    }
  } catch (error) {
    console.log(error);
  }
});

//To Find Duty Log By Id
route.get("/:id", async (req, res) => {
  try {
    const dutyID = req.params.id;
    const foundDuty = await Duty_Log.findById(dutyID)
      .populate("vehicle")
      .populate("driver");
    res.send(foundDuty);
  } catch (error) {
    console.log(error);
  }
});

//To Add New Duty Log
route.post("/add", async (req, res) => {
  try {
    const { in_datetime } = req.body;
    let meter_count = req.body.meter_count ? req.body.meter_count : 0;
    let fuel = req.body.fuel ? req.body.fuel : 0;
    const newDutyLog = new Duty_Log(req.body);
    const getLastVehicleDuty = await Vehicle.findById(req.body.vehicle);

    const foundVehicle = await Vehicle.findById(req.body.vehicle);
    if (foundVehicle) {
      if (req.body.mission_ended === "false") {
        foundVehicle.available = false;
        foundVehicle.save();
      } else {
        foundVehicle.available = true;
        newDutyLog.mission_ended = true;
        foundVehicle.odometer_log.push({
          km_diff:
            parseInt(meter_count) - parseInt(foundVehicle.total_kilo_meter),
          km_run: meter_count,
        });
        foundVehicle.total_kilo_meter = meter_count;
        foundVehicle.fuel_log.push({
          current_fuel: fuel,
          fuel_diff: fuel - foundVehicle.fuel,
        });
        foundVehicle.fuel = fuel;
        foundVehicle.save();
        newDutyLog.km_run =
          parseInt(meter_count) - parseInt(getLastVehicleDuty.total_kilo_meter);
        newDutyLog.meter_count = meter_count;
        newDutyLog.fuel = fuel;

        newDutyLog.in_datetime = in_datetime;
      }
    }

    const foundDriver = await Driver.findById(req.body.driver);
    if (foundDriver) {
      if (req.body.mission_ended === "false") {
        foundDriver.available = false;
        foundDriver.save();
      } else {
        foundDriver.available = true;
        foundDriver.save();
        newDutyLog.mission_ended = true;
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
    const { in_datetime } = req.body;
    let meter_count = req.body.meter_count ? req.body.meter_count : 0;
    let fuel = req.body.fuel ? req.body.fuel : 0;
    const foundDuty = await Duty_Log.findById(req.params.id);
    if (foundDuty) {
      foundDuty.km_run =
        parseInt(meter_count) - parseInt(foundDuty.meter_count);
      foundDuty.meter_count = meter_count;
      foundDuty.fuel = fuel;
      foundDuty.mission_ended = true;
      foundDuty.in_datetime = in_datetime;
      foundDuty.save();
    }

    const foundVehicle = await Vehicle.findById(foundDuty.vehicle);
    if (foundVehicle) {
      if (req.body.mission_ended === "false") {
        foundVehicle.available = false;
        foundVehicle.save();
      } else {
        foundVehicle.available = true;
        foundVehicle.odometer_log.push({
          km_diff:
            parseInt(meter_count) - parseInt(foundVehicle.total_kilo_meter),
          km_run: meter_count,
        });
        foundVehicle.total_kilo_meter = meter_count;
        foundVehicle.fuel_log.push({
          current_fuel: fuel,
          fuel_diff: fuel - foundVehicle.fuel,
        });
        foundVehicle.fuel = fuel;
        foundVehicle.save();
      }
    }

    const foundDriver = await Driver.findById(foundDuty.driver);
    if (foundDriver) {
      if (req.body.mission_ended === "false") {
        foundDriver.available = false;
        foundDriver.save();
      } else {
        foundDriver.available = true;
        foundDriver.save();
      }
    }

    res.send(foundDuty);
  } catch (error) {
    console.log(error);
  }
});

//To Query One Active Duty Request Paramter ID
route.get("/active/:id", async (req, res) => {
  try {
    const dutyID = req.params.id;
    const foundDuty = await Duty_Log.findOne({
      _id: dutyID,
      mission_ended: false,
    }).populate("vehicle");
    res.send(foundDuty);
  } catch (error) {
    console.log(error);
  }
});


module.exports = route;
