const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  rating: { type: Number, default: 5 },
  images: { type: String, required: true },
  description: String,
  price: Number,
  discount: { type: Number, default: 0 },
  available: { type: Number, default: 10 },
});

const productModel = mongoose.model("products", productSchema);

module.exports = { productModel };
