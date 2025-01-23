import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQ,
  PRODUCT_DETAILS_SUCCES,
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQ,
  ALL_PRODUCT_SUCCES,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQ,
  CREATE_PRODUCT_SUCCES,
  CLEAR_ERROR,
  ADMIN_PRODUCT_FAIL,
  ADMIN_PRODUCT_REQ,
  ADMIN_PRODUCT_SUCCES,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQ,
  UPDATE_PRODUCT_SUCCES,
  REVIEW_PRODUCT_REQ,
  REVIEW_PRODUCT_FAIL,
  REVIEW_PRODUCT_SUCCES,
  DELETE_PRODUCT_REQ,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_SUCCES,
  ADD_TO_CART,
  REMOVE_CART_ITEM,
} from "../constant/ProductContanat";
import Cookies from "js-cookie";
import axios from "axios";

export const getAllprd = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQ });

    const { data } = await axios.get(
      "http://localhost:4000/api/v1/product/all"
    );

    dispatch({
      type: ALL_PRODUCT_SUCCES,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.response?.data?.message || error.msg,
    });
  }
};

export const DetailsPrd = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQ });

    const { data } = await axios.get(
      `http://localhost:4000/api/v1/product/${id}`
    );

    dispatch({
      type: PRODUCT_DETAILS_SUCCES,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response?.data?.message || error.msg,
    });
  }
};

export const createProducts = (myForm) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQ });

    const { data } = await axios.post(
      "http://localhost:4000/api/v1/product/new",
      myForm,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    dispatch({
      type: CREATE_PRODUCT_SUCCES,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload: error.response?.data?.message || error.msg,
    });
  }
};

export const getAdminPrd = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQ });

    const { data } = await axios.get(
      "http://localhost:4000/api/v1/admin/products"
    );

    dispatch({
      type: ADMIN_PRODUCT_SUCCES,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response?.data?.message || error.msg,
    });
  }
};

export const UpdateProduct = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_PRODUCT_REQ,
    });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `http://localhost:4000/api/v1/admin/product/${id}`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCES,
      payload: data.product,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response?.data?.message || error.msg,
    });
  }
};

export const reviewAction = (formData) => async (dispatch) => {
  try {
    dispatch({ type: REVIEW_PRODUCT_REQ });

    const token = JSON.parse(Cookies.get("Token"));

    const config = {
      headers: {
        authorization: `${token}`,
      },
    };

    const { data } = await axios.put(
      "http://localhost:4000/api/v1/reviews",
      formData,
      config
    );

    dispatch({
      type: REVIEW_PRODUCT_SUCCES,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      payload: error.response?.data?.message || error.msg,
    });
  }
};

export const DeleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQ });

    const token = JSON.parse(Cookies.get("Token"));

    const config = {
      headers: {
        authorization: `${token}`,
      },
    };

    const { data } = await axios.delete(
      `http://localhost:4000/api/v1/admin/product/${id}`,

      config
    );

    dispatch({
      type: DELETE_PRODUCT_SUCCES,
      payload: data.msg,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response?.data?.message || error.msg,
    });
  }
};

export const AddCart = (data) => (dispatch, getState) => {
  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data._id,
      name: data.name,
      price: data.price,
      image: data.images[0].url,
      stock: data.Stock,
      size: data.size || null, // Assuming size is part of data if applicable
    },
  });

  // Update localStorage with the current cartItems
  localStorage.setItem("cartItems", JSON.stringify(getState().cart?.cartItems));
};

export const removeItemFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
