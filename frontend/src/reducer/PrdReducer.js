import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQ,
  PRODUCT_DETAILS_SUCCES,
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQ,
  ALL_PRODUCT_SUCCES,
  CLEAR_ERROR,
  CREATE_PRODUCT_REQ,
  CREATE_PRODUCT_SUCCES,
  CREATE_PRODUCT_FAIL,
  NEW_PRODUCT_RESET,
  ADMIN_PRODUCT_REQ,
  ADMIN_PRODUCT_SUCCES,
  ADMIN_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQ,
  UPDATE_PRODUCT_SUCCES,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_RESET,
  REVIEW_PRODUCT_REQ,
  REVIEW_PRODUCT_SUCCES,
  REVIEW_PRODUCT_FAIL,
  REVIEW_PRODUCT_RESET,
  DELETE_PRODUCT_REQ,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_SUCCES,
  ADD_TO_CART,
  REMOVE_CART_ITEM,
} from "../constant/ProductContanat";

export const ProductReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQ:
      return {
        loading: true,
        products: [],
      };
    case ALL_PRODUCT_SUCCES:
      return {
        loading: false,
        products: action.payload.products,
      };
    case ALL_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERROR:
      return {
        error: null,
        ...state,
      };
    default:
      return state;
  }
};

export const allPrdDetailsReducer = (state = { product: [] }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQ:
      return {
        loading: true,
        product: [],
      };

    case PRODUCT_DETAILS_SUCCES:
      return {
        loading: false,
        product: action.payload,
      };
    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const NewProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQ:
      return {
        loading: true,
        ...state,
      };

    case CREATE_PRODUCT_SUCCES:
      return {
        loading: false,
        success: action.payload.sucess,
        product: action.payload.product,
        ...state,
      };

    case CREATE_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
        ...state,
      };

    case CLEAR_ERROR:
      return {
        error: null,
        ...state,

        loading: false,
      };

    case NEW_PRODUCT_RESET:
      return {
        ...state,
        succes: false,
        loading: false,
      };

    default:
      return state;
  }
};

export const AdminPrdReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_PRODUCT_REQ:
    case UPDATE_PRODUCT_REQ:
    case DELETE_PRODUCT_REQ:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_PRODUCT_SUCCES:
      return {
        ...state,
        loading: false,
        isUpd: action.payload,
      };

    case ADMIN_PRODUCT_SUCCES:
      return {
        ...state,
        loading: false,
        admPrd: action.payload,
      };

    case DELETE_PRODUCT_SUCCES:
      return {
        loading: false,
        isDeleted: action.payload,
        ...state,
      };

    case ADMIN_PRODUCT_FAIL:
    case UPDATE_PRODUCT_FAIL:
    case DELETE_PRODUCT_FAIL:
      return {
        loading: false,
        ...state,
        error: action.payload,
      };

    case UPDATE_PRODUCT_RESET:
      return {
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export const NewProductReview = (state = {}, action) => {
  switch (action.type) {
    case REVIEW_PRODUCT_REQ:
      return {
        ...state,
        loading: true,
      };

    case REVIEW_PRODUCT_SUCCES:
      return {
        ...state,
        loading: false,
        isReview: action.payload,
      };

    case REVIEW_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case REVIEW_PRODUCT_RESET:
      return {
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

// Cart Reducer
export const CartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const isItemExist = state.cartItems.find(
        (id) => id.product === item.product
      );

      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((id) =>
            id.product === isItemExist.product ? item : id
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      };

    default:
      return state;
  }
};
