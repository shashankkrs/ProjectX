const mongoose = require("mongoose");

const defectSchema = new mongoose.Schema({
  name: String,
  reason: String,
  remedy_suggestion: String,
});

const signatureSchema = new mongoose.Schema({
  name: String,
  designation: String,
  signature: Boolean,
  date: {
    type: Date,
    default: Date.now,
  },
});

const jobWorksSchema = new mongoose.Schema({
  name: String,
  completed: {
    type: Boolean,
    default: false,
  },
  remarks: String,
});

const partsSchema = new mongoose.Schema({
  balance: Number,
  difference: Number,
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "item",
  },
  name: String,
  quantity: Number,
});

const defectMemoSchema = new mongoose.Schema({
  slno: Number,
  memo_no: String,
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vehicles",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  condition_of_engine: String,
  defects: [defectSchema],
  job_works: [jobWorksSchema],
  parts: [partsSchema],
  remarks: String,
  sign_mto: signatureSchema,
  sign_simm: signatureSchema,
});

const defectMemoModel = mongoose.model("defectmemos", defectMemoSchema);

module.exports = defectMemoModel;
