const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  adminName: { type: String, required: true },
  email: { type: String, unique: true, require: true },
  mobile: { type: Number, unique: true, require: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

const adminModel = mongoose.model("admin", adminSchema);

module.exports = { adminModel };
