const { usermodel } = require("../../Models/userModel");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { authorization } = require("../middleware/authorization");

const usersRouter = express.Router();

const getUsers = async (req, res) => {
  try {
    const users = await usermodel.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const user = await usermodel.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 5);
    req.body.password = hashedPassword;
    const newUser = await usermodel.create(req.body);
    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await usermodel.findOne({ mobile: req.body.mobile });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    } else {
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }
      const token = jwt.sign({ userID: user._id }, "sktiman", {
        expiresIn: "2h",
      });
      return res.status(200).json({
        token: token,
        user: user,
      });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await usermodel.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await usermodel.findByIdAndDelete(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

usersRouter.post("/login", loginUser);
usersRouter.post("/register", registerUser);

usersRouter.use(authorization);
usersRouter.get("/", getUsers);
usersRouter.patch("/update/:id", updateUser);
usersRouter.delete("/delete/:id", deleteUser);

module.exports = { usersRouter };
