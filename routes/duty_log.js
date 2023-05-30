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
      .sort({ indent_no: -1 });
    res.send(dutyLog);
  } catch (error) {
    console.log(error);
  }
});

route.get("/last_indent_no", async (req, res) => {
  try {
    const dutyLog = await Duty_Log.find().sort({ indent_no: -1 }).limit(1);
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
      if (sign == "sign_indenter") {
        const dutyLog = await Duty_Log.findByIdAndUpdate(req.body.dutyID, {
          $set: {
            sign_indenter: {
              name: req.loggedUser.name,
              designation: req.loggedUser.role,
              signature: true,
            },
          },
        });
        res.send("ok");
      }
      if (sign === "sign_mto") {
        const dutyLog1 = await Duty_Log.findByIdAndUpdate(req.body.dutyID, {
          $set: {
            sign_mto: {
              name: req.loggedUser.name,
              designation: req.loggedUser.role,
              signature: true,
            },
          },
        });
        res.send("ok");
      }
      if (sign === "sign_mtic") {
        const dutyLog1 = await Duty_Log.findByIdAndUpdate(req.body.dutyID, {
          $set: {
            sign_mtic: {
              name: req.loggedUser.name,
              designation: req.loggedUser.role,
              signature: true,
            },
          },
        });
        res.send("ok");
      }
      if (sign === "sign_indentingoffice") {
        const dutyLog1 = await Duty_Log.findByIdAndUpdate(req.body.dutyID, {
          $set: {
            sign_indentingoffice: {
              name: req.loggedUser.name,
              designation: req.loggedUser.role,
              signature: true,
            },
          },
        });
        res.send("ok");
      }
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
    const newDutyLog = await new Duty_Log(req.body);
    const foundVehicle = await Vehicle.findById(req.body.vehicle);
    if (foundVehicle) {
      if (req.body.mission_ended === "false") {
        foundVehicle.available = false;
        foundVehicle.save();
      } else {
        foundVehicle.available = true;
        foundVehicle.odometer_log.push({
          km_diff: meter_count - foundVehicle.km_run,
          km_run: meter_count,
          date: Date.now,
        });
        foundVehicle.fuel = fuel;
        foundVehicle.save();
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
    const { meter_count, fuel, in_datetime } = req.body;
    const foundDuty = await Duty_Log.findById(req.params.id);
    if (foundDuty) {
      foundDuty.km_run =
        parseInt(meter_count) - parseInt(foundDuty.meter_count);
      foundDuty.meter_count = meter_count - foundDuty.meter_count;
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
          date: Date.now(),
        });
        foundVehicle.total_kilo_meter = meter_count;
        foundVehicle.fuel_log.push({
          current_fuel: fuel,
          fuel_diff: fuel - foundVehicle.fuel,
          date: Date.now(),
        });
        foundVehicle.fuel = fuel;
        console.log(foundVehicle);
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

module.exports = route;
