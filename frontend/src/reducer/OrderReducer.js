import {
  ALL_ORDER_FAIL,
  ALL_ORDER_REQ,
  ALL_ORDER_SUCCES,
  CLEAR_ERROR,
  DELETE_ORDERS_FAIL,
  DELETE_ORDERS_RQUEST,
  DELETE_ORDERS_SUCCES,
  DELETE_ORDERS__RESET,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_RQUEST,
  ORDER_DETAILS_SUCCES,
  ORDER_FAIL,
  ORDER_REQ,
  ORDER_SUCCES,
  ORDER_USER_FAIL,
  ORDER_USER_RQUEST,
  ORDER_USER_SUCCES,
  UPDATE_ORDERS_FAIL,
  UPDATE_ORDERS_RQUEST,
  UPDATE_ORDERS_SUCCES,
  UPDATE_ORDERS__RESET,
} from "../constant/OrderConstant";

export const OrderReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_REQ:
      return {
        loading: true,
        isOrder: false,
      };

    case ORDER_SUCCES:
      return {
        loading: false,
        isOrder: action.payload,
      };

    case ORDER_FAIL:
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

export const allAdminOrderReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ALL_ORDER_REQ:
    case ORDER_DETAILS_RQUEST:
      return {
        loading: true,
      };

    case ALL_ORDER_SUCCES:
      return {
        loading: false,
        orders: action.payload,
      };

    case ORDER_DETAILS_SUCCES:
      return {
        loading: false,
        order: action.payload,
      };

    case ALL_ORDER_FAIL:
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const updOrderAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ORDERS_RQUEST:
    case DELETE_ORDERS_RQUEST:
      return {
        loading: true,
        ...state,
      };

    case UPDATE_ORDERS_SUCCES:
      return {
        loading: false,
        isUpdated: action.payload,
        ...state,
      };

    case DELETE_ORDERS_SUCCES:
      return {
        ...state,
        isDeleted: action.payload,
      };

    case UPDATE_ORDERS_FAIL:
    case DELETE_ORDERS_FAIL:
      return {
        loading: false,
        ...state,
        err: action.payload,
      };

    case UPDATE_ORDERS__RESET:
      return {
        loading: false,
        isUpdated: false,
      };

    case DELETE_ORDERS__RESET:
      return {
        loading: false,
        isUpdated: false,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        err: null,
      };

    default:
      return state;
  }
};

const initialState = {
  order: [],
  loading: false,
  error: null,
};

export const getUserOrders = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_USER_RQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_USER_SUCCES:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };

    case ORDER_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
