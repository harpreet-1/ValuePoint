const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true },
  mobile: { type: String, unique: true },
  password: { type: String, required: true },
  address: String,
  pincode: Number,
});

const usermodel = mongoose.model("users", userSchema);

module.exports = { usermodel };
