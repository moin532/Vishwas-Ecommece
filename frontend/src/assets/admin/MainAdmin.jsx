import React, { useEffect } from "react";
import LineChart from "./LineChart";
import DoughnutChart from "./DoughnutChart";
import { useSelector, useDispatch } from "react-redux";
import { getAllprd } from "../../action/ProductAction";
import { RiArrowRightUpFill } from "react-icons/ri";
import { AllAdminUsers } from "../../action/UserAction";
import { AdminOrders } from "../../action/OrderActtion";
import { FaUsers } from "react-icons/fa6";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { MdShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { LoadUSer } from "../../action/UserAction";
import { toast } from "react-toastify";
const MainAdmin = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { products } = useSelector((state) => state.products);
  const { users } = useSelector((state) => state.admUsers);
  const { orders } = useSelector((state) => state.adminOrd);
  const { user, isAuthenticated } = useSelector((state) => state.userE);

  useEffect(() => {
    if (!isAuthenticated) {
      Navigate("/");
      toast.info("only Admin can accsess");
    }

    // if (user.role === "user") {
    //   Navigate("/");
    //   toast.info("only Admin can accsess");
    // }
    dispatch(LoadUSer());
    dispatch(getAllprd());
    dispatch(AllAdminUsers());
    dispatch(AdminOrders());
  }, [dispatch]);

  return (
    <div>
      <div className="bg-gray-900 min-h-screen text-white">
        <aside className="w-64 bg-gray-800 h-screen fixed">
          <div className="p-6">
            <div className="text-xl font-semibold">MM Ecom</div>
          </div>
          <nav className="mt-10 ml-14">
            <a
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
              href="/"
            >
              {" "}
              Dashboard
            </a>
            <a
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
              href="/admin/upload"
            >
              Upload
            </a>
            <a
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
              href="/admin/orders"
            >
              Orders
            </a>
            <a
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
              href="/admin/users"
            >
              users
            </a>
            <a
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
              href="/admin/orders"
            >
              Process Orders
            </a>
            <a
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
              href="/admin/products"
            >
              Products
            </a>
          </nav>
        </aside>
        <main className="ml-64 p-6">
          <header className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-semibold">Dashboard</h1>
            </div>
            <div className="flex items-center">
              <button className="mr-4 text-gray-400 hover:text-white">
                <i className="fas fa-bell"></i>
              </button>
              <button className="mr-4 text-gray-400 hover:text-white">
                <i className="fas fa-cog"></i>
              </button>
              <div className="flex items-center">
                <img
                  src="https://via.placeholder.com/40"
                  alt="profile"
                  className="rounded-full mr-2"
                />
                <div>
                  <h4 className="font-semibold">Moin Admin</h4>
                  <p className="text-gray-400">Ecom</p>
                </div>
              </div>
            </div>
          </header>
          <section className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="bg-gray-700 p-4 rounded-lg shadow-lg w-12 h-12 text-indigo-500 ">
                <MdShoppingCart />
              </div>
              <h2 className="text-lg font-semibold">Total Orders</h2>
              <p className="text-2xl">{orders && orders.length}</p>
              <p className="text-green-500">
                {orders && (orders.length / 10) * 100}% <RiArrowRightUpFill />{" "}
                <i className="fas fa-arrow-up"></i>
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="bg-gray-700 p-4 rounded-lg shadow-lg w-12 h-12 text-indigo-500 ">
                <RiMoneyDollarBoxLine />
              </div>
              <h2 className="text-lg font-semibold">Total Profit</h2>
              <p className="text-2xl">$45.2K</p>
              <p className="text-green-500">
                4.35% <i className="fas fa-arrow-up"></i>
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="bg-gray-700 p-4 rounded-lg shadow-lg w-12 h-12 text-indigo-500 ">
                <MdOutlineProductionQuantityLimits />
              </div>
              <h2 className="text-lg font-semibold">Total Product</h2>
              <p className="text-2xl">{products && products.length}</p>
              <p className="text-green-500">
                {products && (products.length / 10) * 100} %{" "}
                <RiArrowRightUpFill />
                <i className="fas fa-arrow-up"></i>
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="bg-gray-700 p-4 rounded-lg shadow-lg w-12 h-12 text-indigo-500 ">
                <h1>
                  <FaUsers />
                </h1>
              </div>
              <h2 className="text-lg font-semibold">Total Users</h2>
              <p className="text-2xl">{users && users.length}</p>
              <p className="text-green-500">
                {users && (users.length / 10) * 100}% <RiArrowRightUpFill />
                <i className="fas fa-arrow-down"></i>
              </p>
            </div>
          </section>
          <section className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-4">
                Total Revenue & Sales
              </h2>
              {/* Insert your chart here */}
              <LineChart orders={orders} />
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Profit this week</h2>
              {/* Insert your chart here */}
              <DoughnutChart products={products} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default MainAdmin;
