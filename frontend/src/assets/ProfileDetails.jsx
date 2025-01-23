import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadUSer } from "../action/UserAction";
const ProfileDetails = () => {
  const [greeting, setgreeting] = useState();

  const { user } = useSelector((state) => state.userE);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LoadUSer());
  }, [dispatch]);

  useEffect(() => {
    const Interval = setInterval(() => {
      const d = new Date();
      const hours = d.getHours();

      if (hours <= 12) {
        setgreeting("Good Morning");
      } else if (hours < 18) {
        setgreeting("Good Afternoon");
      } else {
        setgreeting("Good Evining");
      }
    }, 1000);

    return () => clearInterval(Interval);
  }, []);
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold mb-6">{greeting}! mm</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              disabled
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              defaultValue={user?.name}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              disabled
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              defaultValue={user?.name}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              disabled
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              defaultValue={user?.email}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact Number
            </label>
            <input
              type="tel"
              disabled
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              defaultValue={user?.number}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Birthdate
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="DD"
                className="mt-1 block w-1/3 p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="MM"
                className="mt-1 block w-1/3 p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="YYYY"
                className="mt-1 block w-1/3 p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="gender"
                  value="male"
                />
                <span className="ml-2">Male</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="gender"
                  value="female"
                />
                <span className="ml-2">Female</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="gender"
                  value="other"
                />
                <span className="ml-2">Other</span>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileDetails;
