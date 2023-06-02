const express = require("express");
const route = express.Router();
const Issue = require("../model/issue.js");
const Order = require("../model/order.js");
const Item = require("../model/item.js");

route.get("/order", async (req, res) => {
  try {
    const lastOrder = await Order.find().sort({ _id: -1 }).limit(1);
    const temp = lastOrder[0].sno;
    const lastsno = temp.toString();
    res.send(lastsno);
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
    const newOrder = await new Order(req.body);
    const { items } = req.body;
    items.forEach((item) => {
      let id = item.item;
      Item.findById(id).exec((err, found_item) => {
        found_item.quantity = found_item.quantity + parseInt(item.quantity);
        item.new_quantity = found_item.quantity + parseInt(item.quantity);
        found_item.save();
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
    const issue_id = req.body.voucherID;
    let update = {
      $set: {},
    };
    update.$set[signAs] = {
      name: req.loggedUser.name,
      designation: req.loggedUser.role,
      date: Date.now(),
      signature: true,
    };

    const foundIssue = await Issue.findByIdAndUpdate(issue_id, update);
    const foundOrder = await Order.findByIdAndUpdate(issue_id, update);

    if (foundIssue) {
      res.send({
        status: 200,
        message: "SIGNATURE ADDED",
      });
    } else {
      res.send({
        status: 200,
        message: "SIGNATURE ADDED",
      });
    }
  } catch (error) {
    console.log(error);
  }
});


route.get("/item_history/:id", async (req, res) => {
  try {
    const item_id = req.params.id;
    const foundIssue = await Issue.find({ "items.item": item_id }).populate(
      "items.item"
    );
    const foundOrder = await Order.find({ "items.item": item_id }).populate(
      "items.item"
    );
    res.send([...foundIssue, ...foundOrder]);
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
    const issue_id = req.params.id;
    const foundIssue = await Issue.findById(issue_id).populate("items.item");
    const foundOrder = await Order.findById(issue_id).populate("items.item");

    if (foundIssue) {
      res.send(foundIssue);
    } else {
      res.send(foundOrder);
    }
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
    const { name, quantity, rate, description } = req.body;
    const foundItem = await Item.findOne({ name: name });
    if (foundItem) {
      res.send("ITEM NAME ALREADY TAKEN");
    } else {
      const newItem = await new Item({
        name: name,
        quantity: quantity,
        rate: rate,
        description: description,
      });
      newItem.save();

      res.send("NEW ITEM CREATED");
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
