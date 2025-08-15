const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const authController = {};
const { OAuth2Client } = require("google-auth-library");

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
        throw new Error("비밀번호를 다시 입력해주세요.");
      }
    } else {
      throw new Error("가입되지 않은 이메일입니다.");
    }
  } catch (err) {
    res.status(400).json({ status: "Login Failed", err: err.message });
  }
};

authController.loginWithGoogle = async (req, res) => {
  try {
    const { token } = req.body;
    const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);
    // 토큰 해석
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });

    // 유저 정보 가져오기
    const { email, name } = ticket.getPayload();

    let user = await User.findOne({ email });
    if (!user) {
      // 랜덤 비밀번호 생성 후 암호화
      const randomPassword = "" + Math.floor(Math.random() * 100000000);
      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(randomPassword, salt);

      // 유저 새로 생성
      user = new User({
        email,
        password: newPassword,
        name,
      });
      await user.save();
    }
    const sessionToken = await user.generateToken();
    return res
      .status(200)
      .json({ status: "Google Login Success", user, token: sessionToken });
  } catch (err) {
    res.status(400).json({ status: "Google Login Failed", err: err.message });
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
          return res.status(400).json({
            status: "Failed",
            err: "Invalid token",
            code: "INVALID_TOKEN",
          });
        }

        req.userId = payload._id;
        next();
      });
    }
  } catch (err) {
    res.status(400).json({ status: "Failed", err: err.message });
  }
};

authController.checkAdminPermission = async (req, res, next) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    if (user.level !== "admin") {
      throw new Error("No permission.");
    }
    next();
  } catch (err) {
    res.status(400).json({ status: "Failed", err: err.message });
  }
};

module.exports = authController;
