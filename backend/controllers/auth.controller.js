const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authController = {};

authController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = await user.generateToken();
        return res.status(200).json({ status: "Login Success", user, token });
      } else {
        throw new Error("Invalid password.");
      }
    } else {
      throw new Error("Invalid email.");
    }
  } catch (err) {
    res.status(400).json({ status: "Login Failed", err: err.message });
  }
};

authController.authenticate = async (req, res, next) => {
  try {
    const tokenString = req.headers.authorization;
    if (!tokenString) {
      throw new Error("Token not found");
    } else {
      const token = tokenString.replace("Bearer ", "");
      jwt.verify(token, JWT_SECRET_KEY, (err, payload) => {
        if (err) {
          throw new Error("invalid token.");
        } else {
          req.userId = payload._id;
          next();
        }
      });
    }
  } catch (err) {
    res.status(400).json({ status: "Failed", err: err.message });
  }
};

module.exports = authController;
