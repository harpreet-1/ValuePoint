const { productModel } = require("../../Models/productModel");
const { adminAuthorization } = require("../middleware/adminAuthorization");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const { authorization } = require("../middleware/authorization");
const productRouter = express.Router();

//(^_^)=======================    Add new  Product       =========================

const createProduct = async (req, res) => {
  try {
    const product = await productModel.create(req.body);
    res.json({ message: "product added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//(^_^)=======================  get products with filter    =========================

const getProducts = async (req, res) => {
  // return res.send("hello world");

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

    let movies = productModel
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

    if (req.query.sort) {
      let sort = req.query.sort;
      movies = movies.sort(sort);
    }
    let output = await movies;
    // console.log(output);
    res.json(output);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//(^_^)=======================    Get Product with id      =========================

const getProduct = async (req, res) => {
  try {
    const products = await productModel.findById(req.params.id);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//(^_^)=======================    Update Products       =========================

const updateProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.json({ message: "product updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//(^_^)=======================    Delete Products       =========================

const deleteProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.id);
    res.json({ message: "product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

productRouter.get("/", getProducts);
productRouter.get("/:id", getProduct);

//(^_^)======================= Admin   Authorization       =========================

productRouter.use(adminAuthorization);

//(^_^)=======================    Routes handling    =========================

productRouter.route("/").post(createProduct);
productRouter.route("/:id").patch(updateProduct).delete(deleteProduct);

//(^_^)=======================    Routes handling    =========================

module.exports = { productRouter };
