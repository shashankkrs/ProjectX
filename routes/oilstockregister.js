const express = require("express");
const oilstockRegister = require("../model/oilstockregister");
const route = express.Router();
const Oil = require("../model/oils");
const bcrypt = require("bcrypt");

route.get("/", async (req, res) => {
  try {
    const oilstockregister = await oilstockRegister.find().sort({ slno: -1 });
    res.send(oilstockregister);
  } catch (error) {
    console.log(error);
  }
});

route.post("/sign/add/:as", async (req, res) => {
  try {
    const { as } = req.params;
    const { voucherID, password } = req.body;
    const isvalidUser = bcrypt.compareSync(password, req.loggedUser.password);
    if (isvalidUser) {
      if (as == "sign_polhavaldar") {
        console.log("YAAS");
        const oilstockregister = await oilstockRegister.findByIdAndUpdate(
          req.body.voucherID,
          {
            $set: {
              sign_polhavaldar: {
                name: req.loggedUser.name,
                designation: req.loggedUser.role,
                signature: true,
                date: Date.now(),
              },
            },
          }
        );
      }

      if (as == "sign_mtic") {
        const oilstockregister = await oilstockRegister.findByIdAndUpdate(
          req.body.voucherID,
          {
            $set: {
              sign_mtic: {
                name: req.loggedUser.name,
                designation: req.loggedUser.role,
                signature: true,
                date: Date.now(),
              },
            },
          }
        );
      }
      res.send({
        status: 200,
        message: "Signature Added",
      });
    }else{
      res.send({
        status: 400,
        message: "Invalid Password",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

route.get("/last1", async (req, res) => {
  try {
    const oilstockregister = await oilstockRegister
      .find()
      .sort({ slno: -1 })
      .limit(1);
    const [lastoil, others] = oilstockregister;
    res.send(lastoil);
  } catch (error) {
    console.log(error);
  }
});

route.get("/log", async (req, res) => {
  try {
    const oilbalance = await oilstockRegister
      .find()
      .populate("type")
      .sort({ slno: -1 });
    res.send(oilbalance);
  } catch (error) {
    console.log(error);
  }
});

route.get("/oil/:id", async (req, res) => {
  try {
    const oilID = req.params.id;
    const oilstockregister = await oilstockRegister
      .find({
        type: oilID,
      })
      .sort({ slno: -1 })
      .populate("type")
      .populate("vehicle");

    res.send(oilstockregister);
  } catch (error) {
    console.log(error);
  }
});

route.post("/allot", async (req, res) => {
  try {
    let body = {
      ...req.body,
      issued: true,
    };
    const newOilReg = await new oilstockRegister(body);
    const updatedOilBalance = await Oil.findByIdAndUpdate(newOilReg.type, {
      $inc: { balance: -1 * newOilReg.issued_amount },
    });

    newOilReg.previous_balance = updatedOilBalance.balance;
    if (updatedOilBalance.balance - newOilReg.issued_amount >= 0) {
      newOilReg.current_balance =
        updatedOilBalance.balance - newOilReg.issued_amount;
    }
    newOilReg.save();
    if (newOilReg) {
      res.send({
        status: 200,
        message: "Oil stock register added successfully",
        data: newOilReg,
      });
    } else {
      res.send("Unable to add");
    }
  } catch (error) {
    console.log(error);
  }
});

route.post("/add", async (req, res) => {
  try {
    let body = {
      ...req.body,
      recieved: true,
    };
    const newOilReg = await new oilstockRegister(body);
    const updatedOilBalance = await Oil.findByIdAndUpdate(newOilReg.type, {
      $inc: { balance: newOilReg.recieved_amount },
    });
    newOilReg.previous_balance = updatedOilBalance.balance;
    newOilReg.current_balance =
      updatedOilBalance.balance + newOilReg.recieved_amount;

    newOilReg.save();
    if (newOilReg) {
      res.send({
        status: 200,
        message: "Oil stock register added successfully",
        data: newOilReg,
      });
    } else {
      res.send("Unable to add");
    }
  } catch (error) {
    console.log(error);
  }
});

route.put("/update/:id", async (req, res) => {
  try {
    const dutyId = req.params.id;
    const upde = req.body.last;
    const foundDuty1 = await oilstockRegister.findByIdAndUpdate(dutyId, {
      last: upde,
    });
    res.send(foundDuty1);
  } catch (error) {
    console.log(error);
  }
});

route.get("/voucher/:id", async (req, res) => {
  try {
    const oilID = req.params.id;
    const oilstockregister = await oilstockRegister
      .findById(oilID)
      .populate("type")
      .populate("vehicle");
    res.send(oilstockregister);
  } catch (error) {
    console.log(error);
  }
});

module.exports = route;
