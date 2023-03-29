const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const authorization = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, "sktiman", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.userID = decoded.userID;
    req.body.userID = decoded.userID;
    next();
  });
};

module.exports = { authorization };
