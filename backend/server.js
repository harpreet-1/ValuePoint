const mongoose = require("mongoose");

const connection = () => {
  try {
    const server = mongoose.connect(process.env.DB_URL);
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
  console.log("server started");
};

module.exports = { connection };
