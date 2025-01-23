import React from "react";

const Orders = ({ order }) => {
  const totalItemsPrice = order.reduce((acc, item) => acc + item.itemsPrice, 0);

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      {order &&
        order.map((elem, ind) => (
          <div
            key={ind}
            className="max-w-3xl mx-auto overflow-auto bg-white rounded-lg shadow-md p-6 mb-4"
          >
            <h1 className="text-2xl font-semibold mb-4">Order Details</h1>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2">
                <p className="text-gray-600 mb-2">
                  Order ID: <span className="font-semibold">{elem._id}</span>
                </p>
                <p className="text-gray-600 mb-2">
                  Customer No:{" "}
                  <span className="font-semibold">{elem.number}</span>
                </p>
                <p className="text-gray-600 mb-2">
                  Date:{" "}
                  <span className="font-semibold">
                    {new Date(elem.createdAt).toLocaleDateString()}
                  </span>
                </p>
                <p className="text-gray-600 mb-2">
                  Status:{" "}
                  <span className="font-semibold text-orange-500">
                    {elem.orderStatus}
                  </span>
                </p>
              </div>
              <div className="md:w-1/2">
                <p className="text-gray-600 mb-2">Shipping Address:</p>
                <address className="font-semibold">
                  {elem.shippingInfo.address}
                  <br />
                  {elem.shippingInfo.city}, {elem.shippingInfo.district}
                  <br />
                  {elem.shippingInfo.country}
                </address>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Order Items</h2>
              <ul className="space-y-2">
                {elem.orderItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex flex-col md:flex-row justify-between items-center"
                  >
                    <span>{item.name}</span>
                    <img className="w-1/12 md:w-1/6" src={item.image} alt="" />
                    <span className="font-semibold">${item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      <h1 className="text-2xl font-semibold mt-6">
        All Amount:{" "}
        <span className="text-green-600 underline">{totalItemsPrice}</span>
      </h1>
    </div>
  );
};

export default Orders;
