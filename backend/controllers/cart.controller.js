const cartController = {};
const { populate } = require("dotenv");
const Cart = require("../models/Cart");

cartController.addItemToCart = async (req, res) => {
  try {
    const { userId } = req;
    const { productId, size, qty } = req.body;
    // 유저를 가지고 카트 찾기
    let cart = await Cart.findOne({ userId });

    // 유저가 만든 카트가 없다면 만들기
    if (!cart) {
      cart = new Cart({ userId });
      await cart.save();
    }

    // 이미 카트에 들어간 아이템이 있는지 확인하고 있다면 에러 처리.
    const existItem = await cart.items.find(
      // productId는 mongoose.ObjectId 타입이기 때문에 equals 메서드 사용하여 비교
      (item) => item.productId.equals(productId) && item.size === size
    );
    if (existItem) throw new Error("This product is already added.");

    // 카트에 아이템을 추가
    cart.items = [...cart.items, { productId, size, qty }];
    await cart.save();

    res.status(200).json({
      status: "Add Item to Cart Success",
      data: cart,
      cartItemQty: cart.items.length,
    });
  } catch (err) {
    res
      .status(400)
      .json({ status: "Add Item to Cart Failed", err: err.message });
  }
};

cartController.getCartItems = async (req, res) => {
  try {
    const { userId } = req;

    const cart = await Cart.findOne({ userId }).populate({
      path: "items",
      populate: {
        path: "productId",
        model: "Product",
      },
    });
    res
      .status(200)
      .json({ status: "Get Cart Items Success", data: cart.items });
  } catch (err) {
    res.status(400).json({ status: "Get Cart Items Failed", err: err.message });
  }
};

cartController.deleteCartItem = async (req, res) => {
  try {
    const { userId } = req;
    const { id } = req.params;
    const cart = await Cart.findOne({ userId }).populate({
      path: "items",
      populate: { path: "productId", model: "Product" },
    });
    cart.items = cart.items.filter((item) => !item._id.equals(id));
    await cart.save();
    res.status(200).json({
      status: "Delete Cart Items Success",
      data: cart.items,
    });
  } catch (err) {
    res
      .status(400)
      .json({ status: "Delete Cart Items Failed", err: err.message });
  }
};

cartController.updateCartItemQty = async (req, res) => {
  try {
    const { userId } = req;
    const { id } = req.params;
    const { qty } = req.body;
    const cart = await Cart.findOne({ userId }).populate({
      path: "items",
      populate: {
        path: "productId",
        model: "Product",
      },
    });
    cart.items = cart.items.map((item) => {
      if (item._id.equals(id)) {
        item.qty = qty;
      }
      return item;
    });

    await cart.save();

    res
      .status(200)
      .json({ status: "Update Cart Items Success", data: cart.items });
  } catch (err) {
    res
      .status(400)
      .json({ status: "Update Cart Items Failed", err: err.message });
  }
};

cartController.getCartQty = async (req, res) => {
  try {
    const { userId } = req;
    const cart = await Cart.findOne({ userId });

    const cartQty = cart.items.length;
    res
      .status(200)
      .json({ status: "Get Cart Items Qty Success", data: cartQty });
  } catch (err) {
    res
      .status(400)
      .json({ status: "Get Cart Items Qty Failed", err: err.message });
  }
};

module.exports = cartController;
