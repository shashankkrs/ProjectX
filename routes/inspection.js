const express = require("express");
const Inspection = require("../model/inspection");
const route = express.Router();

route.get("/", async (req, res) => {
  try {
    const inspectionList = await Inspection.find().populate('vehicle');
    res.send(inspectionList);
  } catch (error) {
    console.log(error);
  }
});

route.post("/add", async (req, res) => {
  try {
    const inspection = new Inspection(req.body);
    await inspection.save();
    res.send({
      message: "Inspection added successfully",
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = route;
