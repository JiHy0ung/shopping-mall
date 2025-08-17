const express = require("express");
const authController = require("../controllers/auth.controller");
const couponController = require("../controllers/coupon.controller");
const router = express.Router();

router.post(
  "/",
  authController.authenticate,
  authController.checkAdminPermission,
  couponController.createCoupon
);

router.get(
  "/",
  authController.authenticate,
  authController.checkAdminPermission,
  couponController.getCouponList
);

router.put(
  "/:id",
  authController.authenticate,
  authController.checkAdminPermission,
  couponController.updateCouponActive
);

module.exports = router;
