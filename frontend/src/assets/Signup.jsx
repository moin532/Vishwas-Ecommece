import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EmailReq } from "../action/UserAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LoadUSer } from "../action/UserAction";

const Signup = () => {
  //
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const { isAuthenticated, error } = useSelector((state) => state.userE);
  const { loading, isEmail, success } = useSelector((state) => state.emailReq);
  const [email, setEmail] = useState("");

  const submitEmail = (e) => {
    e.preventDefault();
    localStorage.setItem("email", email);
    dispatch(EmailReq(email));
    Navigate("/verify");
  };

  useEffect(() => {
    if (isAuthenticated) {
      Navigate("/profile");
    }

    if (error) {
      toast.error(error);
    }
    dispatch(LoadUSer());
  }, [dispatch]);

  return (
    <div>
      <div className="flex items-center justify-center  flex-initial  flex-col min-h-screen  -mt-28">
        <img
          src="./images/shoes.webp"
          alt=""
          className=" w-48 content-center"
        />
        <h1 className="  text-3xl font-serif">LOGIN WITH OTP</h1>
        <p className="font-serif">Please enter your email address</p>
        <div>
          <form>
            <input
              type="text"
              className="appearance-none border  border-black  mt-5  rounded  py-2 px-3
             font-bold leading-tight focus:outline-none focus:shadow-outlin text-2xl "
              placeholder="Enter a valid Email "
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </form>

          <button
            className="  mt-4 ml-24 w-32 bg-black h-14 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={submitEmail}
          >
            Request Otp
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
