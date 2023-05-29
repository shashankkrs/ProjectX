const express = require("express");
const Vehicle = require("../model/vehicle");
const route = express.Router();
const fileUpload = require("express-fileupload");
const { v4: uuid } = require("uuid");

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
    // const vehicle = await Vehicle.findOneAndUpdate(
    //   { _id: req.params.id },
    //   {
    //     deleted: true,
    //     vehicle_crp_no: 0,
    //   }
    // );
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
    if (req.files) {
      let front_view = req.files.front_view;
      if (front_view) {
        var ext;
        switch (front_view.mimetype) {
          case "image/gif":
            ext = ".gif";
            break;
          case "image/jpeg":
            ext = ".jpeg";
            break;
          case "image/png":
            ext = ".png";
            break;
          default:
            ext = "";
            break;
        }
        let pic_name = req.params.id + "-front";
        let uploadPath =
          __dirname + "/../public/images/vehicle_images/" + pic_name + ext;
        req.body.front_view = pic_name + ext;
        front_view.mv(uploadPath);
      }
      let back_view = req.files.back_view;
      if (back_view) {
        var ext;
        switch (back_view.mimetype) {
          case "image/gif":
            ext = ".gif";
            break;
          case "image/jpeg":
            ext = ".jpeg";
            break;
          case "image/png":
            ext = ".png";
            break;
          default:
            ext = "";
            break;
        }
        let pic_name = req.params.id + "-back";
        let uploadPath =
          __dirname + "/../public/images/vehicle_images/" + pic_name + ext;
        req.body.back_view = pic_name + ext;
        back_view.mv(uploadPath);
      }
      let top_view = req.files.top_view;
      if (top_view) {
        var ext;
        switch (top_view.mimetype) {
          case "image/gif":
            ext = ".gif";
            break;
          case "image/jpeg":
            ext = ".jpeg";
            break;
          case "image/png":
            ext = ".png";
            break;
          default:
            ext = "";
            break;
        }
        let pic_name = req.params.id + "-top";
        let uploadPath =
          __dirname + "/../public/images/vehicle_images/" + pic_name + ext;
        req.body.top_view = pic_name + ext;
        top_view.mv(uploadPath);
      }
      let right_view = req.files.right_view;
      if (right_view) {
        var ext;
        switch (right_view.mimetype) {
          case "image/gif":
            ext = ".gif";
            break;
          case "image/jpeg":
            ext = ".jpeg";
            break;
          case "image/png":
            ext = ".png";
            break;
          default:
            ext = "";
            break;
        }
        let pic_name = req.params.id + "-right";
        let uploadPath =
          __dirname + "/../public/images/vehicle_images/" + pic_name + ext;
        req.body.right_view = pic_name + ext;
        right_view.mv(uploadPath);
      }
      let left_view = req.files.left_view;
      if (left_view) {
        var ext;
        switch (left_view.mimetype) {
          case "image/gif":
            ext = ".gif";
            break;
          case "image/jpeg":
            ext = ".jpeg";
            break;
          case "image/png":
            ext = ".png";
            break;
          default:
            ext = "";
            break;
        }
        let pic_name = req.params.id + "-left";
        let uploadPath =
          __dirname + "/../public/images/vehicle_images/" + pic_name + ext;
        req.body.left_view = pic_name + ext;
        left_view.mv(uploadPath);
      }
    }
    const vehicle = await Vehicle.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    if (vehicle) {
      res.send("F");
    } else {
      res.send("NF");
    }
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
