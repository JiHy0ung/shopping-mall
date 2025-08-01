const mongoose = require("mongoose");
const Product = require("./Product");
const User = require("./User");
const Schema = mongoose.Schema;

const orderSchema = Schema(
  {
    userId: { type: mongoose.ObjectId, ref: User },
    status: { type: String, required: true, default: "preparing" },
    shipTo: { type: String, required: true },
    contact: { type: String, required: true },
    totalPrice: { type: Number, required: true, default: 0 },
    items: [
      {
        productId: { type: mongoose.ObjectId, ref: Product },
        size: { type: String, required: true },
        qty: { type: Number, required: true, default: 1 },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

orderSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.__v;
  delete obj.createdAt;
  delete obj.updatedAt;
  return obj;
};

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
