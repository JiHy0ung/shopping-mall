const mongoose = require("mongoose");
const User = require("./User");
const Order = require("./Order");
const Schema = mongoose.Schema;

const couponSchema = Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    code: { type: String, required: true, unique: true },
    discountType: { type: String, required: true },
    discountValue: { type: Number, required: true },
    minAmount: { type: Number, default: 0 },
    expireDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

couponSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.__v;
  delete obj.createdAt;
  delete obj.updatedAt;
  return obj;
};

const Coupon = mongoose.model("Coupon", couponSchema);
module.exports = Coupon;
