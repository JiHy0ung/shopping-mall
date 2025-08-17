const express = require("express");
const router = express.Router();
const userApi = require("./user.api");
const authApi = require("./auth.api");
const productApi = require("./product.api");
const cartApi = require("./cart.api");
const orderApi = require("./order.api");
const wishApi = require("./wish.api");
const couponApi = require("./coupon.api");
const userCouponApi = require("./userCoupon.api");

router.use("/user", userApi);
router.use("/auth", authApi);
router.use("/product", productApi);
router.use("/cart", cartApi);
router.use("/order", orderApi);
router.use("/wish", wishApi);
router.use("/coupon", couponApi);
router.use("/userCoupon", userCouponApi);

module.exports = router;
