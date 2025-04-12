import {
  ADD_SELLER_FAIL,
  ADD_SELLER_REQ,
  ADD_SELLER_SUCCES,
} from "../constant/SellerConstant";

import axios from "axios";
import Cookies from "js-cookie";
export const AddSellerAction = (subData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_SELLER_REQ });

    const { data } = await axios.post(
      "http://localhost:4000/api/v1/add/seller",
      subData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    Cookies.set("Token", JSON.stringify(data.Token), {
      expires: 7,
      path: "/",
    });

    dispatch({
      type: ADD_SELLER_SUCCES,
      payload: data,
    });
  } catch (error) {
    console.log(error.response?.data?.content, "in accc");
    dispatch({
      type: ADD_SELLER_FAIL,
      payload: error.response?.data?.content || error.msg,
    });
  }
};
