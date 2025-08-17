const mongoose = require("mongoose");
const User = require("./User");
const Coupon = require("./Coupon");
const Order = require("./Order");
const Schema = mongoose.Schema;

const userCouponSchema = Schema(
  {
    userId: { type: mongoose.ObjectId, ref: User, required: true },
    couponId: { type: mongoose.ObjectId, ref: Coupon, required: true },
    isUsed: { type: Boolean, default: false },
    usedAt: { type: Date },
    orderId: { type: mongoose.ObjectId, ref: Order },
  },
  { timestamps: true }
);

userCouponSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.__v;
  delete obj.createdAt;
  delete obj.updatedAt;
  return obj;
};

const userCoupon = mongoose.model("UserCoupon", userCouponSchema);
module.exports = userCoupon;
