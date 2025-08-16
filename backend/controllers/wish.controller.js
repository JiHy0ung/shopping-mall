const Wish = require("../models/Wish");

const wishController = {};

wishController.addItemToWish = async (req, res) => {
  try {
    const { userId } = req;
    const { productId } = req.body;

    let wish = await Wish.findOne({ userId });

    // 유저가 만든 카트가 없다면 만들기
    if (!wish) {
      wish = new Wish({ userId });
      await wish.save();
    }

    wish.items = [...wish.items, { productId }];
    await wish.save();

    res
      .status(200)
      .json({ status: "Add Item to Wish Success", data: wish.items });
  } catch (err) {
    res
      .status(400)
      .json({ status: "Add Item to Wish Failed", err: err.message });
  }
};

wishController.getWishItems = async (req, res) => {
  try {
    const { userId } = req;

    const wish = await Wish.findOne({ userId }).populate({
      path: "items.productId",
      model: "Product",
    });

    if (!wish) {
      return res.status(200).json({
        status: "Get Wish Items Success",
        data: [],
      });
    }

    res
      .status(200)
      .json({ status: "Get Wish Items Success", data: wish.items });
  } catch (err) {
    res.status(400).json({ status: "Get Wish Items Failed", err: err.message });
  }
};

wishController.deleteWishItem = async (req, res) => {
  try {
    const { userId } = req;
    const { id } = req.params;

    const wish = await Wish.findOne({ userId }).populate({
      path: "items.productId",
      model: "Product",
    });

    wish.items = wish.items.filter((item) => !item.productId._id.equals(id));
    await wish.save();

    res.status(200).json({
      status: "Delete Wish Items Success",
      data: wish.items,
    });
  } catch (err) {
    res
      .status(400)
      .json({ status: "Delete Wish Items Failed", err: err.message });
  }
};

module.exports = wishController;
