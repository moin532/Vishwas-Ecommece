import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserRegister, clearErrors } from "../action/UserAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = ({ email }) => {
  const [name, setname] = useState("");
  const [number, setnumber] = useState("");

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const { isAuthenticated, user, error } = useSelector((state) => state.userE);

  const formSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("number", number);

    dispatch(UserRegister(myForm));
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Successfully registered");
      Navigate("/profile");
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [isAuthenticated, error]);

  return (
    <div className="flex justify-center items-start min-h-screen mt-14 ">
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-lg"
        onSubmit={formSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">
          Hello! We just need a few more details
        </h2>

        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            className="appearance-none border  border-black  mt-5  rounded  py-2 px-3
             font-bold leading-tight focus:outline-none focus:shadow-outlin text-2xl "
            required
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>

          <input
            type="text"
            className="appearance-none border  border-black  mt-5  rounded  py-2 px-3
             font-bold leading-tight focus:outline-none focus:shadow-outlin text-2xl "
            required
            value={number}
            onChange={(e) => {
              setnumber(e.target.value);
            }}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>

          <input
            type="text"
            className="appearance-none border  border-black  mt-5  rounded  py-2 px-3
             font-bold leading-tight focus:outline-none focus:shadow-outlin text-2xl  bg-neutral-300"
            required
            readOnly
            value={email}
          />
        </div>

        <button
          type="submit"
          className="w-46 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Update and sign-in
        </button>
      </form>
    </div>
  );
};

export default Register;
