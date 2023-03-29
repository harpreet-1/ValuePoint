const mongoose = require("mongoose");
const cartSchema = mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  images: { type: Array, required: true },
  discount: { type: Number, default: 0 },
  quantity: { type: Number, default: 1 },
  userID: { type: String, required: true },
  description: String,
  price: Number,
});

const cartModel = mongoose.model("cart", cartSchema);

module.exports = { cartModel };
