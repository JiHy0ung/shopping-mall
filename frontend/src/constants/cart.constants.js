export const ADD_TO_CART_REQUEST = "ADD_TO_CART_REQUEST";
export const ADD_TO_CART_SUCCESS = "ADD_TO_CART_SUCCESS";
export const ADD_TO_CART_FAIL = "ADD_TO_CART_FAIL";
export const GET_CART_LIST_REQUEST = "GET_CART_LIST_REQUEST";
export const GET_CART_LIST_SUCCESS = "GET_CART_LIST_SUCCESS";
export const GET_CART_LIST_FAIL = "GET_CART_LIST_FAIL";
export const DELETE_CART_ITEM_REQUEST = "DELETE_CART_ITEM_REQUEST";
export const DELETE_CART_ITEM_SUCCESS = "DELETE_CART_ITEM_SUCCESS";
export const DELETE_CART_ITEM_FAIL = "DELETE_CART_ITEM_FAIL";
export const UPDATE_CART_ITEM_REQUEST = "UPDATE_CART_ITEM_REQUEST";
export const UPDATE_CART_ITEM_SUCCESS = "UPDATE_CART_ITEM_SUCCESS";
export const UPDATE_CART_ITEM_FAIL = "UPDATE_CART_ITEM_FAIL";
export const GET_CART_QTY_REQUEST = "GET_CART_QTY_REQUEST";
export const GET_CART_QTY_SUCCESS = "GET_CART_QTY_SUCCESS";
export const GET_CART_QTY_FAIL = "GET_CART_QTY_FAIL";

export const CART_ERROR_MESSAGES = {
  INVALID_TOKEN: { message: "로그인 후 진행해 주세요.", status: "error" },
  DUPLICATE_PRODUCT: {
    message: "이미 장바구니에 등록된 상품입니다.",
    status: "error",
  },
  DEFAULT: {
    message: "상품을 장바구니에 담는 중 오류가 발생했습니다.",
    status: "error",
  },
};
