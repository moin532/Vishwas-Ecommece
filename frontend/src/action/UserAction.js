import axios from "axios";
import {
  ADMIN_USERS_FAIL,
  ADMIN_USERS_REQ,
  ADMIN_USERS_SUCESS,
  CLEAR_ERROR,
  EMAIL_FAIL,
  EMAIL_REQ,
  EMAIL_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQ,
  OTP_FAIL,
  OTP_REQ,
  OTP_SUCCESS,
  REG_FAIL,
  REG_REQ,
  REG_SUCCESS,
} from "../constant/UserConstant";

import Cookies from "js-cookie";

export const EmailReq = (email) => async (dispatch) => {
  try {
    dispatch({ type: EMAIL_REQ });
    const { data } = await axios.post("http://localhost:4000/api/v1/sendotp", {
      email,
    });

    dispatch({
      type: EMAIL_SUCCESS,
      payload: data.msg,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: EMAIL_FAIL,
      payload: error.resposnse.data.message,
    });
  }
};

export const verifyOtp = (email, otp) => async (dispatch) => {
  try {
    dispatch({ type: OTP_REQ });

    const { data } = await axios.post("http://localhost:4000/api/v1/verify", {
      email,
      otp,
    });

    Cookies.set("Token", JSON.stringify(data.Token), {
      expires: 7,
      path: "/",
    });

    dispatch({
      type: OTP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: OTP_FAIL,
      payload: error.response?.data?.message || error.msg,
    });
  }
};

export const UserRegister = (FormData) => async (dispatch) => {
  try {
    dispatch({ type: REG_REQ });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://localhost:4000/api/v1/register",
      FormData,
      config
    );

    Cookies.set("Token", JSON.stringify(data.Token), {
      expires: 7,
      path: "/",
    });

    dispatch({
      type: REG_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REG_FAIL,
      payload: error.response?.data?.message || error.msg,
    });
  }
};

export const LoadUSer = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQ });

    const token = JSON.parse(Cookies.get("Token"));

    const config = {
      headers: {
        authorization: `${token}`,
      },
    };

    const { data } = await axios.get("http://localhost:4000/api/v1/me", config);

    dispatch({
      type: REG_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response?.data?.message || error.msg,
    });
  }
};

export const AllAdminUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_USERS_REQ });

    const { data } = await axios.get(
      "http://localhost:4000/api/v1/admin/users"
    );

    dispatch({
      type: ADMIN_USERS_SUCESS,
      payload: data.user,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADMIN_USERS_FAIL,
      payload: error.response?.data?.message || error.msg,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
