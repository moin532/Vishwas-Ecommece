import React, { useEffect } from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Navbar from "./assets/home/Navbar";
import Home from "./assets/home/Home";
import Footer from "./assets/home/Footer";
import ProductDetails from "./assets/home/ProductDetails";
import CartForm from "./cart/CartForm";
import { ToastContainer, toast } from "react-toastify";
import Signup from "./assets/Signup";
import VerifyOtp from "./assets/VerifyOtp";
import { useSelector, useDispatch } from "react-redux";
import { LoadUSer } from "./action/UserAction";
import Profile from "./assets/Profile";
import ImageUpload from "./Admin/ImageUpload";
import MainAdmin from "./assets/admin/MainAdmin";
import Orders from "./assets/admin/Orders";
import UpdateDeliver from "./assets/admin/UpdateDeliver";
import AdminUsers from "./assets/admin/AdminUsers";
import AdminProducts from "./assets/admin/AdminProducts";
import UpdatePrdoducts from "./assets/admin/UpdatePrdoducts";
import GSTRegistrationForm from "./assets/Registration/RegistrationForm";
import MyWallet from "./assets/admin/Wallet";

const App = () => {
  const { isAuthenticated, user, error } = useSelector((state) => state.userE);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LoadUSer());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/register" exact element={<GSTRegistrationForm />} />

          <Route path="/product/:id" exact element={<ProductDetails />} />
          <Route path="/cart" exact element={<CartForm />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/verify" exact element={<VerifyOtp />} />
          <Route path="/profile" exact element={<Profile />} />

          {/* Admin */}
          <Route path="/admin" exact element={<MainAdmin />} />
          <Route path="/admin/upload" exact element={<ImageUpload />} />
          <Route path="/admin/orders" exact element={<Orders />} />
          <Route path="/admin/users" exact element={<AdminUsers />} />
          <Route path="/admin/products" exact element={<AdminProducts />} />
          <Route
            path="/admin/products/:id"
            exact
            element={<UpdatePrdoducts />}
          />
          <Route path="/admin/order/:id" exact element={<UpdateDeliver />} />
          <Route path="/my/wallet" exact element={<MyWallet />} />
        </Routes>
        <Footer />
      </BrowserRouter>

      <ToastContainer position="bottom-right" theme="colored" />
    </>
  );
};

export default App;
