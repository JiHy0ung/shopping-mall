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
    const condition = name
      ? { name: { $regex: name, $options: "i" } }
      : { isDeleted: false };
    let query = Product.find(condition); // 쿼리 선언
    let response = { status: "Get Products Success" };

    const totalItemNum = await Product.countDocuments(condition); // count() -> 데이터의 개수만 반환
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

productController.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id });

    if (!product) {
      throw new Error("Product does't exist.");
    }

    res.status(200).json({ status: "Get Product Success", data: product });
  } catch (err) {
    res.status(400).json({ status: "Get Product Failed", err: err.message });
  }
};

productController.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
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

    const product = await Product.findByIdAndUpdate(
      { _id: id },
      { sku, name, size, description, stock, image, price, category, status },
      { new: true }
    );

    if (!product) {
      throw new Error("Product does't exist.");
    }

    res.status(200).json({ status: "Edit Product Success", data: product });
  } catch (err) {
    res.status(400).json({ status: "Edit Product Failed", err: err.message });
  }
};

productController.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(
      { _id: id },
      { isDeleted: true },
      { new: true }
    );

    if (!product) {
      throw new Error("Product does't exist.");
    }

    res.status(200).json({ status: "Delete Product Success" });
  } catch (err) {
    res.status(400).json({ status: "Delete Product Failed", err: err.message });
  }
};

productController.verifyStock = async (item) => {
  try {
    const product = await Product.findById(item.productId);
    if (product.stock[item.size] < item.qty) {
      return {
        isVerify: false,
        message: `${product.name}의 ${item.size}사이즈 재고가 부족합니다.`,
      };
    }

    return { isVerify: true };
  } catch (err) {
    console.error(err);
  }
};

productController.decreaseStock = async (item) => {
  try {
    const product = await Product.findById(item.productId);

    const newStock = { ...product.stock };
    newStock[item.size] -= item.qty;
    product.stock = newStock;

    await product.save();
  } catch (err) {
    console.error(err);
  }
};

productController.checkItemsListStock = async (itemList) => {
  try {
    const insufficientStockItems = [];

    await Promise.all(
      itemList.map(async (item) => {
        const stockCheck = await productController.verifyStock(item);
        if (!stockCheck.isVerify) {
          insufficientStockItems.push({ item, message: stockCheck.message });
        }
      })
    );

    if (insufficientStockItems.length > 0) {
      return insufficientStockItems;
    }

    await Promise.all(
      itemList.map((item) => productController.decreaseStock(item))
    );

    return insufficientStockItems;
  } catch (err) {
    console.error(err);
  }
};

module.exports = productController;
