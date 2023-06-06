const express = require("express");
const DefectMemo = require("../model/defectmemo");
const route = express.Router();

// To Search Memo By Vehicle Id
route.get("/vehicle/:vehicle_id", async (req, res) => {
  try {
    const vehicleId = req.params.vehicle_id;
    const foundVehicleMemo = await DefectMemo.find({ vehicle_id: vehicleId });
    res.send(foundVehicleMemo);
  } catch (err) {
    console.log(err);
  }
});

// To Add Memo
route.post("/add", async (req, res) => {
  try {
    let date = new Date(req.body.date);
    var newDefectMemo = new DefectMemo({ ...req.body, date: date });
    newDefectMemo.save();
    if (newDefectMemo) {
      res.send("New Memo Added");
    } else {
      res.send("No Memo Added");
    }
  } catch (error) {
    console.log(error);
  }
});

// To Add Memo
route.post("/sign/add/:as", async (req, res) => {
  try {
    let signAs = req.params.as;
    //Update DefectMemo with Signature
    let update = {
      $set: {},
    };
    update.$set[signAs] = {
      name: req.loggedUser.name,
      designation: req.loggedUser.role,
      date: Date.now(),
      signature: true,
    };
    const foundDefectMemo = await DefectMemo.findByIdAndUpdate(
      req.body.memoID,
      update
    );
    console.log(foundDefectMemo);
    if (foundDefectMemo) {
      res.send({
        status: 200,
        message: "SIGNATURE ADDED",
      });
    } else {
      res.send({
        status: 401,
        message: "SIGNATURE NOT ADDED",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// To Show Memo
route.get("/", async (req, res) => {
  try {
    const newDefectMemo = await DefectMemo.find()
      .populate("vehicle")
      .populate("parts.$.id");
    res.send(newDefectMemo);
  } catch (error) {
    console.log(error);
  }
});

route.get("/desc", async (req, res) => {
  try {
    const newDefectMemo = await DefectMemo.find()
      .sort({ date: -1 })
      .populate("vehicle")
      .populate("parts.$.id");
    res.send(newDefectMemo);
  } catch (error) {
    console.log(error);
  }
});

// To Search Memo
route.get("/:id", async (req, res) => {
  try {
    const memoID = req.params.id;
    let foundDefect = await DefectMemo.findById(memoID).populate("vehicle");
    res.send(foundDefect);
  } catch (error) {
    console.log(error);
  }
});

module.exports = route;
