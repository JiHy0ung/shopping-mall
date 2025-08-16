import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { showToastMessage } from "../common/uiSlice";

export const addToWish = createAsyncThunk(
  "/wish/addToWish",
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post("/wish", { productId: id });

      dispatch(
        showToastMessage({
          message: "위시리스트에 상품이 추가됐습니다",
          status: "success",
        })
      );

      return response.data.data;
    } catch (err) {
      dispatch(
        showToastMessage({
          message: "오류로 위시리스트에 추가되지 않았습니다",
          status: "error",
        })
      );
      return rejectWithValue(err.err);
    }
  }
);

export const getWishList = createAsyncThunk(
  "/wish/getWishItems",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.get("/wish");
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.err);
    }
  }
);

export const deleteWishItem = createAsyncThunk(
  "/wish/deleteWishItem",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.delete(`/wish/${id}`);
      dispatch(
        showToastMessage({
          message: "상품이 위시리스트에서 삭제됐습니다",
          status: "success",
        })
      );
      dispatch(getWishList());
      return response.data.data;
    } catch (err) {
      dispatch(
        showToastMessage({
          message: "오류로 위시리스트에서 삭제하지 못했습니다",
          status: "error",
        })
      );
      return rejectWithValue(err.err);
    }
  }
);

const wishSlice = createSlice({
  name: "wish",
  initialState: {
    loading: false,
    error: "",
    wishList: [],
  },
  reducers: {
    initialWish: (state) => {
      state.wishItemCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToWish.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToWish.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(addToWish.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getWishList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWishList.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.wishList = action.payload;
      })
      .addCase(getWishList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteWishItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteWishItem.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.wishList = action.payload;
      })
      .addCase(deleteWishItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default wishSlice.reducer;
export const { initialWish } = wishSlice.actions;
