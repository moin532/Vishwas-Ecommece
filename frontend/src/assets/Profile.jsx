import React, { useState, useEffect } from "react";
import Slidebar from "./Slidebar";
import ProfileDetails from "./ProfileDetails";
import Orders from "./Orders";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrder } from "../action/OrderActtion";
import MyDelivery from "./MyDelivery";
import NotFound from "./NotFound";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("My Profile");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { order } = useSelector((state) => state.userOrder);

  const logout = () => {
    Cookies.remove("Token");
    navigate("/");
    toast.success("Logout Sucess");
  };

  useEffect(() => {
    dispatch(getUserOrder());
  }, [dispatch]);

  const renderContent = () => {
    if (activeTab === "My Profile") {
      return <ProfileDetails />;
    }
    if (activeTab === "My Orders") {
      return <Orders order={order} />;
    }
    if (activeTab === "Delivery Address") {
      return <MyDelivery order={order} />;
    }
    if (activeTab === "Log Out") {
      return <div>{logout()}</div>;
    } else {
      return <NotFound />;
    }
  };

  return (
    <div>
      <div className="flex min-h-screen bg-gray-100  m-32">
        <Slidebar setActiveTab={setActiveTab} />
        <div className="flex-grow min-h-screen p-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Profile;
