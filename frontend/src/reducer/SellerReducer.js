import {
  ADD_SELLER_FAIL,
  ADD_SELLER_REQ,
  ADD_SELLER_RESET,
  ADD_SELLER_SUCCES,
} from "../constant/SellerConstant";

export const SellerAddReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_SELLER_REQ:
      return {
        loading: true,
        ...state,
      };
    case ADD_SELLER_SUCCES:
      return {
        loading: false,
        ...state,
        isSeller: action.payload,
      };
    case ADD_SELLER_FAIL:
      return {
        loading: false,
        ...state,
        error: action.payload,
      };
    case ADD_SELLER_RESET:
      return {
        loading: false,
        ...state,
        error: null,
        isSeller: null,
      };
    default:
      return state;
  }
};
