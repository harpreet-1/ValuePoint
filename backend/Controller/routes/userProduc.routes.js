const { cartModel } = require("../.././Models/cartModel");
const { authorization } = require("../middleware/authorization");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const userPoductRouter = express.Router();

const getUserProducts = async (req, res) => {
  try {
    let page = 1;
    let limit = Infinity;
    let skip = 0;
    if (req.query.page) {
      page = req.query.page;
      limit = 10;
    }
    if (req.query.limit) {
      limit = req.query.limit;
    }
    skip = limit * (page - 1);

    const movies = await movieModel
      .find({
        $and: [
          { rating: { $lte: req.query.maxrating || 100 } },
          { rating: { $gte: req.query.minrating || 0 } },
          { price: { $lte: req.query.maxprice || Infinity } },
          { price: { $gte: req.query.minprice || 0 } },
        ],
        $or: [
          { title: { $regex: req.query.search || "" } },
          { description: { $regex: req.query.search || "" } },
          { category: { $regex: req.query.search || "" } },
        ],
      })
      .skip(skip)
      .limit(limit);
    res.json(movies);
  } catch (error) {
    res.json({ message: error.message });
  }
};

userPoductRouter.get("/", authorization, getProducts);

module.exports = { userPoductRouter };
