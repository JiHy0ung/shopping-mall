const productController = {};
const Product = require("../models/Product");

productController.createProduct = async (req, res) => {
  try {
    const {
      sku,
      name,
      size,
      description,
      stock,
      image,
      price,
      category,
      status,
    } = req.body;
    const product = new Product({
      sku,
      name,
      size,
      description,
      stock,
      image,
      price,
      category,
      status,
    });
    await product.save();
    res.status(200).json({ status: "Add Item Success", product });
  } catch (err) {
    res.status(400).json({ status: "Failed", err: err.message });
  }
};

module.exports = productController;
