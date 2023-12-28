const express = require("express");
const Driver = require("../model/driver");
const route = express.Router();
const fileUpload = require("express-fileupload");
const mime = require("mime");
const path = require("path");
const User = require("../model/user");
const bcrypt = require("bcrypt");

route.use(fileUpload());

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

route.post("/add", async (req, res) => {
  try {
    const newDriver = await new Driver(req.body);
    const newUser = await new User(req.body);
    newUser.username = req.body.email;
    newUser.driver = true;

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
    } else {
      newDriver.profile_pic = "";
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newDriver.password, salt);
    newDriver.password = hash;
    newUser.password = hash;
    newDriver.save();
    newUser.save();
    console.log(newDriver);
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
