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

productController.getProducts = async (req, res) => {
  try {
    const { page, name } = req.query;
    const condition = name ? { name: { $regex: name, $options: "i" } } : {};
    let query = Product.find(condition); // 쿼리 선언

    const productList = await query.exec(); // 퀴리 실행

    res.status(200).json({ status: "Get Products Success", data: productList });
  } catch (err) {
    res.status(400).json({ status: "Get Products Failed", err: err.message });
  }
};

module.exports = productController;
