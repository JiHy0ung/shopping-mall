import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { showToastMessage } from "../common/uiSlice";

export const createCoupon = createAsyncThunk(
  "coupon/createCoupon",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post("/coupon", formData);
      dispatch(
        showToastMessage({
          message: "쿠폰을 성공적으로 추가했습니다",
          status: "success",
        })
      );
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.err);
    }
  }
);

export const getCouponList = createAsyncThunk(
  "coupon/getCouponList",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.get("/coupon");

      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.err);
    }
  }
);

export const updateCouponActive = createAsyncThunk(
  "coupon/updateCouponActive",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.put(`coupon/${id}`);
      dispatch(
        showToastMessage({
          message: "쿠폰을 삭제했습니다",
          status: "success",
        })
      );
      dispatch(getCouponList());
      return response.data.data;
    } catch (err) {
      dispatch(
        showToastMessage({
          message: "쿠폰 삭제에 실패했습니다",
          status: "error",
        })
      );
      return rejectWithValue(err.err);
    }
  }
);

const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    couponList: [],
    loading: false,
    error: "",
    success: false,
  },
  reducers: {
    initialCoupon: (state) => {
      state.couponList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.success = true;
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      .addCase(getCouponList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCouponList.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.couponList = action.payload;
      })
      .addCase(getCouponList.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      .addCase(updateCouponActive.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCouponActive.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.couponList = action.payload;
      })
      .addCase(updateCouponActive.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { initialCoupon } = couponSlice.actions;
export default couponSlice.reducer;
