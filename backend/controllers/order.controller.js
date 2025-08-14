const { model } = require("mongoose");
const Order = require("../models/Order");
const { randomStringGenerator } = require("../utils/randomStringGenerator");
const productController = require("./product.controller");
const User = require("../models/User");
const orderController = {};

const PAGE_SIZE = 3;

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
  } catch (err) {
    res.status(400).json({ status: "Create Order Failed", err: err.message });
  }
};

orderController.getOrder = async (req, res) => {
  try {
    const { userId } = req;
    const orders = await Order.find({ userId }).populate({
      path: "items",
      populate: {
        path: "productId",
        model: "Product",
      },
    });
    res.status(200).json({ status: "Get Orders Success", data: orders });
  } catch (err) {
    res.status(400).json({ status: "Get Orders Failed", err: err.message });
  }
};

orderController.getOrderList = async (req, res, next) => {
  try {
    const { page, orderNum } = req.query;

    const condition = orderNum
      ? { orderNum: { $regex: orderNum, $options: "i" } }
      : {};

    let query = Order.find(condition)
      .populate({
        path: "items",
        populate: {
          path: "productId",
          model: "Product",
        },
      })
      .populate("userId");

    let response = { status: "Get Order List Success" };

    const totalItemNum = await Order.countDocuments(condition);
    const totalPageNum = Math.ceil(totalItemNum / PAGE_SIZE);
    response.totalPageNum = totalPageNum;

    if (page) {
      query = query.skip((page - 1) * PAGE_SIZE).limit(PAGE_SIZE);
    }

    const orderList = await query.exec();
    response.data = orderList;

    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ status: "Get Order List Failed", err: err.message });
  }
};

orderController.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      { _id: id },
      { status },
      { new: true }
    );

    console.log("id", id);

    if (!order) {
      throw new Error("Order does't exist.");
    }

    res.status(200).json({ status: "Update Order Success", data: order });
  } catch (err) {
    res.status(400).json({ status: "Update Order Failed", err: err.message });
  }
};

module.exports = orderController;
