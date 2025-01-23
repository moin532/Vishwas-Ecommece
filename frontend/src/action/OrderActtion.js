import {
  ALL_ORDER_FAIL,
  ALL_ORDER_REQ,
  ALL_ORDER_SUCCES,
  CLEAR_ERROR,
  DELETE_ORDERS_FAIL,
  DELETE_ORDERS_RQUEST,
  DELETE_ORDERS_SUCCES,
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
} from "../constant/OrderConstant";
import Cookies from "js-cookie";
import axios from "axios";

export const OrderAction = (order) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_REQ });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://localhost:4000/api/v1/order",
      order,
      config
    );

    dispatch({
      type: ORDER_SUCCES,
      payload: data.msg,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ORDER_FAIL,
     payload: error.response?.data?.message || error.msg,
    });
  }
};

export const AdminOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDER_REQ });

    const { data } = await axios.get(
      "http://localhost:4000/api/v1/admin/orders"
    );

    dispatch({
      type: ALL_ORDER_SUCCES,
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: ALL_ORDER_FAIL,
     payload: error.response?.data?.message || error.msg,
    });
  }
};
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDERS_RQUEST });

    const { data } = await axios.delete(
      `http://localhost:4000/api/v1/admin/order/${id}`
    );

    dispatch({
      type: DELETE_ORDERS_SUCCES,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ORDERS_FAIL,
     payload: error.response?.data?.message || error.msg,
    });
  }
};

export const AdminSingleOrd = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_RQUEST });

    const { data } = await axios.get(
      `http://localhost:4000/api/v1/order/${id}`
    );

    dispatch({
      type: ORDER_DETAILS_SUCCES,
      payload: data.order,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ORDER_DETAILS_FAIL,
     payload: error.response?.data?.message || error.msg,
    });
  }
};

export const UpdateSingleOrd = (id, form) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDERS_RQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `http://localhost:4000/api/v1/admin/order/${id}`,
      form,
      config
    );

    dispatch({
      type: UPDATE_ORDERS_SUCCES,
      payload: data.success,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: UPDATE_ORDERS_FAIL,
     payload: error.response?.data?.message || error.msg,
    });
  }
};

export const getUserOrder = () => async (dispatch) => {
  try {
    dispatch({ type: ORDER_USER_RQUEST }); // Corrected dispatch action

    const token = JSON.parse(Cookies.get("Token"));

    const config = {
      headers: {
        authorization: `${token}`,
      },
    };

    const { data } = await axios.get(
      "http://localhost:4000/api/v1/me/order",
      config
    );

    dispatch({
      type: ORDER_USER_SUCCES,
      payload: data.orders,
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: ORDER_USER_FAIL,
      payload: error.response?.data?.message || "An error occurred", // Handle case where error.response might be undefined
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
