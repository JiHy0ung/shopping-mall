const userCouponController = {};
const UserCoupon = require("../models/UserCoupon");

userCouponController.createUserCoupon = async (req, res) => {
  try {
    const { userId } = req;
    const { couponId } = req.body;

    const newCoupon = new UserCoupon({
      userId,
      couponId,
    });

    const existingUserCoupon = await UserCoupon.findOne({ userId, couponId });
    if (existingUserCoupon) {
      throw new Error("이미 보유한 쿠폰입니다.");
    }

    await newCoupon.save();

    res
      .status(200)
      .json({ status: "Add User Coupon Success", date: newCoupon });
  } catch (err) {
    res
      .status(400)
      .json({ status: "Add User Coupon Failed", err: err.message });
  }
};

userCouponController.getUserCouponList = async (req, res) => {
  try {
    const { userId } = req;
    const userCouponList = await UserCoupon.find({ userId }).populate(
      "couponId"
    );

    res
      .status(200)
      .json({ status: "Get User Coupon List Success", data: userCouponList });
  } catch (err) {
    res
      .status(400)
      .json({ status: "Get User Coupon List Failed", err: err.message });
  }
};

userCouponController.updateUserCoupon = async (req, res) => {
  try {
    const { userId } = req;
    const { id } = req.body;

    const userCoupon = await UserCoupon.findByIdAndUpdate(
      { _id: id, userId },
      { isUsed: true },
      { new: true }
    );

    if (!userCoupon) {
      throw new Error("userCoupon does't exist.");
    }
    res
      .status(200)
      .json({ status: "Update User Coupon Success", data: userCoupon });
  } catch (err) {
    res
      .status(400)
      .json({ status: "Update User Coupon Failed", err: err.message });
  }
};

module.exports = userCouponController;
