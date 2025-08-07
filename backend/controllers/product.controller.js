const productController = {};
const Product = require("../models/Product");

const PAGE_SIZE = 5;

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

    const isDuplicate = await Product.findOne({ sku });
    if (isDuplicate) {
      throw new Error("이미 존재하는 sku입니다.");
    }

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
    let response = { status: "Get Products Success" };

    const totalItemNum = await Product.find(condition).countDocuments(); // count() -> 데이터의 개수만 반환
    const totalPageNum = Math.ceil(totalItemNum / PAGE_SIZE);
    response.totalPageNum = totalPageNum;

    if (page) {
      query.skip((page - 1) * PAGE_SIZE).limit(PAGE_SIZE);
    }

    const productList = await query.exec(); // 퀴리 실행
    response.data = productList;

    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ status: "Get Products Failed", err: err.message });
  }
};

module.exports = productController;
