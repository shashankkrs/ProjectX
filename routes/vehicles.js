const express = require("express");
const Vehicle = require("../model/vehicle");
const route = express.Router();
const fileUpload = require("express-fileupload");
const { v4: uuid } = require("uuid");
const path = require("path");
const mime = require("mime");
const fs = require("fs");
const { exec } = require("child_process");
const { changeVehicleBackground } = require("../controller/functions");

route.use(fileUpload());

route.get("/", async (req, res) => {
  try {
    const vehicleList = await Vehicle.find(
      {
        deleted: false,
      },
      {
        fuel_log: 0,
      }
    );
    res.send(vehicleList);
  } catch (error) {
    console.log(error);
  }
});

route.get("/available", async (req, res) => {
  try {
    const vehicleList = await Vehicle.find(
      {
        deleted: false,
        available: true,
      },
      {
        fuel_log: 0,
      }
    );
    res.send(vehicleList);
  } catch (error) {
    console.log(error);
  }
});

route.post("/crp_no", async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({ vehicle_crp_no: req.body.crp_no });
    if (vehicle) {
      res.send("F");
    } else {
      res.send("NF");
    }
  } catch (error) {
    console.log(error);
  }
});

route.post("/:id/delete", async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (vehicle) {
      res.send("F");
    } else {
      res.send("NF");
    }
  } catch (error) {
    console.log(error);
  }
});

route.post("/:id/update", async (req, res) => {
  try {
    let vehicleID = req.params.id;
    let uploadFolder = path.join(
      __dirname,
      "..",
      "public/images/vehicle_images"
    );
    let images = [];
    if (req.files) {
      Object.keys(req.files).forEach((key) => {
        let suffix = key.split("_")[0];
        let file = req.files[key];
        let ext = mime.getExtension(file.mimetype);
        let filename = vehicleID + "-" + suffix + "." + ext;
        req.body[key] = filename;
        file.mv(path.join(uploadFolder, filename));
        // changeBackground(filename);
        images.push(filename);
      });
    }
    const vehicle = await Vehicle.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );

    const changeBackgroundPromises = images.map((filename) => {
      return changeVehicleBackground(filename);
    });

    Promise.all(changeBackgroundPromises)
      .then(() => {
        res.send({
          status: 200,
          message: "Vehicle Updated",
        });
        return;
      })
      .catch((error) => {
        res.send({
          status: 500,
          message: "Vehicle Updated But Background Not Changed",
        });
        return;
      });
  } catch (error) {
    console.log(error);
  }
});

route.post("/add", async (req, res) => {
  try {
    const newVehicle = await new Vehicle(req.body);
    newVehicle.save();
    if (newVehicle) {
      res.send({
        status: 200,
        message: "New Vehicle is Added",
        vehicle_id: newVehicle._id,
      });
    } else {
      res.send("No Vehicle Added");
    }
  } catch (error) {
    console.log(error);
  }
});

route.post("/:id/fuel_update", async (req, res) => {
  try {
    const vehicleID = req.params.id;
    const foundVehicle = await Vehicle.findOne({ _id: vehicleID });
    if (foundVehicle) {
      if (foundVehicle.fuel_capacity >= parseFloat(req.body.fuel)) {
        foundVehicle.fuel_log.push({
          current_fuel: req.body.fuel,
          fuel_diff: parseFloat(req.body.fuel) - foundVehicle.fuel,
          date: Date.now(),
        });

        foundVehicle.fuel = req.body.fuel;
        foundVehicle.save();
        res.send("UPDATED");
      } else {
        res.send("ABOVE VEHICLE CAPACITY");
      }
    }
  } catch (error) {
    console.log(error);
  }
});

route.post("/:id/update_km_run", async (req, res) => {
  try {
    const vehicleID = req.params.id;
    const foundVehicle = await Vehicle.findOneAndUpdate(
      { _id: vehicleID },
      {
        total_kilo_meter: req.body.km,
      }
    );
    foundVehicle.odometer_log.push({
      km_run: req.body.km,
      km_diff: parseFloat(req.body.km) - foundVehicle.total_kilo_meter,
      date: Date.now(),
    });
    foundVehicle.save();
    res.send("UPDATED");
  } catch (error) {
    console.log(error);
  }
});

route.get("/:id", async (req, res) => {
  try {
    const vehicleID = req.params.id;
    const foundVehicle = await Vehicle.findById(vehicleID);
    res.send(foundVehicle);
  } catch (error) {
    console.log(error);
  }
});
route.get("/get_vehicle/:vehicle_no", async (req, res) => {
  try {
    const vehicleID = req.params.vehicle_no;
    const foundVehicle = await Vehicle.find({ vehicle_no: vehicleID });
    res.send(foundVehicle);
  } catch (error) {
    console.log(error);
  }
});

module.exports = route;
