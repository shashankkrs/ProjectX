const express = require("express");
const DefectMemos = require("../model/defectmemo");
const route = express.Router();

route.get("/", async (req, res) => {
  try {
    const defectMemos = await DefectMemos.find().populate("vehicle");
    res.send(defectMemos);
  } catch (error) {
    console.log(error);
  }
});

module.exports = route;
