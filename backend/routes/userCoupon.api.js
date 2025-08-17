const express = require("express");
const authController = require("../controllers/auth.controller");
const userCouponController = require("../controllers/userCoupon.controller");
const router = express.Router();

router.post(
  "/",
  authController.authenticate,
  userCouponController.createUserCoupon
);

router.get(
  "/",
  authController.authenticate,
  userCouponController.getUserCouponList
);

router.put(
  "/",
  authController.authenticate,
  userCouponController.updateUserCoupon
);

module.exports = router;
