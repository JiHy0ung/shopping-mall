const Coupon = require("../models/Coupon");

const couponController = {};

couponController.createCoupon = async (req, res) => {
  try {
    const {
      name,
      description,
      code,
      discountType,
      discountValue,
      minAmount,
      expireDate,
      isActive,
    } = req.body;

    const isDuplicate = await Coupon.findOne({ code });
    if (isDuplicate) {
      throw new Error("이미 존재하는 쿠폰 코드입니다.");
    }

    const coupon = new Coupon({
      name,
      description,
      code,
      discountType,
      discountValue,
      minAmount,
      expireDate,
      isActive,
    });

    await coupon.save();
    res.status(200).json({ status: "Create Coupon Success", coupon });
  } catch (err) {
    res.status(400).json({ status: "Create Coupon Failed", err: err.message });
  }
};

couponController.getCouponList = async (req, res) => {
  try {
    const couponList = await Coupon.find({});
    res
      .status(200)
      .json({ status: "Get Coupon List Success", data: couponList });
  } catch (err) {
    res
      .status(400)
      .json({ status: "Get Coupon List Failed", err: err.message });
  }
};

couponController.updateCouponActive = async (req, res) => {
  try {
    const { id } = req.params;

    const coupon = await Coupon.findOne({ _id: id });

    if (!coupon) {
      throw new Error("존재하지 않는 쿠폰.");
    }
    const updatedCoupon = await Coupon.findByIdAndUpdate(
      { _id: id },
      { $set: { isActive: !coupon.isActive } },
      { new: true }
    );
    await updatedCoupon.save();

    res
      .status(200)
      .json({ status: "Delete Coupon Success", data: updatedCoupon });
  } catch (err) {
    res.status(400).json({ status: "Delete Coupon Failed", err: err.message });
  }
};

module.exports = couponController;
