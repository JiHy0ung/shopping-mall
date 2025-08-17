import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showToastMessage } from "../common/uiSlice";
import api from "../../utils/api";

export const createUserCoupon = createAsyncThunk(
  "/userCoupon/createCoupon",
  async ({ couponId }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post("/userCoupon", { couponId });
      dispatch(
        showToastMessage({
          message: "쿠폰이 발행되었습니다!",
          status: "success",
        })
      );
      return response.data.data;
    } catch (err) {
      dispatch(
        showToastMessage({
          message: err.err || "쿠폰 발행에 실패했습니다.",
          status: "error",
        })
      );
      return rejectWithValue(err.err);
    }
  }
);

export const getUserCouponList = createAsyncThunk(
  "/userCoupon/getUserCouponList",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.get("/userCoupon");
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.err);
    }
  }
);

export const applyUserCoupon = createAsyncThunk(
  "/userCoupon/applyUserCoupon",
  async ({ userCouponId }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.put(`/userCoupon`, { id: userCouponId });
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.err);
    }
  }
);

const userCouponSlice = createSlice({
  name: "userCoupon",
  initialState: {
    userCouponList: [],
    loading: false,
    error: "",
  },
  reducers: {
    initialUserCoupon: (state) => {
      state.userCouponList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUserCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(createUserCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserCouponList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserCouponList.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.userCouponList = action.payload;
      })
      .addCase(getUserCouponList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(applyUserCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(applyUserCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.userCouponList = action.payload;
      })
      .addCase(applyUserCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { initialUserCoupon } = userCouponSlice.actions;
export default userCouponSlice.reducer;
