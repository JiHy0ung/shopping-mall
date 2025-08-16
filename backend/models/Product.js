const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = Schema(
  {
    sku: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    stock: { type: Object, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: Array, required: true },
    status: { type: String, required: true, default: "active" },
    isNew: { type: Boolean, required: true, default: true },
    isDeleted: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

productSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.__v;
  delete obj.createdAt;
  delete obj.updatedAt;
  return obj;
};

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
