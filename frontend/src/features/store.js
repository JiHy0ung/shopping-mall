import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import uiSlice from "./common/uiSlice";
import productSlice from "./product/productSlice";
import cartSlice from "./cart/cartSlice";
import orderSlice from "./order/orderSlice";
import wishSlice from "./wish/wishSlice";
import couponSlice from "./coupon/couponSlice";
import userCouponSlice from "./userCoupon/userCouponSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    product: productSlice,
    cart: cartSlice,
    ui: uiSlice,
    order: orderSlice,
    wish: wishSlice,
    coupon: couponSlice,
    userCoupon: userCouponSlice,
  },
});
export default store;
