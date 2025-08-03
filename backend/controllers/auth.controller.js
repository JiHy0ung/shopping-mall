const User = require("../models/User");
const bcrypt = require("bcryptjs");

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

module.exports = authController;
