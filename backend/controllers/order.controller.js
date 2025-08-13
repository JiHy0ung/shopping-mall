const Order = require("../models/Order");
const { randomStringGenerator } = require("../utils/randomStringGenerator");
const productController = require("./product.controller");
const orderController = {};

orderController.createOrder = async (req, res) => {
  try {
    const { userId } = req;
    const { shipTo, contact, totalPrice, orderList } = req.body;

    const insufficientStockItems = await productController.checkItemsListStock(
      orderList
    );

    if (insufficientStockItems.length > 0) {
      const errorMessage = insufficientStockItems.reduce(
        (total, item) => total + item.message,
        ""
      );
      throw new Error(errorMessage);
    }

    const newOrder = new Order({
      userId,
      shipTo,
      contact,
      totalPrice,
      items: orderList,
      orderNum: randomStringGenerator(),
    });

    await newOrder.save();

    res.status(200).json({
      status: "Create Order Success",
      orderNum: newOrder.orderNum,
    });

    console.log("newOrder.orderNum", newOrder.orderNum);
  } catch (err) {
    res.status(400).json({
      status: "Create Order Failed",
      err: err.message,
    });
  }
};

module.exports = orderController;
