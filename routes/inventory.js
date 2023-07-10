const express = require("express");
const route = express.Router();
const Issue = require("../model/issue.js");
const StockRegister = require("../model/stock_register.js");
const Item = require("../model/item.js");

route.get("/last_voucher/sno", async (req, res) => {
  try {
    const lastOrder = await StockRegister.find().sort({ _id: -1 }).limit(1);
    if (lastOrder.length > 0) {
      res.send(lastOrder[0].sno.toString());
      return;
    }
    res.send("0");
  } catch (error) {
    console.log(error);
  }
});

route.get("/all_orders", async (req, res) => {
  try {
    const orders = await Order.find().populate("items.item");
    res.send(orders);
  } catch (error) {
    console.log(error);
  }
});

route.post("/order/add", async (req, res) => {
  try {
    let body = {
      ...req.body,
      date: Date.now(),
      isRecieve: true,
    };
    console.log(body);
    const newOrder = await new StockRegister(body);
    const { items } = req.body;
    await items.forEach((item) => {
      let id = item.item;
      Item.findById(id).exec((err, found_item) => {
        found_item.current_rate = item.rate;
        found_item.balance = item.new_balance;
        found_item.last_balance = item.last_balance;
        found_item.change_in_balance = item.new_balance - item.last_balance;
        found_item.total_cost = item.rate * item.new_balance;
        found_item.last_updated = Date.now();
        found_item.save();
        console.log(found_item);
      });
    });
    newOrder.save();
    res.send({
      status: 200,
      message: "NEW ORDER CREATED",
      order_id: newOrder._id,
    });
  } catch (error) {
    console.log(error);
  }
});

route.post("/issue/add", async (req, res) => {
  try {
    let body = {
      ...req.body,
      date: Date.now(),
      isIssue: true,
    };
    const newIssue = await new StockRegister(body);
    const { items } = req.body;
    items.forEach((item) => {
      let id = item.item;
      Item.findById(id).exec((err, found_item) => {
        found_item.balance = item.new_balance;
        found_item.last_balance =
          found_item.balance - item.quantity_in_smallest_unit;
        found_item.total_cost = item.rate * item.new_balance;
        found_item.save();
      });
    });
    newIssue.save();
    res.send({
      status: 200,
      message: "NEW ISSUE CREATED",
      issue_id: newIssue._id,
    });
  } catch (error) {
    console.log(error);
  }
});

route.get("/order/:id", async (req, res) => {
  try {
    const order_id = req.params.id;
    const foundOrder = await Order.findById(order_id).populate("items.item");
    res.send(foundOrder);
  } catch (error) {
    console.log(error);
  }
});

route.get("/issue", async (req, res) => {
  try {
    const lastIssue = await Issue.find().sort({ _id: -1 }).limit(1);
    const temp = lastIssue[0].sno;
    const lastsno = temp.toString();
    res.send(lastsno);
  } catch (error) {
    console.log(error);
  }
});

route.get("/all_issues", async (req, res) => {
  try {
    const issues = await Issue.find().populate("items.item");
    res.send(issues);
  } catch (error) {
    console.log(error);
  }
});

//Get All Voucher History
route.get("/history", async (req, res) => {
  try {
    const stock_register = await StockRegister.find().populate("items.item");
    res.send(stock_register);
  } catch (error) {
    console.log(error);
  }
});

route.post("/issue/add", async (req, res) => {
  try {
    const newIssue = await new Issue(req.body);
    const { items } = req.body;
    items.forEach((item) => {
      let id = item.item;
      Item.findById(id).exec((err, found_item) => {
        found_item.quantity = found_item.quantity - parseInt(item.quantity);
        item.new_quantity = found_item.quantity - parseInt(item.quantity);
        found_item.save();
      });
    });
    newIssue.save();
    res.send({
      status: 200,
      message: "NEW ISSUE CREATED",
      issue_id: newIssue._id,
    });
  } catch (error) {
    console.log(error);
  }
});

route.post("/sign/add/:as", async (req, res) => {
  try {
    let signAs = req.params.as;
    const voucherID = req.body.voucherID;
    let update = {
      $set: {},
    };
    update.$set[signAs] = {
      name: req.loggedUser.name,
      designation: req.loggedUser.role,
      date: Date.now(),
      signature: true,
    };

    const updateVoucher = await StockRegister.findByIdAndUpdate(
      voucherID,
      update
    );
    res.send({
      status: 200,
      message: "SIGNATURE ADDED",
    });
  } catch (error) {
    console.log(error);
  }
});

route.get("/item_history/:id", async (req, res) => {
  try {
    const item_id = req.params.id;
    const item_history = await StockRegister.find({
      "items.item": item_id,
    }).populate("items.item");
    res.send(item_history);
  } catch (error) {
    console.log(error);
  }
});

route.get("/issue/:id", async (req, res) => {
  try {
    const foundIssue = await Issue.findById(req.params.id);
    res.send(foundIssue);
  } catch (error) {
    console.log(error);
  }
});

route.get("/voucher/:id", async (req, res) => {
  try {
    const stock_register = await StockRegister.findById(req.params.id).populate(
      "items.item"
    );
    res.send(stock_register);
  } catch (error) {
    console.log(error);
  }
});

route.get("/items", async (req, res) => {
  try {
    const itemList = await Item.find();
    res.send(itemList);
  } catch (error) {
    console.log(error);
  }
});

route.post("/items/add", async (req, res) => {
  try {
    const { name } = req.body;
    console.log(req.body);
    const foundItem = await Item.findOne({ name: name });
    if (foundItem) {
      res.send({
        status: 400,
        message: "ITEM ALREADY EXISTS",
      });
    } else {
      const newItem = new Item(req.body);
      console.log(newItem);
      newItem.save();

      res.send({
        status: 200,
        message: "NEW ITEM ADDED",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// to Find items by ID
route.get("/items/:id", async (req, res) => {
  try {
    const itemID = req.params.id;
    const foundItem = await Item.findById(itemID);
    res.send(foundItem);
  } catch (error) {
    console.log(error);
  }
});

// to list out all the items
route.get("/items", async (req, res) => {
  try {
    const itemList = await Item.find();
    res.send(itemList);
  } catch (error) {
    console.log(error);
  }
});

module.exports = route;
