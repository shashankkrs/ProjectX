const express = require("express");
const Driver = require("../model/driver");
const route = express.Router();
const fileUpload = require("express-fileupload");
const mime = require("mime");
const path = require("path");
const { exec } = require("child_process");
const { changeVehicleBackground } = require("./../controller/functions");

route.use(fileUpload());

// To Find drivers
route.get("/", async (req, res) => {
  try {
    const driverList = await Driver.find().sort({ name: 1 });
    res.send(driverList);
  } catch (error) {
    console.log(error);
  }
});

route.get("/available", async (req, res) => {
  try {
    const driverList = await Driver.find({
      available: { $eq: true },
    }).sort({ name: 1 });
    res.send(driverList);
  } catch (error) {
    console.log(error);
  }
});

// To Add Drivers
route.post("/add", async (req, res) => {
  try {
    const newDriver = await new Driver(req.body);
    let filename = "";
    let ext = "";
    if (req.files) {
      let profile_pic = req.files.profile_pic;
      ext = mime.getExtension(profile_pic.mimetype);
      filename = newDriver._id + "." + ext;
      profile_pic.mv(
        path.join(__dirname, "..", "public/images", "profilepic", filename)
      );
      newDriver.profile_pic = filename;
      let inputImage = path.join(
        __dirname,
        "..",
        "public/images/profilepic/" + profile_pic + ext
      );

      let outputImage = path.join(
        __dirname,
        "..",
        "public/images/temppic/" + profile_pic + ext
      );

      const command = `rembg i ${inputImage} ${outputImage}`;
      exec(command, (err, stdout, stderr) => {
        if (err) {
          return;
        } else {
          fs.renameSync(outputImage, inputImage);
        }
      });
    } else {
      newDriver.profile_pic = "";
    }
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
