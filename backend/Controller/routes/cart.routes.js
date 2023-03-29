const { cartModel } = require("../.././Models/cartModel");
const { authorization } = require("../middleware/authorization");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const cartRouter = express.Router();

const updatecart = async (req, res) => {
  try {
    const cart = await cartModel.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "cart updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletecart = async (req, res) => {
  try {
    const cart = await cartModel.findByIdAndDelete(req.params.id);
    res.json({ message: "cart deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getcart = async (req, res) => {
  try {
    const carts = await cartModel.find({ userID: req.userID });
    res.json(carts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createcart = async (req, res) => {
  try {
    const cart = await cartModel.create(req.body);
    res.json({ message: "cart added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

cartRouter.use(authorization);

cartRouter.get("/", getcart);
cartRouter.post("/create", createcart);
cartRouter.patch("/update", updatecart);
cartRouter.delete("/delete", deletecart);

module.exports = { cartRouter };
