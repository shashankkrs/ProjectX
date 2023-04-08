const express = require("express");
const route = express.Router();
const Issue = require("../model/issuevoucher.js");
const Order = require("../model/receivevoucher.js");
const Item = require("../model/item.js");

route.post("/order/add", async (req, res) => {
  try {
    console.log(req.body);
    const newOrder = await new Order(req.body);
    newOrder.save();
    res.send("NEW ORDER CREATED");
  } catch (error) {
    console.log(error);
  }
});

// to list out all the items
route.get("/items", async (req, res) => {
  try {
    const itemList = await Item.find();
    // console.log(itemList)
    res.send(itemList);
  } catch (error) {
    console.log(error);
  }
});

route.post("/items/add", async (req, res) => {
  try {
    console.log(req.body);
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
    console.log(foundItem);
    res.send(foundItem);
  } catch (error) {
    console.log(error);
  }
});

// to add Items by Id
// route.post("/add")

module.exports = route;
