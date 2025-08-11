const Order = require("../models/Order");
const productController = require("./product.controller");
const { randomStringGenerator } = require("../utils/randomStringGenerator");

const orderController = {};

orderController.createOrder = async (req, res) => {
  console.log("=== ORDER CREATION START ===");
  console.log("Request body:", JSON.stringify(req.body, null, 2));
  console.log("User ID:", req.userId);

  try {
    const { userId } = req;
    const { shipTo, contact, totalPrice, orderList } = req.body;

    console.log("Extracted data:", {
      userId,
      shipTo,
      contact,
      totalPrice,
      orderList,
    });

    // 필수 데이터 검증
    if (!userId) {
      console.log("ERROR: No userId");
      throw new Error("사용자 인증이 필요합니다");
    }

    if (!shipTo) {
      console.log("ERROR: No shipTo");
      throw new Error("배송지 정보가 누락되었습니다");
    }

    if (!contact) {
      console.log("ERROR: No contact");
      throw new Error("연락처 정보가 누락되었습니다");
    }

    if (!totalPrice) {
      console.log("ERROR: No totalPrice");
      throw new Error("총 금액 정보가 누락되었습니다");
    }

    if (!orderList || !Array.isArray(orderList) || orderList.length === 0) {
      console.log("ERROR: Invalid orderList", orderList);
      throw new Error("주문 상품 목록이 비어있거나 잘못되었습니다");
    }

    console.log("All required data present, checking stock...");

    const insufficientStockItems = await productController.checkItemsListStock(
      orderList
    );
    console.log("Stock check result:", insufficientStockItems);

    if (insufficientStockItems.length > 0) {
      const errorMessage = insufficientStockItems.reduce(
        (total, item) => total + item.message + " ",
        ""
      );
      console.log("Stock insufficient:", errorMessage);
      throw new Error(errorMessage.trim());
    }

    console.log("Creating new order...");

    const orderNum = randomStringGenerator();
    console.log("Generated order number:", orderNum);

    const newOrder = new Order({
      userId,
      shipTo,
      contact,
      totalPrice,
      items: orderList,
      orderNum: orderNum,
    });

    console.log("Order object created:", newOrder);

    const savedOrder = await newOrder.save();
    console.log("Order saved successfully:", savedOrder.orderNum);

    res.status(200).json({
      status: "Create Order Success",
      orderNum: savedOrder.orderNum,
    });
  } catch (err) {
    console.log("=== ORDER CREATION ERROR ===");
    console.error("Error message:", err.message);
    console.error("Error stack:", err.stack);
    console.error("Full error object:", err);

    res.status(400).json({
      status: "Create Order Failed",
      err: err.message || "알 수 없는 오류가 발생했습니다",
    });
  }
};

module.exports = orderController;
